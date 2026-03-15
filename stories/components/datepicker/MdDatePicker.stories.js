import { computed, ref, watch } from 'vue';
import MdDatePicker from '../../../src/components/datepicker/MdDatePicker.vue';
import MdDatePickerField from '../../../src/components/datepicker/MdDatePickerField.vue';
import { parseModelValue } from '../../../src/components/datepicker/datePickerUtils';

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

const createFieldRender = (args, fallbackValue = SINGLE_DEFAULT, minHeight = 520, extraSetup = null) => ({
  components: { MdDatePickerField },
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

    const extra = extraSetup ? extraSetup(args, value) : {};
    return { args, boundArgs, selectedValue, value, ...extra };
  },
  template: `
    <div style="padding: 24px; min-height: ${minHeight}px; background: #f7f2fa;">
      <MdDatePickerField v-model="value" v-bind="boundArgs" />
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
  component: MdDatePickerField,
  subcomponents: { MdDatePicker },
  argTypes: {
    cancelText: { control: 'text' },
    confirmText: { control: 'text' },
    disabled: { control: 'boolean' },
    displayFormat: { control: 'text' },
    entryMode: {
      control: 'select',
      options: ['calendar', 'input'],
    },
    error: { control: 'boolean' },
    errorText: { control: 'text' },
    fieldVariant: {
      control: 'select',
      options: ['outlined', 'filled'],
    },
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
    open: { control: 'boolean' },
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
    variant: {
      control: 'select',
      options: ['docked', 'modal'],
    },
  },
};

export const PlaygroundField = {
  args: {
    displayFormat: 'MM/DD/YYYY',
    fieldVariant: 'outlined',
    label: 'Date',
    locale: 'en-US',
    pickerVariant: 'docked',
    selectionMode: 'single',
    supportingText: 'MM/DD/YYYY',
  },
  render: (args) => createFieldRender(args),
};

export const PlaygroundModalSurface = {
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
  render: (args) => createSurfaceRender(args),
};

export const FieldDocked = {
  args: {
    displayFormat: 'MM/DD/YYYY',
    label: 'Date',
    locale: 'en-US',
    pickerVariant: 'docked',
    selectionMode: 'single',
    supportingText: 'MM/DD/YYYY',
  },
  render: (args) => createFieldRender(args),
};

export const FieldModal = {
  args: {
    displayFormat: 'MM/DD/YYYY',
    label: 'Date',
    locale: 'en-US',
    pickerVariant: 'modal',
    selectionMode: 'single',
    supportingText: 'MM/DD/YYYY',
  },
  render: (args) => createFieldRender(args),
};

export const ModalSurface = {
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
  render: (args) => createSurfaceRender(args),
};

export const FieldModalInput = {
  args: {
    displayFormat: 'MM/DD/YYYY',
    label: 'Date',
    locale: 'en-US',
    pickerVariant: 'modal-input',
    selectionMode: 'single',
    supportingText: 'MM/DD/YYYY',
  },
  render: (args) => createFieldRender(args, '2026-08-17'),
};

export const RangeFieldDocked = {
  args: {
    displayFormat: 'MM/DD/YYYY',
    label: 'Dates',
    locale: 'en-US',
    pickerVariant: 'docked',
    selectionMode: 'range',
    supportingText: 'MM/DD/YYYY - MM/DD/YYYY',
  },
  render: (args) => createFieldRender(args, RANGE_DEFAULT),
};

export const RangeFieldModal = {
  args: {
    displayFormat: 'MM/DD/YYYY',
    label: 'Dates',
    locale: 'en-US',
    pickerVariant: 'modal',
    selectionMode: 'range',
    supportingText: 'MM/DD/YYYY - MM/DD/YYYY',
  },
  render: (args) => createFieldRender(args, RANGE_DEFAULT, 560),
};

export const RangeModalSurface = {
  args: {
    cancelText: 'Cancel',
    confirmText: 'OK',
    displayFormat: 'MM/DD/YYYY',
    entryMode: 'calendar',
    locale: 'en-US',
    open: true,
    selectionMode: 'range',
    variant: 'modal',
  },
  render: (args) => createSurfaceRender(args, RANGE_DEFAULT, 640),
};

export const RangeFieldModalInput = {
  args: {
    displayFormat: 'MM/DD/YYYY',
    label: 'Dates',
    locale: 'en-US',
    pickerVariant: 'modal-input',
    selectionMode: 'range',
    supportingText: 'MM/DD/YYYY - MM/DD/YYYY',
  },
  render: (args) => createFieldRender(args, RANGE_DEFAULT, 560),
};

export const DisabledDates = {
  args: {
    displayFormat: 'MM/DD/YYYY',
    label: 'Date',
    locale: 'en-US',
    pickerVariant: 'docked',
    selectionMode: 'single',
    supportingText: 'Weekends are unavailable',
  },
  render: (args) =>
    createFieldRender(args, SINGLE_DEFAULT, 520, () => {
      const isDateDisabled = (isoDate) => {
        const date = parseModelValue(isoDate);
        return [0, 6].includes(date.day());
      };

      return {
        boundArgs: computed(() => {
          const { modelValue, ...rest } = args;
          return { ...rest, isDateDisabled };
        }),
      };
    }),
};

export const LocaleTR = {
  args: {
    displayFormat: 'DD.MM.YYYY',
    label: 'Tarih',
    locale: 'tr-TR',
    pickerVariant: 'docked',
    selectionMode: 'single',
    supportingText: 'DD.MM.YYYY',
  },
  render: (args) => createFieldRender(args),
};
