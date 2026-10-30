import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { h, nextTick, ref } from 'vue';
import MdTabs from '@/components/tabs/MdTabs.vue';
import MdPrimaryTab from '@/components/tabs/MdPrimaryTab.vue';
import MdSecondaryTab from '@/components/tabs/MdSecondaryTab.vue';

describe('MdTabs', () => {
  it('preserves an initial parent model until all children finish registering', async () => {
    const selected = ref(2);
    const wrapper = mount({
      setup: () => () =>
        h(
          MdTabs,
          { modelValue: selected.value, 'onUpdate:modelValue': (value) => (selected.value = value) },
          { default: () => ['A', 'B', 'C'].map((label) => h(MdPrimaryTab, { key: label, label })) }
        ),
    });
    await nextTick();
    await nextTick();
    expect(selected.value).toBe(2);
    expect(wrapper.findAll('[role="tab"]').map((tab) => tab.attributes('aria-selected'))).toEqual(['false', 'false', 'true']);
    wrapper.unmount();
  });

  it('traverses reordered keyed tabs in DOM order and preserves uncontrolled selected identity', async () => {
    const labels = ref(['A', 'B', 'C']);
    const wrapper = mount({ setup: () => () => h(MdTabs, {}, { default: () => labels.value.map((label) => h(MdPrimaryTab, { key: label, label })) }) }, { attachTo: document.body });
    await nextTick();
    labels.value = ['C', 'B', 'A'];
    await nextTick();
    await nextTick();
    const tabs = wrapper.findAll('[role="tab"]');
    expect(tabs.map((tab) => tab.attributes('aria-selected'))).toEqual(['false', 'false', 'true']);
    tabs[0].element.focus();
    await tabs[0].trigger('keydown', { key: 'ArrowRight' });
    expect(document.activeElement).toBe(tabs[1].element);
    expect(tabs[1].attributes('aria-selected')).toBe('true');
    wrapper.unmount();
  });

  it('corrects a removed controlled tab only after the complete update', async () => {
    const selected = ref(2);
    const labels = ref(['A', 'B', 'C']);
    const wrapper = mount({
      setup: () => () =>
        h(MdTabs, { modelValue: selected.value, 'onUpdate:modelValue': (value) => (selected.value = value) }, { default: () => labels.value.map((label) => h(MdPrimaryTab, { key: label, label })) }),
    });
    await nextTick();
    labels.value = ['A', 'B'];
    await nextTick();
    await nextTick();
    expect(selected.value).toBe(1);
    expect(wrapper.findAll('[role="tab"]')[1].attributes('aria-selected')).toBe('true');
    wrapper.unmount();
  });

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

  it('uses vertical arrow keys for vertical tabs only', async () => {
    const wrapper = mount(MdTabs, {
      attachTo: document.body,
      props: { modelValue: 0, orientation: 'vertical' },
      slots: {
        default: '<MdPrimaryTab label="First" /><MdPrimaryTab label="Second" />',
      },
      global: { components: { MdPrimaryTab } },
    });

    const tabList = wrapper.get('.md-tabs');
    await tabList.trigger('keydown', { key: 'ArrowRight' });
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();

    await tabList.trigger('keydown', { key: 'ArrowDown' });
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

  it('sizes the primary tab indicator from its content', () => {
    const wrapper = mount(MdPrimaryTab, {
      props: { label: 'Amazing views' },
    });

    expect(wrapper.find('.md-primary-tab__content > .md-primary-tab__indicator').exists()).toBe(true);
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
