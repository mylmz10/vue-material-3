<template>
  <MdTimePickerField v-bind="$attrs" field-variant="filled">
    <template v-for="(_, slot) in $slots" v-slot:[slot]="slotProps">
      <slot :name="slot" v-bind="slotProps || {}"></slot>
    </template>
  </MdTimePickerField>
</template>

<script setup>
import MdTimePickerField from './MdTimePickerField.vue';

defineOptions({
  inheritAttrs: false,
});
</script>
