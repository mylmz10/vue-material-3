import { afterEach, expect, it, vi } from 'vitest';
import { enableAutoUnmount, mount } from '@vue/test-utils';
import { h, nextTick, ref } from 'vue';
import Checkbox from '@/components/checkbox/MdCheckbox.vue';
import Radio from '@/components/radio/MdRadio.vue';
import FilledField from '@/components/text-field/MdFilledTextField.vue';
import OutlinedField from '@/components/text-field/MdOutlinedTextField.vue';
import FilledSelect from '@/components/select/MdFilledSelect.vue';
import OutlinedSelect from '@/components/select/MdOutlinedSelect.vue';
import Option from '@/components/select/MdSelectOption.vue';
import Slider from '@/components/slider/MdSlider.vue';
import FilledAuto from '@/components/autocomplete/MdFilledAutoComplete.vue';
import OutlinedAuto from '@/components/autocomplete/MdOutlinedAutoComplete.vue';
import Picker from '@/components/datepicker/MdDatePicker.vue';
import Tabs from '@/components/tabs/MdTabs.vue';
import Tab from '@/components/tabs/MdPrimaryTab.vue';
import ChipSet from '@/components/chips/MdChipSet.vue';
import Chip from '@/components/chips/MdFilterChip.vue';
import Carousel from '@/components/carousel/MdCarousel.vue';
import Segments from '@/components/segmented-button/MdSegmentedButtonSet.vue';
import Menu from '@/components/menu/MdMenu.vue';
import MenuItem from '@/components/menu/MdMenuItem.vue';
import Dialog from '@/components/dialog/MdDialog.vue';
import Tooltip from '@/components/tooltip/MdTooltip.vue';

enableAutoUnmount(afterEach);
afterEach(() => {
  vi.unstubAllGlobals();
  document.body.replaceChildren();
});
const settle = async () => {
  await nextTick();
  await nextTick();
  await nextTick();
};
const formFixture = () => {
  const form = document.createElement('form');
  document.body.append(form);
  return form;
};
const selectFixture = (component) => mount(component, { attachTo: document.body, slots: { default: () => ['a', 'b', 'c'].map((value) => h(Option, { value }, () => value)) } });

it('emits one checkbox model listener call for changes and resets', async () => {
  const listener = vi.fn();
  const form = formFixture();
  const wrapper = mount(Checkbox, { attachTo: form, props: { 'onUpdate:modelValue': listener } });
  await wrapper.get('input').setValue(true);
  expect(listener.mock.calls).toEqual([[true]]);
  form.reset();
  await settle();
  expect(listener.mock.calls).toEqual([[true], [false]]);
});

it('preserves uncontrolled radio selection across value changes', async () => {
  const wrapper = mount(Radio, { props: { value: 'a' } });
  await wrapper.get('input').setValue(true);
  await wrapper.setProps({ value: 'b' });
  expect(wrapper.get('input').element.checked).toBe(true);
  expect(wrapper.emitted('update:modelValue')).toEqual([['a']]);
});

it.each([FilledField, OutlinedField])('resets fields inside Shadow DOM and respects cancellation: %s', async (component) => {
  const host = document.createElement('div');
  document.body.append(host);
  const shadow = host.attachShadow({ mode: 'open' });
  const form = document.createElement('form');
  shadow.append(form);
  const wrapper = mount(component, { attachTo: form, props: { value: 'initial' } });
  await wrapper.get('input').setValue('edited');
  form.addEventListener('reset', (event) => event.preventDefault(), { once: true });
  form.reset();
  await settle();
  expect(wrapper.get('input').element.value).toBe('edited');
  form.reset();
  await settle();
  expect(wrapper.get('input').element.value).toBe('initial');
  expect(wrapper.emitted('update:modelValue').at(-1)).toEqual(['initial']);
});

it.each([FilledSelect, OutlinedSelect])('closes a disabled select and rejects stale keyboard events: %s', async (component) => {
  const wrapper = selectFixture(component);
  await wrapper.get('[role=combobox]').trigger('click');
  await settle();
  const list = wrapper.get('[role=listbox]');
  await wrapper.setProps({ disabled: true });
  await settle();
  expect(wrapper.get('[role=combobox]').attributes('aria-expanded')).toBe('false');
  await list.trigger('keydown', { key: 'End' });
  await list.trigger('keydown', { key: 'Enter' });
  expect(wrapper.emitted('update:modelValue')).toBeUndefined();
});

it.each([FilledSelect, OutlinedSelect])('selects a focused option exactly once with Enter or Space: %s', async (component) => {
  for (const key of ['Enter', ' ']) {
    const wrapper = selectFixture(component);
    await wrapper.get('[role=combobox]').trigger('click');
    await settle();
    await wrapper.findAll('[role=option]')[0].trigger('keydown', { key });
    for (const event of ['update:modelValue', 'input', 'change']) expect(wrapper.emitted(event)).toHaveLength(1);
  }
});

it('preserves a fractional slider step base and ticks', () => {
  const wrapper = mount(Slider, { props: { min: 0.5, max: 5.5, step: 1, modelValue: 0.5, ticks: true } });
  expect(wrapper.get('input').element.value).toBe('0.5');
  expect(wrapper.findAll('.md-slider__tick')[0].attributes('style')).toContain('left: 0%');
});

it.each([false, true])('restores slider form values without input/change events, range=%s', async (range) => {
  const form = formFixture();
  const wrapper = mount(Slider, { attachTo: form, props: { range, name: 'volume', value: 20, valueStart: 20, valueEnd: 80 } });
  const input = wrapper.findAll('input').at(-1);
  await input.setValue(70);
  const inputsBefore = wrapper.emitted('input')?.length;
  form.addEventListener('reset', (event) => event.preventDefault(), { once: true });
  form.reset();
  await settle();
  expect(input.element.value).toBe('70');
  form.reset();
  await settle();
  expect(wrapper.emitted('update:modelValue').at(-1)).toEqual([range ? { valueStart: 20, valueEnd: 80 } : 20]);
  expect(input.element.value).toBe(range ? '80' : '20');
  expect(wrapper.emitted('input')?.length).toBe(inputsBefore);
});

it.each([FilledAuto, OutlinedAuto])('resets autocomplete text and selection together, even while editing: %s', async (component) => {
  const form = formFixture();
  const wrapper = mount(component, { attachTo: form, props: { modelValue: 'a', items: ['a', 'b'], name: 'city' } });
  await wrapper.setProps({ modelValue: 'b' });
  await wrapper.get('input').setValue('draft');
  form.addEventListener('reset', (event) => event.preventDefault(), { once: true });
  form.reset();
  await settle();
  expect(wrapper.get('input').element.value).toBe('draft');
  expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  form.reset();
  await settle();
  expect(wrapper.get('input').element.value).toBe('a');
  expect(wrapper.emitted('update:modelValue')).toEqual([['a']]);
  expect(wrapper.get('input').attributes('aria-expanded')).toBe('false');
});

it.each(['Enter', ' '])('leaves DatePicker header %s activation to the native button', async (key) => {
  const wrapper = mount(Picker, { props: { variant: 'docked', modelValue: '2026-01-15' } });
  const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true });
  wrapper.get('[aria-label="Next month"]').element.dispatchEvent(event);
  expect(event.defaultPrevented).toBe(false);
  expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  await wrapper.get('[aria-label="Next month"]').trigger('click');
  expect(wrapper.find('[data-iso="2026-02-15"]').exists()).toBe(true);
});

it.each([
  ['Home', { min: '2026-01-15' }],
  ['End', { max: '2026-01-15' }],
])('keeps %s within allowed dates', async (key, bounds) => {
  const wrapper = mount(Picker, { props: { variant: 'docked', modelValue: '2026-01-15', ...bounds } });
  await wrapper.get('[data-iso="2026-01-15"]').trigger('keydown', { key });
  await wrapper.get('[data-iso="2026-01-15"]').trigger('keydown', { key: 'Enter' });
  expect(wrapper.emitted('update:modelValue')?.every(([value]) => value === '2026-01-15')).toBe(true);
});

it.each([false, true])('rejects modal drafts excluded by reactive constraints, range=%s', async (range) => {
  const wrapper = mount(Picker, { props: { variant: 'modal', open: true, selectionMode: range ? 'range' : 'single', modelValue: range ? { start: '2026-01-15', end: '2026-01-18' } : '2026-01-15' } });
  await settle();
  await wrapper.setProps({ min: '2026-02-01' });
  const ok = wrapper.findAll('button').find((button) => button.text() === 'OK');
  expect(ok.element.disabled).toBe(true);
  await ok.trigger('click');
  expect(wrapper.emitted('confirm')).toBeUndefined();
});

it('keeps an enabled DatePicker tab stop after constraints or disabled callbacks change', async () => {
  const wrapper = mount(Picker, { props: { variant: 'docked', modelValue: '2026-01-15' } });
  await settle();
  await wrapper.setProps({ min: '2026-01-16' });
  await settle();
  expect(wrapper.get('[data-iso="2026-01-16"]').attributes('tabindex')).toBe('0');
  await wrapper.setProps({ isDateDisabled: (value) => value === '2026-01-16' });
  await settle();
  expect(wrapper.get('[data-iso="2026-01-17"]').attributes('tabindex')).toBe('0');
});

it('keeps the selected tab identity after preceding tabs are removed together', async () => {
  const labels = ref(['A', 'B', 'C', 'D']);
  const wrapper = mount({ setup: () => () => h(Tabs, {}, () => labels.value.map((label) => h(Tab, { key: label, label }))) });
  await settle();
  await wrapper.findAll('[role=tab]')[2].trigger('click');
  labels.value = ['C', 'D'];
  await settle();
  expect(wrapper.findAll('[role=tab]')[0].attributes('aria-selected')).toBe('true');
});

it('synchronizes single chip toggle-off and toggle-on with its model', async () => {
  const selected = ref('a');
  const wrapper = mount({
    setup: () => () =>
      h(ChipSet, { modelValue: selected.value, 'onUpdate:modelValue': (value) => (selected.value = value) }, () => [h(Chip, { value: 'a', label: 'A' }), h(Chip, { value: 'b', label: 'B' })]),
  });
  await wrapper.get('[data-md-chip]').trigger('click');
  expect(selected.value).toBe(null);
  expect(wrapper.findAll('[aria-selected=true]')).toHaveLength(0);
  await wrapper.get('[data-md-chip]').trigger('click');
  expect(selected.value).toBe('a');
  expect(wrapper.get('[data-md-chip]').attributes('aria-selected')).toBe('true');
});

it.each(['items', 'resize'])('aligns delayed carousel acceptance after %s realignment', async (reason) => {
  let resize;
  vi.stubGlobal(
    'ResizeObserver',
    class {
      constructor(callback) {
        resize = callback;
      }
      observe() {}
      disconnect() {}
    }
  );
  const wrapper = mount(Carousel, { props: { items: ['A', 'B', 'C'], modelValue: 0 } });
  const viewport = wrapper.get('.md-carousel__viewport');
  viewport.element.scrollBy = vi.fn();
  wrapper.vm.select(1);
  if (reason === 'items') {
    await wrapper.setProps({ items: ['A', 'B', 'C', 'D'] });
    await settle();
  } else resize();
  viewport.element.scrollBy.mockClear();
  await wrapper.setProps({ modelValue: 1 });
  await settle();
  expect(viewport.element.scrollBy).toHaveBeenCalled();
});

it('invalidates a native-scroll acknowledgement when layout restores the old model', async () => {
  let resize;
  let frame;
  vi.stubGlobal(
    'ResizeObserver',
    class {
      constructor(callback) {
        resize = callback;
      }
      observe() {}
      disconnect() {}
    }
  );
  vi.stubGlobal('requestAnimationFrame', (callback) => {
    frame = callback;
    return 1;
  });
  vi.stubGlobal('cancelAnimationFrame', vi.fn());
  const wrapper = mount(Carousel, { props: { items: ['A', 'B', 'C'], modelValue: 0 } });
  const viewport = wrapper.get('.md-carousel__viewport');
  viewport.element.scrollBy = vi.fn();
  viewport.element.getBoundingClientRect = () => ({ left: 0, right: 320 });
  wrapper.findAll('.md-carousel__item').forEach((slide, index) => {
    slide.element.getBoundingClientRect = () => ({ left: (index - 1) * 320 + 4, right: (index - 1) * 320 + 324 });
  });
  await viewport.trigger('scroll');
  frame();
  expect(wrapper.emitted('update:modelValue')).toEqual([[1]]);
  resize();
  viewport.element.scrollBy.mockClear();
  await wrapper.setProps({ modelValue: 1 });
  await settle();
  expect(viewport.element.scrollBy).toHaveBeenCalled();
});

it('exposes segmented button selection to assistive technology', async () => {
  const wrapper = mount(Segments, { props: { modelValue: 0, items: [{ label: 'One' }, { label: 'Two' }] } });
  expect(wrapper.findAll('button').map((button) => button.attributes('aria-pressed'))).toEqual(['true', 'false']);
  await wrapper.setProps({ modelValue: 1 });
  expect(wrapper.findAll('button').map((button) => button.attributes('aria-pressed'))).toEqual(['false', 'true']);
});

it.each([true, false])('honors initial menu focus preference=%s', async (focusFirstItemOnOpen) => {
  const launcher = document.createElement('button');
  document.body.append(launcher);
  launcher.focus();
  const wrapper = mount(Menu, {
    attachTo: document.body,
    props: { modelValue: true, focusFirstItemOnOpen },
    slots: { default: () => [h(MenuItem, { label: 'Disabled', disabled: true }), h(MenuItem, { label: 'First' })] },
  });
  await settle();
  expect(document.activeElement).toBe(focusFirstItemOnOpen ? wrapper.findAll('[data-md-menu-item]')[1].element : launcher);
  expect(wrapper.emitted('update:modelValue')).toBeUndefined();
});

it('cancels queued modal menu opening on unmount', async () => {
  const dialog = document.createElement('dialog');
  document.body.append(dialog);
  const showPopover = vi.fn();
  const wrapper = mount(Menu, { attachTo: dialog, props: { modelValue: true } });
  wrapper.find('.md-menu__content').element.showPopover = showPopover;
  wrapper.unmount();
  await settle();
  expect(showPopover).not.toHaveBeenCalled();
});

it('keeps rich tooltip actions inside the native modal and its focus loop', async () => {
  const wrapper = mount(Dialog, {
    attachTo: document.body,
    props: { modelValue: true },
    slots: { default: () => [h('button', { id: 'first' }, 'First'), h(Tooltip, { modelValue: true, variant: 'rich', actionLabel: 'Action' }, () => h('button', {}, 'Trigger'))] },
  });
  await settle();
  const action = document.querySelector('.md-tooltip__action');
  expect(action.closest('dialog')).toBe(wrapper.get('dialog').element);
  action.focus();
  expect(document.activeElement).toBe(action);
  action.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true }));
  await settle();
  expect(document.activeElement.id).toBe('first');
  action.focus();
  action.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }));
  await settle();
  expect(wrapper.get('dialog').element.open).toBe(true);
  expect(document.querySelector('.md-tooltip__action')).toBe(null);
  expect(document.activeElement.textContent).toBe('Trigger');
});
