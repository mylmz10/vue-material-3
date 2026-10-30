import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import MdCard from '@/components/card/MdCard.vue';

describe('MdCard', () => {
  it('does not activate an interactive card from nested controls', async () => {
    const wrapper = mount(MdCard, {
      props: { interactive: true },
      slots: { default: '<button><span>Nested action</span></button><a href="#details">Details</a><input aria-label="Name" /><span class="card-text">Card content</span>' },
    });
    await wrapper.get('button span').trigger('click');
    await wrapper.get('a').trigger('click');
    await wrapper.get('input').trigger('click');
    expect(wrapper.emitted('click')).toBeUndefined();
    await wrapper.get('.card-text').trigger('click');
    expect(wrapper.emitted('click')).toHaveLength(1);
    wrapper.unmount();
  });

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

  it('activates interactive cards with the keyboard', async () => {
    const wrapper = mount(MdCard, {
      props: { interactive: true },
    });

    expect(wrapper.attributes('role')).toBe('button');
    expect(wrapper.attributes('tabindex')).toBe('0');

    await wrapper.trigger('keydown', { key: 'Enter' });
    await wrapper.trigger('keydown', { key: ' ' });

    expect(wrapper.emitted('click')).toHaveLength(2);
  });
});
