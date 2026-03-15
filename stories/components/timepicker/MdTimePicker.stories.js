import { computed, ref, watch } from 'vue';
import MdTimePicker from '../../../src/components/timepicker/MdTimePicker.vue';
import MdTimePickerField from '../../../src/components/timepicker/MdTimePickerField.vue';

const cloneValue = (value) => value ?? null;

const createFieldRender = (args, fallbackValue = '07:00') => ({
  components: { MdTimePickerField },
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
      <MdTimePickerField v-model="value" v-bind="boundArgs" />
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
  component: MdTimePickerField,
  subcomponents: { MdTimePicker },
  argTypes: {
    cancelText: { control: 'text' },
    confirmText: { control: 'text' },
    disabled: { control: 'boolean' },
    entryMode: {
      control: 'select',
      options: ['dial', 'input'],
    },
    error: { control: 'boolean' },
    errorText: { control: 'text' },
    fieldVariant: {
      control: 'select',
      options: ['outlined', 'filled'],
    },
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
    open: { control: 'boolean' },
    supportingText: { control: 'text' },
  },
};

export const PlaygroundField = {
  args: {
    entryMode: 'dial',
    fieldVariant: 'outlined',
    hourCycle: 12,
    label: 'Time',
    locale: 'en-US',
    supportingText: '',
  },
  render: (args) => createFieldRender(args),
};

export const PlaygroundModalSurface = {
  args: {
    cancelText: 'Cancel',
    confirmText: 'OK',
    entryMode: 'dial',
    hourCycle: 12,
    locale: 'en-US',
    open: true,
  },
  render: (args) => createSurfaceRender(args),
};

export const FieldDial = {
  args: {
    entryMode: 'dial',
    fieldVariant: 'outlined',
    hourCycle: 12,
    label: 'Time',
    locale: 'en-US',
  },
  render: (args) => createFieldRender(args, '07:00'),
};

export const FieldInput = {
  args: {
    entryMode: 'input',
    fieldVariant: 'outlined',
    hourCycle: 12,
    label: 'Time',
    locale: 'en-US',
  },
  render: (args) => createFieldRender(args, '19:25'),
};

export const FieldDial24Hour = {
  args: {
    entryMode: 'dial',
    fieldVariant: 'outlined',
    hourCycle: 24,
    label: 'Time',
    locale: 'en-US',
  },
  render: (args) => createFieldRender(args, '20:00'),
};

export const ModalDial = {
  args: {
    cancelText: 'Cancel',
    confirmText: 'OK',
    entryMode: 'dial',
    hourCycle: 12,
    locale: 'en-US',
    open: true,
  },
  render: (args) => createSurfaceRender(args, '07:00', 640),
};

export const ModalDial24Hour = {
  args: {
    cancelText: 'Cancel',
    confirmText: 'OK',
    entryMode: 'dial',
    hourCycle: 24,
    locale: 'en-US',
    open: true,
  },
  render: (args) => createSurfaceRender(args, '20:00', 640),
};

export const ModalInput = {
  args: {
    cancelText: 'Cancel',
    confirmText: 'OK',
    entryMode: 'input',
    hourCycle: 12,
    locale: 'en-US',
    open: true,
  },
  render: (args) => createSurfaceRender(args, '19:25', 520),
};

export const ModalInput24Hour = {
  args: {
    cancelText: 'Cancel',
    confirmText: 'OK',
    entryMode: 'input',
    hourCycle: 24,
    locale: 'en-US',
    open: true,
  },
  render: (args) => createSurfaceRender(args, '20:15', 520),
};
