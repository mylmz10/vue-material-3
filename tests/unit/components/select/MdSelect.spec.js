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
});
