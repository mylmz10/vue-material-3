<template>
  <span class="md-text-field">
    <input
      class="md-text-field__input"
      :disabled="disabled"
      :placeholder="placeholder"
      :readonly="readonly"
      :required="required"
      :type="type"
      :value="value"
      @change="$emit('change', $event)"
      @input="$emit('input', $event)"
      @select="$emit('select', $event)"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
    />
  </span>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  disabled: { type: Boolean },
  error: { type: Boolean },
  label: { type: String },
  required: { type: Boolean },
  value: { type: String, default: '' },
  name: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  readonly: { type: Boolean },
  type: { type: String, default: 'text' },
});
</script>

<style lang="scss">
.md-text-field {
  display: inline-flex;
  outline: none;
  width: 100%;

  &__field {
    cursor: text;
  }

  &__input {
    appearance: none;
    background: none;
    border: none;
    color: currentColor;
    outline: none;
    padding: 0;
    width: 100%;

    // Remove built-in datepicker icon on Chrome
    &::-webkit-calendar-picker-indicator {
      display: none;
    }
  }
}
</style>
