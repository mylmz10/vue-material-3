import { computed, ref, watch } from 'vue';
import MdTimePicker from '../../../src/components/timepicker/MdTimePicker.vue';
import MdFilledTimePickerField from '../../../src/components/timepicker/MdFilledTimePickerField.vue';
import MdOutlinedTimePickerField from '../../../src/components/timepicker/MdOutlinedTimePickerField.vue';

const cloneValue = (value) => value ?? null;

const createFieldRender = (FieldComponent, args, fallbackValue = '07:00') => ({
  components: { FieldComponent },
  setup() {
    const value = ref(args.modelValue ?? fallbackValue);
    const boundArgs = computed(() => {
      const { modelValue, ...rest } = args;
      return rest;
    });

    watch(
      () => args.modelValue,
      (nextValue) => {
        value.value = cloneValue(nextValue ?? fallbackValue);
      }
    );

    return { boundArgs, value };
  },
  template: `
    <div style="padding: 24px; min-height: 520px; background: #f7f2fa;">
      <FieldComponent v-model="value" v-bind="boundArgs" />
      <p style="margin-top: 24px; font-family: sans-serif;">Selected: {{ value }}</p>
    </div>
  `,
});

const createSurfaceRender = (args, fallbackValue = '07:00', minHeight = 640) => ({
  components: { MdTimePicker },
  setup() {
    const value = ref(args.modelValue ?? fallbackValue);
    const open = ref(args.open ?? true);
    const boundArgs = computed(() => {
      const { modelValue, open: _open, ...rest } = args;
      return rest;
    });

    watch(
      () => args.modelValue,
      (nextValue) => {
        value.value = cloneValue(nextValue ?? fallbackValue);
      }
    );

    watch(
      () => args.open,
      (nextValue) => {
        open.value = nextValue;
      }
    );

    return { boundArgs, open, value };
  },
  template: `
    <div style="padding: 24px; min-height: ${minHeight}px; background: #f7f2fa;">
      <MdTimePicker v-model="value" v-model:open="open" v-bind="boundArgs" />
      <button style="margin-top: 12px;" @click="open = true">Open modal</button>
    </div>
  `,
});

export default {
  title: 'Components/TimePicker',
  component: MdOutlinedTimePickerField,
  subcomponents: {
    MdTimePicker,
    MdFilledTimePickerField,
    MdOutlinedTimePickerField,
  },
  argTypes: {
    disabled: { control: 'boolean' },
    entryMode: {
      control: 'select',
      options: ['dial', 'input'],
    },
    error: { control: 'boolean' },
    errorText: { control: 'text' },
    hourCycle: {
      control: 'select',
      options: [12, 24],
    },
    label: { control: 'text' },
    locale: { control: 'text' },
    modelValue: {
      control: false,
      table: { disable: true },
    },
    supportingText: { control: 'text' },
  },
};

export const OutlinedFieldPlayground = {
  args: {
    entryMode: 'dial',
    hourCycle: 12,
    label: 'Time',
    locale: 'en-US',
    supportingText: '',
  },
  render: (args) => createFieldRender(MdOutlinedTimePickerField, args),
};

export const FilledField = {
  args: {
    entryMode: 'dial',
    hourCycle: 12,
    label: 'Time',
    locale: 'en-US',
    supportingText: '',
  },
  render: (args) => createFieldRender(MdFilledTimePickerField, args),
};

export const SurfacePlayground = {
  args: {
    cancelText: 'Cancel',
    confirmText: 'OK',
    entryMode: 'dial',
    hourCycle: 12,
    locale: 'en-US',
    open: true,
  },
  argTypes: {
    cancelText: { control: 'text' },
    confirmText: { control: 'text' },
    entryMode: {
      control: 'select',
      options: ['dial', 'input'],
    },
    hourCycle: {
      control: 'select',
      options: [12, 24],
    },
    locale: { control: 'text' },
    modelValue: {
      control: false,
      table: { disable: true },
    },
    open: { control: 'boolean' },
  },
  render: (args) => createSurfaceRender(args),
};
