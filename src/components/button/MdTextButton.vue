<template>
  <MdButtonBase class="md-text-button" v-bind="$attrs">
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

$theme: tokens.md-comp-text-button-values();

.md-text-button {
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

  &:disabled {
    background-color: rgba(map.get($theme, disabled-container-color), map.get($theme, disabled-container-opacity));
    color: rgba(map.get($theme, disabled-label-text-color), map.get($theme, disabled-label-text-opacity));
  }

  .md-ripple {
    --md-ripple-pressed-state-layer-color: #{map.get($theme, pressed-state-layer-color)};
    border-radius: var(--md-text-button-container-shape, 100px);
  }
}
</style>
