import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import MdTimePickerField from '@/components/timepicker/MdTimePickerField.vue';
import MdFilledTimePickerField from '@/components/timepicker/MdFilledTimePickerField.vue';
import MdOutlinedTimePickerField from '@/components/timepicker/MdOutlinedTimePickerField.vue';

const findButtonByText = (wrapper, text) => wrapper.findAll('button').find((button) => button.text().includes(text));

describe('MdTimePickerField', () => {
  it('requires a committed time in the associated external form', async () => {
    const form = document.createElement('form');
    form.id = 'time-picker-required-form';
    document.body.append(form);
    const wrapper = mount(MdTimePickerField, {
      attachTo: document.body,
      props: { required: true },
      attrs: { form: form.id, name: 'time' },
    });
    try {
      expect(form.reportValidity()).toBe(false);
      expect(document.activeElement).toBe(wrapper.get('input[name="time"]').element);
      await wrapper.setProps({ modelValue: '00:00' });
      expect(form.checkValidity()).toBe(true);
      expect(new FormData(form).getAll('time')).toHaveLength(1);
      const selectedTime = new FormData(form).get('time');
      form.reset();
      await nextTick();
      await nextTick();
      await nextTick();
      await nextTick();
      expect(wrapper.emitted('update:modelValue')).toEqual([[null]]);
      expect(form.checkValidity()).toBe(true);
      expect(new FormData(form).get('time')).toBe(selectedTime);
      await wrapper.setProps({ modelValue: null, disabled: true });
      expect(form.checkValidity()).toBe(true);
      expect(new FormData(form).has('time')).toBe(false);
    } finally {
      wrapper.unmount();
      form.remove();
    }
  });

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

  it('renders the filled wrapper with the filled text field surface', () => {
    const wrapper = mount(MdFilledTimePickerField, {
      props: {
        modelValue: '07:00',
      },
    });

    expect(wrapper.find('.md-filled-text-field').exists()).toBe(true);
  });

  it('renders the outlined wrapper with the outlined text field surface', () => {
    const wrapper = mount(MdOutlinedTimePickerField, {
      props: {
        modelValue: '07:00',
      },
    });

    expect(wrapper.find('.md-outlined-text-field').exists()).toBe(true);
  });
});
