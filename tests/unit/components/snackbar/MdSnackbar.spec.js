import { describe, expect, it, vi, afterEach } from 'vitest';
import { h, ref } from 'vue';
import { flushPromises, mount } from '@vue/test-utils';
import MdSnackbar from '@/components/snackbar/MdSnackbar.vue';

describe('MdSnackbar', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('keeps a persistent polite message-only live region without moving focus', async () => {
    const launcher = document.createElement('button');
    document.body.append(launcher);
    launcher.focus();
    const wrapper = mount(MdSnackbar, { attachTo: document.body, props: { modelValue: false, text: 'Saved', timeout: 0, actionText: 'Undo' } });
    const region = wrapper.get('[role="status"]').element;
    expect(region.textContent).toBe('');
    expect(region.getAttribute('aria-live')).toBe('polite');
    expect(region.getAttribute('aria-atomic')).toBe('true');
    await wrapper.setProps({ modelValue: true });
    await flushPromises();
    expect(wrapper.get('[role="status"]').element).toBe(region);
    expect(region.textContent).toBe('Saved');
    expect(region.querySelector('button')).toBeNull();
    expect(document.activeElement).toBe(launcher);
    await wrapper.setProps({ actionText: 'Retry' });
    expect(region.textContent).toBe('Saved');
    await wrapper.setProps({ text: 'Updated' });
    await flushPromises();
    expect(region.textContent).toBe('Updated');
    await wrapper.setProps({ modelValue: false });
    await flushPromises();
    expect(region.textContent).toBe('');
    wrapper.unmount();
    launcher.remove();
  });

  it('announces initially open slot content without mounting it twice', async () => {
    const message = ref('Custom message');
    const setup = vi.fn(() => () => h('span', { id: 'slot-message' }, message.value));
    const Message = { setup };
    const wrapper = mount(MdSnackbar, { attachTo: document.body, props: { modelValue: true, timeout: 0 }, slots: { default: () => h(Message) } });
    await flushPromises();
    expect(setup).toHaveBeenCalledOnce();
    expect(document.querySelectorAll('#slot-message')).toHaveLength(1);
    expect(wrapper.get('[role="status"]').text()).toBe('Custom message');
    message.value = 'Changed slot message';
    await flushPromises();
    expect(wrapper.get('[role="status"]').text()).toBe('Changed slot message');
    wrapper.unmount();
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
