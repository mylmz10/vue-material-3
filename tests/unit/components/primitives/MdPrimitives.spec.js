import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import MdAvatar from '@/components/avatar/MdAvatar.vue';
import MdBadge from '@/components/badge/MdBadge.vue';
import MdCircularProgressIndicator from '@/components/progress-indicator/MdCircularProgressIndicator.vue';
import MdDivider from '@/components/divider/MdDivider.vue';
import MdIcon from '@/components/icon/MdIcon.vue';
import MdLinearProgressIndicator from '@/components/progress-indicator/MdLinearProgressIndicator.vue';

describe('visual primitives', () => {
  it('renders icon slot content', () => {
    const wrapper = mount(MdIcon, {
      slots: {
        default: 'settings',
      },
    });

    expect(wrapper.get('.material-symbols-outlined').text()).toBe('settings');
  });

  it('renders badge value and large class when populated', () => {
    const wrapper = mount(MdBadge, {
      props: {
        value: 9,
        absolute: false,
      },
    });

    expect(wrapper.classes()).toContain('md-badge--large');
    expect(wrapper.classes()).not.toContain('md-badge--absolute');
    expect(wrapper.text()).toContain('9');
  });

  it('renders avatar initials', () => {
    const wrapper = mount(MdAvatar, {
      props: {
        initials: 'VM',
      },
    });

    expect(wrapper.text()).toContain('VM');
  });

  it('renders divider with requested tag and orientation', () => {
    const wrapper = mount(MdDivider, {
      props: {
        tag: 'li',
        vertical: true,
      },
    });

    expect(wrapper.element.tagName).toBe('LI');
    expect(wrapper.classes()).toContain('md-divider--vertical');
  });

  it('renders determinate and indeterminate linear progress states', async () => {
    const wrapper = mount(MdLinearProgressIndicator, {
      props: {
        value: 35,
      },
    });

    expect(wrapper.get('.md-linear-progress-indicator__indicator').attributes('style')).toContain('35%');

    await wrapper.setProps({ indeterminate: true });
    expect(wrapper.classes()).toContain('md-linear-progress-indicator--indeterminate');
  });

  it('renders circular progress value and indeterminate mode', async () => {
    const wrapper = mount(MdCircularProgressIndicator, {
      props: {
        value: 72,
      },
    });

    expect(wrapper.attributes('value')).toBe('72');

    await wrapper.setProps({ indeterminate: true });
    expect(wrapper.attributes('value')).toBeUndefined();
    expect(wrapper.classes()).toContain('md-circular-progress-indicator--indeterminate');
  });
});
