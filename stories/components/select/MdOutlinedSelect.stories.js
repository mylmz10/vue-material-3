import MdOutlinedSelect from '../../../src/components/select/MdOutlinedSelect.vue';
import MdSelectOption from '../../../src/components/select/MdSelectOption.vue';

export default {
  title: 'Components/Select',
  component: MdOutlinedSelect,
  argTypes: {},
};

const Template = (args) => ({
  components: { MdOutlinedSelect, MdSelectOption },
  setup() {
    return { args };
  },
  template: `<MdOutlinedSelect v-bind="args">
    <MdSelectOption value="">Select city</MdSelectOption>
    <MdSelectOption value="istanbul" display-text="Istanbul (TR)">Istanbul</MdSelectOption>
    <MdSelectOption value="ankara">Ankara</MdSelectOption>
    <MdSelectOption value="izmir" disabled>Izmir (disabled)</MdSelectOption>
  </MdOutlinedSelect>`,
});

export const OutlinedSelect = Template.bind({});
OutlinedSelect.args = {
  label: 'City',
  modelValue: 'istanbul',
  name: 'city',
  supportingText: 'Please select one city',
};
