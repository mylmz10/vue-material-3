<template>
  <MdButtonBase :disabled="disabled" class="md-elevated-button">
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
  disabled: {
    type: Boolean,
  },
});
</script>

<style lang="scss">
@use 'sass:map';
@use '../../styles/tokens';

$theme: tokens.md-comp-elevated-button-values();

.md-elevated-button {
  background-color: map.get($theme, container-color);
  height: map.get($theme, container-height);
  border-radius: map.get($theme, container-shape);
  color: map.get($theme, label-text-color);
  font-family: map.get($theme, label-text-font);
  font-size: map.get($theme, label-text-size);
  font-weight: map.get($theme, label-text-weight);
  letter-spacing: map.get($theme, label-text-tracking);
  line-height: map.get($theme, label-text-line-height);
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15);

  &:not(:disabled):hover {
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15);
  }

  &:disabled {
    background-color: rgba(map.get($theme, disabled-container-color), map.get($theme, disabled-container-opacity));
    color: rgba(map.get($theme, disabled-label-text-color), map.get($theme, disabled-label-text-opacity));
    box-shadow: none;
  }

  .md-ripple {
    --md-ripple-pressed-state-layer-color: #{map.get($theme, pressed-state-layer-color)};
    border-radius: var(--md-elevated-button-container-shape, 100px);
  }
}
</style>
