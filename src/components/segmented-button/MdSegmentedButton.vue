<template>
  <button class="md-segmented-button" :class="{ 'md-segmented-button--selected': selected, 'md-segmented-button--disabled': disabled }" v-bind:disabled="disabled">
    <span class="md-segmented-button__checkmark" :class="{ 'md-segmented-button__checkmark--show': !noCheckmark && selected }"><MdIcon v-if="selected">check</MdIcon></span>
    <span class="md-segmented-button__label">{{ label }}</span>
    <span class="md-segmented-button__outline"></span>
    <MdRipple />
  </button>
</template>

<script setup>
import MdRipple from '../ripple/MdRipple.vue';
import MdIcon from '../icon/MdIcon.vue';

const props = defineProps({
  disabled: {
    type: Boolean,
  },
  selected: {
    type: Boolean,
  },
  label: {
    type: [String, Number],
  },
  noCheckmark: {
    type: Boolean,
  },
});
</script>

<style lang="scss">
@use 'sass:map';
@use '../../styles/tokens';
@use '../ripple/ripple';

$theme: tokens.md-comp-outlined-segmented-button-values();
.md-segmented-button {
  position: relative;
  border: none;
  padding: 0;
  margin: 0;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  height: map.get($theme, container-height);
  min-width: 100px;
  $this: &;

  &:hover:not(:disabled) {
    cursor: pointer;
  }

  &:first-child,
  &:first-child .md-ripple {
    border-top-left-radius: map.get($theme, shape);
    border-bottom-left-radius: map.get($theme, shape);
  }
  &:last-child,
  &:last-child .md-ripple {
    border-top-right-radius: map.get($theme, shape);
    border-bottom-right-radius: map.get($theme, shape);
  }

  @include ripple.ripple(
    $theme,
    (
      hover-state-layer-color: unselected-hover-state-layer-color,
      focus-state-layer-color: unselected-focus-state-layer-color,
      pressed-state-layer-color: unselected-pressed-state-layer-color,
      hover-state-layer-opacity: hover-state-layer-opacity,
      focus-state-layer-opacity: focus-state-layer-opacity,
      pressed-state-layer-opacity: pressed-state-layer-opacity,
    ),
    0px
  );

  &__outline {
    border-radius: inherit;
    border-style: solid;
    border-width: map.get($theme, outline-width);
    inset: 0px -0.5px;
    pointer-events: none;
    position: absolute;
    border-color: map.get($theme, outline-color);
  }

  &__checkmark {
    width: 0;
    margin-right: 0;
    transition: ease width 0.2s;

    &#{$this}__checkmark--show {
      width: 24px;
      margin-right: 4px;
      overflow: hidden;
    }
  }

  &__label {
    color: map.get($theme, unselected-label-text-color);
    font-family: map.get($theme, label-text-font);
    font-size: map.get($theme, label-text-size);
    font-weight: map.get($theme, label-text-weight);
    letter-spacing: map.get($theme, label-text-tracking);
    line-height: map.get($theme, label-text-line-height);
  }

  &--selected {
    background-color: map.get($theme, selected-container-color);
  }

  &--disabled {
    #{$this}__outline {
      border-color: map.get($theme, disabled-outline-color);
      opacity: map.get($theme, disabled-outline-opacity);
    }
    #{$this}__label {
      color: map.get($theme, disabled-label-text-color);
      opacity: map.get($theme, disabled-label-text-opacity);
    }
  }
}
</style>
