import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import MdAssistChip from '@/components/chips/MdAssistChip.vue';
import MdFilterChip from '@/components/chips/MdFilterChip.vue';
import MdInputChip from '@/components/chips/MdInputChip.vue';
import MdSuggestionChip from '@/components/chips/MdSuggestionChip.vue';

describe('chip variants', () => {
  it('emits click for assist chip', async () => {
    const wrapper = mount(MdAssistChip, {
      props: {
        label: 'Assist',
      },
    });

    await wrapper.trigger('click');

    expect(wrapper.emitted('click')).toHaveLength(1);
  });

  it('toggles selected state for filter chip', async () => {
    const wrapper = mount(MdFilterChip, {
      props: {
        label: 'Filter',
        selected: false,
      },
    });

    await wrapper.trigger('click');

    expect(wrapper.emitted('update:selected')).toEqual([[true]]);
  });

  it('emits remove from input chip', async () => {
    const wrapper = mount(MdInputChip, {
      props: {
        label: 'Input',
        removable: true,
        value: 'alpha',
      },
    });

    await wrapper.get('.md-chip__remove').trigger('click');

    expect(wrapper.emitted('remove')).toEqual([['alpha']]);
  });

  it('renders leading icon for suggestion chip', () => {
    const wrapper = mount(MdSuggestionChip, {
      props: {
        label: 'Suggestion',
        leadingIcon: 'lightbulb',
      },
    });

    expect(wrapper.text()).toContain('lightbulb');
  });
});
