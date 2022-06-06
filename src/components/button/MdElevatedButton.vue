<template>
  <MdButtonBase :disabled="disabled" class="md-elevated-button">
    <MdRipple />
    <template v-if="label">
      {{ label }}
    </template>
    <slot v-else />
  </MdButtonBase>
</template>

<script setup>
import MdButtonBase from './MdButtonBase.vue';
import MdRipple from '../ripple/MdRipple.vue';

defineProps({
  label: {
    type: String,
  },
  disabled: {
    type: Boolean,
  },
});
</script>

<style lang="scss">
@use 'sass:map';
@use '../../styles/tokens';
@use '../elevation/surface';
@use '../elevation/elevation';

$theme: tokens.md-comp-elevated-button-values();

.md-elevated-button {
  @include surface.root-static-styles;
  background-color: map.get($theme, container-color);
  height: map.get($theme, container-height);
  border-radius: map.get($theme, container-shape);
  color: map.get($theme, label-text-color);
  font-family: map.get($theme, label-text-font);
  font-size: map.get($theme, label-text-size);
  font-weight: map.get($theme, label-text-weight);
  letter-spacing: map.get($theme, label-text-tracking);
  line-height: map.get($theme, label-text-line-height);

  box-shadow: elevation.resolve-box-shadow(map.get($theme, container-elevation), map.get($theme, container-shadow-color));

  &:hover:not(:focus):not(:active) {
    box-shadow: elevation.resolve-box-shadow(map.get($theme, hover-container-elevation), map.get($theme, container-shadow-color));
  }

  &:disabled {
    background-color: rgba(map.get($theme, disabled-container-color), map.get($theme, disabled-container-opacity));
    color: rgba(map.get($theme, disabled-label-text-color), map.get($theme, disabled-label-text-opacity));
    box-shadow: none;
  }

  .md-ripple {
    --md-ripple-hover-state-layer-color: #{map.get($theme, hover-state-layer-color)};
    --md-ripple-focus-state-layer-color: #{map.get($theme, focus-state-layer-color)};
    --md-ripple-pressed-state-layer-color: #{map.get($theme, pressed-state-layer-color)};
    --md-ripple-hover-state-layer-opacity: #{map.get($theme, hover-state-layer-opacity)};
    --md-ripple-focus-state-layer-opacity: #{map.get($theme, focus-state-layer-opacity)};
    --md-ripple-pressed-state-layer-opacity: #{map.get($theme, pressed-state-layer-opacity)};
    border-radius: var(--md-outlined-button-container-shape, 100px);
  }
}
</style>
