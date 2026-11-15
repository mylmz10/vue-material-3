import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { createSSRApp, h, nextTick, ref, toRaw } from 'vue';
import { renderToString } from 'vue/server-renderer';
import MdFilledSelect from '@/components/select/MdFilledSelect.vue';
import MdOutlinedSelect from '@/components/select/MdOutlinedSelect.vue';
import MdSelectOption from '@/components/select/MdSelectOption.vue';

describe('select components', () => {
  describe.each([
    ['filled', MdFilledSelect],
    ['outlined', MdOutlinedSelect],
  ])('%s object values', (_, component) => {
    it('validates, submits, and resets with an external form owner', async () => {
      const firstForm = document.createElement('form');
      firstForm.id = 'first-select-owner';
      const secondForm = document.createElement('form');
      secondForm.id = 'second-select-owner';
      document.body.append(firstForm, secondForm);
      const wrapper = mount(component, {
        attachTo: document.body,
        props: { form: firstForm.id, name: 'city', required: true },
        slots: { default: () => h(MdSelectOption, { value: 'istanbul', displayText: 'Istanbul' }) },
      });
      try {
        const trigger = wrapper.get('[role="combobox"]');
        expect(firstForm.checkValidity()).toBe(false);
        await trigger.trigger('click');
        await wrapper.get('[role="option"]').trigger('click');
        expect(firstForm.checkValidity()).toBe(true);
        expect(new FormData(firstForm).get('city')).toBe('istanbul');

        await wrapper.setProps({ form: secondForm.id });
        firstForm.reset();
        await nextTick();
        expect(new FormData(firstForm).has('city')).toBe(false);
        expect(new FormData(secondForm).get('city')).toBe('istanbul');

        secondForm.reset();
        await nextTick();
        await nextTick();
        expect(trigger.text()).toBe('');
        expect(new FormData(secondForm).get('city')).toBe('');
        expect(secondForm.checkValidity()).toBe(false);
        expect(wrapper.emitted('update:modelValue')).toEqual([['istanbul'], ['']]);
      } finally {
        wrapper.unmount();
        firstForm.remove();
        secondForm.remove();
      }
    });

    it('moves through keyed options in their current DOM order', async () => {
      const values = ref(['A', 'B', 'C']);
      const wrapper = mount(
        {
          setup: () => () => h(component, {}, () => values.value.map((value) => h(MdSelectOption, { key: value, value }))),
        },
        { attachTo: document.body }
      );
      try {
        await wrapper.get('[role="combobox"]').trigger('keydown', { key: 'ArrowDown' });
        await nextTick();
        const first = wrapper.findAll('[role="option"]')[0].element;
        expect(document.activeElement).toBe(first);

        values.value = ['C', 'A', 'B'];
        await nextTick();
        const options = wrapper.findAll('[role="option"]');
        expect(options[1].element).toBe(first);
        await options[1].trigger('keydown', { key: 'ArrowUp' });
        await nextTick();
        expect(document.activeElement).toBe(options[0].element);

        await options[0].trigger('keydown', { key: 'End' });
        await nextTick();
        expect(document.activeElement).toBe(options[2].element);
        await options[2].trigger('keydown', { key: 'Home' });
        await nextTick();
        expect(document.activeElement).toBe(options[0].element);
      } finally {
        wrapper.unmount();
      }
    });

    it('resolves the keyboard-active option after hydration', async () => {
      const createSelect = () =>
        createSSRApp({
          render: () => h(component, { label: 'City' }, () => [h(MdSelectOption, { value: 'A' }), h(MdSelectOption, { id: 'explicit-city-option', value: 'B' })]),
        });
      const container = document.createElement('div');
      container.innerHTML = await renderToString(createSelect());
      document.body.append(container);
      const app = createSelect();
      try {
        app.mount(container);
        const trigger = container.querySelector('[role="combobox"]');
        const listbox = container.querySelector('[role="listbox"]');
        const options = listbox.querySelectorAll('[role="option"]');
        expect(trigger.getAttribute('aria-controls')).toBe(listbox.id);
        expect(options[1].id).toBe('explicit-city-option');

        trigger.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowDown' }));
        await nextTick();
        expect(trigger.getAttribute('aria-activedescendant')).toBe(options[0].id);
        expect(document.getElementById(trigger.getAttribute('aria-activedescendant'))).toBe(options[0]);
      } finally {
        app.unmount();
        container.remove();
      }
    });

    it.each(['a', 0, false, { id: 1 }])('initializes from legacy value %s only when the model is absent', async (value) => {
      const wrapper = mount(component, {
        props: { value },
        slots: { default: () => h(MdSelectOption, { value, displayText: 'Initial option' }) },
      });
      await nextTick();
      expect(wrapper.get('[role="combobox"]').text()).toBe('Initial option');
      expect(wrapper.get('[role="option"]').attributes('aria-selected')).toBe('true');
      await wrapper.setProps({ value: 'later' });
      expect(wrapper.get('[role="combobox"]').text()).toBe('Initial option');
      wrapper.unmount();
    });

    it('keeps an explicit empty model ahead of value and selected-option fallbacks', async () => {
      const wrapper = mount(component, {
        props: { modelValue: '', value: 'a' },
        slots: { default: () => h(MdSelectOption, { value: 'a', selected: true, displayText: 'Fallback' }) },
      });
      await nextTick();
      expect(wrapper.get('[role="combobox"]').text()).toBe('');
      expect(wrapper.emitted('update:modelValue')).toBeUndefined();
      await wrapper.setProps({ value: 'later' });
      expect(wrapper.get('[role="combobox"]').text()).toBe('');
      await wrapper.setProps({ modelValue: 'a' });
      expect(wrapper.get('[role="combobox"]').text()).toBe('Fallback');
      wrapper.unmount();
    });

    it('routes required validation to the visible trigger and prevents proxy edits', async () => {
      const form = document.createElement('form');
      document.body.append(form);
      const wrapper = mount(component, { attachTo: form, props: { name: 'city', required: true }, slots: { default: () => h(MdSelectOption, { value: 'istanbul', displayText: 'Istanbul' }) } });
      const proxy = wrapper.get('input').element;
      const trigger = wrapper.get('[role="combobox"]');
      const invalid = new Event('invalid', { cancelable: true });
      proxy.dispatchEvent(invalid);
      await nextTick();
      expect(invalid.defaultPrevented).toBe(true);
      expect(document.activeElement).toBe(trigger.element);
      expect(trigger.attributes('aria-invalid')).toBe('true');
      expect(trigger.attributes('aria-required')).toBe('true');
      proxy.focus();
      expect(document.activeElement).toBe(trigger.element);
      proxy.value = 'ghost';
      proxy.dispatchEvent(new Event('input', { bubbles: true }));
      expect(proxy.value).toBe('');
      expect(form.checkValidity()).toBe(false);
      expect(new FormData(form).get('city')).toBe('');
      await wrapper.setProps({ modelValue: 'istanbul' });
      expect(form.checkValidity()).toBe(true);
      expect(trigger.attributes('aria-invalid')).toBe('false');
      expect(new FormData(form).get('city')).toBe('istanbul');
      form.reset();
      await nextTick();
      await nextTick();
      expect(proxy.value).toBe('');
      expect(trigger.attributes('aria-invalid')).toBe('false');
      wrapper.unmount();
      form.remove();
    });

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
    await nextTick();

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([0]);
    wrapper.unmount();
    form.remove();
  });
});
