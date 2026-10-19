import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import MdList from '@/components/list/MdList.vue';
import MdListDivider from '@/components/list/MdListDivider.vue';
import MdListItem from '@/components/list/MdListItem.vue';

describe('list components', () => {
  it('renders list slot content', () => {
    const wrapper = mount(MdList, {
      slots: {
        default: '<li class="custom-item">Content</li>',
      },
    });

    expect(wrapper.get('.custom-item').text()).toBe('Content');
  });

  it('renders list item variants and emits click', async () => {
    const wrapper = mount(MdListItem, {
      props: {
        headline: 'Notifications',
        supportingText: 'Manage alerts',
        supportingTextMultiline: 2,
        trailingText: 'On',
        icon: 'notifications',
        selected: true,
      },
    });

    expect(wrapper.classes()).toContain('md-list-item--selected');
    expect(wrapper.classes()).toContain('md-list-item--two-line');
    expect(wrapper.text()).toContain('Manage alerts');

    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toHaveLength(1);
  });

  it('supports keyboard activation for interactive list items', async () => {
    const wrapper = mount(MdListItem, {
      props: { interactive: true, headline: 'Notifications' },
    });

    expect(wrapper.attributes('role')).toBe('button');
    expect(wrapper.attributes('tabindex')).toBe('0');
    await wrapper.trigger('keydown', { key: 'Enter' });
    await wrapper.trigger('keydown', { key: ' ' });

    expect(wrapper.emitted('click')).toHaveLength(2);
  });

  it('renders list divider as li', () => {
    const wrapper = mount(MdListDivider);

    expect(wrapper.element.tagName).toBe('LI');
    expect(wrapper.classes()).toContain('md-list-divider');
  });
});
