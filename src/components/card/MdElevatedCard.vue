<template>
  <div class="md-elevated-card">
    <div class="md-elevated-card__container">
      <div class="md-elevated-card__state-layer"></div>
      <slot />
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss">
@use 'sass:map';
@use '../elevation/elevation';
@use '../../styles/tokens';

$theme: tokens.md-comp-elevated-card-values();

.md-elevated-card {
  //background-color: map.get($theme, container-color);
  border-radius: map.get($theme, container-shape);
  margin: 0 8px;
  width: 360px;
  box-shadow: elevation.resolve-box-shadow(map.get($theme, container-elevation), map.get($theme, container-shadow-color));

  $this: &;

  &__container {
    padding: 16px;
    box-sizing: border-box;
    flex: 1 1 0%;
    position: relative;
    overflow: hidden;
    z-index: 0;
    border-radius: inherit;
    height: 100%;

    &:before {
      background: map.get($theme, container-color);
      border-radius: inherit;
      content: '';
      display: flex;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      z-index: -1;
    }
  }

  &__state-layer {
    border-radius: inherit;
    height: 100%;
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    visibility: hidden;
    z-index: -1;
  }

  &:hover {
    box-shadow: elevation.resolve-box-shadow(map.get($theme, hover-container-elevation), map.get($theme, container-shadow-color));

    #{$this}__state-layer {
      visibility: visible;
      background-color: map.get($theme, hover-state-layer-color);
      opacity: map.get($theme, hover-state-layer-opacity);
    }
  }
}
</style>
