<template>
  <component :is="tag" class="md-divider" :class="{ 'md-divider--vertical': vertical }"></component>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  vertical: { type: Boolean },
  tag: { type: String, default: 'div' },
});
</script>

<style lang="scss">
@use 'sass:map';
@use '../../styles/tokens';

$theme: tokens.md-comp-divider-values();

.md-divider {
  &:not(&--vertical) {
    width: 100%;
    height: 0;
    border-bottom-style: solid;
    border-bottom-width: map.get($theme, thickness);
    border-bottom-color: map.get($theme, color);
  }
  &--vertical {
    width: 0;
    min-height: 100%;
    border-right-style: solid;
    border-right-width: map.get($theme, thickness);
    border-right-color: map.get($theme, color);
  }
}
</style>
