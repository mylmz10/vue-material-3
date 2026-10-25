import { afterEach, describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { h, nextTick, ref } from 'vue';
import { computeAccessibleName } from 'dom-accessibility-api';
import MdNavigationDrawer from '@/components/navigation-drawer/MdNavigationDrawer.vue';
import MdDialog from '@/components/dialog/MdDialog.vue';

const mounted = [];
const render = (options = {}) => {
  const wrapper = mount(MdNavigationDrawer, { attachTo: document.body, ...options });
  mounted.push(wrapper);
  return wrapper;
};
afterEach(() => {
  mounted.splice(0).forEach((wrapper) => wrapper.unmount());
  vi.restoreAllMocks();
  document.body.style.overflow = '';
});

describe('modal navigation drawer', () => {
  it('opens as a named native modal and moves focus past hidden controls', async () => {
    const show = vi.spyOn(HTMLDialogElement.prototype, 'showModal');
    const wrapper = render({
      props: { opened: true, modal: true },
      attrs: { 'aria-label': 'Main navigation' },
      slots: { default: '<button hidden>Hidden</button><a href="#inbox">Inbox</a><button>Close</button>' },
    });
    await nextTick();
    const dialog = wrapper.get('dialog');
    expect(show).toHaveBeenCalledOnce();
    expect(dialog.element.open).toBe(true);
    expect(computeAccessibleName(dialog.element)).toBe('Main navigation');
    expect(dialog.attributes('aria-modal')).toBe('true');
    expect(document.activeElement).toBe(wrapper.get('a').element);
    expect(document.body.style.overflow).toBe('hidden');
    wrapper.get('button:not([hidden])').element.focus();
    await wrapper.get('button:not([hidden])').trigger('keydown', { key: 'Tab' });
    expect(document.activeElement).toBe(wrapper.get('a').element);
    await wrapper.get('a').trigger('keydown', { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(wrapper.get('button:not([hidden])').element);
  });

  it.each(['escape', 'scrim'])('dismisses by %s once and restores launcher focus', async (method) => {
    const launcher = document.createElement('button');
    document.body.appendChild(launcher);
    launcher.focus();
    const wrapper = render({ props: { opened: true, modal: true }, slots: { default: '<a href="#inbox">Inbox</a>' } });
    await nextTick();
    if (method === 'escape') await wrapper.get('a').trigger('keydown', { key: 'Escape' });
    else await wrapper.get('.md-navigation-drawer__overlay').trigger('click');
    await nextTick();
    expect(wrapper.emitted('change')).toEqual([[false]]);
    expect(wrapper.get('dialog').element.open).toBe(false);
    expect(document.activeElement).toBe(launcher);
    expect(document.body.style.overflow).toBe('');
    launcher.remove();
  });

  it('preserves closed slot state and reopens without leftover inertness', async () => {
    const Content = {
      setup() {
        const value = ref('original');
        return () =>
          h('input', {
            value: value.value,
            onInput: (event) => {
              value.value = event.target.value;
            },
          });
      },
    };
    const wrapper = render({ props: { opened: false, modal: true }, slots: { default: () => h(Content) } });
    const input = wrapper.get('input').element;
    expect(wrapper.get('dialog').attributes('inert')).toBeDefined();
    await wrapper.setProps({ opened: true });
    await nextTick();
    await wrapper.get('input').setValue('edited');
    await wrapper.setProps({ opened: false });
    expect(wrapper.get('input').element).toBe(input);
    expect(input.value).toBe('edited');
    await wrapper.setProps({ opened: true });
    await nextTick();
    expect(wrapper.get('dialog').element.open).toBe(true);
    expect(wrapper.get('dialog').attributes('inert')).toBeUndefined();
    expect(wrapper.get('dialog').attributes('aria-hidden')).toBeUndefined();
    expect(wrapper.get('input').element).toBe(input);
    expect(wrapper.emitted('change')).toBeUndefined();
  });

  it('supplies a default name and supports an external labelledby', async () => {
    const wrapper = render({ props: { opened: true, modal: true }, slots: { default: '<h2 id="drawer-title">Destinations</h2>' } });
    await nextTick();
    expect(computeAccessibleName(wrapper.get('dialog').element)).toBe('Navigation');
    await wrapper.setProps({ 'aria-labelledby': 'drawer-title' });
    expect(computeAccessibleName(wrapper.get('dialog').element)).toBe('Destinations');
  });

  it('does not make the standard drawer modal or take focus', async () => {
    const show = vi.spyOn(HTMLDialogElement.prototype, 'showModal');
    const launcher = document.createElement('button');
    document.body.appendChild(launcher);
    launcher.focus();
    const wrapper = render({ props: { opened: true }, slots: { default: '<a href="#inbox">Inbox</a>' } });
    await nextTick();
    expect(wrapper.element.tagName).toBe('DIV');
    expect(show).not.toHaveBeenCalled();
    expect(document.body.style.overflow).toBe('');
    expect(document.activeElement).toBe(launcher);
    await wrapper.get('a').trigger('keydown', { key: 'Escape' });
    expect(wrapper.emitted('change')).toBeUndefined();
    launcher.remove();
  });

  it('closes retained nested modals when the drawer is closed externally', async () => {
    const childOpen = ref(false);
    const wrapper = render({
      props: { opened: true, modal: true },
      slots: {
        default: () => [
          h(
            'button',
            {
              onClick: () => {
                childOpen.value = true;
              },
            },
            'Open child'
          ),
          h(
            MdDialog,
            {
              modelValue: childOpen.value,
              'onUpdate:modelValue': (value) => {
                childOpen.value = value;
              },
            },
            { default: () => h('button', 'Child action') }
          ),
        ],
      },
    });
    await nextTick();
    await wrapper.get('button').trigger('click');
    await nextTick();
    expect(wrapper.findAll('dialog[open]')).toHaveLength(2);
    await wrapper.setProps({ opened: false });
    await nextTick();
    expect(wrapper.findAll('dialog[open]')).toHaveLength(0);
    expect(document.body.style.overflow).toBe('');
  });

  it('keeps the drawer open and scroll locked after a nested dialog closes', async () => {
    const childOpen = ref(false);
    const wrapper = render({
      props: { opened: true, modal: true },
      slots: {
        default: () => [
          h(
            'button',
            {
              onClick: () => {
                childOpen.value = true;
              },
            },
            'Open child'
          ),
          h(
            MdDialog,
            {
              modelValue: childOpen.value,
              'onUpdate:modelValue': (value) => {
                childOpen.value = value;
              },
            },
            { header: () => 'Child', default: () => h('button', 'Child action') }
          ),
        ],
      },
    });
    await nextTick();
    await wrapper.get('button').trigger('click');
    await nextTick();
    const dialogs = wrapper.findAll('dialog');
    await dialogs[1].get('button').trigger('keydown', { key: 'Escape' });
    await nextTick();
    expect(wrapper.emitted('change')).toBeUndefined();
    expect(dialogs[0].element.open).toBe(true);
    expect(document.body.style.overflow).toBe('hidden');
    wrapper.unmount();
    mounted.splice(mounted.indexOf(wrapper), 1);
    expect(document.body.style.overflow).toBe('');
  });
});
