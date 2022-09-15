import MdOutlinedButton from '../../../src/components/button/MdOutlinedButton.vue';

export default {
  title: 'Components/Buttons',
  component: MdOutlinedButton,
  argTypes: {},
};

const Template = (args) => ({
  components: { MdOutlinedButton },
  setup() {
    return { args };
  },
  template: '<md-outlined-button v-bind="args" />',
});

export const OutlinedButton = Template.bind({});
OutlinedButton.args = {
  label: 'Button',
};
