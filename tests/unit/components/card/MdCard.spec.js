import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import MdCard from '@/components/card/MdCard.vue';

describe('MdCard', () => {
  it('renders header, avatar and footer actions', () => {
    const wrapper = mount(MdCard, {
      props: {
        type: 'outlined',
        headerTitle: 'Release wave',
        headerSubTitle: 'Storybook sync',
        avatarInitials: 'VM',
        actionButtonText: 'Publish',
        cancelButtonText: 'Cancel',
      },
      slots: {
        default: 'Card content',
      },
    });

    expect(wrapper.classes()).toContain('md-card--outlined');
    expect(wrapper.text()).toContain('Release wave');
    expect(wrapper.text()).toContain('Storybook sync');
    expect(wrapper.text()).toContain('VM');
    expect(wrapper.text()).toContain('Card content');
  });

  it('emits action and cancel events from footer buttons', async () => {
    const wrapper = mount(MdCard, {
      props: {
        actionButtonText: 'Save',
        cancelButtonText: 'Dismiss',
      },
    });

    await wrapper.get('.md-outlined-button').trigger('click');
    await wrapper.get('.md-filled-button').trigger('click');

    expect(wrapper.emitted('cancel')).toHaveLength(1);
    expect(wrapper.emitted('action')).toHaveLength(1);
  });
});
