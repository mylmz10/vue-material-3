import MdFilledTonalButton from '../../../src/components/button/MdFilledTonalButton.vue';

export default {
  title: 'Components/Buttons',
  component: MdFilledTonalButton,
  argTypes: {},
};

const Template = (args) => ({
  components: { MdFilledTonalButton },
  setup() {
    return { args };
  },
  template: '<md-filled-tonal-button v-bind="args" />',
});

export const FilledTonalButton = Template.bind({});
FilledTonalButton.args = {
  label: 'Button',
};
