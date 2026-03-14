import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import MdNavigationBar from '@/components/navigation-bar/MdNavigationBar.vue';
import MdNavigationDrawer from '@/components/navigation-drawer/MdNavigationDrawer.vue';
import MdNavigationTab from '@/components/navigation-tab/MdNavigationTab.vue';

describe('navigation components', () => {
  it('emits selected index from navigation bar', async () => {
    const wrapper = mount(MdNavigationBar, {
      props: {
        modelValue: 0,
        items: [
          { label: 'Flights', activeIcon: 'flight' },
          { label: 'Trips', activeIcon: 'luggage' },
        ],
      },
    });

    await wrapper.findAll('.md-navigation-tab')[1].trigger('click');

    expect(wrapper.emitted('update:modelValue')).toEqual([[1]]);
  });

  it('renders selected navigation tab state', () => {
    const wrapper = mount(MdNavigationTab, {
      props: {
        label: 'Explore',
        activeIcon: 'explore',
        selected: true,
      },
    });

    expect(wrapper.classes()).toContain('md-navigation-tab--selected');
    expect(wrapper.text()).toContain('Explore');
  });

  it('closes modal navigation drawer from overlay click', async () => {
    const wrapper = mount(MdNavigationDrawer, {
      attachTo: document.body,
      props: {
        opened: true,
        modal: true,
      },
      slots: {
        default: '<div>Drawer</div>',
      },
    });

    await wrapper.get('.md-navigation-drawer__overlay').trigger('click');

    expect(wrapper.emitted('change')).toEqual([[false]]);

    wrapper.unmount();
  });
});
