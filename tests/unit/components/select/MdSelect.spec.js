import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { h, nextTick, toRaw } from 'vue';
import MdFilledSelect from '@/components/select/MdFilledSelect.vue';
import MdOutlinedSelect from '@/components/select/MdOutlinedSelect.vue';
import MdSelectOption from '@/components/select/MdSelectOption.vue';

describe('select components', () => {
  describe.each([
    ['filled', MdFilledSelect],
    ['outlined', MdOutlinedSelect],
  ])('%s object values', (_, component) => {
    it('selects distinct objects independently and reflects external model changes', async () => {
      const first = { id: 1 };
      const second = { id: 2 };
      const wrapper = mount(component, {
        props: { modelValue: first },
        slots: { default: () => [h(MdSelectOption, { value: first, displayText: 'First' }), h(MdSelectOption, { value: second, displayText: 'Second' })] },
      });
      await nextTick();

      expect(wrapper.findAll('[role="option"]').map((option) => option.attributes('aria-selected'))).toEqual(['true', 'false']);
      expect(wrapper.get('[role="combobox"]').text()).toBe('First');

      await wrapper.setProps({ modelValue: second });
      expect(wrapper.findAll('[role="option"]').map((option) => option.attributes('aria-selected'))).toEqual(['false', 'true']);
      expect(wrapper.get('[role="combobox"]').text()).toBe('Second');
      expect(wrapper.emitted('update:modelValue')).toBeUndefined();

      await wrapper.get('[role="combobox"]').trigger('click');
      await wrapper.findAll('[role="option"]')[0].trigger('click');
      expect(toRaw(wrapper.emitted('update:modelValue').at(-1)[0])).toBe(first);
      expect(wrapper.get('[role="combobox"]').text()).toBe('First');
      wrapper.unmount();
    });

    it('does not equate different object identities or their serialized text', async () => {
      const wrapper = mount(component, {
        props: { modelValue: { id: 1 } },
        slots: { default: () => [h(MdSelectOption, { value: { id: 1 }, displayText: 'Another object' }), h(MdSelectOption, { value: '[object Object]', displayText: 'Literal text' })] },
      });
      await nextTick();

      expect(wrapper.findAll('[role="option"]').map((option) => option.attributes('aria-selected'))).toEqual(['false', 'false']);
      wrapper.unmount();
    });

    it.each([
      [0, '0'],
      [false, 'false'],
      [null, ''],
    ])('preserves primitive comparison for %j and %j', async (modelValue, value) => {
      const wrapper = mount(component, {
        props: { modelValue },
        slots: { default: () => h(MdSelectOption, { value, displayText: 'Matching value' }) },
      });
      await nextTick();

      expect(wrapper.get('[role="option"]').attributes('aria-selected')).toBe('true');
      wrapper.unmount();
    });
  });

  it('emits selection events from select option', async () => {
    const wrapper = mount(MdSelectOption, {
      props: {
        value: 'ankara',
        displayText: 'Ankara',
      },
    });

    await wrapper.trigger('keydown', { key: 'Enter' });
    expect(wrapper.emitted('select')?.[0]?.[0]).toMatchObject({
      value: 'ankara',
      displayText: 'Ankara',
    });

    await wrapper.setProps({ selected: true });
    expect(wrapper.emitted('request-selection')).toHaveLength(1);
  });

  it('opens filled select and emits value changes', async () => {
    const wrapper = mount(MdFilledSelect, {
      attachTo: document.body,
      props: {
        label: 'City',
        name: 'city',
        placeholder: 'Choose city',
      },
      slots: {
        default: `
          <MdSelectOption value="istanbul">Istanbul</MdSelectOption>
          <MdSelectOption value="ankara">Ankara</MdSelectOption>
        `,
      },
      global: {
        components: {
          MdSelectOption,
        },
      },
    });

    await wrapper.get('.md-filled-select__trigger').trigger('click');
    await nextTick();
    await wrapper.findAll('.md-select-option')[1].trigger('click');

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['ankara']);
    expect(wrapper.find('.md-filled-select__hidden-input').attributes('name')).toBe('city');

    wrapper.unmount();
  });

  it('renders outlined select display text for selected value', async () => {
    const wrapper = mount(MdOutlinedSelect, {
      props: {
        label: 'City',
        modelValue: 'istanbul',
      },
      slots: {
        default: `
          <MdSelectOption value="istanbul" display-text="Istanbul (TR)">Istanbul</MdSelectOption>
          <MdSelectOption value="ankara">Ankara</MdSelectOption>
        `,
      },
      global: {
        components: {
          MdSelectOption,
        },
      },
    });

    await nextTick();
    await nextTick();

    expect(wrapper.text()).toContain('Istanbul (TR)');
  });

  it('participates in required form validation', async () => {
    const wrapper = mount(MdFilledSelect, {
      props: {
        required: true,
      },
      slots: {
        default: '<MdSelectOption value="istanbul">Istanbul</MdSelectOption>',
      },
      global: {
        components: {
          MdSelectOption,
        },
      },
    });

    const formInput = wrapper.get('.md-filled-select__hidden-input').element;
    expect(formInput.checkValidity()).toBe(false);

    await wrapper.get('.md-filled-select__trigger').trigger('click');
    await wrapper.get('.md-select-option').trigger('click');
    expect(formInput.checkValidity()).toBe(true);
  });

  it('restores a numeric zero value on form reset', async () => {
    const form = document.createElement('form');
    document.body.appendChild(form);
    const wrapper = mount(MdFilledSelect, {
      attachTo: form,
      props: { modelValue: 0 },
      slots: {
        default: '<MdSelectOption :value="0">None</MdSelectOption><MdSelectOption :value="1">One</MdSelectOption>',
      },
      global: { components: { MdSelectOption } },
    });

    await wrapper.get('.md-filled-select__trigger').trigger('click');
    await wrapper.findAll('.md-select-option')[1].trigger('click');
    form.dispatchEvent(new Event('reset'));
    await nextTick();

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([0]);
    wrapper.unmount();
    form.remove();
  });

  it('restores a numeric zero value for outlined select on form reset', async () => {
    const form = document.createElement('form');
    document.body.appendChild(form);
    const wrapper = mount(MdOutlinedSelect, {
      attachTo: form,
      props: { modelValue: 0 },
      slots: {
        default: '<MdSelectOption :value="0">None</MdSelectOption><MdSelectOption :value="1">One</MdSelectOption>',
      },
      global: { components: { MdSelectOption } },
    });

    await wrapper.get('.md-outlined-select__trigger').trigger('click');
    await wrapper.findAll('.md-select-option')[1].trigger('click');
    form.dispatchEvent(new Event('reset'));
    await nextTick();

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([0]);
    wrapper.unmount();
    form.remove();
  });
});
