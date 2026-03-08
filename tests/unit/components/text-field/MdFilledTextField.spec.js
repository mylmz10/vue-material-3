import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import MdFilledTextField from '@/components/text-field/MdFilledTextField.vue';

describe('MdFilledTextField', () => {
  it('renders supporting text and swaps to error text in error state', async () => {
    const wrapper = mount(MdFilledTextField, {
      props: {
        label: 'Amount',
        supportingText: 'Enter amount',
      },
    });

    expect(wrapper.text()).toContain('Enter amount');

    await wrapper.setProps({ error: true, errorText: 'Invalid amount' });
    expect(wrapper.text()).toContain('Invalid amount');
  });

  it('renders prefix and suffix props when value is populated', () => {
    const wrapper = mount(MdFilledTextField, {
      props: {
        label: 'Amount',
        modelValue: '10',
        prefix: '$',
        suffix: 'USD',
      },
    });

    expect(wrapper.text()).toContain('$');
    expect(wrapper.text()).toContain('USD');
  });

  it('does not render prefix when value is empty', () => {
    const wrapper = mount(MdFilledTextField, {
      props: {
        label: 'Amount',
        modelValue: '',
        prefix: '$',
      },
    });

    expect(wrapper.text()).not.toContain('$');
  });

  it('renders prefix on focus even when value is empty', async () => {
    const wrapper = mount(MdFilledTextField, {
      props: {
        label: 'Amount',
        modelValue: '',
        prefix: '$',
      },
    });

    expect(wrapper.text()).not.toContain('$');

    const input = wrapper.get('input');
    await input.trigger('focus');
    expect(wrapper.text()).toContain('$');

    await input.trigger('blur');
    expect(wrapper.text()).not.toContain('$');
  });

  it('emits v-model/input and supports reset from associated form', async () => {
    const form = document.createElement('form');
    form.id = 'price-form';
    document.body.appendChild(form);

    const wrapper = mount(MdFilledTextField, {
      attachTo: document.body,
      props: {
        label: 'Amount',
        form: 'price-form',
        name: 'amount',
        modelValue: '10',
      },
    });

    const input = wrapper.get('input');
    expect(input.attributes('name')).toBe('amount');

    await input.setValue('25');

    const emittedUpdates = wrapper.emitted('update:modelValue') || [];
    expect(emittedUpdates[0]).toEqual(['25']);
    expect(wrapper.emitted('input')?.[0]).toEqual(['25']);

    form.dispatchEvent(new Event('reset'));
    await nextTick();

    const latestUpdate = (wrapper.emitted('update:modelValue') || []).at(-1);
    expect(latestUpdate).toEqual(['10']);

    wrapper.unmount();
    form.remove();
  });
});
