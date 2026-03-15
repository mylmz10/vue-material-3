import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import MdOutlinedTextField from '@/components/text-field/MdOutlinedTextField.vue';

describe('MdOutlinedTextField', () => {
  it('renders supporting text and error text', async () => {
    const wrapper = mount(MdOutlinedTextField, {
      props: {
        label: 'Amount',
        supportingText: 'Enter amount',
      },
    });

    expect(wrapper.text()).toContain('Enter amount');

    await wrapper.setProps({ error: true, errorText: 'Invalid amount' });
    expect(wrapper.text()).toContain('Invalid amount');
  });

  it('renders prefix on focus when value is empty', async () => {
    const wrapper = mount(MdOutlinedTextField, {
      props: {
        label: 'Amount',
        prefix: '$',
        modelValue: '',
      },
    });

    expect(wrapper.text()).not.toContain('$');

    const input = wrapper.get('input');
    await input.trigger('focus');
    expect(wrapper.text()).toContain('$');
  });

  it('supports reset from associated form', async () => {
    const form = document.createElement('form');
    form.id = 'outlined-form';
    document.body.appendChild(form);

    const wrapper = mount(MdOutlinedTextField, {
      attachTo: document.body,
      props: {
        label: 'Amount',
        form: 'outlined-form',
        modelValue: '12',
      },
    });

    await wrapper.get('input').setValue('99');
    form.dispatchEvent(new Event('reset'));
    await nextTick();

    expect((wrapper.emitted('update:modelValue') || []).at(-1)).toEqual(['12']);

    wrapper.unmount();
    form.remove();
  });
});
