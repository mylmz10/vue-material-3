<template>
  <div class="md-menu" :class="{ 'md-menu--open': modelValue }">
    <div ref="activatorEl" class="md-menu__activator"><slot name="activator" :onClick="onActivatorClick" /></div>
    <div ref="contentEl" class="md-menu__content">
      <div class="md-menu__surface"></div>
      <slot />
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, useSlots, ref } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
  },
  closeOnOutsideClick: {
    type: Boolean,
    default: true,
  },
});

const slots = useSlots();

const activatorEl = ref(null);
const contentEl = ref(null);

const emit = defineEmits(['update:modelValue']);

onMounted(() => {
  document.addEventListener('mousedown', handleOutsideClick);
});

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleOutsideClick);
});

const close = () => {
  emit('update:modelValue', false);
};

const onActivatorClick = () => {
  emit('update:modelValue', !props.modelValue);
};

const handleOutsideClick = (e) => {
  if (!e.composedPath().includes(contentEl.value) && !e.composedPath().includes(activatorEl.value)) {
    if (props.closeOnOutsideClick) {
      if (props.modelValue) {
        close();
      }
    }
  }
};
</script>

<style lang="scss">
@use 'sass:map';
@use '../../styles/tokens';
@use '../elevation/surface';
@use '../elevation/elevation';

$theme: tokens.md-comp-menu-values();

.md-menu {
  border-radius: map.get($theme, container-shape);
  position: relative;
  user-select: none;
  z-index: 2;

  &--open {
    z-index: 20;
  }

  $this: &;

  &__activator {
    display: inline-block;
  }

  &__content {
    position: absolute;
    box-shadow: elevation.resolve-box-shadow(map.get($theme, container-elevation), map.get($theme, container-shadow-color));
    border-radius: inherit;
    background-color: map.get($theme, container-color);
    transform-origin: top;
    transition: transform 0.25s ease-in-out;
    overflow: hidden;

    .md-menu__surface {
      position: absolute;
      inset: 0;
      background-color: map.get($theme, container-surface-tint-layer-color);
      opacity: 0.11;
    }

    .md-list {
      background-color: transparent;
      border-radius: inherit;

      .md-list-item:hover {
        cursor: pointer;
      }
    }
  }

  &:not(&--open) {
    #{$this}__content {
      transform: scaleY(0);
    }
  }
}
</style>
