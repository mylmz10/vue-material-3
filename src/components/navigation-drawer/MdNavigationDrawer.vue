<template>
  <div class="md-navigation-drawer" :class="{ 'md-navigation-drawer--opened': _opened, 'md-navigation-drawer--modal': modal }">
    <div v-if="modal" class="md-navigation-drawer__overlay" @click="close"></div>
    <div class="md-navigation-drawer__slot-content">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const _opened = ref(false);

const emit = defineEmits(['change']);

const props = defineProps({
  opened: {
    type: Boolean,
  },
  modal: {
    type: Boolean,
  },
});

const close = () => {
  _opened.value = false;
  emit('change', _opened.value);
};

onMounted(() => {
  _opened.value = props.opened;
});

watch(
  () => props.opened,
  (newValue) => {
    _opened.value = newValue;
  },
  { immediate: true }
);
</script>

<style lang="scss">
@use 'sass:map';
@use '../../styles/tokens';
@use '../../styles/theme/md-sys-color' as theme;
@use '../elevation/elevation';

$theme: tokens.md-comp-navigation-drawer-values();
$sys-color: theme.values();

.md-navigation-drawer {
  --md-navigation-drawer-container-color: #{theme.value('surface')};
  --md-navigation-drawer-modal-container-color: #{theme.value('surface-container-low')};
  --md-navigation-drawer-item-color: #{theme.value('on-surface-variant')};
  --md-navigation-drawer-active-indicator-color: #{theme.value('secondary-container')};
  --md-navigation-drawer-active-label-text-color: #{theme.value('on-secondary-container')};
  --md-navigation-drawer-active-hover-state-layer-color: #{theme.value('on-secondary-container')};
  --md-navigation-drawer-active-focus-state-layer-color: #{theme.value('on-secondary-container')};
  --md-navigation-drawer-active-pressed-state-layer-color: #{theme.value('on-secondary-container')};
  display: flex;
  inline-size: 0;
  box-sizing: border-box;
  overflow: hidden;
  overflow-y: auto;
  transition: inline-size 0.25s linear, visibility 0.25s linear;
  visibility: hidden;
  height: map.get($theme, container-height);

  &--opened {
    visibility: visible;
    inline-size: map.get($theme, container-width);
    transition: inline-size 0.25s linear, visibility 0s linear;
  }

  &__slot-content {
    display: flex;
    flex-direction: column;
    position: relative;
    box-sizing: border-box;
    min-inline-size: map.get($theme, container-width);
    max-inline-size: map.get($theme, container-width);
    background-color: var(--md-navigation-drawer-container-color);
    border-radius: map.get($theme, container-shape);
    box-shadow: elevation.resolve-box-shadow(map.get($theme, standard-container-elevation), map.get($sys-color, shadow));
    padding: 12px;

    .md-list {
      min-width: auto;
      max-height: none;
      width: 100%;
      padding-block: 0;
      background-color: transparent;
      overflow: visible;
    }

    .md-list-item {
      color: var(--md-navigation-drawer-item-color);
      padding: 12px 16px;
      box-sizing: border-box;

      .md-list-item__label-text,
      .md-list-item__trailing-text,
      .md-icon {
        color: inherit;
      }

      &:hover {
        cursor: pointer;
        color: var(--md-navigation-drawer-active-label-text-color);

        .md-list-item__label-text {
          color: inherit;
        }

        .md-list-item__state-layer {
          background-color: var(--md-navigation-drawer-active-hover-state-layer-color);
          border-radius: map.get($theme, active-indicator-shape);
          opacity: 0.08;
        }
      }

      &--selected {
        width: map.get($theme, active-indicator-width);
        height: map.get($theme, active-indicator-height);
        color: var(--md-navigation-drawer-active-label-text-color);
        background-color: var(--md-navigation-drawer-active-indicator-color);
        border-radius: map.get($theme, active-indicator-shape);
      }

      .md-ripple {
        --md-ripple-hover-state-layer-color: var(--md-navigation-drawer-active-hover-state-layer-color);
        --md-ripple-focus-state-layer-color: var(--md-navigation-drawer-active-focus-state-layer-color);
        --md-ripple-pressed-state-layer-color: var(--md-navigation-drawer-active-pressed-state-layer-color);
        --md-ripple-hover-state-layer-opacity: #{map.get($theme, hover-state-layer-opacity)};
        --md-ripple-focus-state-layer-opacity: #{map.get($theme, focus-state-layer-opacity)};
        --md-ripple-pressed-state-layer-opacity: #{map.get($theme, pressed-state-layer-opacity)};
        border-radius: map.get($theme, active-indicator-shape);
        z-index: 1;
      }
    }
  }

  &--modal {
    position: absolute;
    inset: 0;
    z-index: 1000;

    .md-navigation-drawer__slot-content {
      background-color: var(--md-navigation-drawer-modal-container-color);
      box-shadow: elevation.resolve-box-shadow(map.get($theme, modal-container-elevation), map.get($sys-color, shadow));
    }
  }

  &__overlay {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.32);
    opacity: 1;
  }
}
</style>
