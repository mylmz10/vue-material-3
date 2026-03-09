<template>
  <span class="md-text-field">
    <span class="md-text-field__input-wrapper">
      <span v-if="hasPrefix" ref="prefixEl" class="md-text-field__affix md-text-field__affix--prefix">
        <slot name="prefix">{{ prefix }}</slot>
      </span>

      <input
        ref="inputEl"
        class="md-text-field__input"
        :autocomplete="autocomplete || undefined"
        :autofocus="autofocus"
        :disabled="disabled"
        :form="form || undefined"
        :inputmode="inputmode || undefined"
        :list="list || undefined"
        :max="max || undefined"
        :maxlength="maxlength"
        :min="min || undefined"
        :minlength="minlength"
        :name="name || undefined"
        :pattern="pattern || undefined"
        :placeholder="placeholder"
        :readonly="readonly"
        :required="required"
        :step="step || undefined"
        :type="type"
        :value="value"
        :aria-invalid="ariaInvalid || undefined"
        @change="$emit('change', $event)"
        @input="$emit('input', $event)"
        @select="$emit('select', $event)"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
        @keyup="$emit('keyup', $event)"
        @keydown="$emit('keydown', $event)"
        @invalid="$emit('invalid', $event)"
      />

      <span v-if="hasSuffix" class="md-text-field__affix md-text-field__affix--suffix">
        <slot name="suffix">{{ suffix }}</slot>
      </span>
    </span>
  </span>
</template>

<script setup>
import { computed, ref, useSlots } from 'vue';

defineEmits(['change', 'input', 'select', 'focus', 'blur', 'keyup', 'keydown', 'invalid']);

const slots = useSlots();

const props = defineProps({
  ariaInvalid: { type: String, default: '' },
  autocomplete: { type: String, default: '' },
  autofocus: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  form: { type: String, default: '' },
  inputmode: { type: String, default: '' },
  list: { type: String, default: '' },
  max: { type: String, default: '' },
  maxlength: { type: Number, default: undefined },
  min: { type: String, default: '' },
  minlength: { type: Number, default: undefined },
  name: { type: String, default: '' },
  pattern: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  prefix: { type: String, default: '' },
  readonly: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
  step: { type: String, default: '' },
  suffix: { type: String, default: '' },
  type: { type: String, default: 'text' },
  value: { type: [String, Number], default: '' },
});

const hasPrefix = computed(() => !!props.prefix || !!slots.prefix);
const hasSuffix = computed(() => !!props.suffix || !!slots.suffix);

const inputEl = ref(null);
const prefixEl = ref(null);

const getInputEl = () => inputEl.value;
const getPrefixEl = () => prefixEl.value;
const focus = () => inputEl.value?.focus();
const blur = () => inputEl.value?.blur();
const checkValidity = () => inputEl.value?.checkValidity();
const reportValidity = () => inputEl.value?.reportValidity();
const setCustomValidity = (message) => inputEl.value?.setCustomValidity(message || '');

defineExpose({
  getInputEl,
  getPrefixEl,
  focus,
  blur,
  checkValidity,
  reportValidity,
  setCustomValidity,
});
</script>

<style lang="scss">
.md-text-field {
  display: inline-flex;
  outline: none;
  width: 100%;

  &__input-wrapper {
    display: flex;
    width: 100%;
    align-items: center;
  }

  &__field {
    cursor: text;
  }

  &__affix {
    flex-shrink: 0;
    white-space: nowrap;
  }

  &__input {
    appearance: none;
    background: none;
    border: none;
    color: currentColor;
    flex: 1 1 auto;
    min-width: 0;
    outline: none;
    padding: 0;

    // Remove built-in datepicker icon on Chrome
    &::-webkit-calendar-picker-indicator {
      display: none;
    }
  }
}
</style>
