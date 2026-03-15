import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import MdSearch from '@/components/search/MdSearch.vue';

describe('MdSearch', () => {
  it('emits model updates from input changes', async () => {
    const wrapper = mount(MdSearch, {
      props: {
        modelValue: '',
        placeholder: 'Search',
      },
    });

    await wrapper.get('input').setValue('tabs');

    expect(wrapper.emitted('update:modelValue')).toEqual([['tabs']]);
  });

  it('emits icon button interactions and renders avatar slot', async () => {
    const wrapper = mount(MdSearch, {
      props: {
        showAvatar: true,
        trailingIcon: 'close',
      },
      slots: {
        avatar: '<span class="avatar-slot">VM</span>',
      },
    });

    const buttons = wrapper.findAll('.md-icon-button');
    await buttons[0].trigger('click');
    await buttons[1].trigger('click');

    expect(wrapper.emitted('searchClick')).toHaveLength(1);
    expect(wrapper.emitted('trailingClick')).toHaveLength(1);
    expect(wrapper.get('.avatar-slot').text()).toBe('VM');
  });
});
