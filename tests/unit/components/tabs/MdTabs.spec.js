import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import MdTabs from '@/components/tabs/MdTabs.vue';
import MdPrimaryTab from '@/components/tabs/MdPrimaryTab.vue';
import MdSecondaryTab from '@/components/tabs/MdSecondaryTab.vue';

describe('MdTabs', () => {
  it('syncs selected tab from modelValue', async () => {
    const wrapper = mount(MdTabs, {
      props: {
        modelValue: 1,
      },
      slots: {
        default: `
          <MdPrimaryTab label="First" panel-id="panel-1" />
          <MdPrimaryTab label="Second" panel-id="panel-2" />
          <MdPrimaryTab label="Third" panel-id="panel-3" />
        `,
      },
      global: {
        components: {
          MdPrimaryTab,
        },
      },
    });

    await wrapper.vm.$nextTick();
    const tabs = wrapper.findAll('.md-primary-tab');
    expect(tabs[1].attributes('aria-selected')).toBe('true');
    expect(tabs[0].attributes('aria-selected')).toBe('false');
  });

  it('supports arrow keyboard traversal and selection', async () => {
    const wrapper = mount(MdTabs, {
      attachTo: document.body,
      props: {
        modelValue: 0,
      },
      slots: {
        default: `
          <MdPrimaryTab label="First" panel-id="panel-1" />
          <MdPrimaryTab label="Second" panel-id="panel-2" />
          <MdPrimaryTab label="Third" panel-id="panel-3" />
        `,
      },
      global: {
        components: {
          MdPrimaryTab,
        },
      },
    });

    const tabList = wrapper.get('.md-tabs');
    await tabList.trigger('keydown', { key: 'ArrowRight' });

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([1]);

    wrapper.unmount();
  });

  it('supports manual activation mode', async () => {
    const wrapper = mount(MdTabs, {
      attachTo: document.body,
      props: {
        modelValue: 0,
        activationMode: 'manual',
      },
      slots: {
        default: `
          <MdPrimaryTab label="First" panel-id="panel-1" />
          <MdPrimaryTab label="Second" panel-id="panel-2" />
          <MdPrimaryTab label="Third" panel-id="panel-3" />
        `,
      },
      global: {
        components: {
          MdPrimaryTab,
        },
      },
    });

    const tabList = wrapper.get('.md-tabs');
    await tabList.trigger('keydown', { key: 'ArrowRight' });
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();

    await tabList.trigger('keydown', { key: 'Enter' });
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([1]);

    wrapper.unmount();
  });

  it('renders primary tab slot content outside tabs context', () => {
    const wrapper = mount(MdPrimaryTab, {
      props: {
        selected: true,
      },
      slots: {
        default: 'Flights',
      },
    });

    expect(wrapper.text()).toContain('Flights');
    expect(wrapper.attributes('aria-selected')).toBe('true');
  });

  it('supports secondary tabs inside tabs context', async () => {
    const wrapper = mount(MdTabs, {
      props: {
        modelValue: 1,
      },
      slots: {
        default: `
          <MdSecondaryTab panel-id="panel-1">Overview</MdSecondaryTab>
          <MdSecondaryTab panel-id="panel-2">Specifications</MdSecondaryTab>
        `,
      },
      global: {
        components: {
          MdSecondaryTab,
        },
      },
    });

    await wrapper.vm.$nextTick();
    const tabs = wrapper.findAll('.md-secondary-tab');
    expect(tabs[1].attributes('aria-selected')).toBe('true');
    expect(tabs[0].text()).toContain('Overview');
  });
});
