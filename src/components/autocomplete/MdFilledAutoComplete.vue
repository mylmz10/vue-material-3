<template>
  <MdAutoCompleteBase
    v-bind="{ ...$attrs, ...$props }"
    variant="filled"
    @update:modelValue="$emit('update:modelValue', $event)"
    @update:search="$emit('update:search', $event)"
    @debounced="$emit('debounced', $event)"
  />
</template>

<script setup>
import MdAutoCompleteBase from './MdAutoCompleteBase.vue';
import { autocompleteProps } from './autocompleteProps';

defineOptions({ inheritAttrs: false });
defineProps(autocompleteProps);
defineEmits(['update:modelValue', 'update:search', 'debounced']);
</script>
