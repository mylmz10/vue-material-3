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

@mixin icon-static-styles($width-key, $height-key, $shape-key, $color-key) {
  width: map.get($theme, $width-key);
  height: map.get($theme, $height-key);
  border-radius: map.get($theme, $shape-key);
  color: map.get($theme, $color-key);
}

.md-icon-button {
  background-color: transparent;
  @include surface.root-static-styles;
  @include icon-static-styles(state-layer-width, state-layer-height, state-layer-shape, unselected-icon-color);
  border-radius: map.get($theme, state-layer-shape);
  margin: max(0px, (48px - #{map.get($theme, state-layer-width)}) / 2);
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
    $filled-theme: tokens.md-comp-filled-icon-button-values();
    width: map.get($filled-theme, container-width);
    height: map.get($filled-theme, container-height);
    border-radius: map.get($filled-theme, container-shape);
    color: map.get($filled-theme, icon-color);
    background-color: map.get($filled-theme, container-color);
    margin: max(0px, (48px - #{map.get($filled-theme, container-width)}) / 2);

    @include ripple.ripple($filled-theme);
  }

  &--tonal {
    $tonal-theme: tokens.md-comp-filled-tonal-icon-button-values();
    width: map.get($tonal-theme, container-width);
    height: map.get($tonal-theme, container-height);
    border-radius: map.get($tonal-theme, container-shape);
    color: map.get($tonal-theme, icon-color);
    background-color: map.get($tonal-theme, container-color);
    margin: max(0px, (48px - #{map.get($tonal-theme, container-width)}) / 2);

    @include ripple.ripple($tonal-theme);
  }

  &--outlined {
    $outlined-theme: tokens.md-comp-outlined-icon-button-values();
    width: map.get($outlined-theme, container-width);
    height: map.get($outlined-theme, container-height);
    border-radius: map.get($outlined-theme, container-shape);
    color: map.get($outlined-theme, unselected-icon-color);
    margin: max(0px, (48px - #{map.get($outlined-theme, container-width)}) / 2);

    border-width: map.get($outlined-theme, unselected-outline-width);
    border-color: map.get($outlined-theme, unselected-outline-color);
    border-style: solid;

    @include ripple.ripple(
      $outlined-theme,
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
