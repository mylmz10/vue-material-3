import MdIconButton from '../../../src/components/icon-button/MdIconButton.vue';

export default {
  title: 'Components/Icon Button',
  component: MdIconButton,
  argTypes: {},
};

const Template = (args) => ({
  components: { MdIconButton },
  setup() {
    return { args };
  },
  template: '<md-icon-button v-bind="args" />',
});

export const IconButton = Template.bind({});
IconButton.args = {
  icon: 'star',
};
