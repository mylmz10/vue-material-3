import { h } from 'vue';
import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import MdChipSet from '@/components/chips/MdChipSet.vue';
import MdFilterChip from '@/components/chips/MdFilterChip.vue';

describe('MdChipSet', () => {
  it('emits scalar model update in single selection mode', async () => {
    const wrapper = mount(MdChipSet, {
      props: {
        modelValue: 0,
        selectionMode: 'single',
      },
      slots: {
        default: () => [h(MdFilterChip, { label: 'One', value: 0 }), h(MdFilterChip, { label: 'Two', value: 1 })],
      },
    });

    const chips = wrapper.findAll('.md-chip');
    await chips[1].trigger('click');

    expect(wrapper.emitted('update:modelValue')).toEqual([[1]]);
  });

  it('emits array model update in multi selection mode', async () => {
    const wrapper = mount(MdChipSet, {
      props: {
        modelValue: ['alpha'],
        selectionMode: 'multi',
      },
      slots: {
        default: () => [h(MdFilterChip, { label: 'Alpha', value: 'alpha' }), h(MdFilterChip, { label: 'Beta', value: 'beta' })],
      },
    });

    const chips = wrapper.findAll('.md-chip');
    await chips[1].trigger('click');

    expect(wrapper.emitted('update:modelValue')).toEqual([[['alpha', 'beta']]]);
  });

  it('supports keyboard navigation and activation', async () => {
    const wrapper = mount(MdChipSet, {
      attachTo: document.body,
      props: {
        modelValue: 0,
        selectionMode: 'single',
      },
      slots: {
        default: () => [h(MdFilterChip, { label: 'One', value: 0 }), h(MdFilterChip, { label: 'Two', value: 1 }), h(MdFilterChip, { label: 'Three', value: 2 })],
      },
    });

    const chipSet = wrapper.get('.md-chip-set');
    await chipSet.trigger('keydown', { key: 'ArrowRight' });
    await chipSet.trigger('keydown', { key: 'Enter' });

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([1]);

    wrapper.unmount();
  });
});
