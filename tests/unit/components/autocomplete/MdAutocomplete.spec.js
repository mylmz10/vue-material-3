import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import MdFilledAutoComplete from '@/components/autocomplete/MdFilledAutoComplete.vue';
import MdOutlinedAutoComplete from '@/components/autocomplete/MdOutlinedAutoComplete.vue';

describe('autocomplete components', () => {
  describe.each([
    ['filled', MdFilledAutoComplete],
    ['outlined', MdOutlinedAutoComplete],
  ])('%s filtered selection', (_, component) => {
    it.each(['Apple', 'Banana', 'Papaya'])('emits the clicked suggestion %s after filtering', async (selected) => {
      const wrapper = mount(component, {
        props: { items: ['Cherry', 'Apple', 'Banana', 'Papaya'] },
      });

      await wrapper.get('input').trigger('focus');
      await wrapper.get('input').setValue('a');
      const suggestions = wrapper.findAll('.md-list-item');
      expect(suggestions.map((item) => item.text())).toEqual(['Apple', 'Banana', 'Papaya']);

      await suggestions.find((item) => item.text() === selected).trigger('click');

      expect(wrapper.emitted('update:modelValue')).toEqual([[selected]]);
      expect(wrapper.get('input').element.value).toBe(selected);
      expect(wrapper.get('.md-menu').classes()).not.toContain('md-menu--open');
      wrapper.unmount();
    });
  });

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

  it('handles omitted items and external model updates', async () => {
    const wrapper = mount(MdFilledAutoComplete, {
      props: {
        label: 'City',
      },
    });

    expect(wrapper.text()).toContain('No data available');

    await wrapper.setProps({ modelValue: 'Izmir' });
    expect(wrapper.get('input').element.value).toBe('Izmir');
  });

  it('ignores non-string suggestions while filtering', async () => {
    const wrapper = mount(MdFilledAutoComplete, {
      props: { items: ['Ankara', 1, null] },
    });

    await wrapper.get('input').trigger('focus');
    await wrapper.get('input').setValue('an');

    expect(wrapper.text()).toContain('Ankara');
  });
});
