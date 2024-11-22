<template>
  <div class="md-filter-chip" :class="{ 'md-filter-chip--flat': !elevated, 'md-filter-chip--elevated': elevated, 'md-filter-chip--disabled': disabled, 'md-filter-chip--selected': selected }">
    <div class="md-filter-chip__background"></div>
    <div class="md-filter-chip__outline"></div>
    <MdRipple v-if="!disabled"></MdRipple>
    <div v-if="leadingIcon || selected" class="md-filter-chip__leading-icon">
      <MdIcon v-if="selected">check</MdIcon>
      <MdIcon v-else>{{ leadingIcon }}</MdIcon>
    </div>
    <div v-else-if="hasLeadingIconSlot" class="md-filter-chip__leading-icon">
      <slot name="leading-icon" />
    </div>
    <div class="md-filter-chip__text">{{ label }}</div>
    <div v-if="trailingIcon" class="md-filter-chip__trailing-icon">
      <MdIcon>{{ trailingIcon }}</MdIcon>
    </div>
  </div>
</template>

<script setup>
import { computed, useSlots } from 'vue';
import MdIcon from '../icon/MdIcon.vue';
import MdRipple from '../ripple/MdRipple.vue';

const slots = useSlots();

const props = defineProps({
  label: {
    type: String,
  },
  disabled: {
    type: Boolean,
  },
  elevated: {
    type: Boolean,
  },
  leadingIcon: {
    type: String,
  },
  trailingIcon: {
    type: String,
  },
  selected: {
    type: Boolean,
  },
});

const hasSlot = (name) => {
  return !!slots[name];
};

const hasLeadingIconSlot = computed(() => {
  return hasSlot('leading-icon');
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
  display: inline-flex;
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
  &__background {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
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
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    .md-icon {
      font-size: 18px;
    }
  }

  &__trailing-icon {
    padding-left: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
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
    width: 100%;
    text-wrap: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  &:hover {
    &__text {
      color: map.get($theme, hover-label-text-color);
    }
  }

  &--elevated {
    box-shadow: elevation.resolve-box-shadow(map.get($theme, elevated-container-elevation), map.get($theme, elevated-container-shadow-color));

    #{$this}__background {
      background-color: map.get($theme, elevated-unselected-container-color);
    }
  }

  &--selected {
    #{$this}__background {
      background-color: map.get($theme, elevated-container-color);
    }

    &:hover:not(&#{$this}--disabled) {
      box-shadow: elevation.resolve-box-shadow(map.get($theme, elevated-container-elevation), map.get($theme, elevated-container-shadow-color));
    }

    &#{$this}--flat {
      #{$this}__background {
        background-color: map.get($theme, flat-selected-container-color);
      }

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

    &#{$this}--elevated {
      #{$this}__background {
        background-color: map.get($theme, elevated-selected-container-color);
      }
    }

    &#{$this}--disabled {
      box-shadow: elevation.resolve-box-shadow(map.get($theme, elevated-disabled-container-elevation), map.get($theme, elevated-disabled-container-opacity));

      #{$this}__background {
        background-color: map.get($theme, elevated-disabled-container-color);
        opacity: map.get($theme, elevated-disabled-container-opacity);
      }
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
        #{$this}__background {
          background-color: map.get($theme, flat-disabled-selected-container-color);
          opacity: map.get($theme, flat-disabled-selected-container-opacity);
        }
        #{$this}__outline {
          border-color: map.get($theme, flat-disabled-selected-outline-color);
          opacity: map.get($theme, flat-disabled-selected-outline-opacity);
        }
      }
    }

    #{$this}__leading-icon {
      color: map.get($theme, with-leading-icon-disabled-leading-icon-color);
      opacity: map.get($theme, with-leading-icon-disabled-leading-icon-opacity);
    }

    #{$this}__text {
      color: map.get($theme, disabled-label-text-color);
      opacity: map.get($theme, disabled-label-text-opacity);
    }

    &#{$this}--elevated {
      #{$this}__background {
        background-color: map.get($theme, elevated-disabled-container-color);
        opacity: map.get($theme, elevated-disabled-container-opacity);
      }
      box-shadow: elevation.resolve-box-shadow(map.get($theme, elevated-disabled-container-elevation), map.get($theme, elevated-disabled-container-opacity));
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
