import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import MdDialog from '@/components/dialog/MdDialog.vue';

describe('MdDialog', () => {
  it('emits open and close lifecycle events', async () => {
    const wrapper = mount(MdDialog, {
      props: {
        modelValue: true,
      },
      slots: {
        default: '<button type="button">Action</button>',
      },
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('open')).toBeTruthy();
    expect(wrapper.emitted('opened')).toBeTruthy();

    await wrapper.setProps({ modelValue: false });
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('close')).toBeTruthy();
    expect(wrapper.emitted('closed')).toBeTruthy();
  });

  it('closes with escape key', async () => {
    const wrapper = mount(MdDialog, {
      attachTo: document.body,
      props: {
        modelValue: true,
        closeOnEscape: true,
      },
      slots: {
        default: '<button type="button">Action</button>',
      },
    });

    const dialog = wrapper.get('.md-modal');
    await dialog.trigger('keydown', { key: 'Escape' });

    expect(wrapper.emitted('cancel')?.at(-1)).toEqual([{ source: 'escape' }]);
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([false]);

    wrapper.unmount();
  });

  it('traps focus within the dialog when tabbing', async () => {
    const wrapper = mount(MdDialog, {
      attachTo: document.body,
      props: {
        modelValue: true,
        trapFocus: true,
      },
      slots: {
        default: '<button type="button" id="first">First</button><button type="button" id="last">Last</button>',
      },
    });

    const firstButton = wrapper.get('#first');
    const lastButton = wrapper.get('#last');
    const dialog = wrapper.get('.md-modal');

    lastButton.element.focus();
    await dialog.trigger('keydown', { key: 'Tab' });

    expect(document.activeElement).toBe(firstButton.element);

    firstButton.element.focus();
    await dialog.trigger('keydown', { key: 'Tab', shiftKey: true });

    expect(document.activeElement).toBe(lastButton.element);

    wrapper.unmount();
  });
});
