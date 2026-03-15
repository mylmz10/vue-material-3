import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import MdDatePicker from '@/components/datepicker/MdDatePicker.vue';

const findButtonByText = (wrapper, text) => wrapper.findAll('button').find((button) => button.text().includes(text));

describe('MdDatePicker', () => {
  it('commits the selected date on confirm in modal mode', async () => {
    const wrapper = mount(MdDatePicker, {
      attachTo: document.body,
      props: {
        modelValue: '2026-03-14',
        open: true,
        variant: 'modal',
      },
    });

    await wrapper.get('[data-iso="2026-03-18"]').trigger('click');
    await findButtonByText(wrapper, 'OK').trigger('click');

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['2026-03-18']);
    expect(wrapper.emitted('confirm')).toBeTruthy();
  });

  it('reverts draft changes on cancel in modal mode', async () => {
    const wrapper = mount(MdDatePicker, {
      attachTo: document.body,
      props: {
        modelValue: '2026-03-14',
        open: true,
        variant: 'modal',
      },
    });

    await wrapper.get('[data-iso="2026-03-18"]').trigger('click');
    await findButtonByText(wrapper, 'Cancel').trigger('click');

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    expect(wrapper.emitted('cancel')).toBeTruthy();
  });

  it('emits the selected day immediately in docked mode', async () => {
    const wrapper = mount(MdDatePicker, {
      props: {
        modelValue: '2026-03-14',
        variant: 'docked',
      },
    });

    await wrapper.get('[data-iso="2026-03-18"]').trigger('click');

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['2026-03-18']);
  });

  it('supports keyboard navigation in day view', async () => {
    const wrapper = mount(MdDatePicker, {
      props: {
        modelValue: '2026-03-14',
        variant: 'docked',
      },
    });

    await wrapper.get('.md-date-picker').trigger('keydown', { key: 'ArrowRight' });
    await wrapper.get('.md-date-picker').trigger('keydown', { key: 'Enter' });

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['2026-03-15']);
  });

  it('switches to month view and updates the displayed month', async () => {
    const wrapper = mount(MdDatePicker, {
      props: {
        modelValue: '2026-03-14',
        variant: 'docked',
      },
    });

    const monthToggle = wrapper.findAll('.md-date-picker-header__value').at(0);
    await monthToggle.trigger('click');
    const aprilOption = wrapper.findAll('.md-date-picker-list__item').find((button) => button.text().includes('April'));
    await aprilOption.trigger('click');

    expect(wrapper.find('[data-iso="2026-04-01"]').exists()).toBe(true);
    expect(wrapper.emitted('month-change')?.length).toBeGreaterThan(0);
  });

  it('parses valid modal input values before confirming', async () => {
    const wrapper = mount(MdDatePicker, {
      attachTo: document.body,
      props: {
        modelValue: '2026-03-14',
        open: true,
        entryMode: 'input',
        variant: 'modal',
      },
    });

    const input = wrapper.get('.md-date-picker__input-panel input');
    await input.setValue('03/20/2026');
    await input.trigger('change');
    await findButtonByText(wrapper, 'OK').trigger('click');

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['2026-03-20']);
  });

  it('disables month navigation when min and max keep the picker inside one month', () => {
    const wrapper = mount(MdDatePicker, {
      props: {
        min: '2026-03-01',
        max: '2026-03-31',
        modelValue: '2026-03-14',
        variant: 'docked',
      },
    });

    const iconButtons = wrapper.findAllComponents({ name: 'MdIconButton' });
    expect(iconButtons.at(0)?.attributes('disabled')).toBeDefined();
    expect(iconButtons.at(2)?.attributes('disabled')).toBeDefined();
  });

  it('commits a selected range when selectionMode is range', async () => {
    const wrapper = mount(MdDatePicker, {
      attachTo: document.body,
      props: {
        modelValue: {
          start: '2026-03-14',
          end: '2026-03-21',
        },
        open: true,
        selectionMode: 'range',
        variant: 'modal',
      },
    });

    await wrapper.get('[data-iso="2026-03-18"]').trigger('click');
    await wrapper.get('[data-iso="2026-03-24"]').trigger('click');
    await findButtonByText(wrapper, 'OK').trigger('click');

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([{
      start: '2026-03-18',
      end: '2026-03-24',
    }]);
  });

  it('sorts reverse range selections in docked mode', async () => {
    const wrapper = mount(MdDatePicker, {
      props: {
        modelValue: {
          start: null,
          end: null,
        },
        selectionMode: 'range',
        variant: 'docked',
      },
    });

    await wrapper.get('[data-iso="2026-03-20"]').trigger('click');
    await wrapper.get('[data-iso="2026-03-16"]').trigger('click');

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([{
      start: '2026-03-16',
      end: '2026-03-20',
    }]);
  });

  it('parses valid modal input ranges before confirming when selectionMode is range', async () => {
    const wrapper = mount(MdDatePicker, {
      attachTo: document.body,
      props: {
        modelValue: {
          start: '2026-03-14',
          end: '2026-03-21',
        },
        entryMode: 'input',
        open: true,
        selectionMode: 'range',
        variant: 'modal',
      },
    });

    const input = wrapper.get('.md-date-picker__input-panel input');
    await input.setValue('03/20/2026 - 03/25/2026');
    await input.trigger('change');
    await findButtonByText(wrapper, 'OK').trigger('click');

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([{
      start: '2026-03-20',
      end: '2026-03-25',
    }]);
  });

  it('reverts draft range changes on cancel in modal mode', async () => {
    const wrapper = mount(MdDatePicker, {
      attachTo: document.body,
      props: {
        modelValue: {
          start: '2026-03-14',
          end: '2026-03-21',
        },
        open: true,
        selectionMode: 'range',
        variant: 'modal',
      },
    });

    await wrapper.get('[data-iso="2026-03-18"]').trigger('click');
    await wrapper.get('[data-iso="2026-03-24"]').trigger('click');
    await findButtonByText(wrapper, 'Cancel').trigger('click');

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    expect(wrapper.emitted('cancel')).toBeTruthy();
  });

  it('prevents range selection across disabled dates', async () => {
    const wrapper = mount(MdDatePicker, {
      props: {
        modelValue: {
          start: null,
          end: null,
        },
        isDateDisabled: (isoDate) => ['2026-03-14', '2026-03-15'].includes(isoDate),
        selectionMode: 'range',
        variant: 'docked',
      },
    });

    await wrapper.get('[data-iso="2026-03-13"]').trigger('click');
    await wrapper.get('[data-iso="2026-03-16"]').trigger('click');

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([{
      start: '2026-03-13',
      end: null,
    }]);
  });
});
