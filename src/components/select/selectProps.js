export const selectProps = {
  modelValue: {
    type: [String, Number, Boolean, Object],
    default: undefined,
  },
  value: {
    type: [String, Number, Boolean, Object],
    default: undefined,
  },
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  form: String,
  required: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Boolean,
    default: false,
  },
  supportingText: {
    type: String,
    default: '',
  },
};

export const selectEmits = ['update:modelValue', 'input', 'change', 'focus', 'blur', 'open', 'close'];
