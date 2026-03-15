import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import MdDatePickerField from '@/components/datepicker/MdDatePickerField.vue';

const findButtonByText = (wrapper, text) => wrapper.findAll('button').find((button) => button.text().includes(text));

describe('MdDatePickerField', () => {
  it('opens the docked picker and commits the selected date', async () => {
    const wrapper = mount(MdDatePickerField, {
      attachTo: document.body,
      props: {
        modelValue: '2026-03-14',
        pickerVariant: 'docked',
      },
    });

    await wrapper.get('.md-date-picker-field__control').trigger('click');
    await wrapper.get('[data-iso="2026-03-18"]').trigger('click');

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['2026-03-18']);
  });

  it('emits invalid-input for invalid manual values in docked mode', async () => {
    const wrapper = mount(MdDatePickerField, {
      props: {
        modelValue: '2026-03-14',
        pickerVariant: 'docked',
      },
    });

    const input = wrapper.get('input');
    await input.setValue('not-a-date');
    await input.trigger('change');

    expect(wrapper.emitted('invalid-input')?.at(-1)).toEqual(['not-a-date']);
  });

  it('rejects manual values outside the allowed range', async () => {
    const wrapper = mount(MdDatePickerField, {
      props: {
        min: '2026-03-10',
        max: '2026-03-20',
        modelValue: '2026-03-14',
        pickerVariant: 'docked',
      },
    });

    const input = wrapper.get('input');
    await input.setValue('03/25/2026');
    await input.trigger('change');

    expect(wrapper.emitted('invalid-input')?.at(-1)).toEqual(['03/25/2026']);
  });

  it('opens the modal field variant and confirms the selected date', async () => {
    const wrapper = mount(MdDatePickerField, {
      attachTo: document.body,
      props: {
        modelValue: '2026-03-14',
        pickerVariant: 'modal',
      },
    });

    await wrapper.get('.md-date-picker-field__control').trigger('click');
    await wrapper.get('[data-iso="2026-03-18"]').trigger('click');
    await findButtonByText(wrapper, 'OK').trigger('click');

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['2026-03-18']);
  });

  it('forwards invalid-input from the modal input variant', async () => {
    const wrapper = mount(MdDatePickerField, {
      attachTo: document.body,
      props: {
        modelValue: '2026-03-14',
        pickerVariant: 'modal-input',
      },
    });

    await wrapper.get('.md-date-picker-field__control').trigger('click');

    const input = wrapper.get('.md-date-picker__input-panel input');
    await input.setValue('not-a-date');
    await input.trigger('change');

    expect(wrapper.emitted('invalid-input')?.at(-1)).toEqual(['not-a-date']);
  });

  it('commits a selected range when selectionMode is range', async () => {
    const wrapper = mount(MdDatePickerField, {
      attachTo: document.body,
      props: {
        modelValue: {
          start: null,
          end: null,
        },
        pickerVariant: 'docked',
        selectionMode: 'range',
      },
    });

    await wrapper.get('.md-date-picker-field__control').trigger('click');
    await wrapper.get('[data-iso="2026-03-14"]').trigger('click');
    await wrapper.get('[data-iso="2026-03-20"]').trigger('click');

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([{
      start: '2026-03-14',
      end: '2026-03-20',
    }]);
  });

  it('opens the modal field variant and confirms the selected range when selectionMode is range', async () => {
    const wrapper = mount(MdDatePickerField, {
      attachTo: document.body,
      props: {
        modelValue: {
          start: '2026-03-14',
          end: '2026-03-21',
        },
        pickerVariant: 'modal',
        selectionMode: 'range',
      },
    });

    await wrapper.get('.md-date-picker-field__control').trigger('click');
    await wrapper.get('[data-iso="2026-03-18"]').trigger('click');
    await wrapper.get('[data-iso="2026-03-23"]').trigger('click');
    await findButtonByText(wrapper, 'OK').trigger('click');

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([{
      start: '2026-03-18',
      end: '2026-03-23',
    }]);
  });

  it('emits invalid-input for invalid manual range values when selectionMode is range', async () => {
    const wrapper = mount(MdDatePickerField, {
      props: {
        modelValue: {
          start: '2026-03-14',
          end: '2026-03-21',
        },
        pickerVariant: 'docked',
        selectionMode: 'range',
      },
    });

    const input = wrapper.get('input');
    await input.setValue('not-a-range');
    await input.trigger('change');

    expect(wrapper.emitted('invalid-input')?.at(-1)).toEqual(['not-a-range']);
  });

  it('forwards invalid-input from the modal input variant when selectionMode is range', async () => {
    const wrapper = mount(MdDatePickerField, {
      attachTo: document.body,
      props: {
        modelValue: {
          start: '2026-03-14',
          end: '2026-03-21',
        },
        pickerVariant: 'modal-input',
        selectionMode: 'range',
      },
    });

    await wrapper.get('.md-date-picker-field__control').trigger('click');

    const input = wrapper.get('.md-date-picker__input-panel input');
    await input.setValue('not-a-range');
    await input.trigger('change');

    expect(wrapper.emitted('invalid-input')?.at(-1)).toEqual(['not-a-range']);
  });
});
