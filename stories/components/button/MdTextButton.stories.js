import MdTextButton from '../../../src/components/button/MdTextButton.vue';

export default {
  title: 'Components/Buttons',
  component: MdTextButton,
  argTypes: {},
};

const Template = (args) => ({
  components: { MdTextButton },
  setup() {
    return { args };
  },
  template: '<md-text-button v-bind="args" />',
});

export const TextButton = Template.bind({});
TextButton.args = {
  label: 'Button',
};
