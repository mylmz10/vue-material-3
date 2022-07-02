<template>
  <span class="md-outlined-text-field">
    <MdOutlinedField :label="label">
      <MdTextFieldBase />
      <template #supporting-text>
        <slot name="supporting-text" />
      </template>
    </MdOutlinedField>
  </span>
</template>

<script setup>
import { defineProps } from 'vue';
import MdTextFieldBase from './MdTextFieldBase.vue';
import MdOutlinedField from '../field/MdOutlinedField.vue';

defineProps({
  disabled: { type: Boolean },
  error: { type: Boolean },
  label: { type: String },
  populated: { type: Boolean },
  required: { type: Boolean },
  focused: { type: Boolean },
});
</script>

<style lang="scss">
@use 'sass:map';
@use '../../styles/tokens';

$theme: tokens.md-comp-outlined-text-field-values();

.md-outlined-text-field {
  height: map.get($theme, container-height);
  border-radius: map.get($theme, container-shape);
}
</style>
