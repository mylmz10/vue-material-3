import { computed, ref } from 'vue';
import MdDatePicker from '../../../src/components/datepicker/MdDatePicker.vue';
import MdDatePickerField from '../../../src/components/datepicker/MdDatePickerField.vue';
import { parseModelValue } from '../../../src/components/datepicker/datePickerUtils';

export default {
  title: 'Components/DatePicker',
};

export const FieldDocked = () => ({
  components: { MdDatePickerField },
  setup() {
    const value = ref('2026-03-14');
    return { value };
  },
  template: `
    <div style="padding: 24px; min-height: 520px; background: #f7f2fa;">
      <MdDatePickerField v-model="value" picker-variant="docked" locale="en-US" />
      <p style="margin-top: 320px; font-family: sans-serif;">Selected: {{ value }}</p>
    </div>
  `,
});

export const FieldModal = () => ({
  components: { MdDatePickerField },
  setup() {
    const value = ref('2026-03-14');
    return { value };
  },
  template: `
    <div style="padding: 24px; min-height: 520px; background: #f7f2fa;">
      <MdDatePickerField v-model="value" picker-variant="modal" locale="en-US" />
      <p style="margin-top: 24px; font-family: sans-serif;">Selected: {{ value }}</p>
    </div>
  `,
});

export const ModalSurface = () => ({
  components: { MdDatePicker },
  setup() {
    const value = ref('2026-03-14');
    const open = ref(true);
    return { open, value };
  },
  template: `
    <div style="padding: 24px; min-height: 560px; background: #f7f2fa;">
      <MdDatePicker v-model="value" v-model:open="open" variant="modal" locale="en-US" />
      <button style="margin-top: 12px;" @click="open = true">Open modal</button>
    </div>
  `,
});

export const FieldModalInput = () => ({
  components: { MdDatePickerField },
  setup() {
    const value = ref('2026-08-17');
    return { value };
  },
  template: `
    <div style="padding: 24px; min-height: 520px; background: #f7f2fa;">
      <MdDatePickerField v-model="value" picker-variant="modal-input" locale="en-US" />
      <p style="margin-top: 24px; font-family: sans-serif;">Selected: {{ value }}</p>
    </div>
  `,
});

export const RangeFieldDocked = () => ({
  components: { MdDatePickerField },
  setup() {
    const value = ref({
      start: '2026-03-14',
      end: '2026-03-21',
    });
    return { value };
  },
  template: `
    <div style="padding: 24px; min-height: 520px; background: #f7f2fa;">
      <MdDatePickerField v-model="value" selection-mode="range" picker-variant="docked" locale="en-US" />
      <p style="margin-top: 320px; font-family: sans-serif;">Selected: {{ JSON.stringify(value) }}</p>
    </div>
  `,
});

export const RangeFieldModal = () => ({
  components: { MdDatePickerField },
  setup() {
    const value = ref({
      start: '2026-03-14',
      end: '2026-03-21',
    });
    return { value };
  },
  template: `
    <div style="padding: 24px; min-height: 560px; background: #f7f2fa;">
      <MdDatePickerField v-model="value" selection-mode="range" picker-variant="modal" locale="en-US" />
      <p style="margin-top: 24px; font-family: sans-serif;">Selected: {{ JSON.stringify(value) }}</p>
    </div>
  `,
});

export const RangeModalSurface = () => ({
  components: { MdDatePicker },
  setup() {
    const value = ref({
      start: '2026-03-14',
      end: '2026-03-21',
    });
    const open = ref(true);
    return { open, value };
  },
  template: `
    <div style="padding: 24px; min-height: 640px; background: #f7f2fa;">
      <MdDatePicker v-model="value" v-model:open="open" selection-mode="range" variant="modal" locale="en-US" />
      <button style="margin-top: 12px;" @click="open = true">Open modal</button>
    </div>
  `,
});

export const RangeFieldModalInput = () => ({
  components: { MdDatePickerField },
  setup() {
    const value = ref({
      start: '2026-03-14',
      end: '2026-03-21',
    });
    return { value };
  },
  template: `
    <div style="padding: 24px; min-height: 560px; background: #f7f2fa;">
      <MdDatePickerField v-model="value" selection-mode="range" picker-variant="modal-input" locale="en-US" />
      <p style="margin-top: 24px; font-family: sans-serif;">Selected: {{ JSON.stringify(value) }}</p>
    </div>
  `,
});

export const DisabledDates = () => ({
  components: { MdDatePickerField },
  setup() {
    const value = ref('2026-03-14');
    const isDateDisabled = (isoDate) => {
      const date = parseModelValue(isoDate);
      return [0, 6].includes(date.day());
    };
    return { isDateDisabled, value };
  },
  template: `
    <div style="padding: 24px; min-height: 520px; background: #f7f2fa;">
      <MdDatePickerField
        v-model="value"
        picker-variant="docked"
        locale="en-US"
        supporting-text="Weekends are unavailable"
        :is-date-disabled="isDateDisabled"
      />
    </div>
  `,
});

export const LocaleTR = () => ({
  components: { MdDatePickerField },
  setup() {
    const value = ref('2026-03-14');
    const displayValue = computed(() => value.value || 'bos');
    return { displayValue, value };
  },
  template: `
    <div style="padding: 24px; min-height: 520px; background: #f7f2fa;">
      <MdDatePickerField v-model="value" picker-variant="docked" locale="tr-TR" display-format="DD.MM.YYYY" />
      <p style="margin-top: 320px; font-family: sans-serif;">Secilen: {{ displayValue }}</p>
    </div>
  `,
});
