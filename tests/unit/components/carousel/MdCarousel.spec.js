import { afterEach, describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import MdCarousel from '@/components/carousel/MdCarousel.vue';

const mounted = [];
const render = (options = {}) => {
  const wrapper = mount(MdCarousel, { props: { items: ['One', 'Two', 'Three'] }, ...options });
  mounted.push(wrapper);
  return wrapper;
};
afterEach(() => {
  mounted.splice(0).forEach((wrapper) => wrapper.unmount());
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe('MdCarousel', () => {
  it('names slides and supports empty/single item collections', async () => {
    const wrapper = render({ props: { items: [{ label: 'Mountains', image: '/mountains.jpg', alt: 'Snowy peaks' }], ariaLabel: 'Destinations' } });
    expect(wrapper.attributes('aria-label')).toBe('Destinations');
    expect(wrapper.get('[aria-roledescription="slide"]').attributes('aria-label')).toBe('1 of 1: Mountains');
    expect(wrapper.get('img').attributes('alt')).toBe('Snowy peaks');
    expect(wrapper.find('button').exists()).toBe(false);
    await wrapper.setProps({ items: [] });
    expect(wrapper.find('[aria-roledescription="slide"]').exists()).toBe(false);
    expect(wrapper.find('button').exists()).toBe(false);
  });

  it('moves with arrows and Home/End without wrapping or handling Tab', async () => {
    const wrapper = render();
    const viewport = wrapper.get('.md-carousel__viewport');
    await viewport.trigger('keydown', { key: 'ArrowRight' });
    expect(wrapper.emitted('update:modelValue')).toEqual([[1]]);
    await viewport.trigger('keydown', { key: 'End' });
    expect(wrapper.emitted('update:modelValue').at(-1)).toEqual([2]);
    expect(wrapper.get('button[aria-label="Next item"]').element.disabled).toBe(true);
    await viewport.trigger('keydown', { key: 'ArrowRight' });
    expect(wrapper.emitted('update:modelValue')).toHaveLength(2);
    await viewport.trigger('keydown', { key: 'Home' });
    expect(wrapper.emitted('update:modelValue').at(-1)).toEqual([0]);
    const tab = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
    viewport.element.dispatchEvent(tab);
    expect(tab.defaultPrevented).toBe(false);
  });

  it('preserves controlled selection until the parent accepts a change', async () => {
    const wrapper = render({ props: { items: ['One', 'Two', 'Three'], modelValue: 0 } });
    await wrapper.get('button[aria-label="Next item"]').trigger('click');
    expect(wrapper.emitted('update:modelValue')).toEqual([[1]]);
    expect(wrapper.get('.md-carousel__position').text()).toBe('1 / 3');
    await wrapper.setProps({ modelValue: 1 });
    expect(wrapper.get('.md-carousel__position').text()).toBe('2 / 3');
  });

  it('reverses horizontal keyboard navigation for RTL and leaves child controls alone', async () => {
    vi.spyOn(window, 'getComputedStyle').mockReturnValue({ direction: 'rtl' });
    const wrapper = render({ slots: { item: '<input aria-label="Edit item" />' } });
    await wrapper.get('.md-carousel__viewport').trigger('keydown', { key: 'ArrowLeft' });
    expect(wrapper.emitted('update:modelValue')).toEqual([[1]]);
    await wrapper.get('input').trigger('keydown', { key: 'ArrowLeft' });
    expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
  });

  it('updates selection from native scrolling and cancels queued work on unmount', async () => {
    let callback;
    vi.stubGlobal(
      'requestAnimationFrame',
      vi.fn((fn) => {
        callback = fn;
        return 7;
      })
    );
    vi.stubGlobal('cancelAnimationFrame', vi.fn());
    const wrapper = render();
    const viewport = wrapper.get('.md-carousel__viewport');
    viewport.element.getBoundingClientRect = () => ({ left: 0, right: 500 });
    wrapper.findAll('.md-carousel__item').forEach((slide, index) => {
      slide.element.getBoundingClientRect = () => ({ left: (index - 1) * 200 + 4, right: (index - 1) * 200 + 204 });
    });
    await viewport.trigger('scroll');
    callback();
    await nextTick();
    expect(wrapper.emitted('update:modelValue')).toEqual([[1]]);
    await viewport.trigger('scroll');
    wrapper.unmount();
    mounted.splice(mounted.indexOf(wrapper), 1);
    expect(cancelAnimationFrame).toHaveBeenCalledWith(7);
  });

  it('does not realign the viewport when a parent acknowledges native scrolling', async () => {
    let callback;
    vi.stubGlobal(
      'requestAnimationFrame',
      vi.fn((fn) => {
        callback = fn;
        return 1;
      })
    );
    const wrapper = render({ props: { items: ['One', 'Two', 'Three'], modelValue: 0 } });
    const viewport = wrapper.get('.md-carousel__viewport');
    const scroll = vi.fn();
    viewport.element.scrollBy = scroll;
    viewport.element.getBoundingClientRect = () => ({ left: 0, right: 500 });
    wrapper.findAll('.md-carousel__item').forEach((slide, index) => {
      slide.element.getBoundingClientRect = () => ({ left: (index - 1) * 200 + 4, right: (index - 1) * 200 + 204 });
    });
    await viewport.trigger('scroll');
    callback();
    await wrapper.setProps({ modelValue: 1 });
    await nextTick();
    expect(scroll).not.toHaveBeenCalled();
    await wrapper.setProps({ modelValue: 2 });
    await nextTick();
    expect(scroll).toHaveBeenCalledOnce();
  });

  it('provides a vertical show-all alternative and restores the carousel', async () => {
    const wrapper = render();
    const button = wrapper.get('.md-carousel__show-all');
    await button.trigger('click');
    expect(button.attributes('aria-expanded')).toBe('true');
    expect(wrapper.get('.md-carousel__viewport').classes()).toContain('md-carousel__viewport--all');
    expect(wrapper.find('.md-carousel__controls').exists()).toBe(false);
    await button.trigger('click');
    expect(wrapper.find('.md-carousel__controls').exists()).toBe(true);
  });

  it('does not reset selection from a pending scroll frame when showing all items', async () => {
    let frame;
    vi.stubGlobal('requestAnimationFrame', (callback) => {
      frame = callback;
      return 1;
    });
    vi.stubGlobal('cancelAnimationFrame', vi.fn());
    const wrapper = render({ props: { items: ['One', 'Two', 'Three'], modelValue: 2 } });
    await wrapper.get('.md-carousel__viewport').trigger('scroll');
    await wrapper.get('.md-carousel__show-all').trigger('click');
    frame();
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('keeps the requested controlled index through intermediate animation frames', async () => {
    let frame;
    vi.stubGlobal('requestAnimationFrame', (fn) => {
      frame = fn;
      return 1;
    });
    vi.stubGlobal('cancelAnimationFrame', vi.fn());
    const wrapper = render({ props: { items: ['One', 'Two', 'Three'], modelValue: 0 } });
    const viewport = wrapper.get('.md-carousel__viewport');
    viewport.element.scrollBy = vi.fn();
    viewport.element.getBoundingClientRect = () => ({ left: 0, right: 320 });
    let offset = 0;
    wrapper.findAll('.md-carousel__item').forEach((slide, index) => {
      slide.element.getBoundingClientRect = () => ({ left: index * 320 + 4 - offset, right: index * 320 + 324 - offset });
    });
    wrapper.vm.select(2);
    await wrapper.setProps({ modelValue: 2 });
    offset = 320;
    await viewport.trigger('scroll');
    frame();
    expect(wrapper.emitted('update:modelValue')).toEqual([[2]]);
    offset = 640;
    await viewport.trigger('scrollend');
    frame();
    expect(wrapper.emitted('update:modelValue')).toEqual([[2]]);
  });

  it('restores a rejected controlled target without repeating the request', async () => {
    const wrapper = render({ props: { items: ['One', 'Two', 'Three'], modelValue: 0 } });
    const viewport = wrapper.get('.md-carousel__viewport');
    viewport.element.scrollBy = vi.fn();
    wrapper.vm.select(2);
    await viewport.trigger('scrollend');
    expect(wrapper.emitted('update:modelValue')).toEqual([[2]]);
    expect(viewport.element.scrollBy.mock.calls.at(-1)[0].behavior).toBe('instant');
  });

  it('restores rejected instant navigation without repeated updates for reduced motion', async () => {
    let frame;
    let offset = 0;
    vi.stubGlobal('matchMedia', () => ({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() }));
    vi.stubGlobal('requestAnimationFrame', (fn) => {
      frame = fn;
      return 1;
    });
    vi.stubGlobal('cancelAnimationFrame', vi.fn());
    const wrapper = render({ props: { items: ['One', 'Two', 'Three'], modelValue: 0 } });
    const viewport = wrapper.get('.md-carousel__viewport');
    viewport.element.getBoundingClientRect = () => ({ left: 0, right: 320 });
    wrapper.findAll('.md-carousel__item').forEach((slide, index) => {
      slide.element.getBoundingClientRect = () => ({ left: index * 320 + 4 - offset, right: index * 320 + 324 - offset });
    });
    viewport.element.scrollBy = vi.fn(({ left }) => {
      offset += left;
    });
    wrapper.vm.select(2);
    await viewport.trigger('scroll');
    frame();
    expect(wrapper.emitted('update:modelValue')).toEqual([[2]]);
    await viewport.trigger('scrollend');
    expect(offset).toBe(0);
    expect(viewport.element.scrollBy.mock.calls.every(([options]) => options.behavior === 'instant')).toBe(true);
    await viewport.trigger('scroll');
    frame();
    expect(wrapper.emitted('update:modelValue')).toEqual([[2]]);
    await wrapper.setProps({ modelValue: 2 });
    await nextTick();
    expect(offset).toBe(640);
  });

  it.each(['scrollend', 'wheel'])('aligns a delayed controlled acceptance after %s', async (event) => {
    const wrapper = render({ props: { items: ['One', 'Two', 'Three'], modelValue: 0 } });
    const viewport = wrapper.get('.md-carousel__viewport');
    viewport.element.scrollBy = vi.fn();
    wrapper.vm.select(2);
    await viewport.trigger(event);
    viewport.element.scrollBy.mockClear();
    await wrapper.setProps({ modelValue: 2 });
    await nextTick();
    expect(viewport.element.scrollBy).toHaveBeenCalled();
    expect(viewport.element.scrollBy.mock.calls.at(-1)[0].behavior).toBe('smooth');
  });

  it('uses instant navigation for reduced motion and listens for preference changes', async () => {
    const query = { matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() };
    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => query)
    );
    const wrapper = render();
    const scroll = vi.fn();
    wrapper.get('.md-carousel__viewport').element.scrollBy = scroll;
    wrapper.vm.select(1);
    expect(scroll.mock.calls[0][0].behavior).toBe('instant');
    expect(query.addEventListener).toHaveBeenCalledWith('change', expect.any(Function));
    wrapper.unmount();
    mounted.splice(mounted.indexOf(wrapper), 1);
    expect(query.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
  });

  it('renews the scroll idle fallback and cancels navigation work on unmount', async () => {
    vi.useFakeTimers();
    const wrapper = render();
    const viewport = wrapper.get('.md-carousel__viewport');
    viewport.element.scrollBy = vi.fn();
    wrapper.vm.select(2);
    expect(vi.getTimerCount()).toBe(1);
    vi.advanceTimersByTime(100);
    await viewport.trigger('scroll');
    vi.advanceTimersByTime(80);
    expect(vi.getTimerCount()).toBe(1);
    wrapper.unmount();
    mounted.splice(mounted.indexOf(wrapper), 1);
    expect(vi.getTimerCount()).toBe(0);
  });

  it('cancels a smooth move on wheel input and does not submit a surrounding form', async () => {
    const wrapper = render();
    const viewport = wrapper.get('.md-carousel__viewport');
    viewport.element.scrollBy = vi.fn();
    viewport.element.scrollTo = vi.fn();
    wrapper.vm.select(2);
    await viewport.trigger('wheel');
    expect(viewport.element.scrollTo).toHaveBeenCalledWith({ left: 0, behavior: 'instant' });
    expect(wrapper.findAll('button').every((button) => button.attributes('type') === 'button')).toBe(true);
  });

  it('animates intentional navigation but aligns changed item layouts instantly', async () => {
    const wrapper = render();
    const scroll = vi.fn();
    wrapper.get('.md-carousel__viewport').element.scrollBy = scroll;
    wrapper.vm.select(2);
    await nextTick();
    expect(scroll.mock.calls[0][0].behavior).toBe('smooth');
    await wrapper.setProps({ items: ['One'] });
    await nextTick();
    expect(wrapper.emitted('change')[0]).toEqual([2]);
    expect(scroll.mock.calls.at(-1)[0].behavior).toBe('instant');
    await wrapper.setProps({ items: ['One', 'Two'] });
    expect(wrapper.get('.md-carousel__position').text()).toBe('1 / 2');
  });
});
