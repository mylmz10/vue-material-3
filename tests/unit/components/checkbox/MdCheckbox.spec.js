import { nextTick } from 'vue';
import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import MdCheckbox from '@/components/checkbox/MdCheckbox.vue';

describe('MdCheckbox', () => {
  it('emits input/change and update:modelValue when toggled', async () => {
    const wrapper = mount(MdCheckbox, {
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
    form.id = 'checkbox-form';
    document.body.appendChild(form);

    const wrapper = mount(MdCheckbox, {
      attachTo: document.body,
      props: {
        checked: true,
        form: 'checkbox-form',
        name: 'terms',
        value: 'yes',
      },
    });

    await nextTick();

    expect(new FormData(form).get('terms')).toBe('yes');

    wrapper.unmount();
    form.remove();
  });

  it('restores initial state on form reset', async () => {
    const form = document.createElement('form');
    form.id = 'checkbox-reset-form';
    document.body.appendChild(form);

    const wrapper = mount(MdCheckbox, {
      attachTo: document.body,
      props: {
        checked: true,
        form: 'checkbox-reset-form',
        name: 'newsletter',
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
    const wrapper = mount(MdCheckbox, {
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
