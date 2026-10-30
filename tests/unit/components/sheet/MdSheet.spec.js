import { afterEach, describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { h, nextTick, ref } from 'vue';
import { computeAccessibleName } from 'dom-accessibility-api';
import MdDialog from '@/components/dialog/MdDialog.vue';
import MdBottomSheet from '@/components/bottom-sheet/MdBottomSheet.vue';
import MdSideSheet from '@/components/side-sheet/MdSideSheet.vue';

const wrappers = [];
const nodes = [];
const render = (component, options = {}) => {
  const wrapper = mount(component, { attachTo: document.body, ...options });
  wrappers.push(wrapper);
  return wrapper;
};
const pointer = (type, id, y, target = window) => {
  const event = new Event(type, { bubbles: true });
  Object.defineProperties(event, { pointerId: { value: id }, clientY: { value: y }, button: { value: 0 } });
  target.dispatchEvent(event);
};
afterEach(() => {
  wrappers.splice(0).forEach((wrapper) => wrapper.unmount());
  nodes.splice(0).forEach((node) => node.remove());
  vi.restoreAllMocks();
});

describe.each([
  ['bottom', MdBottomSheet],
  ['side', MdSideSheet],
])('%s sheet', (_, component) => {
  it('uses a named native modal and restores focus and body scrolling on dismissal', async () => {
    const launcher = document.createElement('button');
    document.body.appendChild(launcher);
    nodes.push(launcher);
    launcher.focus();
    const previousOverflow = document.body.style.overflow;
    const open = ref(true);
    const wrapper = render({
      setup: () => () =>
        h(
          component,
          { modelValue: open.value, modal: true, headline: 'Details', initialFocus: '#sheet-action', 'onUpdate:modelValue': (value) => (open.value = value) },
          { default: () => h('button', { id: 'sheet-action' }, 'Apply') }
        ),
    });
    await nextTick();
    const dialog = wrapper.get('dialog').element;
    expect(dialog.open).toBe(true);
    expect(computeAccessibleName(dialog)).toBe('Details');
    expect(document.activeElement.id).toBe('sheet-action');
    expect(document.body.style.overflow).toBe('hidden');
    await wrapper.get('#sheet-action').trigger('keydown', { key: 'Escape' });
    await nextTick();
    expect(open.value).toBe(false);
    expect(dialog.open).toBe(false);
    expect(document.body.style.overflow).toBe(previousOverflow);
    expect(document.activeElement).toBe(launcher);
  });

  it('wraps modal Tab navigation and honors dismissal controls', async () => {
    const wrapper = render(component, { props: { modelValue: true, modal: true, closeOnEscape: false, closeOnBackdropClick: false }, slots: { default: '<button id="last-action">Apply</button>' } });
    await nextTick();
    const close = wrapper.get('.md-sheet__close');
    const first = wrapper.find('.md-sheet__handle-target').exists() ? wrapper.get('.md-sheet__handle-target') : close;
    wrapper.get('#last-action').element.focus();
    await wrapper.get('#last-action').trigger('keydown', { key: 'Tab' });
    expect(document.activeElement).toBe(first.element);
    await first.trigger('keydown', { key: 'Tab', shiftKey: true });
    expect(document.activeElement.id).toBe('last-action');
    await wrapper.get('dialog').trigger('keydown', { key: 'Escape' });
    await wrapper.get('dialog').trigger('click');
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    await close.trigger('click');
    expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);
    expect(wrapper.emitted('cancel')).toEqual([[{ source: 'close-button' }]]);
  });

  it('leaves standard sheets nonmodal without stealing focus or locking the page', async () => {
    const launcher = document.createElement('button');
    document.body.appendChild(launcher);
    nodes.push(launcher);
    launcher.focus();
    const previousOverflow = document.body.style.overflow;
    const open = ref(false);
    const wrapper = render({ setup: () => () => h(component, { modelValue: open.value, modal: false, headline: 'Filters', 'onUpdate:modelValue': (value) => (open.value = value) }) });
    open.value = true;
    await nextTick();
    expect(wrapper.find('dialog').exists()).toBe(false);
    expect(wrapper.get('section').attributes('role')).toBe('complementary');
    expect(computeAccessibleName(wrapper.get('section').element)).toBe('Filters');
    expect(wrapper.get('section').attributes('aria-modal')).toBeUndefined();
    expect(document.body.style.overflow).toBe(previousOverflow);
    expect(document.activeElement).toBe(launcher);
    wrapper.get('.md-sheet__close').element.focus();
    await wrapper.get('.md-sheet__close').trigger('keydown', { key: 'Escape' });
    await nextTick();
    expect(wrapper.find('section').exists()).toBe(false);
    expect(document.activeElement).toBe(launcher);
  });

  it('keeps dynamic consumer attributes and does not steal focus on external close', async () => {
    const outside = document.createElement('button');
    document.body.appendChild(outside);
    nodes.push(outside);
    const wrapper = render(component, { props: { modelValue: true, modal: true }, attrs: { dir: 'ltr', 'aria-label': 'Original name' } });
    await nextTick();
    await wrapper.setProps({ dir: 'rtl', 'aria-label': 'Updated name' });
    expect(wrapper.get('dialog').attributes('dir')).toBe('rtl');
    expect(computeAccessibleName(wrapper.get('dialog').element)).toBe('Updated name');
    await wrapper.setProps({ modal: false });
    await nextTick();
    outside.focus();
    await wrapper.setProps({ modelValue: false });
    await nextTick();
    expect(document.activeElement).toBe(outside);
  });

  it('restores standard-sheet launcher focus when unmounted with focus inside', async () => {
    const launcher = document.createElement('button');
    document.body.appendChild(launcher);
    nodes.push(launcher);
    launcher.focus();
    const wrapper = render(component, { props: { modelValue: true, modal: false } });
    wrapper.get('.md-sheet__close').element.focus();
    wrapper.unmount();
    wrappers.splice(wrappers.indexOf(wrapper), 1);
    await nextTick();
    expect(document.activeElement).toBe(launcher);
  });

  it('dismisses a standard sheet nested inside a modal without closing its parent', async () => {
    const open = ref(true);
    const parent = render(MdDialog, {
      props: { modelValue: true },
      attrs: { 'aria-label': 'Parent dialog' },
      slots: { default: () => h(component, { modelValue: open.value, modal: false, 'onUpdate:modelValue': (value) => (open.value = value) }) },
    });
    await nextTick();
    await parent.get('.md-sheet__close').trigger('keydown', { key: 'Escape' });
    await nextTick();
    expect(open.value).toBe(false);
    expect(parent.get('dialog').element.open).toBe(true);
    expect(parent.emitted('update:modelValue')).toBeUndefined();
  });

  it('forwards consumer naming and footer close actions', async () => {
    const wrapper = render(component, {
      props: { modelValue: true, modal: true, headline: 'Visible title' },
      attrs: { 'aria-label': 'Custom details' },
      slots: { footer: ({ close }) => h('button', { onClick: () => close('apply') }, 'Apply') },
    });
    await nextTick();
    expect(computeAccessibleName(wrapper.get('dialog').element)).toBe('Custom details');
    await wrapper.get('.md-sheet__footer button').trigger('click');
    expect(wrapper.emitted('cancel')).toEqual([[{ source: 'apply' }]]);
  });
});

describe('bottom-sheet handle gestures', () => {
  it('dismisses downward handle drags and isolates unrelated pointers', async () => {
    const wrapper = render(MdBottomSheet, { props: { modelValue: true } });
    await nextTick();
    const handle = wrapper.get('.md-sheet__handle-target').element;
    pointer('pointerdown', 1, 100, handle);
    pointer('pointermove', 2, 240);
    pointer('pointerup', 2, 240);
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    pointer('pointermove', 1, 180);
    await nextTick();
    expect(wrapper.get('dialog').attributes('style')).toContain('80px');
    pointer('pointerup', 1, 180);
    await nextTick();
    expect(wrapper.emitted('cancel')).toEqual([[{ source: 'swipe' }]]);
    expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);
    expect(wrapper.get('dialog').attributes('style')).toContain('0px');
  });

  it('snaps short and canceled drags back, and removes listeners on unmount', async () => {
    const wrapper = render(MdBottomSheet, { props: { modelValue: true } });
    await nextTick();
    const handle = wrapper.get('.md-sheet__handle-target').element;
    pointer('pointerdown', 1, 100, handle);
    pointer('pointerup', 1, 130);
    handle.dispatchEvent(new MouseEvent('click', { bubbles: true, detail: 1 }));
    await nextTick();
    expect(handle.getAttribute('aria-expanded')).toBe('false');
    expect(wrapper.emitted('cancel')).toBeUndefined();
    pointer('pointerdown', 4, 100, handle);
    pointer('pointermove', 4, 125);
    pointer('pointerup', 4, 100);
    handle.dispatchEvent(new MouseEvent('click', { bubbles: true, detail: 1 }));
    await nextTick();
    expect(handle.getAttribute('aria-expanded')).toBe('false');
    pointer('pointerdown', 2, 100, handle);
    pointer('pointermove', 2, 200);
    pointer('pointercancel', 2, 200);
    await nextTick();
    expect(wrapper.get('dialog').attributes('style')).toContain('0px');
    expect(wrapper.emitted('cancel')).toBeUndefined();
    const remove = vi.spyOn(window, 'removeEventListener');
    pointer('pointerdown', 3, 100, handle);
    wrapper.unmount();
    wrappers.splice(wrappers.indexOf(wrapper), 1);
    expect(remove).toHaveBeenCalledWith('pointermove', expect.any(Function));
    expect(remove).toHaveBeenCalledWith('pointerup', expect.any(Function));
    expect(remove).toHaveBeenCalledWith('pointercancel', expect.any(Function));
  });

  it('offers keyboard-accessible modal height presets and resets on reopen', async () => {
    const wrapper = render(MdBottomSheet, { props: { modelValue: true } });
    await nextTick();
    const handle = wrapper.get('.md-sheet__handle-target');
    expect(handle.element.tagName).toBe('BUTTON');
    expect(handle.attributes('aria-expanded')).toBe('false');
    expect(wrapper.get('dialog').attributes('style')).toContain('50dvh');
    await handle.trigger('click');
    expect(handle.attributes('aria-expanded')).toBe('true');
    expect(wrapper.get('dialog').element.style.getPropertyValue('--md-bottom-sheet-height')).toBe('');
    await handle.trigger('click');
    expect(handle.attributes('aria-expanded')).toBe('false');
    await wrapper.setProps({ modelValue: false });
    await wrapper.setProps({ modelValue: true });
    await nextTick();
    expect(wrapper.get('.md-sheet__handle-target').attributes('aria-expanded')).toBe('false');
  });

  it('expands up, collapses down and ignores the generated drag click', async () => {
    const wrapper = render(MdBottomSheet, { props: { modelValue: true } });
    await nextTick();
    const handle = wrapper.get('.md-sheet__handle-target');
    pointer('pointerdown', 1, 200, handle.element);
    pointer('pointerup', 1, 100);
    await nextTick();
    expect(handle.attributes('aria-expanded')).toBe('true');
    handle.element.dispatchEvent(new MouseEvent('click', { detail: 1, bubbles: true }));
    await nextTick();
    expect(handle.attributes('aria-expanded')).toBe('true');
    pointer('pointerdown', 2, 100, handle.element);
    pointer('pointerup', 2, 180);
    await nextTick();
    expect(handle.attributes('aria-expanded')).toBe('false');
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('allows disabling gestures without hiding the handle', async () => {
    const wrapper = render(MdBottomSheet, { props: { modelValue: true, swipeToClose: false } });
    await nextTick();
    pointer('pointerdown', 1, 0, wrapper.get('.md-sheet__handle-target').element);
    pointer('pointerup', 1, 150);
    expect(wrapper.emitted('cancel')).toBeUndefined();
  });
});
