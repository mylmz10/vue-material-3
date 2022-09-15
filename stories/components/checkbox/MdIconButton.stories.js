import MdCheckbox from '../../../src/components/checkbox/MdCheckbox.vue';

export default {
  title: 'Components/Checkbox',
  component: MdCheckbox,
  argTypes: {},
};

const Template = (args) => ({
  components: { MdCheckbox },
  setup() {
    return { args };
  },
  template: '<md-checkbox v-bind="args" />',
});

export const Checkbox = Template.bind({});
Checkbox.args = {
  checked: false,
};
