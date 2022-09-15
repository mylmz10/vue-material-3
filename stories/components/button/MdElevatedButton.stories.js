import MdElevatedButton from '../../../src/components/button/MdElevatedButton.vue';

export default {
  title: 'Components/Buttons',
  component: MdElevatedButton,
  argTypes: {},
};

const Template = (args) => ({
  components: { MdElevatedButton },
  setup() {
    return { args };
  },
  template: '<md-elevated-button v-bind="args" />',
});

export const ElevatedButton = Template.bind({});
ElevatedButton.args = {
  label: 'Button',
};
