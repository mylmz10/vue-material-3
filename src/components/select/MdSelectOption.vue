<template>
  <component
    :is="tagName"
    class="md-select-option"
    :class="{ 'md-select-option--selected': isSelected, 'md-select-option--disabled': disabled }"
    :value="tagName === 'option' ? value : undefined"
    :disabled="disabled || undefined"
    :selected="tagName === 'option' ? isSelected : undefined"
    :role="tagName === 'option' ? undefined : 'option'"
    :aria-disabled="tagName === 'option' ? undefined : `${disabled}`"
    :aria-selected="tagName === 'option' ? undefined : `${isSelected}`"
    @click="onSelect"
    @keydown.enter.prevent="onSelect"
    @keydown.space.prevent="onSelect"
  >
    <slot>{{ fallbackText }}</slot>
  </component>
</template>

<script setup>
import { computed, inject, onBeforeUnmount, watch } from 'vue';

const mdSelectContextKey = 'mdSelectContext';

const props = defineProps({
  value: {
    type: [String, Number, Boolean, Object],
    default: '',
  },
  selected: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['select']);
const selectContext = inject(mdSelectContextKey, null);
const optionId = `md-select-option-${Math.random().toString(36).slice(2, 10)}`;

const tagName = computed(() => selectContext?.optionTag || 'option');

const isSelected = computed(() => {
  if (props.selected) {
    return true;
  }

  if (selectContext?.isValueSelected) {
    return selectContext.isValueSelected(props.value);
  }

  return false;
});

const fallbackText = computed(() => {
  if (typeof props.value === 'string' || typeof props.value === 'number' || typeof props.value === 'boolean') {
    return `${props.value}`;
  }

  return '';
});

const optionPayload = computed(() => ({
  id: optionId,
  value: props.value,
  disabled: props.disabled,
  selected: isSelected.value,
}));

const syncWithParent = () => {
  if (!selectContext?.registerOption) {
    return;
  }

  selectContext.registerOption(optionPayload.value);
};

const onSelect = (event) => {
  if (props.disabled) {
    event.preventDefault();
    return;
  }

  if (selectContext?.onOptionInteraction) {
    selectContext.onOptionInteraction(optionPayload.value, event);
  }

  emit('select', optionPayload.value);
};

watch(
  () => [props.value, props.disabled, props.selected, isSelected.value],
  () => {
    syncWithParent();
  },
  {
    immediate: true,
  }
);

onBeforeUnmount(() => {
  if (!selectContext?.unregisterOption) {
    return;
  }

  selectContext.unregisterOption(optionId);
});
</script>

<style lang="scss">
.md-select-option {
  &--disabled {
    cursor: default;
  }
}
</style>
