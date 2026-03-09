<template>
  <MdChip
    variant="assist"
    :always-focusable="alwaysFocusable"
    :disabled="disabled"
    :download="download"
    :elevated="elevated"
    :href="href"
    :label="label"
    :leading-icon="leadingIcon"
    :soft-disabled="softDisabled"
    :tab-index="tabIndex"
    :target="target"
    :trailing-icon="trailingIcon"
    :value="value"
    @click="emit('click', $event)"
    @focus="emit('focus', $event)"
    @blur="emit('blur', $event)"
  >
    <slot />
    <template #leading-icon>
      <slot name="leading-icon" />
    </template>
    <template #trailing-icon>
      <slot name="trailing-icon" />
    </template>
  </MdChip>
</template>

<script setup>
import MdChip from './MdChip.vue';

defineProps({
  alwaysFocusable: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  download: { type: String, default: '' },
  elevated: { type: Boolean, default: false },
  href: { type: String, default: '' },
  label: { type: String, default: '' },
  leadingIcon: { type: String, default: '' },
  softDisabled: { type: Boolean, default: false },
  tabIndex: { type: [Number, String], default: undefined },
  target: { type: String, default: '' },
  trailingIcon: { type: String, default: '' },
  value: { type: [String, Number, Boolean, Object], default: undefined },
});

const emit = defineEmits(['click', 'focus', 'blur']);
</script>
