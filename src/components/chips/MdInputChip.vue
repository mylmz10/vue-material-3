<template>
  <MdChip
    variant="input"
    :always-focusable="alwaysFocusable"
    :avatar="avatar"
    :disabled="disabled"
    :download="download"
    :href="href"
    :label="label"
    :leading-icon="leadingIcon"
    :removable="removable"
    :remove-aria-label="removeAriaLabel"
    :selected="selected"
    :soft-disabled="softDisabled"
    :tab-index="tabIndex"
    :target="target"
    :trailing-icon="trailingIcon"
    :value="value"
    @update:selected="emit('update:selected', $event)"
    @input="emit('input', $event)"
    @change="emit('change', $event)"
    @click="emit('click', $event)"
    @remove="emit('remove', $event)"
    @focus="emit('focus', $event)"
    @blur="emit('blur', $event)"
  >
    <slot />
    <template #avatar>
      <slot name="avatar" />
    </template>
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
  avatar: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  download: { type: String, default: '' },
  href: { type: String, default: '' },
  label: { type: String, default: '' },
  leadingIcon: { type: String, default: '' },
  removable: { type: Boolean, default: false },
  removeAriaLabel: { type: String, default: 'Remove' },
  selected: { type: Boolean, default: false },
  softDisabled: { type: Boolean, default: false },
  tabIndex: { type: [Number, String], default: undefined },
  target: { type: String, default: '' },
  trailingIcon: { type: String, default: '' },
  value: { type: [String, Number, Boolean, Object], default: undefined },
});

const emit = defineEmits(['update:selected', 'input', 'change', 'click', 'remove', 'focus', 'blur']);
</script>
