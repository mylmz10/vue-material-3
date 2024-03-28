<template>
  <button class="md-fab" :class="{ 'md-fab--small': size === 'small', 'md-fab--large': size === 'large' }" :disabled="disabled">
    <MdRipple></MdRipple>
    <i class="material-icons md-fab__icon">{{ icon }}</i>
    <MdElevationOverlay></MdElevationOverlay>
  </button>
</template>

<script setup>
import MdElevationOverlay from '../elevation/MdElevationOverlay.vue';
import MdRipple from '../ripple/MdRipple.vue';

defineProps({
  icon: { type: String },
  disabled: { type: Boolean },
  size: { type: String },
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
  width: map.get($theme, container-width);
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

.md-fab {
  $theme: tokens.md-comp-fab-surface-values();
  @include root-static-styles($theme);

  --surface-tint-layer-color: #{map.get($theme, container-surface-tint-layer-color)};
  --overlay-opacity: 0.11;
}
.md-fab--small.md-fab {
  @include root-static-styles(tokens.md-comp-fab-surface-small-values());
}
.md-fab--large.md-fab {
  @include root-static-styles(tokens.md-comp-fab-surface-large-values());
}
</style>
