<template>
  <div ref="gridEl" class="md-date-picker-year-grid" role="listbox" :aria-label="ariaLabel">
    <button
      v-for="item in items"
      :key="item.value"
      :ref="(el) => setItemRef(el, item.value)"
      type="button"
      role="option"
      class="md-date-picker-year-grid__item"
      :class="{
        'md-date-picker-year-grid__item--selected': item.selected,
        'md-date-picker-year-grid__item--disabled': item.disabled,
      }"
      :tabindex="item.value === activeValue ? 0 : -1"
      :disabled="item.disabled"
      :aria-selected="item.selected ? 'true' : 'false'"
      :aria-disabled="item.disabled ? 'true' : 'false'"
      @keydown="handleKeydown($event, item.value)"
      @click="$emit('select', item.value)"
    >
      {{ item.label }}
    </button>
  </div>
</template>

<script setup>
import { nextTick, onMounted, ref, watch } from 'vue';

const props = defineProps({
  ariaLabel: {
    type: String,
    default: 'Years',
  },
  items: {
    type: Array,
    default: () => [],
  },
});

defineEmits(['select']);

const itemRefs = new Map();
const gridEl = ref(null);

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
  if (!selectedEl || !gridEl.value) {
    return;
  }

  gridEl.value.scrollTop = Math.max(
    0,
    selectedEl.offsetTop - (gridEl.value.clientHeight - selectedEl.offsetHeight) / 2
  );
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

  if (event.key === 'ArrowRight') {
    await focusByIndex(Math.min(enabledItems.length - 1, currentIndex + 1));
  }

  if (event.key === 'ArrowLeft') {
    await focusByIndex(Math.max(0, currentIndex - 1));
  }

  if (event.key === 'ArrowDown') {
    await focusByIndex(Math.min(enabledItems.length - 1, currentIndex + 3));
  }

  if (event.key === 'ArrowUp') {
    await focusByIndex(Math.max(0, currentIndex - 3));
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

$theme: tokens.md-comp-date-picker-modal-values();

.md-date-picker-year-grid {
  align-content: start;
  box-sizing: border-box;
  display: grid;
  gap: 12px 16px;
  grid-template-columns: repeat(3, var(--year-selection-year-container-width, #{map.get($theme, year-selection-year-container-width)}));
  height: 288px;
  justify-content: center;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 16px 24px 8px;
  scrollbar-gutter: stable both-edges;

  &__item {
    align-items: center;
    background: transparent;
    border: none;
    border-radius: var(--year-selection-year-state-layer-shape, #{map.get($theme, year-selection-year-state-layer-shape)});
    color: var(--year-selection-year-unselected-label-text-color, #{map.get($theme, year-selection-year-unselected-label-text-color)});
    cursor: pointer;
    display: inline-flex;
    font-family: var(--year-selection-year-label-text-font, #{map.get($theme, year-selection-year-label-text-font)});
    font-size: var(--year-selection-year-label-text-size, #{map.get($theme, year-selection-year-label-text-size)});
    font-weight: var(--year-selection-year-label-text-weight, #{map.get($theme, year-selection-year-label-text-weight)});
    isolation: isolate;
    justify-content: center;
    letter-spacing: var(--year-selection-year-label-text-tracking, #{map.get($theme, year-selection-year-label-text-tracking)});
    line-height: var(--year-selection-year-label-text-line-height, #{map.get($theme, year-selection-year-label-text-line-height)});
    height: var(--year-selection-year-state-layer-height, #{map.get($theme, year-selection-year-state-layer-height)});
    padding: 0;
    position: relative;
    transition: background-color 150ms ease, color 150ms ease;
    width: var(--year-selection-year-state-layer-width, #{map.get($theme, year-selection-year-state-layer-width)});

    &::before {
      background-color: var(--year-selection-year-unselected-hover-state-layer-color, #{map.get($theme, year-selection-year-unselected-hover-state-layer-color)});
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
        opacity: var(--year-selection-year-unselected-hover-state-layer-opacity, #{map.get($theme, year-selection-year-hover-state-layer-opacity)});
      }
    }

    &:focus-visible:not(:disabled)::before {
      background-color: var(--year-selection-year-unselected-focus-state-layer-color, #{map.get($theme, year-selection-year-unselected-focus-state-layer-color)});
      opacity: var(--year-selection-year-unselected-focus-state-layer-opacity, #{map.get($theme, year-selection-year-focus-state-layer-opacity)});
    }

    &:disabled {
      cursor: default;
      opacity: 0.38;
    }

    &--selected {
      background-color: var(--year-selection-year-selected-container-color, #{map.get($theme, year-selection-year-selected-container-color)});
      color: var(--year-selection-year-selected-label-text-color, #{map.get($theme, year-selection-year-selected-label-text-color)});
    }
  }
}
</style>
