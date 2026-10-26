import { afterEach, describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';
import { enableAutoUnmount, mount } from '@vue/test-utils';
import MdTimePicker from '@/components/timepicker/MdTimePicker.vue';
import MdTimePickerDial from '@/components/timepicker/MdTimePickerDial.vue';

const findButtonByText = (wrapper, text) => wrapper.findAll('button').find((button) => button.text().includes(text));

enableAutoUnmount(afterEach);

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

  it.each([12, 24])('keeps dragging hours until pointerup in the %s-hour cycle', async (hourCycle) => {
    const wrapper = mount(MdTimePicker, { attachTo: document.body, props: { open: true, modelValue: '07:15', hourCycle } });
    const dial = wrapper.get('.md-time-picker-dial');
    vi.spyOn(dial.element, 'getBoundingClientRect').mockReturnValue({ left: 0, top: 0, width: 256, height: 256 });
    const pointer = (type, x, y, pointerId = 1) => {
      const event = new Event(type, { bubbles: true, cancelable: true });
      Object.assign(event, { clientX: x, clientY: y, pointerId });
      (type === 'pointerdown' ? dial.element : window).dispatchEvent(event);
    };
    pointer('pointerdown', 240, 128);
    await nextTick();
    expect(dial.attributes('aria-label')).toBe('Select hour');
    pointer('pointermove', 128, 240);
    await nextTick();
    expect(wrapper.get('[data-segment="hour"]').text()).toBe('06');
    expect(wrapper.get('[data-segment="minute"]').text()).toBe('15');
    pointer('pointerup', 128, 240);
    await nextTick();
    expect(dial.attributes('aria-label')).toBe('Select minute');
    wrapper.get('[data-dial-value="30"]').element.dispatchEvent(new MouseEvent('click', { bubbles: true, detail: 1 }));
    await nextTick();
    expect(wrapper.get('[data-segment="minute"]').text()).toBe('15');
    await findButtonByText(wrapper, 'OK').trigger('click');
    expect(wrapper.emitted('confirm')?.at(-1)).toEqual(['06:15']);
  });

  it('cleans up canceled gestures without advancing or accepting later moves', async () => {
    const wrapper = mount(MdTimePicker, { attachTo: document.body, props: { open: true, modelValue: '07:15' } });
    const dial = wrapper.get('.md-time-picker-dial');
    await dial.trigger('pointerdown', { pointerId: 1, clientX: 240, clientY: 128 });
    const cancel = new Event('pointercancel');
    Object.assign(cancel, { pointerId: 1 });
    window.dispatchEvent(cancel);
    await nextTick();
    const hour = wrapper.get('[data-segment="hour"]').text();
    const move = new Event('pointermove');
    Object.assign(move, { pointerId: 1, clientX: 128, clientY: 240 });
    window.dispatchEvent(move);
    await nextTick();
    expect(dial.attributes('aria-label')).toBe('Select hour');
    expect(wrapper.get('[data-segment="hour"]').text()).toBe(hour);
  });

  it('cleans up an earlier pointer selection before starting another one', async () => {
    const removeListener = vi.spyOn(window, 'removeEventListener');
    const wrapper = mount(MdTimePickerDial, {
      props: { hour24: 7, minute: 0 },
    });

    await wrapper.trigger('pointerdown', { pointerId: 1, clientX: 1, clientY: 1 });
    await wrapper.trigger('pointerdown', { pointerId: 2, clientX: 2, clientY: 2 });

    expect(removeListener).toHaveBeenCalledWith('pointermove', expect.any(Function));
    expect(removeListener).toHaveBeenCalledWith('pointerup', expect.any(Function));

    const selectionCount = wrapper.emitted('select-hour')?.length;
    const oldPointerMove = new Event('pointermove');
    Object.defineProperties(oldPointerMove, {
      clientX: { value: 3 },
      clientY: { value: 3 },
      pointerId: { value: 1 },
    });
    window.dispatchEvent(oldPointerMove);
    expect(wrapper.emitted('select-hour')).toHaveLength(selectionCount);

    removeListener.mockRestore();
  });
});
