import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import MdDatePicker from '@/components/datepicker/MdDatePicker.vue';

describe('MdDatePicker', () => {
  it('renders actions and emits selected date on confirm', async () => {
    const wrapper = mount(MdDatePicker, {
      props: {
        modelValue: '2026-03-14',
        format: 'YYYY-MM-DD',
      },
    });

    const buttons = wrapper.findAll('button');
    const okButton = buttons.find((button) => button.text().includes('OK'));

    expect(okButton).toBeTruthy();

    await okButton.trigger('click');
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['2026-03-14']);
  });
});
