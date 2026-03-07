<template>
  <button class="md-branded-fab" :class="{ 'md-branded-fab--large': size === 'large' && !label, 'md-branded-fab--extended': !!label }" :disabled="disabled">
    <MdRipple></MdRipple>
    <span class="md-branded-fab__icon">
      <slot name="icon">
        <i class="material-icons">{{ icon }}</i>
      </slot>
    </span>
    <span v-if="label" class="md-branded-fab__label">{{ label }}</span>
    <MdElevationOverlay></MdElevationOverlay>
  </button>
</template>

<script setup>
import MdElevationOverlay from '../elevation/MdElevationOverlay.vue';
import MdRipple from '../ripple/MdRipple.vue';

defineProps({
  icon: { type: String },
  label: { type: String },
  disabled: { type: Boolean },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['medium', 'large'].includes(value),
  },
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

  .md-branded-fab__icon {
    color: map.get($theme, icon-color);
    width: map.get($theme, icon-size);
    height: map.get($theme, icon-size);
    font-size: map.get($theme, icon-size);
    --mdc-icon-size: map.get($theme, icon-size);
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .md-branded-fab__icon > * {
    width: 100%;
    height: 100%;
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

.md-branded-fab {
  &:not(.md-branded-fab--extended) {
    $theme: tokens.md-comp-fab-branded-values();
    @include root-static-styles($theme);

    --surface-tint-layer-color: #{map.get($theme, container-color)};
    --overlay-opacity: 0.11;
  }
}

.md-branded-fab--large.md-branded-fab {
  @include root-static-styles(tokens.md-comp-fab-branded-large-values());
}

.md-branded-fab--extended {
  $theme: tokens.md-comp-extended-fab-branded-values();
  @include surface.root-static-styles;
  display: inline-flex;
  border: none;
  outline: none;
  vertical-align: middle;
  text-decoration: none;
  padding: 0 16px;
  align-items: center;
  justify-content: center;
  height: map.get($theme, container-height);
  border-radius: map.get($theme, container-shape);
  background-color: map.get($theme, container-color);
  box-shadow: elevation.resolve-box-shadow(map.get($theme, container-elevation), map.get($theme, container-shadow-color));

  &:hover:not(:focus):not(:active) {
    box-shadow: elevation.resolve-box-shadow(map.get($theme, hover-container-elevation), map.get($theme, container-shadow-color));
  }

  .md-branded-fab__icon {
    margin-right: 12px;
    color: map.get($theme, icon-color);
    width: map.get($theme, icon-size);
    height: map.get($theme, icon-size);
    font-size: map.get($theme, icon-size);
    --mdc-icon-size: map.get($theme, icon-size);
  }

  .md-branded-fab__label {
    color: map.get($theme, label-text-color);
    font-family: map.get($theme, label-text-font);
    line-height: map.get($theme, label-text-line-height);
    font-size: map.get($theme, label-text-size);
    letter-spacing: map.get($theme, label-text-tracking);
    font-weight: map.get($theme, label-text-weight);
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
</style>
