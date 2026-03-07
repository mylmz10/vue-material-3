import MdSelectOption from '../../../src/components/select/MdSelectOption.vue';

export default {
  title: 'Components/Select Option',
  component: MdSelectOption,
  argTypes: {},
};

const Template = (args) => ({
  components: { MdSelectOption },
  setup() {
    return { args };
  },
  template: `<select style="min-width: 220px; min-height: 40px;">
    <MdSelectOption value="">Select one</MdSelectOption>
    <MdSelectOption v-bind="args">Istanbul</MdSelectOption>
    <MdSelectOption value="ankara">Ankara</MdSelectOption>
    <MdSelectOption value="izmir" disabled>Izmir (disabled)</MdSelectOption>
  </select>`,
});

export const SelectOption = Template.bind({});
SelectOption.args = {
  value: 'istanbul',
  selected: true,
};
