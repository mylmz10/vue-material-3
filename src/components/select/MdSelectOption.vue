<template>
  <li
    ref="optionEl"
    class="md-select-option"
    :class="{
      'md-select-option--selected': isSelected,
      'md-select-option--disabled': disabled,
      'md-select-option--active': isActive,
    }"
    role="option"
    :data-option-id="optionId"
    :tabindex="optionTabIndex"
    :aria-disabled="`${disabled}`"
    :aria-selected="`${isSelected}`"
    @click="onSelect"
    @keydown="onKeydown"
  >
    <span class="md-select-option__label">
      <slot>{{ fallbackText }}</slot>
    </span>
  </li>
</template>

<script setup>
import { computed, inject, onBeforeUnmount, onMounted, ref, useSlots, watch } from 'vue';

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
  typeaheadText: {
    type: String,
    default: '',
  },
  displayText: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['select', 'request-selection', 'request-deselection']);
const slots = useSlots();
const optionEl = ref(null);
const optionId = `md-select-option-${Math.random().toString(36).slice(2, 10)}-${Date.now().toString(36)}`;
const mounted = ref(false);
const mdSelectContextKey = 'mdSelectContext';
const selectContext = inject(mdSelectContextKey, null);

const primitiveValueText = computed(() => {
  if (typeof props.value === 'string' || typeof props.value === 'number' || typeof props.value === 'boolean') {
    return `${props.value}`;
  }

  return '';
});

const extractTextFromVNode = (node) => {
  if (!node) {
    return '';
  }

  if (typeof node.children === 'string') {
    return node.children;
  }

  if (Array.isArray(node.children)) {
    return node.children.map((child) => extractTextFromVNode(child)).join(' ');
  }

  return '';
};

const normalizeText = (text) => {
  return text.replace(/\s+/g, ' ').trim();
};

const slotText = computed(() => {
  const renderedSlot = slots.default ? slots.default() : [];
  const textFromVNodes = normalizeText(renderedSlot.map((node) => extractTextFromVNode(node)).join(' '));

  if (textFromVNodes) {
    return textFromVNodes;
  }

  return normalizeText(optionEl.value?.textContent || '');
});

const resolvedTypeaheadText = computed(() => {
  return props.typeaheadText || slotText.value || primitiveValueText.value;
});

const fallbackText = computed(() => {
  return props.displayText || resolvedTypeaheadText.value || primitiveValueText.value;
});

const isSelected = computed(() => {
  if (selectContext?.isValueSelected) {
    return selectContext.isValueSelected(props.value);
  }

  return props.selected;
});

const isActive = computed(() => {
  if (selectContext?.isOptionActive) {
    return selectContext.isOptionActive(optionId);
  }

  return false;
});

const optionTabIndex = computed(() => {
  if (selectContext?.getOptionTabIndex) {
    return selectContext.getOptionTabIndex(optionPayload.value);
  }

  return props.disabled ? -1 : 0;
});

const optionPayload = computed(() => ({
  id: optionId,
  value: props.value,
  disabled: props.disabled,
  selected: props.selected,
  typeaheadText: resolvedTypeaheadText.value,
  displayText: props.displayText || resolvedTypeaheadText.value,
  el: optionEl.value,
}));

const onSelect = (event) => {
  if (props.disabled) {
    event.preventDefault();
    return;
  }

  selectContext?.onOptionInteraction?.(optionPayload.value);
  emit('select', optionPayload.value);
};

const onKeydown = (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    onSelect(event);
  }
};

const registerOption = () => {
  selectContext?.registerOption?.(optionPayload.value);
};

const unregisterOption = () => {
  selectContext?.unregisterOption?.(optionId);
};

watch(
  () => [props.value, props.disabled, props.selected, props.typeaheadText, props.displayText, slotText.value],
  () => {
    registerOption();
  }
);

watch(
  () => props.selected,
  (newValue, oldValue) => {
    if (!mounted.value || newValue === oldValue) {
      return;
    }

    if (newValue) {
      emit('request-selection', optionPayload.value);
    } else {
      emit('request-deselection', optionPayload.value);
    }

    selectContext?.onOptionSelectedStateChange?.(optionPayload.value, newValue);
  }
);

onMounted(() => {
  mounted.value = true;
  registerOption();
});

onBeforeUnmount(() => {
  unregisterOption();
});
</script>

<style lang="scss">
@use 'sass:map';
@use '../../styles/tokens';

$theme: tokens.md-comp-filled-select-values();

.md-select-option {
  align-items: center;
  border-radius: 0;
  color: var(--md-select-option-label-text-color, #{map.get($theme, menu-list-item-label-text-color)});
  cursor: pointer;
  display: flex;
  min-height: var(--md-select-option-container-height, #{map.get($theme, menu-list-item-container-height)});
  outline: none;
  padding: 0 24px;

  &__label {
    color: inherit;
    font-family: var(--md-select-option-label-text-font, #{map.get($theme, menu-list-item-label-text-font)});
    font-size: var(--md-select-option-label-text-size, #{map.get($theme, menu-list-item-label-text-size)});
    font-weight: var(--md-select-option-label-text-weight, #{map.get($theme, menu-list-item-label-text-weight)});
    letter-spacing: var(--md-select-option-label-text-tracking, #{map.get($theme, menu-list-item-label-text-tracking)});
    line-height: var(--md-select-option-label-text-line-height, #{map.get($theme, menu-list-item-label-text-line-height)});
  }

  &--selected {
    background-color: var(--md-select-option-selected-container-color, #{map.get($theme, menu-list-item-selected-container-color)});
  }

  &--active:not(&--selected) {
    background-color: var(--md-select-option-container-color, #{map.get($theme, menu-container-color)});
  }

  &--disabled {
    cursor: default;
    opacity: 0.38;
    pointer-events: none;
  }
}
</style>
