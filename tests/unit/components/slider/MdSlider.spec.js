import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { h, nextTick, ref } from 'vue';
import MdSlider from '@/components/slider/MdSlider.vue';

describe('MdSlider', () => {
  it('initializes range model endpoints and prioritizes them over endpoint props', async () => {
    const wrapper = mount(MdSlider, {
      props: { range: true, modelValue: { valueStart: 20, valueEnd: 80 }, valueStart: 10, valueEnd: 90 },
    });

    expect(wrapper.findAll('input').map((input) => input.element.value)).toEqual(['20', '80']);
    await wrapper.setProps({ valueStart: 5, valueEnd: 95 });
    expect(wrapper.findAll('input').map((input) => input.element.value)).toEqual(['20', '80']);
  });

  it('updates both range inputs from an external model without emitting feedback', async () => {
    const wrapper = mount(MdSlider, {
      props: { range: true, modelValue: { valueStart: 20, valueEnd: 80 } },
    });

    await wrapper.setProps({ modelValue: { valueStart: 30, valueEnd: 70 } });
    expect(wrapper.findAll('input').map((input) => input.element.value)).toEqual(['30', '70']);
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('round-trips range interactions through a parent model and observes nested endpoint changes', async () => {
    const range = ref({ valueStart: 20, valueEnd: 80 });
    const wrapper = mount({
      setup: () => () => h(MdSlider, { range: true, modelValue: range.value, 'onUpdate:modelValue': (value) => (range.value = value) }),
    });

    await wrapper.get('.md-slider__input--start').setValue(30);
    await wrapper.get('.md-slider__input--end').setValue(70);
    expect(range.value).toEqual({ valueStart: 30, valueEnd: 70 });

    range.value.valueStart = 40;
    await nextTick();
    expect(wrapper.findAll('input').map((input) => input.element.value)).toEqual(['40', '70']);
  });

  it('falls back to endpoint props for missing model endpoints and preserves zero', () => {
    const wrapper = mount(MdSlider, {
      props: { range: true, modelValue: { valueStart: 0 }, valueStart: 20, valueEnd: 80 },
    });

    expect(wrapper.findAll('input').map((input) => input.element.value)).toEqual(['0', '80']);
  });

  it.each([
    [{ valueStart: -10, valueEnd: 120 }, ['0', '100']],
    [{ valueStart: 90, valueEnd: 10 }, ['10', '90']],
    [{ valueStart: 22, valueEnd: 78 }, ['20', '80']],
  ])('normalizes range model %j using bounds, ordering and step', (modelValue, expected) => {
    const wrapper = mount(MdSlider, { props: { range: true, step: 5, modelValue } });
    expect(wrapper.findAll('input').map((input) => input.element.value)).toEqual(expected);
  });

  it('preserves the unbound endpoint when an endpoint prop changes without a model', async () => {
    const wrapper = mount(MdSlider, { props: { range: true, valueStart: 20 } });
    await wrapper.get('.md-slider__input--end').setValue(70);
    await wrapper.setProps({ valueStart: 30 });
    expect(wrapper.findAll('input').map((input) => input.element.value)).toEqual(['30', '70']);
  });

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
