import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import MdTimePickerField from '@/components/timepicker/MdTimePickerField.vue';

const findButtonByText = (wrapper, text) => wrapper.findAll('button').find((button) => button.text().includes(text));

describe('MdTimePickerField', () => {
  it('opens the modal and confirms a dial selection', async () => {
    const wrapper = mount(MdTimePickerField, {
      attachTo: document.body,
      props: {
        modelValue: '07:00',
      },
    });

    await wrapper.get('.md-time-picker-field__control').trigger('click');
    await wrapper.get('[data-dial-value="9"]').trigger('click');
    await wrapper.get('[data-dial-value="30"]').trigger('click');
    await findButtonByText(wrapper, 'OK').trigger('click');

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['09:30']);
  });

  it('opens the input variant and confirms typed values', async () => {
    const wrapper = mount(MdTimePickerField, {
      attachTo: document.body,
      props: {
        entryMode: 'input',
        modelValue: '07:00',
      },
    });

    await wrapper.get('.md-time-picker-field__control').trigger('click');
    await wrapper.get('[data-input="hour"]').setValue('10');
    await wrapper.get('[data-input="minute"]').setValue('15');
    await wrapper.get('[data-period="PM"]').trigger('click');
    await findButtonByText(wrapper, 'OK').trigger('click');

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['22:15']);
  });

  it('formats and confirms values in 24-hour mode', async () => {
    const wrapper = mount(MdTimePickerField, {
      attachTo: document.body,
      props: {
        hourCycle: 24,
        modelValue: '20:15',
      },
    });

    expect(wrapper.get('.md-text-field__input').element.value).toBe('20:15');

    await wrapper.get('.md-time-picker-field__control').trigger('click');
    expect(wrapper.find('[data-period="AM"]').exists()).toBe(false);
    await wrapper.get('[data-dial-value="21"]').trigger('click');
    await wrapper.get('[data-dial-value="30"]').trigger('click');
    await findButtonByText(wrapper, 'OK').trigger('click');

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['21:30']);
  });
});
