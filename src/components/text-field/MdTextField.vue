<template>
  <span :class="[`md-${variant}-text-field`, $attrs.class]" :style="$attrs.style" @click="onClick">
    <component
      :is="fieldComponent"
      :input-id="$attrs.id || inputId"
      :supporting-text-id="supportingTextId"
      :disabled="disabled"
      :error="error"
      :label="label"
      :populated="!!inputValue"
      :required="required"
      :style="{ '--md-field-label-offset': `${labelOffset + (variant === 'outlined' ? 8 : 0)}px` }"
    >
      <template v-if="slots.start" #start>
        <slot name="start" />
      </template>

      <MdTextFieldBase
        ref="textFieldEl"
        v-bind="getControlAttrs($attrs)"
        :id="$attrs.id || inputId"
        :aria-describedby="[$attrs['aria-describedby'], hasSupportingText ? supportingTextId : null].filter(Boolean).join(' ') || undefined"
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
        :placeholder="resolvedPlaceholder"
        :prefix="resolvedPrefix"
        :readonly="readonly"
        :required="required"
        :step="step"
        :suffix="suffix"
        :type="type"
        :value="inputValue"
        :aria-invalid="ariaInvalid || $attrs['aria-invalid']"
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
    </component>
  </span>
</template>

<script setup>
import { useFormReset } from '../../composables/useFormReset';
import { computed, nextTick, onMounted, ref, useId, useSlots, watch } from 'vue';
import MdTextFieldBase from './MdTextFieldBase.vue';
import MdFilledField from '../field/MdFilledField.vue';
import MdOutlinedField from '../field/MdOutlinedField.vue';
import { textFieldEmits, textFieldProps } from './textFieldProps';
import { getControlAttrs } from '../field/fieldAttrs';

defineOptions({ inheritAttrs: false });

const slots = useSlots();
const inputId = `md-text-field-${useId()}`;
const supportingTextId = `${inputId}-supporting`;

const props = defineProps({ ...textFieldProps, variant: { type: String, required: true } });
const emit = defineEmits(textFieldEmits);
const fieldComponent = computed(() => (props.variant === 'outlined' ? MdOutlinedField : MdFilledField));

const normalizeValue = (value) => (value === null || value === undefined ? '' : `${value}`);

const resolveInitialValue = () => (props.modelValue !== undefined ? props.modelValue : props.value);
const inputValue = ref(normalizeValue(resolveInitialValue()));
const textFieldEl = ref(null);
const initialValue = ref(inputValue.value);
const isInputFocused = ref(false);
const labelOffset = ref(0);

const hasInputValue = computed(() => inputValue.value !== '');

const resolvedSupportingText = computed(() => {
  if (props.error && props.errorText) {
    return props.errorText;
  }

  return props.supportingText;
});
const hasSupportingText = computed(() => !!(resolvedSupportingText.value || props.supportingTextEnd || slots['supporting-text'] || slots['supporting-text-end']));
const ariaInvalid = computed(() => (props.error || props.invalid ? 'true' : ''));
const showPrefix = computed(() => hasInputValue.value || isInputFocused.value || props.focused);
const resolvedPlaceholder = computed(() => {
  if (props.variant === 'outlined' && props.label && !isInputFocused.value && !props.focused) return '';
  return props.placeholder;
});
const showPrefixSlot = computed(() => showPrefix.value && !!slots.prefix);
const resolvedPrefix = computed(() => (showPrefix.value ? props.prefix : ''));

watch(
  () => props.modelValue,
  () => {
    inputValue.value = normalizeValue(resolveInitialValue());
  }
);

watch(
  () => props.value,
  (value) => {
    if (props.modelValue !== undefined) {
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
  getInputEl: () => textFieldEl.value?.getInputEl?.(),
  focus,
  blur,
  checkValidity,
  reportValidity,
  setCustomValidity,
});

onMounted(() => {
  initialValue.value = normalizeValue(resolveInitialValue());
  nextTick(updateLabelOffset);
});

watch([showPrefix, () => props.prefix, inputValue], async () => {
  await nextTick();
  updateLabelOffset();
});
useFormReset(() => textFieldEl.value?.getInputEl?.(), onFormReset);
</script>

<style lang="scss">
@use 'sass:map';
@use '../../styles/tokens';
@use '../../styles/theme/md-sys-color' as theme;

@mixin text-field($variant, $theme) {
  --md-#{$variant}-text-field-caret-color: #{theme.value('primary')};
  --md-#{$variant}-text-field-input-text-color: #{theme.value('on-surface')};
  --md-#{$variant}-text-field-input-text-prefix-color: #{theme.value('on-surface-variant')};
  --md-#{$variant}-text-field-input-text-suffix-color: #{theme.value('on-surface-variant')};
  border-radius: map.get($theme, container-shape);

  .md-text-field__input {
    caret-color: var(--md-#{$variant}-text-field-caret-color);
    color: var(--md-#{$variant}-text-field-input-text-color);
    font-family: map.get($theme, input-text-font);
    line-height: map.get($theme, input-text-line-height);
    font-size: map.get($theme, input-text-size);
    font-weight: map.get($theme, input-text-weight);
    letter-spacing: map.get($theme, input-text-tracking);
  }

  .md-field--#{$variant} {
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
    color: var(--md-#{$variant}-text-field-input-text-prefix-color);
    padding-inline-end: 2px;
  }

  .md-text-field__affix--suffix {
    color: var(--md-#{$variant}-text-field-input-text-suffix-color);
    padding-inline-start: 2px;
  }
}
.md-filled-text-field {
  @include text-field('filled', tokens.md-comp-filled-text-field-values());

  .md-field--filled .md-field__content {
    transform: translateY(6px);
  }
}

.md-outlined-text-field {
  @include text-field('outlined', tokens.md-comp-outlined-text-field-values());
}
</style>
