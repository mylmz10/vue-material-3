<template>
  <MdSheet v-bind="{ ...$attrs, ...$props }" @update:modelValue="$emit('update:modelValue', $event)" @cancel="$emit('cancel', $event)">
    <template v-for="(_, name) in $slots" #[name]="slotProps"><slot :name="name" v-bind="slotProps || {}" /></template>
  </MdSheet>
</template>

<script setup>
import MdSheet from '../sheet/MdSheet.vue';
defineOptions({ inheritAttrs: false });
defineProps({
  modelValue: { type: Boolean, default: false },
  modal: { type: Boolean, default: false },
  edge: { type: String, default: 'end', validator: (value) => ['start', 'end'].includes(value) },
  headline: { type: String, default: '' },
  closeLabel: { type: String, default: 'Close side sheet' },
  closeOnEscape: { type: Boolean, default: true },
  closeOnBackdropClick: { type: Boolean, default: true },
  restoreFocus: { type: Boolean, default: true },
  initialFocus: { type: [String, Function], default: null },
});
defineEmits(['update:modelValue', 'cancel']);
</script>
