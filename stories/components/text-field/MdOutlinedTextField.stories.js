import MdOutlinedTextField from '../../../src/components/text-field/MdOutlinedTextField.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Components/TextFields',
  component: MdOutlinedTextField,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {},
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { MdOutlinedTextField },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<md-outlined-text-field v-bind="args" />',
});

export const OutlinedTextField = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
OutlinedTextField.args = {
  label: 'Outlined Label',
};
