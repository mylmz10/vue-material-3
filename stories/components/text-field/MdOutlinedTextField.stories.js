import { ref, watch } from 'vue';
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
    const value = ref(args.modelValue);
    watch(
      () => args.modelValue,
      (next) => {
        value.value = next;
      }
    );
    return { args, value };
  },
  // And then the `args` are bound to your component with `v-bind="args" v-model="value"`
  template: '<md-outlined-text-field v-bind="args" v-model="value" />',
});

export const OutlinedTextField = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
OutlinedTextField.args = {
  label: 'Outlined Label',
  modelValue: '',
  name: 'outlined-text-field',
  supportingText: 'Supporting text',
  prefix: '@',
  suffix: '.com',
};

export const OutlinedTextFieldError = Template.bind({});
OutlinedTextFieldError.args = {
  label: 'Outlined Label',
  modelValue: '',
  error: true,
  errorText: 'Please enter a valid value',
};
