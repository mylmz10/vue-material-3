<template>
  <MdButtonBase class="md-outlined-button" :disabled="disabled">
    <MdRipple />
    <div class="md-button__outline"></div>
    <span v-if="label" class="md-button__label">
      {{ label }}
    </span>
    <span v-else class="md-button__label">
      <slot />
    </span>
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
@use '../ripple/ripple';

$theme: tokens.md-comp-outlined-button-values();

.md-outlined-button {
  height: map.get($theme, container-height);
  border-radius: map.get($theme, container-shape);
  box-shadow: none;
  @include ripple.ripple($theme, null, 100px);

  .md-button__outline {
    position: absolute;
    inset: 0;
    z-index: 0;
    border-radius: inherit;
    outline: map.get($theme, outline-color) solid map.get($theme, outline-width);
  }
  .md-button__label {
    color: map.get($theme, label-text-color);
    font-family: map.get($theme, label-text-font);
    font-size: map.get($theme, label-text-size);
    font-weight: map.get($theme, label-text-weight);
    letter-spacing: map.get($theme, label-text-tracking);
    line-height: map.get($theme, label-text-line-height);
  }
  .md-button__background {
    background-color: map.get($theme, container-color);
  }

  &:not(:disabled):hover {
    box-shadow: none;
  }

  &:disabled {
    box-shadow: none;

    .md-button__outline {
      outline-color: rgba(map.get($theme, disabled-outline-color), map.get($theme, disabled-outline-opacity));
    }
    .md-button__background {
      background-color: map.get($theme, disabled-container-color);
      opacity: map.get($theme, disabled-container-opacity);
    }
    .md-button__label {
      color: map.get($theme, disabled-label-text-color);
      opacity: map.get($theme, disabled-label-text-opacity);
    }
  }
}
</style>
