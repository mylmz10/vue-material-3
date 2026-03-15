import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import MdBrandedFab from '@/components/fab/MdBrandedFab.vue';
import MdFab from '@/components/fab/MdFab.vue';
import MdFabExtended from '@/components/fab/MdFabExtended.vue';

describe('fab variants', () => {
  it('renders fab icon and size modifier', () => {
    const wrapper = mount(MdFab, {
      props: {
        icon: 'add',
        size: 'large',
      },
    });

    expect(wrapper.classes()).toContain('md-fab--large');
    expect(wrapper.text()).toContain('add');
  });

  it('renders branded fab extended variant when label is present', () => {
    const wrapper = mount(MdBrandedFab, {
      props: {
        icon: 'edit',
        label: 'Compose',
      },
    });

    expect(wrapper.classes()).toContain('md-branded-fab--extended');
    expect(wrapper.text()).toContain('Compose');
  });

  it('renders extended fab label and disabled attribute', () => {
    const wrapper = mount(MdFabExtended, {
      props: {
        icon: 'share',
        label: 'Share',
        disabled: true,
      },
    });

    expect(wrapper.text()).toContain('Share');
    expect(wrapper.attributes('disabled')).toBeDefined();
  });
});
