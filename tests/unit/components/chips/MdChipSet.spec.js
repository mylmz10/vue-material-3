import { h, ref, nextTick } from 'vue';
import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import MdChipSet from '@/components/chips/MdChipSet.vue';
import MdFilterChip from '@/components/chips/MdFilterChip.vue';

describe('MdChipSet', () => {
  it('navigates soft-disabled and always-focusable chips without activating them', async () => {
    const wrapper = mount(MdChipSet, {
      attachTo: document.body,
      props: { modelValue: 'a' },
      slots: {
        default: () => [
          h(MdFilterChip, { label: 'A', value: 'a' }),
          h(MdFilterChip, { label: 'Soft', value: 'b', softDisabled: true, removable: true }),
          h(MdFilterChip, { label: 'Hard', value: 'c', disabled: true }),
          h(MdFilterChip, { label: 'Discoverable', value: 'd', disabled: true, alwaysFocusable: true }),
          h(MdFilterChip, { label: 'Last', value: 'e' }),
        ],
      },
    });
    await nextTick();
    await nextTick();
    const chips = wrapper.findAll('.md-chip');
    chips[0].element.focus();
    await chips[0].trigger('keydown', { key: 'ArrowRight' });
    expect(document.activeElement).toBe(chips[1].element);
    expect(chips[1].attributes('tabindex')).toBe('0');
    for (const key of ['Enter', ' ', 'Delete', 'Backspace']) await chips[1].trigger('keydown', { key });
    await chips[1].trigger('keydown', { key: 'ArrowRight' });
    expect(document.activeElement).toBe(chips[3].element);
    expect(chips[3].attributes('tabindex')).toBe('0');
    await chips[3].trigger('keydown', { key: 'Enter' });
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    expect(chips[2].attributes('tabindex')).toBe('-1');
    await chips[3].trigger('keydown', { key: 'ArrowRight' });
    expect(document.activeElement).toBe(chips[4].element);
    wrapper.unmount();
  });

  it('honors boolean attributes and kebab-case always-focusable in template slots', async () => {
    const wrapper = mount(MdChipSet, {
      attachTo: document.body,
      slots: { default: '<MdFilterChip label="Soft" soft-disabled /><MdFilterChip label="Hard" disabled /><MdFilterChip label="Discoverable" disabled always-focusable />' },
      global: { components: { MdFilterChip } },
    });
    await nextTick();
    await nextTick();
    const chips = wrapper.findAll('.md-chip');
    expect(chips.map((chip) => chip.attributes('tabindex'))).toEqual(['0', '-1', '-1']);
    chips[0].element.focus();
    await chips[0].trigger('keydown', { key: 'ArrowRight' });
    expect(document.activeElement).toBe(chips[2].element);
    expect(chips[2].attributes('tabindex')).toBe('0');
    wrapper.unmount();
  });

  it('keeps one enabled tab stop as children are disabled, removed and re-enabled', async () => {
    const disabled = ref(false);
    const removed = ref(false);
    const allDisabled = ref(false);
    const wrapper = mount(MdChipSet, {
      props: { modelValue: 'b' },
      slots: {
        default: () => [
          h(MdFilterChip, { key: 'a', value: 'a', label: 'A', disabled: allDisabled.value }),
          ...(!removed.value ? [h(MdFilterChip, { key: 'b', value: 'b', label: 'B', disabled: disabled.value || allDisabled.value })] : []),
          h(MdFilterChip, { key: 'c', value: 'c', label: 'C', disabled: allDisabled.value }),
        ],
      },
    });
    await nextTick();
    await nextTick();
    const stops = () => wrapper.findAll('.md-chip[tabindex="0"]');
    expect(stops().map((chip) => chip.text())).toEqual(['B']);
    disabled.value = true;
    await nextTick();
    expect(stops().map((chip) => chip.text())).toEqual(['A']);
    removed.value = true;
    await nextTick();
    expect(stops()).toHaveLength(1);
    allDisabled.value = true;
    await nextTick();
    expect(stops()).toHaveLength(0);
    allDisabled.value = false;
    await nextTick();
    expect(stops()).toHaveLength(1);
    wrapper.unmount();
  });

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

  it('uses option semantics and skips disabled chips during keyboard navigation', async () => {
    const wrapper = mount(MdChipSet, {
      attachTo: document.body,
      slots: {
        default: () => [h(MdFilterChip, { label: 'One' }), h(MdFilterChip, { label: 'Disabled', disabled: true }), h(MdFilterChip, { label: 'Three' })],
      },
    });

    const chips = wrapper.findAll('.md-chip');
    expect(chips[0].attributes('role')).toBe('option');
    expect(chips[1].attributes('tabindex')).toBe('-1');

    await wrapper.get('.md-chip-set').trigger('keydown', { key: 'ArrowRight' });
    expect(document.activeElement).toBe(chips[2].element);
    wrapper.unmount();
  });
});
