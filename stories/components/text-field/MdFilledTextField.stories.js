import { ref, watch } from 'vue';
import MdFilledTextField from '../../../src/components/text-field/MdFilledTextField.vue';

export default {
  title: 'Components/TextFields',
  component: MdFilledTextField,
  argTypes: {},
};

const Template = (args) => ({
  components: { MdFilledTextField },
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
  template: '<md-filled-text-field v-bind="args" v-model="value" />',
});

export const FilledTextField = Template.bind({});
FilledTextField.args = {
  label: 'Filled Label',
  modelValue: '',
  name: 'filled-text-field',
  supportingText: 'Supporting text',
  prefix: '$',
  suffix: 'USD',
};

export const FilledTextFieldError = Template.bind({});
FilledTextFieldError.args = {
  label: 'Filled Label',
  modelValue: '',
  error: true,
  errorText: 'Please enter a valid value',
};
