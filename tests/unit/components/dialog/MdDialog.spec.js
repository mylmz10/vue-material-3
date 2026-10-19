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

  it('stays open when escape closing is disabled', async () => {
    const wrapper = mount(MdDialog, {
      props: { modelValue: true, closeOnEscape: false },
    });

    await wrapper.get('.md-modal').trigger('keydown', { key: 'Escape' });

    expect(wrapper.find('.md-modal').exists()).toBe(true);
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    wrapper.unmount();
  });

  it('stays open when backdrop closing is disabled', async () => {
    const wrapper = mount(MdDialog, {
      props: { modelValue: true, closeOnBackdropClick: false },
    });

    await wrapper.get('.md-modal').trigger('click');

    expect(wrapper.find('.md-modal').exists()).toBe(true);
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
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

  it('restores the body overflow style after closing', async () => {
    document.body.style.overflow = 'scroll';
    const wrapper = mount(MdDialog, {
      props: {
        modelValue: true,
      },
    });

    await wrapper.setProps({ modelValue: false });
    expect(document.body.style.overflow).toBe('scroll');

    document.body.style.overflow = '';
    wrapper.unmount();
  });

  it('keeps body scrolling locked until every open dialog closes', async () => {
    document.body.style.overflow = 'scroll';
    const firstDialog = mount(MdDialog, { props: { modelValue: true } });
    const secondDialog = mount(MdDialog, { props: { modelValue: true } });

    await firstDialog.setProps({ modelValue: false });
    expect(document.body.style.overflow).toBe('hidden');

    await secondDialog.setProps({ modelValue: false });
    expect(document.body.style.overflow).toBe('scroll');

    firstDialog.unmount();
    secondDialog.unmount();
    document.body.style.overflow = '';
  });
});
