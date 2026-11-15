<template>
  <MdSelectBase
    v-bind="{ ...$attrs, ...$props }"
    variant="outlined"
    @update:modelValue="$emit('update:modelValue', $event)"
    @input="$emit('input', $event)"
    @change="$emit('change', $event)"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
    @open="$emit('open')"
    @close="$emit('close')"
  >
    <slot />
    <template v-if="$slots['supporting-text']" #supporting-text><slot name="supporting-text" /></template>
  </MdSelectBase>
</template>

<script setup>
import MdSelectBase from './MdSelectBase.vue';
import { selectEmits, selectProps } from './selectProps';

defineOptions({ inheritAttrs: false });
defineProps(selectProps);
defineEmits(selectEmits);
</script>
