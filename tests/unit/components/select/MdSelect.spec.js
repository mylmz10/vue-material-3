import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import MdFilledSelect from '@/components/select/MdFilledSelect.vue';
import MdOutlinedSelect from '@/components/select/MdOutlinedSelect.vue';
import MdSelectOption from '@/components/select/MdSelectOption.vue';

describe('select components', () => {
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
