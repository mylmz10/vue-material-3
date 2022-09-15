<template>
  <div class="md-elevation-overlay"></div>
</template>

<script>
export default {
  name: 'MdElevationOverlay',
};
</script>

<style lang="scss">
@use './elevation';

.md-elevation-overlay {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  transition: opacity 280ms cubic-bezier(0.4, 0, 0.2, 1);
  z-index: -2;
  background-color: var(--surface-tint-layer-color, transparent);
  opacity: var(--overlay-opacity, 0);
}
</style>
