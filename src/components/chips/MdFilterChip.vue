<template>
  <div class="md-filter-chip" :class="{ 'md-filter-chip--flat': !elevated, 'md-filter-chip--elevated': elevated, 'md-filter-chip--disabled': disabled, 'md-filter-chip--selected': selected }">
    <div class="md-filter-chip__outline"></div>
    <MdRipple v-if="!disabled"></MdRipple>
    <div v-if="icon" class="md-filter-chip__leading-icon">
      <MdIcon>{{ icon }}</MdIcon>
    </div>
    <div class="md-filter-chip__text">Enabled</div>
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

$theme: tokens.md-comp-filter-chip-values();

.md-filter-chip {
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

  &__outline {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 0;
    border-radius: map.get($theme, container-shape);
  }

  &--flat {
    #{$this}__outline {
      border-width: map.get($theme, flat-unselected-outline-width);
      border-color: map.get($theme, flat-unselected-outline-color);
      border-style: solid;
    }
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

    &#{$this}--flat {
      background-color: map.get($theme, flat-selected-container-color);

      #{$this}__outline {
        border-width: map.get($theme, flat-selected-outline-width);
        border-color: map.get($theme, flat-selected-outline-color);
        border-style: solid;
      }

      @include ripple.ripple(
        $theme,
        (
          hover-state-layer-color: selected-hover-state-layer-color,
          focus-state-layer-color: selected-focus-state-layer-color,
          pressed-state-layer-color: selected-pressed-state-layer-color,
          hover-state-layer-opacity: selected-hover-state-layer-opacity,
          focus-state-layer-opacity: selected-focus-state-layer-opacity,
          pressed-state-layer-opacity: selected-pressed-state-layer-opacity,
        )
      );
      .md-ripple {
        border-radius: map.get($theme, container-shape);
      }
    }

    &--disabled {
      background-color: map.get($theme, elevated-disabled-container-color);
      box-shadow: elevation.resolve-box-shadow(map.get($theme, elevated-disabled-container-elevation), map.get($theme, elevated-disabled-container-opacity));
    }
  }

  &--disabled {
    cursor: default;

    &#{$this}--flat {
      #{$this}__outline {
        border-color: map.get($theme, flat-disabled-unselected-outline-color);
        opacity: map.get($theme, flat-disabled-unselected-outline-opacity);
      }

      &#{$this}--selected {
        #{$this}__outline {
          border-color: map.get($theme, flat-disabled-selected-outline-color);
          opacity: map.get($theme, flat-disabled-selected-outline-opacity);
        }
      }
    }

    #{$this}__text {
      color: map.get($theme, disabled-label-text-color);
      opacity: map.get($theme, disabled-label-text-opacity);
    }
  }

  @include ripple.ripple(
    $theme,
    (
      hover-state-layer-color: unselected-hover-state-layer-color,
      focus-state-layer-color: unselected-focus-state-layer-color,
      pressed-state-layer-color: unselected-pressed-state-layer-color,
      hover-state-layer-opacity: unselected-hover-state-layer-opacity,
      focus-state-layer-opacity: unselected-focus-state-layer-opacity,
      pressed-state-layer-opacity: unselected-pressed-state-layer-opacity,
    )
  );
  .md-ripple {
    border-radius: map.get($theme, container-shape);
  }
}
</style>
