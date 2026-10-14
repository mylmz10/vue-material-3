<template>
  <button
    class="md-segmented-button"
    :class="{ 'md-segmented-button--selected': selected, 'md-segmented-button--disabled': disabled }"
    v-bind:disabled="disabled"
    @mouseup="handlePointerRelease"
    @touchend="handlePointerRelease"
  >
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
  icon: {
    type: String,
  },
});

const handlePointerRelease = (event) => {
  event.currentTarget?.blur?.();
};
</script>

<style lang="scss">
@use 'sass:map';
@use '../../styles/tokens';
@use '../../styles/theme/md-sys-color' as theme;
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

  --md-segmented-button-outline-color: #{theme.value('outline')};
  --md-segmented-button-label-color: #{theme.value('on-surface')};
  --md-segmented-button-selected-container-color: #{theme.value('secondary-container')};
  --md-segmented-button-selected-label-color: #{theme.value('on-secondary-container')};
  --md-segmented-button-disabled-color: #{theme.value('on-surface')};
  --md-segmented-button-ripple-color: #{theme.value('on-surface')};

  &:hover:not(:disabled) {
    cursor: pointer;
  }

  &:first-child,
  &:first-child .md-ripple {
    border-top-left-radius: map.get($theme, shape);
    border-bottom-left-radius: map.get($theme, shape);
  }
  &:not(:last-child) {
    overflow: hidden;
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
    inset: 0;
    pointer-events: none;
    position: absolute;
    border-color: var(--md-segmented-button-outline-color);
  }

  &:not(:first-child) &__outline {
    border-left: none;
  }

  &__checkmark {
    width: 0;
    margin-right: 0;
    transition: ease width 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;

    &#{$this}__checkmark--show {
      width: map.get($theme, with-icon-icon-size);
      margin-right: 4px;
      overflow: hidden;

      .md-icon {
        font-size: map.get($theme, with-icon-icon-size);
      }
    }
  }

  &__label {
    color: var(--md-segmented-button-label-color);
    font-family: map.get($theme, label-text-font);
    font-size: map.get($theme, label-text-size);
    font-weight: map.get($theme, label-text-weight);
    letter-spacing: map.get($theme, label-text-tracking);
    line-height: map.get($theme, label-text-line-height);
  }

  &--selected {
    background-color: var(--md-segmented-button-selected-container-color);

    #{$this}__label,
    #{$this}__checkmark {
      color: var(--md-segmented-button-selected-label-color);
    }

    --md-segmented-button-ripple-color: #{theme.value('on-secondary-container')};
  }

  &--disabled {
    #{$this}__outline {
      border-color: var(--md-segmented-button-disabled-color);
      opacity: map.get($theme, disabled-outline-opacity);
    }
    #{$this}__label {
      color: var(--md-segmented-button-disabled-color);
      opacity: map.get($theme, disabled-label-text-opacity);
    }
  }

  .md-ripple {
    --md-ripple-hover-state-layer-color: var(--md-segmented-button-ripple-color);
    --md-ripple-focus-state-layer-color: var(--md-segmented-button-ripple-color);
    --md-ripple-pressed-state-layer-color: var(--md-segmented-button-ripple-color);
  }
}
</style>
