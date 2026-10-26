import { describe, expect, it, vi, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import MdSnackbar from '@/components/snackbar/MdSnackbar.vue';

describe('MdSnackbar', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('emits action when action button is clicked', async () => {
    const wrapper = mount(MdSnackbar, {
      props: {
        modelValue: true,
        actionText: 'Undo',
        timeout: 10000,
      },
    });

    const actionButton = wrapper.get('.md-snackbar__action-text');
    expect(actionButton.attributes('type')).toBe('button');
    await actionButton.trigger('click');
    expect(wrapper.emitted('action')).toHaveLength(1);
  });

  it('renders custom supporting text', () => {
    const wrapper = mount(MdSnackbar, {
      props: {
        modelValue: true,
        text: 'Message sent',
      },
    });

    expect(wrapper.get('.md-snackbar__supporting-text').text()).toBe('Message sent');
  });

  it('emits close when dismiss affordance is clicked', async () => {
    const wrapper = mount(MdSnackbar, {
      props: {
        modelValue: true,
        timeout: 10000,
      },
    });

    const closeButton = wrapper.get('.md-snackbar__actions');
    expect(closeButton.attributes('type')).toBe('button');
    await closeButton.trigger('click');
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([false]);
  });

  it('auto closes after timeout', async () => {
    vi.useFakeTimers();

    const wrapper = mount(MdSnackbar, {
      props: {
        modelValue: true,
        timeout: 25,
      },
    });

    vi.advanceTimersByTime(25);

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([false]);
  });

  it('starts its timeout when it is opened after mounting', async () => {
    vi.useFakeTimers();

    const wrapper = mount(MdSnackbar, {
      props: {
        modelValue: false,
        timeout: 25,
      },
    });

    vi.advanceTimersByTime(25);
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();

    await wrapper.setProps({ modelValue: true });
    vi.advanceTimersByTime(25);

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([false]);
  });
});
