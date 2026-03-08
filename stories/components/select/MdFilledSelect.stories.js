import MdFilledSelect from '../../../src/components/select/MdFilledSelect.vue';
import MdSelectOption from '../../../src/components/select/MdSelectOption.vue';

export default {
  title: 'Components/Select',
  component: MdFilledSelect,
  argTypes: {},
};

const Template = (args) => ({
  components: { MdFilledSelect, MdSelectOption },
  setup() {
    return { args };
  },
  template: `<MdFilledSelect v-bind="args">
    <MdSelectOption value="">Select city</MdSelectOption>
    <MdSelectOption value="istanbul" display-text="Istanbul (TR)">Istanbul</MdSelectOption>
    <MdSelectOption value="ankara">Ankara</MdSelectOption>
    <MdSelectOption value="izmir" disabled>Izmir (disabled)</MdSelectOption>
  </MdFilledSelect>`,
});

export const FilledSelect = Template.bind({});
FilledSelect.args = {
  label: 'City',
  modelValue: 'istanbul',
  name: 'city',
  supportingText: 'Please select one city',
};
