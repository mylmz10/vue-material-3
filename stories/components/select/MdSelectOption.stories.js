import MdSelectOption from '../../../src/components/select/MdSelectOption.vue';

export default {
  title: 'Components/Select',
  component: MdSelectOption,
  argTypes: {},
};

const Template = (args) => ({
  components: { MdSelectOption },
  setup() {
    return { args };
  },
  template: `<ul style="list-style: none; margin: 0; max-width: 320px; padding: 0; border-radius: 12px; overflow: hidden; border: 1px solid #ddd;">
    <MdSelectOption value="">Select one</MdSelectOption>
    <MdSelectOption v-bind="args" display-text="Istanbul (TR)">Istanbul</MdSelectOption>
    <MdSelectOption value="ankara">Ankara</MdSelectOption>
    <MdSelectOption value="izmir" disabled>Izmir (disabled)</MdSelectOption>
  </ul>`,
});

export const SelectOption = Template.bind({});
SelectOption.args = {
  value: 'istanbul',
  selected: true,
};
