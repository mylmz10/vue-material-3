<template>
  <button
    ref="itemEl"
    class="md-menu-item"
    :class="{
      'md-menu-item--selected': selected,
      'md-menu-item--disabled': disabled,
      'md-menu-item--submenu': submenu,
    }"
    type="button"
    role="menuitem"
    data-md-menu-item="true"
    :data-md-submenu-trigger="submenu ? 'true' : 'false'"
    :aria-disabled="`${disabled}`"
    :disabled="disabled"
    tabindex="-1"
    @click="onActivate"
    @keydown="onKeydown"
  >
    <span class="md-menu-item__state-layer"></span>
    <span v-if="icon || $slots.start" class="md-menu-item__start">
      <MdIcon v-if="icon">{{ icon }}</MdIcon>
      <slot name="start" />
    </span>
    <span class="md-menu-item__label">
      <slot>{{ label }}</slot>
    </span>
    <span v-if="selected || trailingIcon || $slots.end" class="md-menu-item__end">
      <slot name="end">
        <MdIcon v-if="trailingIcon">{{ trailingIcon }}</MdIcon>
        <MdIcon v-else-if="selected">check</MdIcon>
      </slot>
    </span>
    <MdRipple />
  </button>
</template>

<script setup>
import { computed, inject, ref } from 'vue';
import MdIcon from '../icon/MdIcon.vue';
import MdRipple from '../ripple/MdRipple.vue';

const props = defineProps({
  label: {
    type: [String, Number],
    default: '',
  },
  value: {
    type: [String, Number, Boolean, Object],
    default: undefined,
  },
  icon: {
    type: String,
    default: '',
  },
  trailingIcon: {
    type: String,
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
  submenu: {
    type: Boolean,
    default: false,
  },
  keepOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['click', 'select', 'keydown', 'submenu-open-request']);
const itemEl = ref(null);
const mdMenuContextKey = 'mdMenuContext';
const menuContext = inject(mdMenuContextKey, null);

const selectionPayload = computed(() => ({
  label: props.label,
  value: props.value !== undefined ? props.value : props.label,
}));

const onActivate = (event) => {
  if (props.disabled) {
    event.preventDefault();
    return;
  }

  emit('click', event);
  emit('select', selectionPayload.value);

  if (!props.keepOpen) {
    menuContext?.onItemSelect?.(selectionPayload.value);
  }
};

const onKeydown = (event) => {
  emit('keydown', event);

  if (props.disabled) {
    return;
  }

  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    onActivate(event);
    return;
  }

  if (props.submenu && event.key === 'ArrowRight') {
    event.preventDefault();
    emit('submenu-open-request', event);
  }
};

const focus = () => {
  itemEl.value?.focus?.();
};

defineExpose({
  focus,
});
</script>

<style lang="scss">
@use 'sass:map';
@use '../../styles/tokens';

$menu-theme: tokens.md-comp-menu-values();
$list-theme: tokens.md-comp-list-values();

.md-menu-item {
  position: relative;
  align-items: center;
  appearance: none;
  background: transparent;
  border: none;
  color: map.get($list-theme, list-item-label-text-color);
  cursor: pointer;
  display: flex;
  font: inherit;
  min-height: 48px;
  padding: 0 12px 0 16px;
  text-align: left;
  width: 100%;

  --md-ripple-hover-state-layer-color: #{map.get($list-theme, list-item-hover-state-layer-color)};
  --md-ripple-focus-state-layer-color: #{map.get($list-theme, list-item-focus-state-layer-color)};
  --md-ripple-pressed-state-layer-color: #{map.get($list-theme, list-item-pressed-state-layer-color)};
  --md-ripple-hover-state-layer-opacity: #{map.get($list-theme, list-item-hover-state-layer-opacity)};
  --md-ripple-focus-state-layer-opacity: #{map.get($list-theme, list-item-focus-state-layer-opacity)};
  --md-ripple-pressed-state-layer-opacity: #{map.get($list-theme, list-item-pressed-state-layer-opacity)};

  &:focus-visible {
    outline: none;
  }

  &__state-layer {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    z-index: 0;
  }

  &__start {
    align-items: center;
    color: map.get($menu-theme, menu-list-item-with-leading-icon-icon-color);
    display: inline-flex;
    margin-inline-end: 12px;
    z-index: 1;
  }

  &__label {
    color: inherit;
    flex: 1 1 auto;
    font-family: map.get($list-theme, list-item-label-text-font);
    font-size: map.get($list-theme, list-item-label-text-size);
    font-weight: map.get($list-theme, list-item-label-text-weight);
    letter-spacing: map.get($list-theme, list-item-label-text-tracking);
    line-height: map.get($list-theme, list-item-label-text-line-height);
    z-index: 1;
  }

  &__end {
    align-items: center;
    color: map.get($menu-theme, menu-list-item-with-leading-icon-icon-color);
    display: inline-flex;
    margin-inline-start: 12px;
    z-index: 1;
  }

  &--selected {
    background-color: map.get($menu-theme, list-item-selected-container-color);
    color: map.get($menu-theme, list-item-selected-label-text-color);

    .md-menu-item__end,
    .md-menu-item__start {
      color: map.get($menu-theme, list-item-selected-with-leading-icon-trailing-icon-color);
    }
  }

  &--disabled {
    cursor: default;
    opacity: 0.38;
  }
}
</style>
