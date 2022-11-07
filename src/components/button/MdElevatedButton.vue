<template>
  <MdButtonBase class="md-elevated-button" :disabled="disabled">
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
@use '../ripple/ripple';

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
  @include ripple.ripple($theme, null, 100px);

  &:hover:not(:focus):not(:active) {
    box-shadow: elevation.resolve-box-shadow(map.get($theme, hover-container-elevation), map.get($theme, container-shadow-color));
  }

  &:disabled {
    background-color: rgba(map.get($theme, disabled-container-color), map.get($theme, disabled-container-opacity));
    color: rgba(map.get($theme, disabled-label-text-color), map.get($theme, disabled-label-text-opacity));
    box-shadow: none;
  }
}
</style>
