import { computed, ref, watch } from 'vue';
import MdDatePicker from '../../../src/components/datepicker/MdDatePicker.vue';
import MdFilledDatePickerField from '../../../src/components/datepicker/MdFilledDatePickerField.vue';
import MdOutlinedDatePickerField from '../../../src/components/datepicker/MdOutlinedDatePickerField.vue';

const SINGLE_DEFAULT = '2026-03-14';
const RANGE_DEFAULT = {
  start: '2026-03-14',
  end: '2026-03-21',
};

const cloneValue = (value) => {
  if (value && typeof value === 'object') {
    return { ...value };
  }

  return value;
};

const normalizeModelValue = (args, fallback = SINGLE_DEFAULT) => {
  if (args.selectionMode === 'range') {
    const next = args.modelValue && typeof args.modelValue === 'object' ? args.modelValue : RANGE_DEFAULT;
    return {
      start: next.start ?? RANGE_DEFAULT.start,
      end: next.end ?? RANGE_DEFAULT.end,
    };
  }

  if (typeof args.modelValue === 'string') {
    return args.modelValue;
  }

  return typeof fallback === 'string' ? fallback : SINGLE_DEFAULT;
};

const createFieldRender = (FieldComponent, args, fallbackValue = SINGLE_DEFAULT, minHeight = 520) => ({
  components: { FieldComponent },
  setup() {
    const value = ref(normalizeModelValue(args, fallbackValue));
    const boundArgs = computed(() => {
      const { modelValue, ...rest } = args;
      return rest;
    });
    const selectedValue = computed(() =>
      typeof value.value === 'object' ? JSON.stringify(value.value) : (value.value || 'none')
    );

    watch(
      () => [args.selectionMode, args.modelValue],
      () => {
        value.value = cloneValue(normalizeModelValue(args, fallbackValue));
      },
      { deep: true }
    );

    return { args, boundArgs, selectedValue, value };
  },
  template: `
    <div style="padding: 24px; min-height: ${minHeight}px; background: #f7f2fa;">
      <FieldComponent v-model="value" v-bind="boundArgs" />
      <p :style="{ marginTop: args.pickerVariant === 'docked' ? '320px' : '24px', fontFamily: 'sans-serif' }">
        Selected: {{ selectedValue }}
      </p>
    </div>
  `,
});

const createSurfaceRender = (args, fallbackValue = SINGLE_DEFAULT, minHeight = 560) => ({
  components: { MdDatePicker },
  setup() {
    const value = ref(normalizeModelValue(args, fallbackValue));
    const open = ref(args.open ?? true);
    const boundArgs = computed(() => {
      const { modelValue, open: _open, ...rest } = args;
      return rest;
    });

    watch(
      () => [args.selectionMode, args.modelValue],
      () => {
        value.value = cloneValue(normalizeModelValue(args, fallbackValue));
      },
      { deep: true }
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
      <MdDatePicker v-model="value" v-model:open="open" v-bind="boundArgs" />
      <button style="margin-top: 12px;" @click="open = true">Open modal</button>
    </div>
  `,
});

export default {
  title: 'Components/DatePicker',
  component: MdOutlinedDatePickerField,
  subcomponents: {
    MdDatePicker,
    MdFilledDatePickerField,
    MdOutlinedDatePickerField,
  },
  argTypes: {
    disabled: { control: 'boolean' },
    displayFormat: { control: 'text' },
    error: { control: 'boolean' },
    errorText: { control: 'text' },
    isDateDisabled: {
      control: false,
      table: { disable: true },
    },
    label: { control: 'text' },
    locale: { control: 'text' },
    max: { control: 'text' },
    min: { control: 'text' },
    modelValue: {
      control: false,
      table: { disable: true },
    },
    pickerVariant: {
      control: 'select',
      options: ['docked', 'modal', 'modal-input'],
    },
    readonly: { control: 'boolean' },
    selectionMode: {
      control: 'select',
      options: ['single', 'range'],
    },
    supportingText: { control: 'text' },
  },
};

export const OutlinedFieldPlayground = {
  args: {
    displayFormat: 'MM/DD/YYYY',
    label: 'Date',
    locale: 'en-US',
    pickerVariant: 'docked',
    selectionMode: 'single',
    supportingText: 'MM/DD/YYYY',
  },
  render: (args) => createFieldRender(MdOutlinedDatePickerField, args),
};

export const FilledField = {
  args: {
    displayFormat: 'MM/DD/YYYY',
    label: 'Date',
    locale: 'en-US',
    pickerVariant: 'docked',
    selectionMode: 'single',
    supportingText: 'MM/DD/YYYY',
  },
  render: (args) => createFieldRender(MdFilledDatePickerField, args),
};

export const RangeField = {
  args: {
    displayFormat: 'MM/DD/YYYY',
    label: 'Dates',
    locale: 'en-US',
    pickerVariant: 'modal',
    selectionMode: 'range',
    supportingText: 'MM/DD/YYYY - MM/DD/YYYY',
  },
  render: (args) => createFieldRender(MdOutlinedDatePickerField, args, RANGE_DEFAULT, 560),
};

export const SurfacePlayground = {
  args: {
    cancelText: 'Cancel',
    confirmText: 'OK',
    displayFormat: 'MM/DD/YYYY',
    entryMode: 'calendar',
    locale: 'en-US',
    open: true,
    selectionMode: 'single',
    variant: 'modal',
  },
  argTypes: {
    cancelText: { control: 'text' },
    confirmText: { control: 'text' },
    displayFormat: { control: 'text' },
    entryMode: {
      control: 'select',
      options: ['calendar', 'input'],
    },
    locale: { control: 'text' },
    modelValue: {
      control: false,
      table: { disable: true },
    },
    open: { control: 'boolean' },
    selectionMode: {
      control: 'select',
      options: ['single', 'range'],
    },
    variant: {
      control: 'select',
      options: ['docked', 'modal'],
    },
  },
  render: (args) => createSurfaceRender(args),
};
