<template>
  <div class="md-suggest-chip" :class="{ 'md-suggest-chip--flat': !elevated, 'md-suggest-chip--elevated': elevated, 'md-suggest-chip--disabled': disabled, 'md-suggest-chip--selected': selected }">
    <MdRipple v-if="!disabled"></MdRipple>
    <div v-if="icon" class="md-suggest-chip__leading-icon">
      <MdIcon>{{ icon }}</MdIcon>
    </div>
    <div class="md-suggest-chip__text">Enabled</div>
  </div>
</template>

<script setup>
import MdIcon from '../icon/MdIcon.vue';
import MdRipple from '../ripple/MdRipple.vue';

defineProps({
  label: {
    type: String,
  },
  disabled: {
    type: Boolean,
  },
  elevated: {
    type: Boolean,
  },
  icon: {
    type: String,
  },
  selected: {
    type: Boolean,
  },
});
</script>

<style lang="scss">
@use 'sass:map';
@use '../../styles/tokens';
@use '../ripple/ripple';
@use '../elevation/surface';
@use '../elevation/elevation';

$theme: tokens.md-comp-suggestion-chip-values();

.md-suggest-chip {
  $this: &;
  display: flex;
  padding: 0 12px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;

  @include surface.root-static-styles;

  height: map.get($theme, container-height);
  border-radius: map.get($theme, container-shape);

  &--flat {
    border-width: map.get($theme, flat-outline-width);
    border-color: map.get($theme, flat-outline-color);
    border-style: solid;
  }

  &__leading-icon {
    padding-right: 8px;
    .md-icon {
      font-size: 18px;
    }
  }

  &__text {
    color: map.get($theme, label-text-color);
    font-family: map.get($theme, label-text-font);
    line-height: map.get($theme, label-text-line-height);
    font-size: map.get($theme, label-text-size);
    letter-spacing: map.get($theme, label-text-tracking);
    font-weight: map.get($theme, label-text-weight);
  }

  &:hover {
    &__text {
      color: map.get($theme, hover-label-text-color);
    }
  }

  &--disabled {
    cursor: default;

    &--flat {
      border-width: map.get($theme, flat-outline-width);
      border-color: map.get($theme, flat-disabled-outline-color);
      //flat-disabled-outline-color
      //flat-disabled-outline-opacity
    }

    #{$this}__text {
      color: map.get($theme, disabled-label-text-color);
      opacity: map.get($theme, disabled-label-text-opacity);
    }
  }

  &--elevated {
    background-color: map.get($theme, elevated-container-color);
    box-shadow: elevation.resolve-box-shadow(map.get($theme, elevated-container-elevation), map.get($theme, elevated-container-shadow-color));

    &--disabled {
      background-color: map.get($theme, elevated-disabled-container-color);
      box-shadow: elevation.resolve-box-shadow(map.get($theme, elevated-disabled-container-elevation), map.get($theme, elevated-disabled-container-opacity));
    }
  }

  &--selected {
    background-color: map.get($theme, elevated-container-color);
    box-shadow: elevation.resolve-box-shadow(map.get($theme, elevated-container-elevation), map.get($theme, elevated-container-shadow-color));

    &--disabled {
      background-color: map.get($theme, elevated-disabled-container-color);
      box-shadow: elevation.resolve-box-shadow(map.get($theme, elevated-disabled-container-elevation), map.get($theme, elevated-disabled-container-opacity));
    }
  }

  @include ripple.ripple($theme);
  .md-ripple {
    border-radius: map.get($theme, container-shape);
  }
}
</style>
