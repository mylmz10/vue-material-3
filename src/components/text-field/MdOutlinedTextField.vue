<template>
  <span class="md-outlined-text-field">
    <MdOutlinedField :label="label" :populated="!!inputValue" :error="error">
      <MdTextFieldBase :value="inputValue" @input="inputValue = $event.target.value" />
      <template #supporting-text>
        <slot name="supporting-text" />
      </template>
    </MdOutlinedField>
  </span>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import MdTextFieldBase from './MdTextFieldBase.vue';
import MdOutlinedField from '../field/MdOutlinedField.vue';

const props = defineProps({
  disabled: { type: Boolean },
  error: { type: Boolean },
  label: { type: String },
  populated: { type: Boolean },
  required: { type: Boolean },
  focused: { type: Boolean },
  value: { type: String },
});

const inputValue = ref('');

onBeforeMount(() => {
  inputValue.value = props.value;
});
</script>

<style lang="scss">
@use 'sass:map';
@use '../../styles/tokens';

$theme: tokens.md-comp-outlined-text-field-values();

.md-outlined-text-field {
  height: map.get($theme, container-height);
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
}
</style>
