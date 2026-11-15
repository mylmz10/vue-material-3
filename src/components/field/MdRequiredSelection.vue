<template>
  <input
    class="md-required-selection"
    type="text"
    :form="form"
    :value="hasSelection ? 'selected' : ''"
    :disabled="disabled"
    required
    tabindex="-1"
    aria-hidden="true"
    @invalid.prevent="$emit('invalid', $event)"
    @beforeinput.prevent
    @input="(event) => (event.target.value = hasSelection ? 'selected' : '')"
  />
</template>

<script setup>
defineProps({
  form: String,
  hasSelection: Boolean,
  disabled: Boolean,
});
defineEmits(['invalid']);
</script>

<style>
.md-required-selection {
  position: absolute;
  inline-size: 1px;
  block-size: 1px;
  opacity: 0;
  pointer-events: none;
}
</style>
