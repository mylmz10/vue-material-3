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

    await wrapper.get('.md-snackbar__action-text span').trigger('click');
    expect(wrapper.emitted('action')).toHaveLength(1);
  });

  it('emits close when dismiss affordance is clicked', async () => {
    const wrapper = mount(MdSnackbar, {
      props: {
        modelValue: true,
        timeout: 10000,
      },
    });

    await wrapper.get('.md-snackbar__actions').trigger('click');
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
});
