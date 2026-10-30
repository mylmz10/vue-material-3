import { afterEach, describe, expect, it, vi } from 'vitest';
import { enableAutoUnmount, mount } from '@vue/test-utils';
import { defineComponent, h, nextTick } from 'vue';
import MdFilledSelect from '@/components/select/MdFilledSelect.vue';
import MdOutlinedSelect from '@/components/select/MdOutlinedSelect.vue';
import MdSelectOption from '@/components/select/MdSelectOption.vue';
import MdDatePickerHeader from '@/components/datepicker/MdDatePickerHeader.vue';
import MdRadio from '@/components/radio/MdRadio.vue';
import MdRipple from '@/components/ripple/MdRipple.vue';
import MdCheckbox from '@/components/checkbox/MdCheckbox.vue';
import MdSwitch from '@/components/switch/MdSwitch.vue';
import MdFilledTextField from '@/components/text-field/MdFilledTextField.vue';
import MdOutlinedTextField from '@/components/text-field/MdOutlinedTextField.vue';
import MdLinearProgressIndicator from '@/components/progress-indicator/MdLinearProgressIndicator.vue';
import MdCircularProgressIndicator from '@/components/progress-indicator/MdCircularProgressIndicator.vue';
import MdSearch from '@/components/search/MdSearch.vue';
import MdIcon from '@/components/icon/MdIcon.vue';
import MdNavigationTab from '@/components/navigation-tab/MdNavigationTab.vue';

enableAutoUnmount(afterEach);
const settle = async () => {
  await nextTick();
  await nextTick();
};
describe('remaining audit regressions', () => {
  it.each([MdFilledSelect, MdOutlinedSelect])('select boundaries and active IDs: %s', async (component) => {
    const wrapper = mount(component, { attachTo: document.body, props: { modelValue: 'b' }, slots: { default: () => ['a', 'b', 'c'].map((value) => h(MdSelectOption, { value }, () => value)) } });
    await wrapper.get('[role="combobox"]').trigger('click');
    await settle();
    await wrapper.get('[role="listbox"]').trigger('keydown', { key: 'End' });
    await settle();
    let id = wrapper.get('[role="combobox"]').attributes('aria-activedescendant');
    expect(document.getElementById(id)?.textContent).toBe('c');
    await wrapper.get('[role="listbox"]').trigger('keydown', { key: 'Home' });
    await settle();
    id = wrapper.get('[role="combobox"]').attributes('aria-activedescendant');
    expect(document.getElementById(id)?.textContent).toBe('a');
  });
  it('names date header icon controls without icon ligatures', () => {
    const wrapper = mount(MdDatePickerHeader, { props: { variant: 'docked', year: 2026, month: 9 } });
    expect(wrapper.findAll('.md-icon-button').map((button) => button.attributes('aria-label'))).toEqual(['Previous month', 'Next month', 'Previous year', 'Next year']);
  });
  it('does not emit a scheduled reset after unmount', async () => {
    const form = document.createElement('form');
    document.body.append(form);
    const wrapper = mount(MdCheckbox, { attachTo: form, props: { checked: true } });
    form.reset();
    wrapper.unmount();
    await settle();
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    form.remove();
  });
  it('updates radio checked state when its value changes', async () => {
    const wrapper = mount(MdRadio, { props: { modelValue: 'a', value: 'a' } });
    await wrapper.setProps({ value: 'b' });
    expect(wrapper.get('input').element.checked).toBe(false);
    expect(wrapper.classes()).not.toContain('md-radio--checked');
  });
  it('synchronizes uncontrolled native radio groups without affecting other forms', async () => {
    const wrapper = mount(
      defineComponent({
        components: { MdRadio },
        template: '<div><form @change.stop><MdRadio name="x" checked value="a"/><MdRadio name="x" value="b"/></form><form><MdRadio name="x" checked value="c"/></form></div>',
      }),
      { attachTo: document.body }
    );
    await wrapper.findAll('input')[1].setValue(true);
    expect(wrapper.findAll('.md-radio--checked')).toHaveLength(2);
    expect(wrapper.findAllComponents(MdRadio)[0].classes()).not.toContain('md-radio--checked');
  });
  it.each([MdCheckbox, MdSwitch, MdRadio, MdFilledTextField, MdOutlinedTextField])('follows changed form owner and respects canceled reset: %s', async (component) => {
    const first = document.createElement('form'),
      second = document.createElement('form');
    first.id = 'audit-first';
    second.id = 'audit-second';
    document.body.append(first, second);
    const checkable = [MdCheckbox, MdSwitch, MdRadio].includes(component);
    const wrapper = mount(component, { attachTo: document.body, props: { form: first.id, ...(checkable ? { checked: true, value: 'a' } : { value: 'initial' }) } });
    const edit = async () => {
      if (checkable) {
        wrapper.get('input').element.checked = false;
        await wrapper.get('input').trigger('change');
      } else await wrapper.get('input').setValue('edited');
    };
    await edit();
    await wrapper.setProps({ form: second.id });
    first.reset();
    await settle();
    expect(checkable ? wrapper.get('input').element.checked : wrapper.get('input').element.value).toBe(checkable ? false : 'edited');
    const cancel = (event) => event.preventDefault();
    second.addEventListener('reset', cancel);
    second.reset();
    await settle();
    expect(checkable ? wrapper.get('input').element.checked : wrapper.get('input').element.value).toBe(checkable ? false : 'edited');
    second.removeEventListener('reset', cancel);
    second.reset();
    await settle();
    expect(checkable ? wrapper.get('input').element.checked : wrapper.get('input').element.value).toBe(checkable ? true : 'initial');
    wrapper.unmount();
    first.remove();
    second.remove();
  });
  it('releases ripple outside host, cancels animations and timers on unmount', async () => {
    vi.useFakeTimers();
    const cancel = vi.fn();
    const wrapper = mount(defineComponent({ render: () => h('button', [h(MdRipple)]) }), { attachTo: document.body });
    wrapper.get('.md-ripple-surface').element.animate = vi.fn(() => ({ cancel }));
    await wrapper.trigger('pointerdown', { button: 0, pageX: 5, pageY: 5 });
    expect(wrapper.find('.md-ripple-surface--pressed').exists()).toBe(true);
    document.dispatchEvent(new Event('pointercancel'));
    vi.runAllTimers();
    await nextTick();
    expect(wrapper.find('.md-ripple-surface--pressed').exists()).toBe(false);
    await wrapper.trigger('pointerdown', { button: 0 });
    document.dispatchEvent(new Event('pointerup'));
    wrapper.unmount();
    expect(cancel).toHaveBeenCalled();
    expect(vi.getTimerCount()).toBe(0);
    vi.useRealTimers();
  });
  it.each([-20, 140, 'bad'])('bounds progress visual and semantic values: %s', async (value) => {
    const expected = value === 140 ? 100 : 0;
    const linear = mount(MdLinearProgressIndicator, { props: { value } }),
      circular = mount(MdCircularProgressIndicator, { props: { value } });
    expect(linear.attributes('aria-valuenow')).toBe(String(expected));
    expect(linear.get('.md-linear-progress-indicator__indicator').element.style.width).toBe(`${expected}%`);
    expect(circular.attributes('value')).toBe(String(expected));
    expect(circular.element.style.getPropertyValue('--p')).toBe(String(expected));
    await linear.setProps({ indeterminate: true });
    await circular.setProps({ indeterminate: true });
    expect(linear.attributes('aria-valuenow')).toBeUndefined();
    expect(circular.attributes('value')).toBeUndefined();
  });
  it.each(['disabled', 'readonly'])('does not clear a %s search', async (state) => {
    const wrapper = mount(MdSearch, { props: { modelValue: 'Paris', [state]: true } });
    expect(wrapper.get('input').element[state === 'readonly' ? 'readOnly' : 'disabled']).toBe(true);
    expect(wrapper.get('.search-action--trailing').element.disabled).toBe(true);
    await wrapper.get('.search-action--trailing').trigger('click');
    expect(wrapper.get('input').element.value).toBe('Paris');
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    if (state === 'disabled') {
      expect(wrapper.get('.search-action--leading').element.disabled).toBe(true);
      await wrapper.get('.search-action--leading').trigger('click');
      expect(wrapper.emitted('searchClick')).toBeUndefined();
    }
    await wrapper.setProps({ [state]: false });
    await wrapper.get('.search-action--trailing').trigger('click');
    expect(wrapper.emitted('update:modelValue')).toEqual([['']]);
  });

  it('forwards search control attributes and names its icon actions', async () => {
    const wrapper = mount(MdSearch, { attrs: { id: 'query', name: 'query', required: true, 'aria-label': 'Find a city' } });
    expect(wrapper.get('input').attributes()).toMatchObject({ id: 'query', name: 'query', required: '', 'aria-label': 'Find a city' });
    expect(wrapper.get('button').attributes('aria-label')).toBe('Search');
    await wrapper.get('input').setValue('Paris');
    expect(wrapper.emitted('update:modelValue').at(-1)).toEqual(['Paris']);
    expect(wrapper.findAll('button')[1].attributes('aria-label')).toBe('Clear search');
  });
  it('hides decorative ligatures and exposes the current destination', () => {
    expect(mount(MdIcon, { slots: { default: 'search' } }).attributes('aria-hidden')).toBe('true');
    expect(mount(MdIcon, { attrs: { 'aria-label': 'Search' } }).attributes('role')).toBe('img');
    expect(mount(MdNavigationTab, { props: { selected: true, label: 'Home' } }).attributes('aria-current')).toBe('page');
  });
});
