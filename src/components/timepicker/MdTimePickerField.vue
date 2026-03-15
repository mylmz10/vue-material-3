<template>
  <div class="md-time-picker-field">
    <div class="md-time-picker-field__control" @click="openPicker">
      <component
        :is="fieldComponent"
        :modelValue="displayValue"
        :label="resolvedLabel"
        :supporting-text="supportingText"
        :error="error"
        :error-text="errorText"
        :readonly="true"
        :disabled="disabled"
      >
        <template #end>
          <button
            type="button"
            class="md-time-picker-field__icon-button"
            :disabled="disabled"
            aria-label="Open time picker"
            @click.stop="openPicker"
          >
            <MdIcon>schedule</MdIcon>
          </button>
        </template>
      </component>
    </div>

    <MdTimePicker
      :open="isOpen"
      :modelValue="modelValue"
      :entry-mode="entryMode"
      :hour-cycle="hourCycle"
      :locale="locale"
      :cancel-text="cancelText"
      :confirm-text="confirmText"
      @update:modelValue="(value) => emit('update:modelValue', value)"
      @update:open="handleOpenUpdate"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import MdFilledTextField from '../text-field/MdFilledTextField.vue';
import MdIcon from '../icon/MdIcon.vue';
import MdOutlinedTextField from '../text-field/MdOutlinedTextField.vue';
import MdTimePicker from './MdTimePicker.vue';
import { formatDisplayValue } from './timePickerUtils';

const props = defineProps({
  cancelText: {
    type: String,
    default: 'Cancel',
  },
  confirmText: {
    type: String,
    default: 'OK',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  entryMode: {
    type: String,
    default: 'dial',
  },
  error: {
    type: Boolean,
    default: false,
  },
  errorText: {
    type: String,
    default: '',
  },
  fieldVariant: {
    type: String,
    default: 'outlined',
  },
  hourCycle: {
    type: [Number, String],
    default: 12,
  },
  label: {
    type: String,
    default: '',
  },
  locale: {
    type: String,
    default: 'en-US',
  },
  modelValue: {
    type: String,
    default: null,
  },
  supportingText: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const fieldComponent = computed(() => (props.fieldVariant === 'filled' ? MdFilledTextField : MdOutlinedTextField));
const resolvedLabel = computed(() => props.label || 'Time');
const displayValue = computed(() => (props.modelValue ? formatDisplayValue(props.modelValue, props.locale, props.hourCycle) : ''));

const openPicker = () => {
  if (props.disabled) {
    return;
  }

  isOpen.value = true;
};

const handleOpenUpdate = (value) => {
  isOpen.value = value;
};
</script>

<style lang="scss">
.md-time-picker-field__control {
  cursor: pointer;
}

.md-time-picker-field__icon-button {
  align-items: center;
  background: transparent;
  border: 0;
  color: inherit;
  display: inline-flex;
  justify-content: center;
  min-block-size: 48px;
  min-inline-size: 48px;
  padding: 0;
}
</style>
