<template>
  <button :disabled="disabled" class="md-icon-button" :class="{ 'md-icon-button--filled': filled, 'md-icon-button--tonal': tonal, 'md-icon-button--outlined': outlined }">
    <MdRipple />
    <MdIcon class="md-icon-button__icon">
      <template v-if="icon">
        {{ icon }}
      </template>
      <slot v-else />
    </MdIcon>
  </button>
</template>

<script setup>
import MdRipple from '../ripple/MdRipple.vue';
import MdIcon from '../icon/MdIcon.vue';

defineProps({
  icon: {
    type: String,
  },
  disabled: {
    type: Boolean,
  },
  filled: {
    type: Boolean,
  },
  tonal: {
    type: Boolean,
  },
  outlined: {
    type: Boolean,
  },
});
</script>

<style lang="scss">
@use 'sass:map';
@use '../../styles/tokens';
@use '../elevation/surface';
@use '../ripple/ripple';

$theme: tokens.md-comp-icon-button-values();

@mixin icon-static-styles($theme) {
  width: map.get($theme, state-layer-size);
  height: map.get($theme, state-layer-size);
  border-radius: map.get($theme, container-shape);
  color: map.get($theme, unselected-icon-color);
  background-color: map.get($theme, container-color);
}

.md-icon-button {
  background-color: transparent;
  @include surface.root-static-styles;
  @include icon-static-styles($theme);
  border-radius: map.get($theme, state-layer-shape);
  margin: max(0px, (48px - #{map.get($theme, state-layer-size)}) / 2);
  align-items: center;
  border: none;
  box-sizing: border-box;
  cursor: pointer;
  justify-content: center;
  display: flex;

  &:disabled {
    color: rgba(map.get($theme, disabled-icon-color), map.get($theme, disabled-icon-opacity));
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

  &--filled {
    $theme: tokens.md-comp-filled-icon-button-values();
    @include icon-static-styles($theme);
    color: map.get($theme, icon-color);
    margin: max(0px, (48px - #{map.get($theme, container-size)}) / 2);

    @include ripple.ripple($theme);
  }

  &--tonal {
    $theme: tokens.md-comp-filled-tonal-icon-button-values();
    @include icon-static-styles($theme);
    color: map.get($theme, icon-color);
    margin: max(0px, (48px - #{map.get($theme, container-size)}) / 2);

    @include ripple.ripple($theme);
  }

  &--outlined {
    $theme: tokens.md-comp-outlined-icon-button-values();
    @include icon-static-styles($theme);
    border-radius: map.get($theme, container-shape);
    color: map.get($theme, icon-color);
    margin: max(0px, (48px - #{map.get($theme, container-size)}) / 2);

    border-width: map.get($theme, unselected-outline-width);
    border-color: map.get($theme, unselected-outline-color);
    border-style: solid;

    @include ripple.ripple(
      $theme,
      (
        hover-state-layer-color: unselected-hover-state-layer-color,
        focus-state-layer-color: unselected-focus-state-layer-color,
        pressed-state-layer-color: unselected-pressed-state-layer-color,
        hover-state-layer-opacity: hover-state-layer-opacity,
        focus-state-layer-opacity: focus-state-layer-opacity,
        pressed-state-layer-opacity: pressed-state-layer-opacity,
      )
    );
  }
}
</style>
