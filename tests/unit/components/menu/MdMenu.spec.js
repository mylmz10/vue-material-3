import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import MdMenu from '@/components/menu/MdMenu.vue';
import MdMenuItem from '@/components/menu/MdMenuItem.vue';
import MdSubMenu from '@/components/menu/MdSubMenu.vue';

describe('MdMenu', () => {
  it('activates menu items with keyboard and closes on select', async () => {
    const wrapper = mount(MdMenu, {
      props: {
        modelValue: true,
      },
      slots: {
        default: '<MdMenuItem label="Profile" value="profile" />',
      },
      global: {
        components: {
          MdMenuItem,
        },
      },
    });

    const item = wrapper.get('.md-menu-item');
    await item.trigger('keydown', { key: 'Enter' });

    expect(wrapper.emitted('select')?.at(-1)).toEqual([
      {
        label: 'Profile',
        value: 'profile',
      },
    ]);
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([false]);
  });

  it('does not interact with disabled menu items', async () => {
    const wrapper = mount(MdMenu, {
      props: {
        modelValue: true,
      },
      slots: {
        default: '<MdMenuItem label="Delete" :disabled="true" value="delete" />',
      },
      global: {
        components: {
          MdMenuItem,
        },
      },
    });

    const disabledItem = wrapper.get('.md-menu-item');
    await disabledItem.trigger('click');

    expect(wrapper.emitted('select')).toBeUndefined();
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('opens and closes submenu with arrow and escape', async () => {
    const wrapper = mount(MdMenu, {
      attachTo: document.body,
      props: {
        modelValue: true,
      },
      slots: {
        default: `
          <MdSubMenu label="Share">
            <MdMenuItem label="Copy Link" />
            <MdMenuItem label="Email" />
          </MdSubMenu>
        `,
      },
      global: {
        components: {
          MdMenuItem,
          MdSubMenu,
        },
      },
    });

    const trigger = wrapper.get('.md-sub-menu .md-menu-item');
    await trigger.trigger('keydown', { key: 'ArrowRight' });

    const nestedContent = wrapper.get('.md-menu--nested .md-menu__content');
    expect(nestedContent.isVisible()).toBe(true);

    await nestedContent.trigger('keydown', { key: 'Escape' });
    expect(document.activeElement).toBe(trigger.element);

    wrapper.unmount();
  });
});
