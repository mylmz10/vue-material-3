import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import MdButtonBase from '@/components/button/MdButtonBase.vue';

describe('MdButtonBase', () => {
  it('renders button element when href is not provided', () => {
    const wrapper = mount(MdButtonBase, {
      props: {
        type: 'submit',
        disabled: true,
      },
    });

    expect(wrapper.element.tagName).toBe('BUTTON');
    expect(wrapper.attributes('type')).toBe('submit');
    expect(wrapper.attributes('disabled')).toBeDefined();
  });

  it('renders anchor element when href is provided', () => {
    const wrapper = mount(MdButtonBase, {
      props: {
        href: 'https://example.com',
        target: '_blank',
        download: 'file.pdf',
      },
    });

    expect(wrapper.element.tagName).toBe('A');
    expect(wrapper.attributes('href')).toBe('https://example.com');
    expect(wrapper.attributes('target')).toBe('_blank');
    expect(wrapper.attributes('download')).toBe('file.pdf');
  });

  it('prevents navigation for soft-disabled links', () => {
    const wrapper = mount(MdButtonBase, {
      props: {
        href: 'https://example.com',
        softDisabled: true,
      },
    });

    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    wrapper.element.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(true);
  });
});
