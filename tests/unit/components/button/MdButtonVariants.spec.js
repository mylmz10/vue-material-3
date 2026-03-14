import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import MdElevatedButton from '@/components/button/MdElevatedButton.vue';
import MdFilledButton from '@/components/button/MdFilledButton.vue';
import MdFilledTonalButton from '@/components/button/MdFilledTonalButton.vue';
import MdOutlinedButton from '@/components/button/MdOutlinedButton.vue';
import MdTextButton from '@/components/button/MdTextButton.vue';

describe('button variants', () => {
  it('renders elevated button label and trailing icon', () => {
    const wrapper = mount(MdElevatedButton, {
      props: {
        label: 'Save',
        trailingIcon: 'chevron_right',
      },
    });

    expect(wrapper.classes()).toContain('md-elevated-button');
    expect(wrapper.text()).toContain('Save');
    expect(wrapper.text()).toContain('chevron_right');
  });

  it('renders filled button slot content when label is omitted', () => {
    const wrapper = mount(MdFilledButton, {
      slots: {
        default: 'Continue',
      },
    });

    expect(wrapper.classes()).toContain('md-filled-button');
    expect(wrapper.text()).toContain('Continue');
  });

  it('applies disabled state to filled tonal button', () => {
    const wrapper = mount(MdFilledTonalButton, {
      props: {
        label: 'Archive',
        disabled: true,
      },
    });

    expect(wrapper.attributes('disabled')).toBeDefined();
    expect(wrapper.classes()).toContain('md-filled-tonal-button');
  });

  it('renders outlined button outline element', () => {
    const wrapper = mount(MdOutlinedButton, {
      props: {
        label: 'Cancel',
      },
    });

    expect(wrapper.find('.md-button__outline').exists()).toBe(true);
  });

  it('renders text button label', () => {
    const wrapper = mount(MdTextButton, {
      props: {
        label: 'Learn more',
      },
    });

    expect(wrapper.classes()).toContain('md-text-button');
    expect(wrapper.text()).toContain('Learn more');
  });
});
