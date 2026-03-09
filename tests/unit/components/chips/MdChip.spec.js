import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import MdChip from '@/components/chips/MdChip.vue';

describe('MdChip', () => {
  it('toggles selected state for filter variant', async () => {
    const wrapper = mount(MdChip, {
      props: {
        variant: 'filter',
        label: 'Filter',
        selected: false,
      },
    });

    await wrapper.trigger('click');

    expect(wrapper.emitted('update:selected')).toEqual([[true]]);
    expect(wrapper.emitted('input')).toEqual([[true]]);
    expect(wrapper.emitted('change')).toEqual([[true]]);
  });

  it('does not emit click when disabled', async () => {
    const wrapper = mount(MdChip, {
      props: {
        variant: 'filter',
        disabled: true,
        label: 'Disabled',
      },
    });

    await wrapper.trigger('click');

    expect(wrapper.emitted('click')).toBeUndefined();
    expect(wrapper.emitted('update:selected')).toBeUndefined();
  });

  it('emits remove when removable action is used', async () => {
    const wrapper = mount(MdChip, {
      props: {
        variant: 'input',
        removable: true,
        value: 'alpha',
        label: 'Input',
      },
    });

    await wrapper.get('.md-chip__remove').trigger('click');

    expect(wrapper.emitted('remove')).toEqual([['alpha']]);
  });

  it('ignores elevated style for input variant', () => {
    const wrapper = mount(MdChip, {
      props: {
        variant: 'input',
        elevated: true,
        label: 'Input',
      },
    });

    expect(wrapper.classes('md-chip--elevated')).toBe(false);
  });
});
