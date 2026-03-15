import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import MdSegmentedButton from '@/components/segmented-button/MdSegmentedButton.vue';
import MdSegmentedButtonSet from '@/components/segmented-button/MdSegmentedButtonSet.vue';

describe('segmented button components', () => {
  it('renders selected state and hides checkmark when requested', () => {
    const wrapper = mount(MdSegmentedButton, {
      props: {
        label: 'Overview',
        selected: true,
        noCheckmark: true,
      },
    });

    expect(wrapper.classes()).toContain('md-segmented-button--selected');
    expect(wrapper.find('.md-segmented-button__checkmark--show').exists()).toBe(false);
  });

  it('updates selected button in single-select set', async () => {
    const wrapper = mount(MdSegmentedButtonSet, {
      props: {
        items: [
          { label: 'Overview' },
          { label: 'Specs' },
        ],
        modelValue: 0,
      },
    });

    const buttons = wrapper.findAll('.md-segmented-button');
    expect(buttons[0].classes()).toContain('md-segmented-button--selected');

    await buttons[1].trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.findAll('.md-segmented-button')[1].classes()).toContain('md-segmented-button--selected');
  });

  it('supports multi-select mode', async () => {
    const wrapper = mount(MdSegmentedButtonSet, {
      props: {
        multiselect: true,
        items: [
          { label: 'Alpha' },
          { label: 'Beta' },
        ],
        modelValue: [],
      },
    });

    const buttons = wrapper.findAll('.md-segmented-button');
    await buttons[0].trigger('click');
    await buttons[1].trigger('click');
    await wrapper.vm.$nextTick();

    const updatedButtons = wrapper.findAll('.md-segmented-button');
    expect(updatedButtons[0].classes()).toContain('md-segmented-button--selected');
    expect(updatedButtons[1].classes()).toContain('md-segmented-button--selected');
  });
});
