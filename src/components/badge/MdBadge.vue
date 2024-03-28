<template>
  <div class="md-badge" :class="{ 'md-badge--large': !!value, 'md-badge--absolute': !!absolute }">
    <div class="md-badge__value">{{ value }}</div>
  </div>
</template>

<script setup>
defineProps({
  value: { type: [String, Number] },
  absolute: { type: Boolean, default: true },
});
</script>

<style lang="scss">
@use 'sass:map';
@use '../../styles/tokens';

$theme: tokens.md-comp-badge-values();

.md-badge {
  inset-inline-start: 50%;
  margin-inline-start: 6px;
  margin-block-start: 4px;
  background: map.get($theme, color);
  color: map.get($theme, large-label-text-color);
  border-radius: map.get($theme, shape);
  height: map.get($theme, size);

  &:not(&--large) {
    width: map.get($theme, size);
  }

  &--absolute {
    position: absolute;
    inset-block-start: 0;
  }

  &--large {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    margin-inline-start: 2px;
    margin-block-start: 1px;
    min-width: map.get($theme, large-size);
    height: map.get($theme, large-size);
    border-radius: map.get($theme, large-shape);
    padding: 4px;
    box-sizing: border-box;
  }

  &__value {
    font-family: map.get($theme, large-label-text-font);
    font-size: map.get($theme, large-label-text-size);
    font-weight: map.get($theme, large-label-text-weight);
    letter-spacing: map.get($theme, large-label-text-tracking);
    line-height: map.get($theme, large-label-text-line-height);
    text-align: center;
  }
}
</style>
