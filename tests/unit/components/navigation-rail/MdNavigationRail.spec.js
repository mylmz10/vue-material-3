import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import MdNavigationRail from '@/components/navigation-rail/MdNavigationRail.vue';
const items = [
  { label: 'Home', icon: 'home', activeIcon: 'home_filled' },
  { label: 'Disabled', icon: 'block', disabled: true },
  { label: 'Inbox', icon: 'mail', badge: 3, badgeLabel: '3 unread messages' },
];
describe('MdNavigationRail', () => {
  it('shows focus and pressed state when the actual destination button is used', async () => {
    const wrapper = mount(MdNavigationRail, { props: { items, modelValue: 0 } });
    const button = wrapper.get('button');
    button.element.matches = vi.fn((selector) => selector === ':focus-visible');
    await button.trigger('focusin');
    expect(button.find('.md-ripple-surface--focused').exists()).toBe(true);
    await button.get('.md-navigation-rail__label').trigger('pointerdown', { button: 0 });
    expect(button.find('.md-ripple-surface--pressed').exists()).toBe(true);
    wrapper.unmount();
  });
  it('uses controlled selection and exposes badge meaning even with hidden labels', async () => {
    const wrapper = mount(MdNavigationRail, { props: { items, modelValue: 0, labels: 'none' } });
    const buttons = wrapper.findAll('button');
    expect(buttons[0].attributes('aria-current')).toBe('page');
    expect(buttons[0].text()).toContain('home_filled');
    expect(buttons[2].attributes('aria-label')).toContain('3 unread messages');
    expect(wrapper.find('.md-navigation-rail__label').exists()).toBe(false);
    await buttons[2].trigger('click');
    expect(wrapper.emitted('update:modelValue')).toEqual([[2]]);
    expect(buttons[0].attributes('aria-current')).toBe('page');
    await wrapper.setProps({ modelValue: 2 });
    expect(buttons[2].attributes('aria-current')).toBe('page');
  });
  it('moves focus across enabled destinations without changing selection', async () => {
    const wrapper = mount(MdNavigationRail, { attachTo: document.body, props: { items, modelValue: 0 } });
    const buttons = wrapper.findAll('button');
    buttons[0].element.focus();
    await buttons[0].trigger('keydown', { key: 'ArrowDown' });
    expect(document.activeElement).toBe(buttons[2].element);
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    await buttons[2].trigger('keydown', { key: 'ArrowDown' });
    expect(document.activeElement).toBe(buttons[0].element);
    await buttons[0].trigger('keydown', { key: 'End' });
    expect(document.activeElement).toBe(buttons[2].element);
    await buttons[2].trigger('keydown', { key: 'Home' });
    expect(document.activeElement).toBe(buttons[0].element);
    wrapper.unmount();
  });
  it('recovers the tab stop when a focused destination becomes disabled', async () => {
    const wrapper = mount(MdNavigationRail, { props: { items, modelValue: 2 } });
    await wrapper.setProps({ items: items.map((item) => ({ ...item, disabled: true })) });
    expect(wrapper.findAll('[tabindex="0"]')).toHaveLength(0);
    await wrapper.setProps({ items });
    expect(wrapper.findAll('[tabindex="0"]')).toHaveLength(1);
  });
});
