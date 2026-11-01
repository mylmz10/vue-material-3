<template>
  <div class="md-time-picker-field" :style="$attrs.style" :class="$attrs.class">
    <div class="md-time-picker-field__control" @click="openPicker">
      <component
        :is="fieldComponent"
        ref="fieldEl"
        v-bind="getControlAttrs($attrs)"
        v-model="displayValue"
        :label="resolvedLabel"
        :supporting-text="supportingText"
        :error="error"
        :error-text="errorText"
        :readonly="true"
        :disabled="disabled"
      >
        <template #end>
          <button type="button" class="md-time-picker-field__icon-button" :disabled="disabled" aria-label="Open time picker" @click.stop="openPicker">
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
      @update:modelValue="handlePickerValueUpdate"
      @update:open="handleOpenUpdate"
    />
  </div>
</template>

<script setup>
import { useFormReset } from '../../composables/useFormReset';
import { computed, nextTick, onBeforeMount, ref, watch } from 'vue';
import MdFilledTextField from '../text-field/MdFilledTextField.vue';
import MdIcon from '../icon/MdIcon.vue';
import MdOutlinedTextField from '../text-field/MdOutlinedTextField.vue';
import MdTimePicker from './MdTimePicker.vue';
import { formatDisplayValue } from './timePickerUtils';

import { getControlAttrs } from '../field/fieldAttrs';

defineOptions({ inheritAttrs: false });

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
const fieldEl = ref(null);
let initialValue;
onBeforeMount(() => {
  initialValue = props.modelValue;
});
const fieldComponent = computed(() => (props.fieldVariant === 'filled' ? MdFilledTextField : MdOutlinedTextField));
const resolvedLabel = computed(() => props.label || 'Time');
const displayValue = ref('');
const syncDisplayValue = (value) => {
  displayValue.value = value ? formatDisplayValue(value, props.locale, props.hourCycle) : '';
};
watch([() => props.modelValue, () => props.locale, () => props.hourCycle], () => syncDisplayValue(props.modelValue), { immediate: true });
watch(
  () => props.disabled,
  (disabled) => {
    if (disabled) isOpen.value = false;
  }
);
useFormReset(
  () => fieldEl.value?.getInputEl?.(),
  async () => {
    isOpen.value = false;
    // Let the nested field apply its reset before restoring the current display format.
    await nextTick();
    if (!fieldEl.value) return;
    syncDisplayValue(initialValue);
    emit('update:modelValue', initialValue);
  }
);

const handlePickerValueUpdate = (value) => {
  if (!props.disabled) emit('update:modelValue', value);
};

const openPicker = () => {
  if (props.disabled) {
    return;
  }

  isOpen.value = true;
};

const handleOpenUpdate = (value) => {
  isOpen.value = value && !props.disabled;
};
</script>

<style lang="scss">
.md-time-picker-field {
  display: flex;
  flex-direction: column;
  max-width: 100%;
  position: relative;
  width: 100%;
}

.md-time-picker-field__control {
  cursor: pointer;
  width: 100%;
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
