import MdFilledTextField from '../../../src/components/text-field/MdFilledTextField.vue';

export default {
  title: 'Components/TextFields',
  component: MdFilledTextField,
  argTypes: {},
};

const Template = (args) => ({
  components: { MdFilledTextField },
  setup() {
    return { args };
  },
  template: '<md-filled-text-field v-bind="args" />',
});

export const FilledTextField = Template.bind({});
FilledTextField.args = {
  label: 'Filled Label',
};
