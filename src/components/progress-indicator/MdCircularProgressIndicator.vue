<template>
  <progress
    :value="!indeterminate ? value : undefined"
    :style="{ '--p': value }"
    max="100"
    class="md-circular-progress-indicator"
    :class="{ 'md-circular-progress-indicator--indeterminate': indeterminate }"
  />
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  value: { type: [String, Number], default: 0 },
  indeterminate: { type: Boolean },
});

const indicatorStyle = computed(() => {
  return {
    width: props.indeterminate ? '' : `${props.value}%`,
  };
});

const indeterminateIndicatorStyle = computed(() => {
  return {
    width: `${props.value}%`,
  };
});
</script>

<style lang="scss">
@use 'sass:map';
@use '../../styles/tokens';

$theme: tokens.md-comp-circular-progress-indicator-values();

.md-circular-progress-indicator {
  width: map.get($theme, size);
  height: map.get($theme, size);
  color: map.get($theme, active-indicator-color);
  --b: #{map.get($theme, active-indicator-width)};
  --p: 0;
  --c: currentColor;

  &:not(&--indeterminate) {
    position: relative;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    box-sizing: border-box;
    border: none;
    border-radius: 50%;
    padding: 0.25em;
    background-color: transparent;
    font-size: 16px;
    overflow: hidden;

    &:before {
      background-size: 0 0, auto !important;
      inset: 0;
      background: radial-gradient(farthest-side, var(--c) 98%, #0000) top/var(--b) var(--b) no-repeat, conic-gradient(var(--c) calc(var(--p) * 1%), #0000 0);
      -webkit-mask: radial-gradient(farthest-side, #0000 calc(97% - var(--b)), #000 calc(100% - var(--b)));
      mask: radial-gradient(farthest-side, #0000 calc(97% - var(--b)), #000 calc(100% - var(--b)));
      content: '';
      position: absolute;
      border-radius: 50%;
    }
  }
  &--indeterminate {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    box-sizing: border-box;
    border: none;
    border-radius: 50%;
    background-color: transparent;
    font-size: 16px;
    overflow: hidden;

    -webkit-mask-image: linear-gradient(transparent 50%, black 50%), linear-gradient(to right, transparent 50%, black 50%);
    mask-image: linear-gradient(transparent 50%, black 50%), linear-gradient(to right, transparent 50%, black 50%);
    animation: circular-progress-bar 6s infinite cubic-bezier(0.3, 0.6, 1, 1);

    &:before,
    &::-webkit-progress-value {
      content: '';
      display: block;
      box-sizing: border-box;
      border: solid var(--b) transparent;
      border-top-color: currentColor;
      border-right-color: currentColor;
      border-radius: 50%;
      width: 100% !important;
      height: 100%;
      background-color: transparent;
      animation: circular-progress-bar-border 0.75s infinite linear alternate;
    }

    &::-moz-progress-bar {
      box-sizing: border-box;
      border: solid 0.25em transparent;
      border-top-color: currentColor;
      border-radius: 50%;
      width: 100%;
      height: 100%;
      background-color: transparent;
      animation: circular-progress-bar-border 0.75s infinite linear alternate;
    }
  }

  &::-webkit-progress-bar,
  &::-webkit-progress-value {
    background-color: transparent;
  }

  &::-moz-progress-bar {
    background: transparent;
  }
}

@keyframes circular-progress-bar {
  0% {
    transform: rotate(0deg);
  }
  12.5% {
    transform: rotate(180deg);
    animation-timing-function: linear;
  }
  25% {
    transform: rotate(630deg);
  }
  37.5% {
    transform: rotate(810deg);
    animation-timing-function: linear;
  }
  50% {
    transform: rotate(1260deg);
  }
  62.5% {
    transform: rotate(1440deg);
    animation-timing-function: linear;
  }
  75% {
    transform: rotate(1890deg);
  }
  87.5% {
    transform: rotate(2070deg);
    animation-timing-function: linear;
  }
  100% {
    transform: rotate(2520deg);
  }
}

@keyframes circular-progress-bar-border {
  0% {
    transform: rotate(-30deg);
  }
  29.4% {
    border-left-color: transparent;
  }
  29.41% {
    border-left-color: currentColor;
  }
  64.7% {
    border-bottom-color: transparent;
  }
  64.71% {
    border-bottom-color: currentColor;
  }
  100% {
    border-left-color: currentColor;
    border-bottom-color: currentColor;
    transform: rotate(225deg);
  }
}
</style>
