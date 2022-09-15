<template>
  <button class="md-fab--extended" :disabled="disabled">
    <MdRipple></MdRipple>
    <i class="material-icons md-fab__icon">{{ icon }}</i>
    <span class="md-fab__label">{{ label }}</span>
    <MdElevationOverlay></MdElevationOverlay>
  </button>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, ref, defineProps } from 'vue';
import MdElevationOverlay from '../elevation/MdElevationOverlay.vue';
import MdRipple from '../ripple/MdRipple.vue';

defineProps({
  icon: { type: String },
  disabled: { type: Boolean },
  label: { type: String },
});
</script>

<style lang="scss">
@use 'sass:map';
@use '../../styles/tokens';
@use '../elevation/surface';
@use '../elevation/elevation';

@mixin root-static-styles($theme) {
  @include surface.root-static-styles;
  display: inline-flex;
  border: none;
  outline: none;
  vertical-align: middle;
  text-decoration: none;
  padding: 0;
  align-items: center;
  justify-content: center;

  background-color: map.get($theme, container-color);
  height: map.get($theme, container-height);
  border-radius: map.get($theme, container-shape);

  box-shadow: elevation.resolve-box-shadow(map.get($theme, container-elevation), map.get($theme, container-shadow-color));

  &:hover:not(:focus):not(:active) {
    box-shadow: elevation.resolve-box-shadow(map.get($theme, hover-container-elevation), map.get($theme, container-shadow-color));
  }

  &__icon {
    color: map.get($theme, icon-color);
    width: map.get($theme, icon-size);
    height: map.get($theme, icon-size);
    font-size: map.get($theme, icon-size);
    --mdc-icon-size: map.get($theme, icon-size);
  }

  &:hover {
    cursor: pointer;
  }

  .md-ripple {
    --md-ripple-hover-state-layer-color: #{map.get($theme, hover-state-layer-color)};
    --md-ripple-focus-state-layer-color: #{map.get($theme, focus-state-layer-color)};
    --md-ripple-pressed-state-layer-color: #{map.get($theme, pressed-state-layer-color)};
    --md-ripple-hover-state-layer-opacity: #{map.get($theme, hover-state-layer-opacity)};
    --md-ripple-focus-state-layer-opacity: #{map.get($theme, focus-state-layer-opacity)};
    --md-ripple-pressed-state-layer-opacity: #{map.get($theme, pressed-state-layer-opacity)};
    border-radius: map.get($theme, container-shape);
  }
}

.md-fab--extended {
  $theme: tokens.md-comp-extended-fab-surface-values();
  @include root-static-styles($theme);

  padding: 16px;

  --surface-tint-layer-color: #{map.get($theme, container-surface-tint-layer-color)};
  --overlay-opacity: 0.11;

  .md-fab__icon {
    margin-right: 12px;
  }

  .md-fab__label {
    color: map.get($theme, label-text-color);
    font-family: map.get($theme, label-text-font);
    line-height: map.get($theme, label-text-line-height);
    font-size: map.get($theme, label-text-size);
    letter-spacing: map.get($theme, label-text-tracking);
    font-weight: map.get($theme, label-text-weight);
  }
}
</style>
