import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import MdIconButton from '@/components/icon-button/MdIconButton.vue';

describe('MdIconButton', () => {
  it('toggles selected state and emits v-model events', async () => {
    const wrapper = mount(MdIconButton, {
      props: {
        icon: 'favorite',
        selectedIcon: 'favorite_filled',
        toggle: true,
        selected: false,
      },
    });

    await wrapper.trigger('click');

    expect(wrapper.emitted('update:selected')).toEqual([[true]]);
    expect(wrapper.emitted('input')).toEqual([[true]]);
    expect(wrapper.emitted('change')).toEqual([[true]]);
  });

  it('renders selected icon when selected', () => {
    const wrapper = mount(MdIconButton, {
      props: {
        icon: 'bookmark',
        selectedIcon: 'bookmark_added',
        toggle: true,
        selected: true,
      },
    });

    expect(wrapper.text()).toContain('bookmark_added');
  });

  it('prevents interaction for disabled links', async () => {
    const wrapper = mount(MdIconButton, {
      props: {
        icon: 'link',
        href: 'https://example.com',
        disabled: true,
        toggle: true,
      },
    });

    await wrapper.trigger('click');

    expect(wrapper.attributes('aria-disabled')).toBe('true');
    expect(wrapper.emitted('update:selected')).toBeUndefined();
  });
});
