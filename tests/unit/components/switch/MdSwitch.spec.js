import { nextTick } from 'vue';
import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import MdSwitch from '@/components/switch/MdSwitch.vue';

describe('MdSwitch', () => {
  it('emits input/change and update:modelValue when toggled', async () => {
    const wrapper = mount(MdSwitch, {
      props: {
        modelValue: false,
      },
    });

    await wrapper.get('input').setValue(true);

    expect(wrapper.emitted('input')).toEqual([[true]]);
    expect(wrapper.emitted('change')).toEqual([[true]]);
    expect(wrapper.emitted('update:modelValue')).toEqual([[true]]);
  });

  it('serializes with form data when checked', async () => {
    const form = document.createElement('form');
    form.id = 'switch-form';
    document.body.appendChild(form);

    const wrapper = mount(MdSwitch, {
      attachTo: document.body,
      props: {
        checked: true,
        form: 'switch-form',
        name: 'alerts',
        value: 'enabled',
      },
    });

    await nextTick();

    expect(new FormData(form).get('alerts')).toBe('enabled');

    wrapper.unmount();
    form.remove();
  });

  it('restores initial state on form reset', async () => {
    const form = document.createElement('form');
    form.id = 'switch-reset-form';
    document.body.appendChild(form);

    const wrapper = mount(MdSwitch, {
      attachTo: document.body,
      props: {
        checked: true,
        form: 'switch-reset-form',
        name: 'push',
      },
    });

    const input = wrapper.get('input');

    await input.setValue(false);
    expect(input.element.checked).toBe(false);

    form.reset();
    await nextTick();

    expect(input.element.checked).toBe(true);
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([true]);

    wrapper.unmount();
    form.remove();
  });

  it('does not update when readonly', async () => {
    const wrapper = mount(MdSwitch, {
      props: {
        modelValue: true,
        readonly: true,
      },
    });

    const input = wrapper.get('input');
    input.element.checked = false;
    await input.trigger('change');

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    expect(input.element.checked).toBe(true);
  });
});
