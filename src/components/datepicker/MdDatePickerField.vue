<template>
  <div ref="rootEl" class="md-date-picker-field" :class="`md-date-picker-field--${pickerVariant}`" @keydown="handleRootKeydown">
    <div class="md-date-picker-field__control" @click="handleWrapperClick">
      <component
        :is="fieldComponent"
        v-model="inputValue"
        :label="resolvedLabel"
        :supporting-text="resolvedSupportingText"
        :error="resolvedError"
        :error-text="resolvedErrorText"
        :readonly="resolvedReadonly"
        :disabled="disabled"
        @change="handleFieldChange"
      >
        <template #end>
          <button
            type="button"
            class="md-date-picker-field__icon-button"
            :disabled="disabled"
            :aria-label="isRangeSelection ? 'Open date range picker' : 'Open date picker'"
            @click.stop="togglePicker"
          >
            <MdIcon>calendar_month</MdIcon>
          </button>
        </template>
      </component>
    </div>

    <transition name="fade-grow">
      <div v-if="showDockedPanel" class="md-date-picker-field__panel">
        <MdDatePicker
          variant="docked"
          :selection-mode="selectionMode"
          :modelValue="modelValue"
          :locale="locale"
          :display-format="displayFormat"
          :min="min"
          :max="max"
          :is-date-disabled="isDateDisabled"
          @update:modelValue="handlePickerValueUpdate"
        />
      </div>
    </transition>

    <MdDatePicker
      v-if="isModalVariant"
      :open="isOpen"
      variant="modal"
      :selection-mode="selectionMode"
      :entry-mode="pickerVariant === 'modal-input' ? 'input' : 'calendar'"
      :modelValue="modelValue"
      :locale="locale"
      :display-format="displayFormat"
      :min="min"
      :max="max"
      :is-date-disabled="isDateDisabled"
      @invalid-input="handleModalInvalidInput"
      @update:modelValue="handlePickerValueUpdate"
      @update:open="handleModalOpenUpdate"
      @cancel="clearLocalError"
    />
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import MdDatePicker from './MdDatePicker.vue';
import MdFilledTextField from '../text-field/MdFilledTextField.vue';
import MdIcon from '../icon/MdIcon.vue';
import MdOutlinedTextField from '../text-field/MdOutlinedTextField.vue';
import {
  DEFAULT_DISPLAY_FORMAT,
  formatDisplayValue,
  formatRangeDisplayValue,
  isDateAllowed,
  isRangeAllowed,
  parseDisplayValue,
  parseRangeDisplayValue,
} from './datePickerUtils';

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  displayFormat: {
    type: String,
    default: DEFAULT_DISPLAY_FORMAT,
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
  isDateDisabled: {
    type: Function,
    default: null,
  },
  label: {
    type: String,
    default: '',
  },
  locale: {
    type: String,
    default: 'en-US',
  },
  max: {
    type: String,
    default: '',
  },
  min: {
    type: String,
    default: '',
  },
  modelValue: {
    type: [String, Object],
    default: null,
  },
  pickerVariant: {
    type: String,
    default: 'docked',
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  selectionMode: {
    type: String,
    default: 'single',
  },
  supportingText: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['invalid-input', 'update:modelValue']);

const rootEl = ref(null);
const isOpen = ref(false);
const inputValue = ref('');
const localError = ref(false);

const isRangeSelection = computed(() => props.selectionMode === 'range');
const defaultSupportingText = computed(() => (isRangeSelection.value ? `${props.displayFormat} - ${props.displayFormat}` : props.displayFormat));
const isModalVariant = computed(() => props.pickerVariant === 'modal' || props.pickerVariant === 'modal-input');
const showDockedPanel = computed(() => props.pickerVariant === 'docked' && isOpen.value);
const fieldComponent = computed(() => (props.fieldVariant === 'filled' ? MdFilledTextField : MdOutlinedTextField));
const resolvedReadonly = computed(() => props.readonly || isModalVariant.value);
const resolvedSupportingText = computed(() => (localError.value ? '' : props.supportingText || defaultSupportingText.value));
const resolvedError = computed(() => props.error || localError.value);
const resolvedErrorText = computed(() => props.errorText || (isRangeSelection.value ? 'Enter a valid date range' : 'Enter a valid date'));
const resolvedLabel = computed(() => props.label || (isRangeSelection.value ? 'Dates' : 'Date'));

const syncInputValue = () => {
  inputValue.value = isRangeSelection.value
    ? formatRangeDisplayValue(props.modelValue, props.displayFormat, props.locale)
    : formatDisplayValue(props.modelValue, props.displayFormat, props.locale);
  localError.value = false;
};

const clearLocalError = () => {
  localError.value = false;
};

const parseFieldValue = () => {
  if (resolvedReadonly.value || props.disabled) {
    return;
  }

  if (inputValue.value === '') {
    emit('update:modelValue', isRangeSelection.value ? { start: null, end: null } : null);
    localError.value = false;
    return;
  }

  if (isRangeSelection.value) {
    const parsedRange = parseRangeDisplayValue(inputValue.value, props.displayFormat, props.locale);
    if (!parsedRange || !parsedRange.start || !parsedRange.end) {
      localError.value = true;
      emit('invalid-input', inputValue.value);
      return;
    }

    const rangeConstraints = {
      min: props.min,
      max: props.max,
      isDateDisabled: props.isDateDisabled,
    };

    if (!isDateAllowed(parsedRange.start, rangeConstraints) || !isDateAllowed(parsedRange.end, rangeConstraints) || !isRangeAllowed(parsedRange, rangeConstraints)) {
      localError.value = true;
      emit('invalid-input', inputValue.value);
      return;
    }

    localError.value = false;
    emit('update:modelValue', {
      start: parsedRange.start.format('YYYY-MM-DD'),
      end: parsedRange.end.format('YYYY-MM-DD'),
    });
    return;
  }

  const parsedValue = parseDisplayValue(inputValue.value, props.displayFormat, props.locale);
  if (!parsedValue) {
    localError.value = true;
    emit('invalid-input', inputValue.value);
    return;
  }

  if (!isDateAllowed(parsedValue, {
    min: props.min,
    max: props.max,
    isDateDisabled: props.isDateDisabled,
  })) {
    localError.value = true;
    emit('invalid-input', inputValue.value);
    return;
  }

  localError.value = false;
  emit('update:modelValue', parsedValue.format('YYYY-MM-DD'));
};

const handleWrapperClick = () => {
  if (props.disabled) {
    return;
  }

  if (isModalVariant.value) {
    isOpen.value = true;
    return;
  }

  isOpen.value = true;
};

const togglePicker = () => {
  if (props.disabled) {
    return;
  }

  isOpen.value = !isOpen.value;
};

const handleFieldChange = () => {
  parseFieldValue();
};

const handlePickerValueUpdate = (value) => {
  emit('update:modelValue', value);
  localError.value = false;

  if (props.pickerVariant === 'docked') {
    if (!isRangeSelection.value || (value?.start && value?.end)) {
      isOpen.value = false;
    }
  }
};

const handleModalOpenUpdate = (value) => {
  isOpen.value = value;
};

const handleModalInvalidInput = (value) => {
  localError.value = true;
  emit('invalid-input', value);
};

const handleDocumentPointerDown = (event) => {
  if (!showDockedPanel.value) {
    return;
  }

  if (rootEl.value?.contains(event.target)) {
    return;
  }

  isOpen.value = false;
};

const handleRootKeydown = (event) => {
  if (event.key === 'Escape' && showDockedPanel.value) {
    event.preventDefault();
    isOpen.value = false;
  }
};

watch(
  () => props.modelValue,
  () => {
    syncInputValue();
  },
  { immediate: true, deep: true }
);

onMounted(() => {
  document.addEventListener('mousedown', handleDocumentPointerDown);
});

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleDocumentPointerDown);
});
</script>

<style lang="scss">
.md-date-picker-field {
  display: inline-flex;
  flex-direction: column;
  position: relative;
  width: min(360px, 100%);

  &__control {
    width: 100%;
  }

  &__panel {
    left: 0;
    padding-top: 8px;
    position: absolute;
    top: 100%;
    z-index: 20;
  }

  &__icon-button {
    align-items: center;
    background: transparent;
    border: none;
    color: inherit;
    cursor: pointer;
    display: inline-flex;
    height: 24px;
    justify-content: center;
    padding: 0;
    width: 24px;

    &:disabled {
      cursor: default;
      opacity: 0.38;
    }
  }

  .fade-grow-enter-active,
  .fade-grow-leave-active {
    transition: opacity 250ms ease, transform 250ms ease;
  }

  .fade-grow-enter-from,
  .fade-grow-leave-to {
    opacity: 0;
    transform: scale(0.98);
  }
}
</style>
