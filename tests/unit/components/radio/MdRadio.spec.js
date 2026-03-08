import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import MdRadio from '@/components/radio/MdRadio.vue';

describe('MdRadio', () => {
  it('applies checked class when modelValue equals value', () => {
    const wrapper = mount(MdRadio, {
      props: {
        value: '1',
        modelValue: '1',
      },
    });

    expect(wrapper.classes()).toContain('md-radio--checked');
  });

  it('emits update:modelValue on change', async () => {
    const wrapper = mount(MdRadio, {
      props: {
        value: '2',
        modelValue: '1',
      },
    });

    await wrapper.get('input').trigger('change');

    expect(wrapper.emitted('update:modelValue')).toEqual([['2']]);
  });

  it('does not emit when disabled', async () => {
    const wrapper = mount(MdRadio, {
      props: {
        value: '2',
        modelValue: '1',
        disabled: true,
      },
    });

    await wrapper.get('input').trigger('change');

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });
});
