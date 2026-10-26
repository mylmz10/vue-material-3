import { afterEach, describe, expect, it, vi } from 'vitest';
import { h, nextTick } from 'vue';
import { enableAutoUnmount, mount } from '@vue/test-utils';
import MdTooltip from '@/components/tooltip/MdTooltip.vue';

const flushTooltipOpen = async () => {
  await nextTick();
  await Promise.resolve();
  await nextTick();
};

const mountTooltip = (props = {}, slots = {}) => {
  return mount(MdTooltip, {
    attachTo: document.body,
    props,
    slots: {
      default: '<button type="button">Trigger</button>',
      ...slots,
    },
  });
};

enableAutoUnmount(afterEach);

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe('MdTooltip', () => {
  it('opens on hover and closes 1.5 seconds after leaving the target', async () => {
    vi.useFakeTimers();
    const wrapper = mountTooltip({ text: 'Add to list' });

    await wrapper.get('.md-tooltip__trigger').trigger('mouseenter');
    await flushTooltipOpen();

    expect(document.body.querySelector('.md-tooltip__surface--plain')?.textContent).toContain('Add to list');

    await wrapper.get('.md-tooltip__trigger').trigger('mouseleave');
    await vi.advanceTimersByTimeAsync(1499);
    expect(document.body.querySelector('.md-tooltip__surface--plain')).not.toBeNull();

    await vi.advanceTimersByTimeAsync(1);
    await nextTick();
    expect(document.body.querySelector('.md-tooltip__surface--plain')).toBeNull();

    wrapper.unmount();
  });

  it.each([false, true])('closes the previous tooltip during handoff (custom IDs: %s)', async (customIds) => {
    const first = mountTooltip({ text: 'First tooltip', id: customIds ? 'first-tooltip' : '' });
    const second = mountTooltip({ text: 'Second tooltip', id: customIds ? 'second-tooltip' : '' });

    await first.get('.md-tooltip__trigger').trigger('mouseenter');
    await flushTooltipOpen();
    expect(document.body.querySelector('.md-tooltip__surface--plain')?.textContent).toContain('First tooltip');

    await first.get('.md-tooltip__trigger').trigger('mouseleave');
    await second.get('.md-tooltip__trigger').trigger('mouseenter');
    await flushTooltipOpen();

    const openSurfaces = Array.from(document.body.querySelectorAll('.md-tooltip__surface--plain'));
    expect(openSurfaces).toHaveLength(1);
    expect(openSurfaces[0].textContent).toContain('Second tooltip');
    expect(first.emitted('close')?.at(-1)).toEqual([{ source: 'handoff' }]);

    first.unmount();
    second.unmount();
  });

  it('assigns distinct default IDs to independent instances', () => {
    const first = mountTooltip({ text: 'First tooltip' });
    const second = mountTooltip({ text: 'Second tooltip' });
    const firstId = first.get('.md-tooltip__trigger').attributes('aria-describedby');
    const secondId = second.get('.md-tooltip__trigger').attributes('aria-describedby');
    expect(firstId).toBeTruthy();
    expect(secondId).not.toBe(firstId);
  });

  it('keeps another instance registered after an earlier instance unmounts', async () => {
    const first = mountTooltip({ text: 'First tooltip' });
    const second = mountTooltip({ text: 'Second tooltip' });
    const third = mountTooltip({ text: 'Third tooltip' });
    await second.get('.md-tooltip__trigger').trigger('mouseenter');
    await flushTooltipOpen();
    first.unmount();
    await third.get('.md-tooltip__trigger').trigger('mouseenter');
    await flushTooltipOpen();
    const surfaces = Array.from(document.body.querySelectorAll('.md-tooltip__surface'));
    expect(surfaces).toHaveLength(1);
    expect(surfaces[0].textContent).toContain('Third tooltip');
    expect(second.emitted('close')?.at(-1)).toEqual([{ source: 'handoff' }]);
  });

  it('applies handoff to externally controlled opens', async () => {
    const first = mountTooltip({ text: 'First tooltip', modelValue: true });
    const second = mountTooltip({ text: 'Second tooltip', modelValue: false });
    await flushTooltipOpen();
    await second.setProps({ modelValue: true });
    await flushTooltipOpen();
    expect(document.body.querySelectorAll('.md-tooltip__surface')).toHaveLength(1);
    expect(first.emitted('update:modelValue')?.at(-1)).toEqual([false]);
    expect(first.emitted('close')?.at(-1)).toEqual([{ source: 'handoff' }]);
    expect(second.emitted('update:modelValue')).toBeUndefined();
  });

  it('keeps only the last initially open tooltip when mounting siblings', async () => {
    mount({ render: () => h('div', [h(MdTooltip, { text: 'First tooltip', modelValue: true }), h(MdTooltip, { text: 'Second tooltip', modelValue: true })]) }, { attachTo: document.body });
    await flushTooltipOpen();
    const surfaces = Array.from(document.body.querySelectorAll('.md-tooltip__surface'));
    expect(surfaces).toHaveLength(1);
    expect(surfaces[0].textContent).toContain('Second tooltip');
  });

  it('only opens persistent rich tooltips on click', async () => {
    const wrapper = mountTooltip({
      variant: 'rich',
      persistent: true,
      headline: 'Paint Tool',
      supportingText: 'Add annotations and highlights with the paint tool.',
      actionLabel: 'Learn more',
    });

    await wrapper.get('.md-tooltip__trigger').trigger('mouseenter');
    await flushTooltipOpen();
    expect(document.body.querySelector('.md-tooltip__surface--rich')).toBeNull();

    await wrapper.get('.md-tooltip__trigger').trigger('click');
    await flushTooltipOpen();
    expect(document.body.querySelector('.md-tooltip__surface--rich')?.textContent).toContain('Paint Tool');

    wrapper.unmount();
  });

  it('emits action and closes persistent rich tooltips when the action is pressed', async () => {
    const wrapper = mountTooltip({
      variant: 'rich',
      persistent: true,
      headline: 'Paint Tool',
      supportingText: 'Add annotations and highlights with the paint tool.',
      actionLabel: 'Learn more',
    });

    await wrapper.get('.md-tooltip__trigger').trigger('click');
    await flushTooltipOpen();
    document.body.querySelector('.md-tooltip__action')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await nextTick();

    expect(wrapper.emitted('action')).toHaveLength(1);
    expect(document.body.querySelector('.md-tooltip__surface--rich')).toBeNull();

    wrapper.unmount();
  });

  it('supports an explicit id and controlled open state', async () => {
    const wrapper = mountTooltip({
      id: 'custom-tooltip',
      modelValue: true,
      text: 'Controlled tooltip',
    });

    await flushTooltipOpen();

    expect(wrapper.get('.md-tooltip__trigger').attributes('aria-describedby')).toBe('custom-tooltip');
    expect(document.body.querySelector('#custom-tooltip')?.textContent).toContain('Controlled tooltip');

    await wrapper.setProps({ modelValue: false });
    await nextTick();

    expect(document.body.querySelector('#custom-tooltip')).toBeNull();

    wrapper.unmount();
  });

  it('supports explicit placement overrides', async () => {
    vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function () {
      if (this.classList?.contains('md-tooltip__trigger')) {
        return {
          width: 56,
          height: 56,
          top: 100,
          right: 156,
          bottom: 156,
          left: 100,
          x: 100,
          y: 100,
          toJSON: () => ({}),
        };
      }

      if (this.classList?.contains('md-tooltip__surface')) {
        return {
          width: 120,
          height: 24,
          top: 0,
          right: 120,
          bottom: 24,
          left: 0,
          x: 0,
          y: 0,
          toJSON: () => ({}),
        };
      }

      return {
        width: 0,
        height: 0,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      };
    });

    const wrapper = mountTooltip({
      text: 'Placed tooltip',
      placement: 'bottom-end',
    });

    await wrapper.get('.md-tooltip__trigger').trigger('mouseenter');
    await flushTooltipOpen();

    const surface = document.body.querySelector('.md-tooltip__surface--plain');
    expect(surface?.style.left).toBe('36px');
    expect(surface?.style.top).toBe('160px');

    wrapper.unmount();
  });
});
