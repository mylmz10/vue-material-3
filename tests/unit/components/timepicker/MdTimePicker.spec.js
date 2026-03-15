import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import MdTimePicker from '@/components/timepicker/MdTimePicker.vue';

const findButtonByText = (wrapper, text) => wrapper.findAll('button').find((button) => button.text().includes(text));

describe('MdTimePicker', () => {
  it('commits the selected dial time on confirm', async () => {
    const wrapper = mount(MdTimePicker, {
      attachTo: document.body,
      props: {
        modelValue: '07:00',
        open: true,
      },
    });

    await wrapper.get('[data-dial-value="9"]').trigger('click');
    await wrapper.get('[data-dial-value="30"]').trigger('click');
    await findButtonByText(wrapper, 'OK').trigger('click');

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['09:30']);
    expect(wrapper.emitted('confirm')?.at(-1)).toEqual(['09:30']);
  });

  it('applies the selected period before confirming', async () => {
    const wrapper = mount(MdTimePicker, {
      attachTo: document.body,
      props: {
        modelValue: '07:00',
        open: true,
      },
    });

    await wrapper.get('[data-period="PM"]').trigger('click');
    await findButtonByText(wrapper, 'OK').trigger('click');

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['19:00']);
  });

  it('commits typed input values in input mode', async () => {
    const wrapper = mount(MdTimePicker, {
      attachTo: document.body,
      props: {
        entryMode: 'input',
        modelValue: '07:00',
        open: true,
      },
    });

    await wrapper.get('[data-input="hour"]').setValue('11');
    await wrapper.get('[data-input="minute"]').setValue('45');
    await wrapper.get('[data-period="PM"]').trigger('click');
    await findButtonByText(wrapper, 'OK').trigger('click');

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['23:45']);
  });

  it('reverts draft changes on cancel', async () => {
    const wrapper = mount(MdTimePicker, {
      attachTo: document.body,
      props: {
        modelValue: '07:00',
        open: true,
      },
    });

    await wrapper.get('[data-dial-value="9"]').trigger('click');
    await wrapper.get('[data-dial-value="30"]').trigger('click');
    await findButtonByText(wrapper, 'Cancel').trigger('click');

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    expect(wrapper.emitted('cancel')).toBeTruthy();
  });

  it('renders a small tick handle for non-step minute selections', async () => {
    const wrapper = mount(MdTimePicker, {
      attachTo: document.body,
      props: {
        modelValue: '07:07',
        open: true,
      },
    });

    await wrapper.get('[data-segment="minute"]').trigger('click');

    expect(wrapper.get('.md-time-picker-dial__handle').classes()).toContain('md-time-picker-dial__handle--tick');
  });

  it('supports 24-hour dial selection without period buttons', async () => {
    const wrapper = mount(MdTimePicker, {
      attachTo: document.body,
      props: {
        hourCycle: 24,
        modelValue: '07:00',
        open: true,
      },
    });

    expect(wrapper.find('[data-period="AM"]').exists()).toBe(false);
    expect(wrapper.find('[data-period="PM"]').exists()).toBe(false);

    await wrapper.get('[data-dial-value="20"]').trigger('click');
    await wrapper.get('[data-dial-value="10"]').trigger('click');
    await findButtonByText(wrapper, 'OK').trigger('click');

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['20:10']);
  });

  it('supports 24-hour text input', async () => {
    const wrapper = mount(MdTimePicker, {
      attachTo: document.body,
      props: {
        entryMode: 'input',
        hourCycle: 24,
        modelValue: '07:00',
        open: true,
      },
    });

    expect(wrapper.find('[data-period="AM"]').exists()).toBe(false);
    expect(wrapper.find('[data-period="PM"]').exists()).toBe(false);

    await wrapper.get('[data-input="hour"]').setValue('20');
    await wrapper.get('[data-input="minute"]').setValue('15');
    await findButtonByText(wrapper, 'OK').trigger('click');

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['20:15']);
  });
});
