<template>
  <span class="md-outlined-text-field" @click="onClick">
    <MdOutlinedField :disabled="disabled" :label="label" :populated="!!inputValue" :error="error" :required="required" :style="{ '--md-field-label-offset': `${labelOffsetWithBase}px` }">
      <template v-if="slots.start" #start>
        <slot name="start" />
      </template>

      <MdTextFieldBase
        ref="textFieldEl"
        :autocomplete="autocomplete"
        :autofocus="autofocus"
        :disabled="disabled"
        :form="form"
        :inputmode="inputmode"
        :list="list"
        :max="max"
        :maxlength="maxlength"
        :min="min"
        :minlength="minlength"
        :name="name"
        :pattern="pattern"
        :placeholder="placeholder"
        :prefix="resolvedPrefix"
        :readonly="readonly"
        :required="required"
        :step="step"
        :suffix="suffix"
        :type="type"
        :value="inputValue"
        :aria-invalid="ariaInvalid"
        @input="onTextFieldInput"
        @change="onTextFieldChange"
        @focus="onTextFieldFocus"
        @blur="onTextFieldBlur"
        @select="$emit('select', $event)"
        @keyup="$emit('keyup', $event)"
        @keydown="$emit('keydown', $event)"
        @invalid="$emit('invalid', $event)"
      >
        <template v-if="showPrefixSlot" #prefix>
          <slot name="prefix" />
        </template>
        <template v-if="slots.suffix" #suffix>
          <slot name="suffix" />
        </template>
      </MdTextFieldBase>

      <template v-if="slots.end" #end>
        <slot name="end" />
      </template>

      <template #supporting-text>
        <slot name="supporting-text">{{ resolvedSupportingText }}</slot>
      </template>
      <template #supporting-text-end>
        <slot name="supporting-text-end">{{ supportingTextEnd }}</slot>
      </template>
    </MdOutlinedField>
  </span>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useSlots, watch } from 'vue';
import MdTextFieldBase from './MdTextFieldBase.vue';
import MdOutlinedField from '../field/MdOutlinedField.vue';

const slots = useSlots();

const props = defineProps({
  autocomplete: { type: String, default: '' },
  autofocus: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  error: { type: Boolean, default: false },
  errorText: { type: String, default: '' },
  form: { type: String, default: '' },
  focused: { type: Boolean, default: false },
  inputmode: { type: String, default: '' },
  invalid: { type: Boolean, default: false },
  label: { type: String, default: '' },
  list: { type: String, default: '' },
  max: { type: String, default: '' },
  maxlength: { type: Number, default: undefined },
  min: { type: String, default: '' },
  minlength: { type: Number, default: undefined },
  modelValue: { type: [String, Number], default: '' },
  name: { type: String, default: '' },
  pattern: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  populated: { type: Boolean, default: false },
  prefix: { type: String, default: '' },
  readonly: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
  step: { type: String, default: '' },
  suffix: { type: String, default: '' },
  supportingText: { type: String, default: '' },
  supportingTextEnd: { type: String, default: '' },
  type: { type: String, default: 'text' },
  value: { type: [String, Number], default: '' },
});

const emit = defineEmits(['focus', 'blur', 'input', 'change', 'invalid', 'select', 'keyup', 'keydown', 'update:modelValue']);

const normalizeValue = (value) => (value === null || value === undefined ? '' : `${value}`);

const inputValue = ref(normalizeValue(props.modelValue || props.value));
const textFieldEl = ref(null);
const initialValue = ref(inputValue.value);
const isInputFocused = ref(false);
const labelOffset = ref(0);
let formEl = null;
const hasInputValue = computed(() => inputValue.value !== '');

const resolvedSupportingText = computed(() => {
  if (props.error && props.errorText) {
    return props.errorText;
  }

  return props.supportingText;
});
const ariaInvalid = computed(() => ((props.error || props.invalid) ? 'true' : ''));
const showPrefix = computed(() => hasInputValue.value || isInputFocused.value || props.focused);
const showPrefixSlot = computed(() => showPrefix.value && !!slots.prefix);
const resolvedPrefix = computed(() => (showPrefix.value ? props.prefix : ''));
const labelOffsetWithBase = computed(() => labelOffset.value + 8);

watch(
  () => props.modelValue,
  (value) => {
    inputValue.value = normalizeValue(value);
  }
);

watch(
  () => props.value,
  (value) => {
    if (props.modelValue !== undefined && props.modelValue !== null && props.modelValue !== '') {
      return;
    }

    inputValue.value = normalizeValue(value);
  }
);

const onTextFieldInput = (ev) => {
  inputValue.value = ev.target.value;
  emit('update:modelValue', inputValue.value);
  emit('input', inputValue.value);
};

const onTextFieldChange = (ev) => {
  inputValue.value = ev.target.value;
  emit('change', inputValue.value);
};

const onTextFieldFocus = (ev) => {
  isInputFocused.value = true;
  emit('focus', ev);
};

const onTextFieldBlur = (ev) => {
  isInputFocused.value = false;
  emit('blur', ev);
};

const onFormReset = () => {
  inputValue.value = initialValue.value;
  emit('update:modelValue', inputValue.value);
};

const updateLabelOffset = () => {
  const prefixEl = textFieldEl.value?.getPrefixEl?.();
  labelOffset.value = showPrefix.value && prefixEl ? prefixEl.offsetWidth : 0;
};

const onClick = () => {
  textFieldEl.value?.focus?.();
};

const focus = () => textFieldEl.value?.focus?.();
const blur = () => textFieldEl.value?.blur?.();
const checkValidity = () => textFieldEl.value?.checkValidity?.();
const reportValidity = () => textFieldEl.value?.reportValidity?.();
const setCustomValidity = (message) => textFieldEl.value?.setCustomValidity?.(message);

defineExpose({
  focus,
  blur,
  checkValidity,
  reportValidity,
  setCustomValidity,
});

onMounted(() => {
  initialValue.value = normalizeValue(props.modelValue || props.value);
  const inputEl = textFieldEl.value?.getInputEl?.();
  formEl = inputEl?.form || null;
  formEl?.addEventListener('reset', onFormReset);
  nextTick(updateLabelOffset);
});

onBeforeUnmount(() => {
  formEl?.removeEventListener('reset', onFormReset);
});

watch([showPrefix, () => props.prefix, inputValue], async () => {
  await nextTick();
  updateLabelOffset();
});
</script>

<style lang="scss">
@use 'sass:map';
@use '../../styles/tokens';

$theme: tokens.md-comp-outlined-text-field-values();

.md-outlined-text-field {
  border-radius: map.get($theme, container-shape);

  .md-text-field__input {
    caret-color: map.get($theme, caret-color);
    color: map.get($theme, input-text-color);
    font-family: map.get($theme, input-text-font);
    line-height: map.get($theme, input-text-line-height);
    font-size: map.get($theme, input-text-size);
    font-weight: map.get($theme, input-text-weight);
    letter-spacing: map.get($theme, input-text-tracking);
  }
  .md-field--outlined {
    width: 100%;
  }

  .md-text-field__affix {
    font-family: map.get($theme, input-text-font);
    font-size: map.get($theme, input-text-size);
    line-height: map.get($theme, input-text-line-height);
    font-weight: map.get($theme, input-text-weight);
    letter-spacing: map.get($theme, input-text-tracking);
  }

  .md-text-field__affix--prefix {
    color: map.get($theme, input-text-prefix-color);
    padding-inline-end: 2px;
  }

  .md-text-field__affix--suffix {
    color: map.get($theme, input-text-suffix-color);
    padding-inline-start: 2px;
  }
}
</style>
