<template>
  <span class="md-filled-text-field">
    <MdFilledField :label="label" :populated="!!inputValue">
      <MdTextFieldBase :value="inputValue" @input="inputValue = $event.target.value" />
      <template #supporting-text>
        <slot name="supporting-text" />
      </template>
    </MdFilledField>
  </span>
</template>

<script setup>
import { defineProps, ref, onBeforeMount } from 'vue';
import MdTextFieldBase from './MdTextFieldBase.vue';
import MdFilledField from '../field/MdFilledField.vue';

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

.md-filled-text-field {
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
