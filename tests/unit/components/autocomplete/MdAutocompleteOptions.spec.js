import { afterEach, describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Filled from '@/components/autocomplete/MdFilledAutoComplete.vue';
import Outlined from '@/components/autocomplete/MdOutlinedAutoComplete.vue';

const settle = async () => {
  await nextTick();
  await nextTick();
  await nextTick();
};

describe.each([
  ['filled', Filled],
  ['outlined', Outlined],
])('%s autocomplete options', (_, component) => {
  let wrapper;
  let form;
  const render = (props = {}) => {
    form = document.createElement('form');
    document.body.appendChild(form);
    wrapper = mount(component, { attachTo: form, props: { label: 'User', ...props } });
    return wrapper.get('input');
  };
  afterEach(() => {
    wrapper?.unmount();
    form?.remove();
    vi.useRealTimers();
  });

  it('shows labels but commits numeric IDs even when labels repeat', async () => {
    const input = render({
      items: [
        { value: 1, label: 'Alex' },
        { value: 2, label: 'Alex' },
      ],
      modelValue: 1,
    });
    expect(input.element.value).toBe('Alex');
    await input.trigger('focus');
    await wrapper.findAll('[role="option"]')[1].trigger('click');
    expect(wrapper.emitted('update:modelValue')).toEqual([[2]]);
    expect(input.element.value).toBe('Alex');
  });

  it('preserves object identity, number items and falsy values', async () => {
    const value = { id: 3 };
    const input = render({ items: [{ value, label: 'User object' }, 0, { value: false, label: 'No' }], modelValue: value });
    expect(input.element.value).toBe('User object');
    await input.trigger('focus');
    await wrapper.findAll('[role="option"]')[0].trigger('click');
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe(value);
    await wrapper.setProps({ modelValue: 0 });
    expect(input.element.value).toBe('0');
    await wrapper.setProps({ modelValue: false });
    expect(input.element.value).toBe('No');
  });

  it('skips disabled options and rejects clicks and stale Enter after disabling', async () => {
    const items = [
      { value: 1, label: 'Disabled', disabled: true },
      { value: 2, label: 'Enabled' },
      { value: 3, label: 'Last', disabled: true },
    ];
    const input = render({ items });
    input.element.focus();
    await settle();
    await wrapper.get('[aria-disabled="true"]').trigger('click');
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    await input.trigger('keydown', { key: 'ArrowDown' });
    expect(document.getElementById(input.attributes('aria-activedescendant')).textContent).toContain('Enabled');
    items[1].disabled = true;
    await wrapper.setProps({ items: [...items] });
    await input.trigger('keydown', { key: 'Enter' });
    await input.trigger('keydown', { key: 'ArrowUp' });
    expect(input.attributes('aria-activedescendant')).toBeUndefined();
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('filters immediately and debounces only the external search event', async () => {
    vi.useFakeTimers();
    const input = render({ items: ['Apple', 'Banana'], debounce: 100 });
    await input.trigger('focus');
    await input.setValue('ban');
    expect(input.element.value).toBe('ban');
    expect(wrapper.emitted('update:search').at(-1)).toEqual(['ban']);
    expect(wrapper.findAll('[role="option"]').map((option) => option.text())).toEqual(['Banana']);
    expect(wrapper.emitted('debounced')).toBeUndefined();
    await vi.advanceTimersByTimeAsync(100);
    expect(wrapper.emitted('debounced')).toEqual([['ban']]);
    await wrapper.get('[role="option"]').trigger('click');
    expect(wrapper.emitted('update:modelValue')).toEqual([['Banana']]);
    await input.trigger('focus');
    await input.setValue('pending');
    await input.trigger('keydown', { key: 'Escape' });
    await vi.runAllTimersAsync();
    expect(wrapper.emitted('debounced')).toEqual([['ban']]);
  });

  it('keeps the committed value on blur or Tab and reopens with one click', async () => {
    const input = render({ items: ['Apple', 'Banana'], modelValue: 'Apple' });
    await input.trigger('focus');
    await input.setValue('ban');
    await input.trigger('blur');
    expect(input.element.value).toBe('Apple');
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    await input.trigger('click');
    expect(input.attributes('aria-expanded')).toBe('true');
    await input.setValue('ban');
    await input.trigger('keydown', { key: 'Tab' });
    expect(input.element.value).toBe('Apple');
    expect(input.attributes('aria-expanded')).toBe('false');
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('clears once, resets to the initial value/label and honors canceled resets', async () => {
    const input = render({
      items: [
        { value: 1, label: 'First' },
        { value: 2, label: 'Second' },
      ],
      modelValue: 1,
      clearable: true,
    });
    await wrapper.get('button[aria-label="Clear selection"]').trigger('click');
    expect(wrapper.emitted('update:modelValue')).toEqual([[null]]);
    expect(input.element.value).toBe('');
    await wrapper.setProps({ modelValue: 2 });
    form.addEventListener('reset', (event) => event.preventDefault(), { once: true });
    form.reset();
    await settle();
    expect(input.element.value).toBe('Second');
    form.reset();
    await settle();
    expect(input.element.value).toBe('First');
    expect(wrapper.emitted('update:modelValue').at(-1)).toEqual([1]);
  });

  it('preserves the consumer accessible name on both input and listbox', async () => {
    const input = render({ items: ['Apple'], 'aria-label': 'Choose user' });
    await input.trigger('focus');
    expect(input.attributes('aria-label')).toBe('Choose user');
    expect(wrapper.get('[role="listbox"]').attributes('aria-label')).toBe('Choose user');
    await wrapper.setProps({ 'aria-labelledby': 'external-user-label' });
    expect(wrapper.get('[role="listbox"]').attributes('aria-labelledby')).toBe('external-user-label');
  });

  it('resolves updated labels and cancels pending filtering when the model changes', async () => {
    vi.useFakeTimers();
    const input = render({
      items: [
        { value: 1, label: 'First' },
        { value: 2, label: 'Second' },
      ],
      modelValue: 1,
      debounce: 100,
    });
    await wrapper.setProps({
      items: [
        { value: 1, label: 'Renamed' },
        { value: 2, label: 'Second' },
      ],
    });
    expect(input.element.value).toBe('Renamed');
    await input.setValue('draft');
    await wrapper.setProps({ modelValue: 2 });
    await vi.runAllTimersAsync();
    expect(input.element.value).toBe('Second');
    expect(wrapper.emitted('debounced')).toBeUndefined();
    expect(wrapper.findAll('[role="option"]')).toHaveLength(2);
  });

  it('renders custom empty text and ignores malformed options', async () => {
    const input = render({ items: [null, {}, { value: 1 }, 'Apple'], noResultsText: 'Sonuç yok' });
    await input.trigger('focus');
    await input.setValue('zzz');
    expect(wrapper.findAll('[role="option"]')).toHaveLength(0);
    expect(wrapper.text()).toContain('Sonuç yok');
  });

  it.each(['disabled', 'readonly'])('does not clear or open while %s', async (state) => {
    const input = render({ items: ['Apple'], modelValue: 'Apple', mode: 'modal', clearable: true, [state]: true });
    await input.trigger('click');
    await input.trigger('keydown', { key: 'ArrowDown' });
    expect(wrapper.find('dialog[open]').exists()).toBe(false);
    expect(wrapper.find('button[aria-label="Clear selection"]').exists()).toBe(false);
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('opens a modal with a focused search input and restores focus without reopening', async () => {
    const input = render({
      items: [
        { value: 1, label: 'Apple' },
        { value: 2, label: 'Banana' },
      ],
      modelValue: 1,
      mode: 'modal',
    });
    input.element.focus();
    await input.trigger('click');
    await settle();
    const search = wrapper.get('dialog input');
    expect(document.activeElement).toBe(search.element);
    expect(search.element.value).toBe('');
    expect(wrapper.get('dialog [role="option"][aria-selected="true"]').text()).toContain('Apple');
    expect(input.attributes('aria-haspopup')).toBe('dialog');
    await search.setValue('ban');
    await search.trigger('keydown', { key: 'ArrowDown' });
    await search.trigger('keydown', { key: 'Enter' });
    await settle();
    expect(wrapper.emitted('update:modelValue')).toEqual([[2]]);
    expect(input.element.value).toBe('Banana');
    expect(wrapper.find('dialog[open]').exists()).toBe(false);
    expect(document.activeElement).toBe(input.element);
    await input.trigger('keydown', { key: 'ArrowDown' });
    await settle();
    await wrapper.get('dialog input').setValue('draft');
    await wrapper.get('dialog input').trigger('keydown', { key: 'Escape' });
    await settle();
    expect(input.element.value).toBe('Banana');
    expect(wrapper.emitted('update:modelValue')).toEqual([[2]]);
    expect(wrapper.find('dialog[open]').exists()).toBe(false);
    expect(document.activeElement).toBe(input.element);
  });

  it('cancels pending work on disable and unmount', async () => {
    vi.useFakeTimers();
    const input = render({ items: ['Apple'], debounce: 100 });
    await input.setValue('ap');
    await wrapper.setProps({ disabled: true });
    await vi.advanceTimersByTimeAsync(100);
    expect(wrapper.emitted('debounced')).toBeUndefined();
    await wrapper.setProps({ disabled: false });
    await input.setValue('app');
    wrapper.unmount();
    await vi.runAllTimersAsync();
    expect(wrapper.emitted('debounced')).toBeUndefined();
  });
});
