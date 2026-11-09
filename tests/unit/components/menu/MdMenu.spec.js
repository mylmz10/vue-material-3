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
    expect(trigger.attributes('aria-haspopup')).toBe('menu');
    expect(trigger.attributes('aria-expanded')).toBe('false');
    const controlledId = trigger.attributes('aria-controls');
    expect(controlledId).toBeTruthy();
    await trigger.trigger('keydown', { key: 'ArrowRight' });

    const nestedContent = wrapper.get('.md-menu--nested .md-menu__content');
    expect(nestedContent.isVisible()).toBe(true);
    expect(nestedContent.attributes('id')).toBe(controlledId);
    expect(nestedContent.attributes('role')).toBe('menu');
    expect(trigger.attributes('aria-expanded')).toBe('true');

    await nestedContent.trigger('keydown', { key: 'Escape' });
    expect(document.activeElement).toBe(trigger.element);
    expect(trigger.attributes('aria-expanded')).toBe('false');
    expect(wrapper.classes()).toContain('md-menu--open');
    expect(trigger.attributes('aria-controls')).toBe(controlledId);

    wrapper.unmount();
  });

  it('gives independent submenus distinct controlled menu IDs', async () => {
    const wrapper = mount(MdMenu, {
      props: { modelValue: true },
      slots: { default: '<MdSubMenu label="First"><MdMenuItem label="One" /></MdSubMenu><MdSubMenu label="Second"><MdMenuItem label="Two" /></MdSubMenu>' },
      global: { components: { MdSubMenu, MdMenuItem } },
    });
    const triggers = wrapper.findAll('.md-sub-menu__trigger');
    const ids = triggers.map((trigger) => trigger.attributes('aria-controls'));
    expect(ids.every(Boolean)).toBe(true);
    expect(new Set(ids).size).toBe(2);
    await triggers[0].trigger('click');
    expect(triggers[0].attributes('aria-expanded')).toBe('true');
    await triggers[1].trigger('click');
    expect(triggers[0].attributes('aria-expanded')).toBe('false');
    expect(triggers[1].attributes('aria-expanded')).toBe('true');
    wrapper.unmount();
  });

  it('returns focus to the activator after escape', async () => {
    const wrapper = mount(MdMenu, {
      attachTo: document.body,
      props: {
        modelValue: true,
      },
      slots: {
        activator: '<button type="button" id="menu-trigger">Open menu</button>',
        default: '<MdMenuItem label="Profile" value="profile" />',
      },
      global: {
        components: {
          MdMenuItem,
        },
      },
    });

    await wrapper.get('.md-menu__content').trigger('keydown', { key: 'Escape' });
    await wrapper.vm.$nextTick();

    expect(document.activeElement).toBe(wrapper.get('#menu-trigger').element);
    wrapper.unmount();
  });
});
