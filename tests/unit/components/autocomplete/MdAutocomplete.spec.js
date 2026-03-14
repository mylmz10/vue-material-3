import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import MdFilledAutoComplete from '@/components/autocomplete/MdFilledAutoComplete.vue';
import MdOutlinedAutoComplete from '@/components/autocomplete/MdOutlinedAutoComplete.vue';

describe('autocomplete components', () => {
  it('filters filled autocomplete items and emits search updates', async () => {
    const wrapper = mount(MdFilledAutoComplete, {
      props: {
        items: ['Istanbul', 'Ankara', 'Izmir'],
        label: 'City',
      },
    });

    const input = wrapper.get('input');
    await input.trigger('focus');
    await input.setValue('an');
    await nextTick();

    expect(wrapper.emitted('update:search')?.at(-1)).toEqual(['an']);
    expect(wrapper.text()).toContain('Ankara');
  });

  it('renders empty state for outlined autocomplete', async () => {
    const wrapper = mount(MdOutlinedAutoComplete, {
      props: {
        items: [],
        label: 'City',
      },
    });

    await wrapper.get('input').trigger('focus');
    await nextTick();

    expect(wrapper.text()).toContain('No data available');
  });
});
