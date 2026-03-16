<template>
  <MdDatePickerField v-bind="$attrs" field-variant="filled">
    <template v-for="(_, slot) in $slots" v-slot:[slot]="slotProps">
      <slot :name="slot" v-bind="slotProps || {}"></slot>
    </template>
  </MdDatePickerField>
</template>

<script setup>
import MdDatePickerField from './MdDatePickerField.vue';

defineOptions({
  inheritAttrs: false,
});
</script>
