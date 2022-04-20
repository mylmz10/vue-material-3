<template>
  <MdButtonBase class="md-outlined-button">
    <MdRipple />
    <template v-if="label">
      {{ label }}
    </template>
    <slot v-else />
  </MdButtonBase>
</template>

<script setup>
import MdButtonBase from './MdButtonBase.vue';
import MdRipple from '../ripple/MdRipple.vue';

defineProps({
  label: {
    type: String,
  },
});
</script>

<style lang="scss">
@use 'sass:map';
@use '../../styles/tokens';

$theme: tokens.md-comp-outlined-button-values();

.md-outlined-button {
  background-color: map.get($theme, container-color);
  height: map.get($theme, container-height);
  border-radius: map.get($theme, container-shape);
  color: map.get($theme, label-text-color);
  font-family: map.get($theme, label-text-font);
  font-size: map.get($theme, label-text-size);
  font-weight: map.get($theme, label-text-weight);
  letter-spacing: map.get($theme, label-text-tracking);
  line-height: map.get($theme, label-text-line-height);
  box-shadow: none;
  outline: map.get($theme, outline-color) solid map.get($theme, outline-width);

  &:hover {
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
  }

  .md-ripple {
    --md-ripple-pressed-state-layer-color: #{map.get($theme, pressed-state-layer-color)};
    border-radius: var(--md-outlined-button-container-shape, 100px);
  }
}
</style>
