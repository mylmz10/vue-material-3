import { afterEach, describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { h, nextTick, ref } from 'vue';
import { computeAccessibleName } from 'dom-accessibility-api';
import MdDialog from '@/components/dialog/MdDialog.vue';

describe('MdDialog', () => {
  const mounted = [];
  afterEach(() => {
    mounted.splice(0).forEach((wrapper) => wrapper.unmount());
    vi.restoreAllMocks();
  });
  const render = (options) => {
    const wrapper = mount(MdDialog, { attachTo: document.body, ...options });
    mounted.push(wrapper);
    return wrapper;
  };

  it('uses the native modal lifecycle and names the dialog from its header', async () => {
    const show = vi.spyOn(HTMLDialogElement.prototype, 'showModal');
    const close = vi.spyOn(HTMLDialogElement.prototype, 'close');
    const wrapper = render({ props: { modelValue: true }, slots: { header: 'Confirm changes', default: '<button>Save</button>' } });
    await nextTick();
    const dialog = wrapper.get('dialog').element;
    expect(show).toHaveBeenCalledOnce();
    expect(dialog.open).toBe(true);
    expect(computeAccessibleName(dialog)).toBe('Confirm changes');
    expect(dialog.getAttribute('aria-modal')).toBe('true');
    await wrapper.setProps({ modelValue: false });
    expect(close).toHaveBeenCalledOnce();
    expect(dialog.open).toBe(false);
    expect(dialog.hasAttribute('inert')).toBe(true);
    expect(dialog.getAttribute('aria-hidden')).toBe('true');
  });

  it('honors a consumer accessible name instead of the whole header', async () => {
    const wrapper = render({ props: { modelValue: true }, attrs: { 'aria-label': 'Delete project' }, slots: { header: 'Title and subtitle' } });
    await nextTick();
    expect(computeAccessibleName(wrapper.get('dialog').element)).toBe('Delete project');
  });

  it('skips hidden, inert, disabled-fieldset and negative-tabindex targets', async () => {
    const wrapper = render({
      props: { modelValue: true, initialFocus: '#hidden-target' },
      slots: {
        default:
          '<button id="hidden-target" hidden>Hidden</button><div style="display:none"><button>Hidden ancestor</button></div><div inert><button>Inert</button></div><fieldset disabled><button>Disabled</button></fieldset><button tabindex="-1">Not tabbable</button><button id="visible-first">First</button><button id="visible-last">Last</button>',
      },
    });
    await nextTick();
    expect(document.activeElement).toBe(wrapper.get('#visible-first').element);
    await wrapper.get('#visible-last').trigger('keydown', { key: 'Tab' });
    expect(document.activeElement).toBe(wrapper.get('#visible-first').element);
    await wrapper.get('#visible-first').trigger('keydown', { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(wrapper.get('#visible-last').element);
  });

  it('synchronizes native close, releases scrolling, and restores launcher focus', async () => {
    const launcher = document.createElement('button');
    document.body.appendChild(launcher);
    launcher.focus();
    const wrapper = render({ props: { modelValue: true }, slots: { default: '<button>Action</button>' } });
    await nextTick();
    wrapper.get('dialog').element.close();
    await nextTick();
    expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);
    expect(document.activeElement).toBe(launcher);
    launcher.remove();
  });

  it('honors restoreFocus=false after the browser restores focus during native close', async () => {
    const launcher = document.createElement('button');
    document.body.appendChild(launcher);
    launcher.focus();
    const wrapper = render({ props: { modelValue: true, restoreFocus: false }, slots: { default: '<button>Action</button>' } });
    await nextTick();
    // Simulate the native form-close focus step before the queued close event.
    launcher.focus();
    wrapper.get('dialog').element.close();
    await nextTick();
    expect(document.activeElement).not.toBe(launcher);
    expect(launcher.hasAttribute('inert')).toBe(false);
    launcher.remove();
  });

  it('does not reopen or emit opened after closing before the opening tick', async () => {
    const show = vi.spyOn(HTMLDialogElement.prototype, 'showModal');
    const wrapper = render({ props: { modelValue: true } });
    await wrapper.setProps({ modelValue: false });
    await nextTick();
    expect(wrapper.find('dialog').exists()).toBe(false);
    // Any modal shown during mounting must have been closed, never left open.
    expect(show.mock.instances.every((dialog) => !dialog.open)).toBe(true);
  });

  it('keeps a parent dialog open when a nested dialog handles Escape', async () => {
    const innerOpen = ref(true);
    const wrapper = mount(
      {
        render: () =>
          h(
            MdDialog,
            { modelValue: true },
            {
              header: () => 'Parent',
              default: () =>
                h(
                  MdDialog,
                  {
                    modelValue: innerOpen.value,
                    'onUpdate:modelValue': (value) => {
                      innerOpen.value = value;
                    },
                  },
                  { header: () => 'Child', default: () => h('button', 'Child action') }
                ),
            }
          ),
      },
      { attachTo: document.body }
    );
    mounted.push(wrapper);
    await nextTick();
    const dialogs = wrapper.findAllComponents(MdDialog);
    await dialogs[1].get('button').trigger('keydown', { key: 'Escape' });
    expect(dialogs[1].emitted('update:modelValue')).toEqual([[false]]);
    expect(dialogs[0].emitted('update:modelValue')).toBeUndefined();
  });

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
    wrapper.unmount();
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

  it.each([true, false])('honors closeOnEscape=%s for native cancel events', async (closeOnEscape) => {
    const wrapper = render({ props: { modelValue: true, closeOnEscape } });
    await nextTick();
    const event = new Event('cancel', { cancelable: true });
    wrapper.get('dialog').element.dispatchEvent(event);
    await nextTick();
    expect(event.defaultPrevented).toBe(true);
    expect(!!wrapper.emitted('update:modelValue')).toBe(closeOnEscape);
  });

  it('closes on a backdrop click but ignores content clicks', async () => {
    const wrapper = render({ props: { modelValue: true }, slots: { default: '<button>Action</button>' } });
    await nextTick();
    await wrapper.get('button').trigger('click');
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    await wrapper.get('dialog').trigger('click');
    expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);
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
