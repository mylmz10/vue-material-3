<template>
  <div ref="rootEl" class="md-date-picker-list" role="listbox" :aria-label="ariaLabel">
    <button
      v-for="item in items"
      :key="item.value"
      :ref="(el) => setItemRef(el, item.value)"
      type="button"
      role="option"
      class="md-date-picker-list__item"
      :class="{
        'md-date-picker-list__item--selected': item.selected,
        'md-date-picker-list__item--disabled': item.disabled,
      }"
      :tabindex="item.value === activeValue ? 0 : -1"
      :disabled="item.disabled"
      :aria-selected="item.selected ? 'true' : 'false'"
      :aria-disabled="item.disabled ? 'true' : 'false'"
      @keydown="handleKeydown($event, item.value)"
      @click="$emit('select', item.value)"
    >
      <span class="md-date-picker-list__leading">
        <MdIcon v-if="item.selected">check</MdIcon>
      </span>
      <span class="md-date-picker-list__label">{{ item.label }}</span>
    </button>
  </div>
</template>

<script setup>
import { nextTick, onMounted, ref, watch } from 'vue';
import MdIcon from '../icon/MdIcon.vue';

const props = defineProps({
  ariaLabel: {
    type: String,
    default: 'Options',
  },
  items: {
    type: Array,
    default: () => [],
  },
});

defineEmits(['select']);

const rootEl = ref(null);
const itemRefs = new Map();

const getActiveItem = () => props.items.find((item) => item.selected && !item.disabled) || props.items.find((item) => !item.disabled) || null;
const activeValue = ref(getActiveItem()?.value ?? null);

const setItemRef = (el, value) => {
  if (el) {
    itemRefs.set(value, el);
  } else {
    itemRefs.delete(value);
  }
};

const scrollSelectedIntoView = async () => {
  await nextTick();
  const selectedItem = getActiveItem();
  activeValue.value = selectedItem?.value ?? null;
  const selectedEl = selectedItem ? itemRefs.get(selectedItem.value) : null;

  if (!selectedEl) {
    return;
  }

  selectedEl.scrollIntoView?.({
    block: 'center',
    behavior: 'auto',
  });
};

const focusValue = async (value) => {
  activeValue.value = value;
  await nextTick();
  itemRefs.get(value)?.focus?.();
};

const handleKeydown = async (event, currentValue) => {
  const enabledItems = props.items.filter((item) => !item.disabled);
  const currentIndex = enabledItems.findIndex((item) => item.value === currentValue);

  if (currentIndex === -1) {
    return;
  }

  const focusByIndex = async (index) => {
    const nextItem = enabledItems[index];
    if (!nextItem) {
      return;
    }
    event.preventDefault();
    await focusValue(nextItem.value);
  };

  if (event.key === 'ArrowDown') {
    await focusByIndex(Math.min(enabledItems.length - 1, currentIndex + 1));
  }

  if (event.key === 'ArrowUp') {
    await focusByIndex(Math.max(0, currentIndex - 1));
  }

  if (event.key === 'Home') {
    await focusByIndex(0);
  }

  if (event.key === 'End') {
    await focusByIndex(enabledItems.length - 1);
  }
};

onMounted(scrollSelectedIntoView);
watch(
  () => props.items,
  () => {
    scrollSelectedIntoView();
  },
  { deep: true }
);
</script>

<style lang="scss">
@use 'sass:map';
@use '../../styles/tokens';

$theme: tokens.md-comp-date-picker-docked-values();

.md-date-picker-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-height: 320px;
  overflow: auto;
  padding: 8px 12px 12px;

  &__item {
    align-items: center;
    background: transparent;
    border: none;
    border-radius: 999px;
    color: var(--menu-list-item-label-text-color, #{map.get($theme, menu-list-item-label-text-color)});
    cursor: pointer;
    display: flex;
    font-family: var(--menu-list-item-label-text-font, #{map.get($theme, menu-list-item-label-text-font)});
    font-size: var(--menu-list-item-label-text-size, #{map.get($theme, menu-list-item-label-text-size)});
    font-weight: var(--menu-list-item-label-text-weight, #{map.get($theme, menu-list-item-label-text-weight)});
    gap: 12px;
    isolation: isolate;
    min-height: var(--menu-list-item-container-height, #{map.get($theme, menu-list-item-container-height)});
    padding: 0 16px;
    position: relative;
    text-align: left;
    transition: background-color 150ms ease, color 150ms ease;
    width: 100%;

    &::before {
      background-color: var(--menu-list-item-hover-state-layer-color, #{map.get($theme, menu-list-item-hover-state-layer-color)});
      border-radius: inherit;
      content: '';
      inset: 0;
      opacity: 0;
      pointer-events: none;
      position: absolute;
      transition: opacity 150ms ease;
      z-index: -1;
    }

    &:hover:not(:disabled),
    &:focus-visible:not(:disabled) {
      outline: none;

      &::before {
        opacity: var(--menu-list-item-hover-state-layer-opacity, #{map.get($theme, menu-list-item-hover-state-layer-opacity)});
      }
    }

    &:focus-visible:not(:disabled)::before {
      background-color: var(--menu-list-item-focus-state-layer-color, #{map.get($theme, menu-list-item-focus-state-layer-color)});
      opacity: var(--menu-list-item-focus-state-layer-opacity, #{map.get($theme, menu-list-item-focus-state-layer-opacity)});
    }

    &:disabled {
      cursor: default;
      opacity: 0.38;
    }

    &--selected {
      background-color: var(--menu-list-item-selected-container-color, #{map.get($theme, menu-list-item-selected-container-color)});
    }
  }

  &__leading {
    align-items: center;
    display: inline-flex;
    justify-content: center;
    min-width: var(--menu-list-item-selected-leading-icon-size, #{map.get($theme, menu-list-item-selected-leading-icon-size)});
  }

  &__label {
    flex: 1;
  }
}
</style>
