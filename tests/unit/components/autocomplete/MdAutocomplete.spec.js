import { afterEach, describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import MdFilledAutoComplete from '@/components/autocomplete/MdFilledAutoComplete.vue';
import MdOutlinedAutoComplete from '@/components/autocomplete/MdOutlinedAutoComplete.vue';

describe('autocomplete components', () => {
  describe.each([
    ['filled', MdFilledAutoComplete],
    ['outlined', MdOutlinedAutoComplete],
  ])('%s filtered selection', (_, component) => {
    it.each(['Apple', 'Banana', 'Papaya'])('emits the clicked suggestion %s after filtering', async (selected) => {
      const wrapper = mount(component, {
        props: { items: ['Cherry', 'Apple', 'Banana', 'Papaya'] },
      });

      await wrapper.get('input').trigger('focus');
      await wrapper.get('input').setValue('a');
      const suggestions = wrapper.findAll('.md-list-item');
      expect(suggestions.map((item) => item.text())).toEqual(['Apple', 'Banana', 'Papaya']);

      await suggestions.find((item) => item.text() === selected).trigger('click');

      expect(wrapper.emitted('update:modelValue')).toEqual([[selected]]);
      expect(wrapper.get('input').element.value).toBe(selected);
      expect(wrapper.get('.md-menu').classes()).not.toContain('md-menu--open');
      wrapper.unmount();
    });
  });

  describe.each([
    ['filled', MdFilledAutoComplete],
    ['outlined', MdOutlinedAutoComplete],
  ])('%s keyboard selection', (_, component) => {
    let wrapper;
    const render = (props = {}) => {
      wrapper = mount(component, { attachTo: document.body, props: { label: 'Fruit', items: ['Cherry', 'Apple', 'Banana', 'Papaya'], ...props } });
      return wrapper.get('input');
    };
    afterEach(() => wrapper?.unmount());

    it('connects combobox and listbox and selects the second filtered result without moving focus', async () => {
      const input = render();
      expect(input.attributes('role')).toBe('combobox');
      expect(input.attributes('aria-expanded')).toBe('false');
      input.element.focus();
      await nextTick();
      await input.setValue('a');
      const listbox = wrapper.get('[role="listbox"]');
      expect(input.attributes('aria-controls')).toBe(listbox.attributes('id'));
      expect(input.attributes('aria-expanded')).toBe('true');
      expect(wrapper.find('[role="menu"]').exists()).toBe(false);
      await input.trigger('keydown', { key: 'ArrowDown' });
      await input.trigger('keydown', { key: 'ArrowDown' });
      const active = document.getElementById(input.attributes('aria-activedescendant'));
      expect(active.textContent.trim()).toBe('Banana');
      expect(active.getAttribute('aria-selected')).toBe('true');
      expect(wrapper.findAll('[role="option"][aria-selected="true"]')).toHaveLength(1);
      expect(document.activeElement).toBe(input.element);
      await input.trigger('keydown', { key: 'Enter' });
      expect(wrapper.emitted('update:modelValue')).toEqual([['Banana']]);
      expect(input.element.value).toBe('Banana');
      expect(input.attributes('aria-expanded')).toBe('false');
      expect(input.attributes('aria-activedescendant')).toBeUndefined();
      expect(document.activeElement).toBe(input.element);
    });

    it('opens upward at the last option after restoring the full selected list', async () => {
      const input = render({ modelValue: 'Banana' });
      input.element.focus();
      await nextTick();
      await input.trigger('keydown', { key: 'Escape' });
      await input.trigger('keydown', { key: 'ArrowUp' });
      expect(document.getElementById(input.attributes('aria-activedescendant')).textContent.trim()).toBe('Papaya');
      await input.trigger('keydown', { key: 'ArrowUp' });
      expect(document.getElementById(input.attributes('aria-activedescendant')).textContent.trim()).toBe('Banana');
    });

    it('dismisses with Escape without replacing the committed value and reopens on typing', async () => {
      const input = render({ modelValue: 'Apple' });
      input.element.focus();
      await nextTick();
      await input.setValue('a');
      await input.trigger('keydown', { key: 'ArrowDown' });
      await input.trigger('keydown', { key: 'Escape' });
      expect(input.attributes('aria-expanded')).toBe('false');
      expect(input.element.value).toBe('Apple');
      expect(wrapper.emitted('update:modelValue')).toBeUndefined();
      expect(document.activeElement).toBe(input.element);
      await input.setValue('b');
      expect(input.attributes('aria-expanded')).toBe('true');
      expect(input.attributes('aria-activedescendant')).toBeUndefined();
    });

    it('resets stale active options on query, items and model changes', async () => {
      const input = render();
      input.element.focus();
      await nextTick();
      await input.trigger('keydown', { key: 'ArrowDown' });
      await input.setValue('zz');
      expect(input.attributes('aria-activedescendant')).toBeUndefined();
      expect(wrapper.findAll('[role="option"]')).toHaveLength(0);
      expect(wrapper.get('.md-list-item').attributes('role')).toBe('presentation');
      await input.trigger('keydown', { key: 'ArrowDown' });
      await input.trigger('keydown', { key: 'Enter' });
      expect(wrapper.emitted('update:modelValue')).toBeUndefined();
      await input.setValue('a');
      await input.trigger('keydown', { key: 'ArrowDown' });
      await wrapper.setProps({ items: ['Apricot'] });
      expect(input.attributes('aria-activedescendant')).toBeUndefined();
      await input.trigger('keydown', { key: 'ArrowDown' });
      await wrapper.setProps({ modelValue: 'Apricot' });
      expect(input.attributes('aria-activedescendant')).toBeUndefined();
    });

    it('resets navigation when the existing items array changes', async () => {
      const input = render();
      input.element.focus();
      await nextTick();
      await input.trigger('keydown', { key: 'ArrowUp' });
      wrapper.props('items').splice(0);
      await nextTick();
      expect(input.attributes('aria-activedescendant')).toBeUndefined();
      await input.trigger('keydown', { key: 'Enter' });
      expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    });

    it('ignores IME Enter and leaves native editing keys and Tab unblocked', async () => {
      const input = render();
      input.element.focus();
      await nextTick();
      await input.trigger('keydown', { key: 'ArrowDown' });
      await input.trigger('keydown', { key: 'Enter', isComposing: true });
      expect(wrapper.emitted('update:modelValue')).toBeUndefined();
      for (const key of ['Home', 'End', 'ArrowLeft', 'ArrowRight', 'Tab']) {
        const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true });
        input.element.dispatchEvent(event);
        expect(event.defaultPrevented).toBe(false);
      }
      await nextTick();
      expect(input.attributes('aria-expanded')).toBe('false');
      expect(document.activeElement).toBe(input.element);
    });

    it('keeps pointer selection focused and closes on blur without restoring focus', async () => {
      const input = render();
      input.element.focus();
      await nextTick();
      const option = wrapper.get('[role="option"]');
      const event = new MouseEvent('mousedown', { bubbles: true, cancelable: true });
      option.element.dispatchEvent(event);
      expect(event.defaultPrevented).toBe(true);
      await option.trigger('click');
      expect(document.activeElement).toBe(input.element);
      await input.trigger('keydown', { key: 'ArrowDown' });
      const outside = document.createElement('button');
      document.body.appendChild(outside);
      outside.focus();
      await nextTick();
      await nextTick();
      expect(input.attributes('aria-expanded')).toBe('false');
      expect(document.activeElement).toBe(outside);
      outside.remove();
    });

    it.each(['disabled', 'readonly'])('does not open or select when %s', async (state) => {
      const input = render({ [state]: true });
      await input.trigger('focus');
      await input.trigger('keydown', { key: 'ArrowDown' });
      await input.trigger('keydown', { key: 'Enter' });
      expect(input.attributes('aria-expanded')).toBe('false');
      expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    });
  });

  it('filters filled autocomplete items and emits search updates', async () => {
    const wrapper = mount(MdFilledAutoComplete, {
      props: {
        items: ['Istanbul', 'Ankara', 'Izmir'],
        label: 'City',
      },
    });

    const input = wrapper.get('input');
    await input.trigger('focus');
    await input.setValue('an');
    await nextTick();

    expect(wrapper.emitted('update:search')?.at(-1)).toEqual(['an']);
    expect(wrapper.text()).toContain('Ankara');
  });

  it('renders empty state for outlined autocomplete', async () => {
    const wrapper = mount(MdOutlinedAutoComplete, {
      props: {
        items: [],
        label: 'City',
      },
    });

    await wrapper.get('input').trigger('focus');
    await nextTick();

    expect(wrapper.text()).toContain('No data available');
  });

  it('handles omitted items and external model updates', async () => {
    const wrapper = mount(MdFilledAutoComplete, {
      props: {
        label: 'City',
      },
    });

    expect(wrapper.text()).toContain('No data available');

    await wrapper.setProps({ modelValue: 'Izmir' });
    expect(wrapper.get('input').element.value).toBe('Izmir');
  });

  it('ignores non-string suggestions while filtering', async () => {
    const wrapper = mount(MdFilledAutoComplete, {
      props: { items: ['Ankara', 1, null] },
    });

    await wrapper.get('input').trigger('focus');
    await wrapper.get('input').setValue('an');

    expect(wrapper.text()).toContain('Ankara');
  });
});
