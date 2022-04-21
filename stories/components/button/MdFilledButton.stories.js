import MdFilledButton from '../../../src/components/button/MdFilledButton.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Components/Buttons',
  component: MdFilledButton,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {},
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { MdFilledButton },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<md-filled-button v-bind="args" />',
});

export const FilledButton = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
FilledButton.args = {
  label: 'Button',
};
