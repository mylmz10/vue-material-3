import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import MdSlider from '@/components/slider/MdSlider.vue';

describe('MdSlider', () => {
  it('emits single slider updates on input/change', async () => {
    const wrapper = mount(MdSlider, {
      props: {
        min: 0,
        max: 100,
        step: 1,
        modelValue: 50,
      },
    });

    const input = wrapper.get('.md-slider__input--end');
    input.element.value = '70';
    await input.trigger('input');
    await input.trigger('change');

    expect(wrapper.emitted('update:modelValue')).toEqual([[70], [70]]);
    expect(wrapper.emitted('input')).toEqual([[70]]);
    expect(wrapper.emitted('change')).toEqual([[70]]);
  });

  it('keeps range values ordered and emits start/end updates', async () => {
    const wrapper = mount(MdSlider, {
      props: {
        range: true,
        min: 0,
        max: 100,
        step: 1,
        valueStart: 20,
        valueEnd: 80,
      },
    });

    const startInput = wrapper.get('.md-slider__input--start');
    startInput.element.value = '95';
    await startInput.trigger('input');

    expect(wrapper.emitted('update:valueStart')?.[0]).toEqual([80]);
    expect(wrapper.emitted('input')?.[0]).toEqual([
      {
        activeThumb: 'start',
        valueEnd: 80,
        valueStart: 80,
      },
    ]);
  });

  it('renders tick marks when ticks is enabled', () => {
    const wrapper = mount(MdSlider, {
      props: {
        min: 0,
        max: 100,
        step: 10,
        ticks: true,
      },
    });

    const ticks = wrapper.findAll('.md-slider__tick');
    expect(ticks.length).toBe(11);
  });

  it('shows labels when labeled slider is hovered', async () => {
    const wrapper = mount(MdSlider, {
      props: {
        labeled: true,
        modelValue: 40,
      },
    });

    await wrapper.trigger('mouseenter');

    expect(wrapper.find('.md-slider__label--end').classes()).toContain('md-slider__label--visible');
  });
});
