import { defineComponent, nextTick } from 'vue';
import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import MdRadio from '@/components/radio/MdRadio.vue';

describe('MdRadio', () => {
  it('applies checked class when modelValue equals value', () => {
    const wrapper = mount(MdRadio, {
      props: {
        value: '1',
        modelValue: '1',
      },
    });

    expect(wrapper.classes()).toContain('md-radio--checked');
  });

  it('emits update:modelValue on change', async () => {
    const wrapper = mount(MdRadio, {
      props: {
        value: '2',
        modelValue: '1',
      },
    });

    await wrapper.get('input').setValue(true);

    expect(wrapper.emitted('update:modelValue')).toEqual([['2']]);
    expect(wrapper.emitted('change')).toEqual([['2']]);
  });

  it('does not emit when disabled', async () => {
    const wrapper = mount(MdRadio, {
      props: {
        value: '2',
        modelValue: '1',
        disabled: true,
      },
    });

    await wrapper.get('input').trigger('change');

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('serializes and resets with form correctly', async () => {
    const TestHost = defineComponent({
      components: { MdRadio },
      data() {
        return {
          selected: 'istanbul',
        };
      },
      template: `
        <form id="city-form">
          <MdRadio v-model="selected" name="city" value="istanbul" />
          <MdRadio v-model="selected" name="city" value="ankara" />
        </form>
      `,
    });

    const wrapper = mount(TestHost, {
      attachTo: document.body,
    });

    const form = wrapper.get('form').element;
    const [first, second] = wrapper.findAll('input');

    expect(new FormData(form).get('city')).toBe('istanbul');

    await second.setValue(true);
    expect(wrapper.vm.selected).toBe('ankara');
    expect(new FormData(form).get('city')).toBe('ankara');

    form.reset();
    await nextTick();

    expect(wrapper.vm.selected).toBe('istanbul');
    expect(first.element.checked).toBe(true);
    expect(second.element.checked).toBe(false);
    expect(new FormData(form).get('city')).toBe('istanbul');

    wrapper.unmount();
  });
});
