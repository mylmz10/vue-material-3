<template>
  <div class="md-slider" :style="{ '--sliderValue': `${getPercent(sliderValue, min, max)}%` }">
    <div class="md-slider__label-container">
      <div class="md-slider__label">
        <span>{{ sliderValue }}</span>
      </div>
    </div>
    <div class="md-slider__tick-container">
      <div v-for="(tick, index) in getMetrics.tickCount" :class="{ 'md-slider__tick--left': index < (sliderValue - min) / step }" class="md-slider__tick"></div>
    </div>
    <input :value="sliderValue" @input="onInput" type="range" :min="min" :max="max" :step="step" class="slider" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const { min, max, step, modelValue, withTickMarks } = defineProps({
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  step: {
    type: Number,
    default: 1,
  },
  modelValue: {
    type: Number,
    default: 50,
  },
  withTickMarks: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const sliderValue = ref(modelValue);

const getPercent = (value, min, max) => {
  return ((value - min) / (max - min)) * 100;
};

const getMetrics = computed(() => {
  const _step = Math.max(step, 1);
  const _range = Math.max(max - min, _step);

  return {
    step: _step,
    range: _range,
    tickCount: _range / _step + 1,
  };
});

const onInput = ({ target }) => {
  sliderValue.value = parseFloat(target.value);
};
</script>

<style lang="scss">
@use 'sass:map';
@use '../../styles/tokens';
@use '../ripple/ripple';

$theme: tokens.md-comp-slider-values();

.md-slider {
  --trackHeight: #{map.get($theme, active-track-height)};
  --thumbRadius: #{map.get($theme, handle-width)};
  position: relative;
  height: map.get($theme, handle-width);

  &__tick-container {
    position: absolute;
    left: 0;
    right: 0;
    height: var(--trackHeight);
    z-index: 1;
    top: calc(50% - var(--trackHeight) / 2);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__tick {
    background-color: map.get($theme, with-tick-marks-inactive-container-color);
    opacity: map.get($theme, with-tick-marks-inactive-container-opacity);
    width: map.get($theme, with-tick-marks-container-size);
    height: map.get($theme, with-tick-marks-container-size);
    border-radius: map.get($theme, with-tick-marks-container-shape);
    outline: solid map.get($theme, with-overlap-handle-outline-width) map.get($theme, with-tick-marks-inactive-container-color);
  }
  &__tick--left {
    background-color: map.get($theme, with-tick-marks-active-container-color);
    opacity: map.get($theme, with-tick-marks-active-container-opacity);
  }

  &__label-container {
    position: absolute;
    left: calc(#{map.get($theme, handle-height)} / 2);
    right: calc(#{map.get($theme, handle-height)} / 2);
  }

  &__label {
    left: var(--sliderValue, 100%);
    margin-left: calc(#{map.get($theme, label-container-height)}/ 2 * -1);
    position: absolute;
    box-sizing: border-box;
    display: grid;
    padding: 4px;
    place-items: center;
    border-radius: 999px;
    color: map.get($theme, label-label-text-color);
    font: map.get($theme, label-label-text-type);
    top: -32px;
    min-inline-size: map.get($theme, label-container-height);
    min-block-size: map.get($theme, label-container-height);
    background: map.get($theme, label-container-color);
    transition-property: transform;
    transition-duration: 280ms;
    transition-timing-function: cubic-bezier(0.2, 0, 0, 1);
    transform-origin: center bottom;
    transform: scale(0);

    &:before {
      --triangleSize: calc(#{map.get($theme, label-container-height)} / 2);
      --triangleOffset: calc(#{map.get($theme, label-container-height)} / -10);
      inline-size: var(--triangleSize);
      block-size: var(--triangleSize);
      bottom: var(--triangleOffset);
      transform: rotate(45deg);
    }

    &::before,
    &::after {
      position: absolute;
      display: block;
      content: '';
      background: inherit;
    }

    span {
      z-index: 1;
    }
  }

  &:hover .md-slider__label {
    transform: scale(1);
  }

  input[type='range'] {
    position: relative;
    appearance: none;
    border-radius: map.get($theme, active-track-shape);
    /* z-index: 0; */
    margin: 0;
    padding: 0;
    cursor: pointer;
    width: 100%;
    height: inherit;

    &::before {
      content: '';
      position: absolute;
      width: var(--sliderValue, 100%);
      height: var(--trackHeight);
      top: calc(50% - var(--trackHeight) / 2);
      background: map.get($theme, active-track-color);
      pointer-events: none;
      border-radius: map.get($theme, inactive-track-shape);
    }

    &::-webkit-slider-runnable-track {
      appearance: none;
      background: map.get($theme, inactive-track-color);
      height: var(--trackHeight);
      border-radius: map.get($theme, inactive-track-shape);
    }

    &::-moz-range-track {
      appearance: none;
      background: map.get($theme, inactive-track-color);
      height: var(--trackHeight);
      border-radius: map.get($theme, inactive-track-shape);
    }

    &::-moz-range-progress {
      appearance: none;
      background: map.get($theme, active-track-color);
      height: var(--trackHeight);
      border-radius: map.get($theme, inactive-track-shape);
    }

    &::-moz-range-thumb {
      position: relative;
      width: var(--thumbRadius);
      height: var(--thumbRadius);
      margin-top: calc((var(--trackHeight) - var(--thumbRadius)) / 2);
      background: map.get($theme, handle-color);
      border-radius: map.get($theme, handle-shape);
      pointer-events: all;
      appearance: none;
      z-index: 2;
      transition: ease box-shadow 100ms;
    }

    &::-moz-range-thumb:hover {
      box-shadow: 0 0 0 calc(#{map.get($theme, state-layer-size)}/ 4) #6750a415;
    }
    &::-moz-range-thumb:active {
      box-shadow: 0 0 0 calc(#{map.get($theme, state-layer-size)}/ 4) #6750a455;
    }

    &::-webkit-slider-thumb {
      position: relative;
      width: var(--thumbRadius);
      height: var(--thumbRadius);
      margin-top: calc((var(--trackHeight) - var(--thumbRadius)) / 2);
      background: map.get($theme, handle-color);
      border-radius: map.get($theme, handle-shape);
      pointer-events: all;
      appearance: none;
      z-index: 2;
      transition: ease box-shadow 100ms;
    }

    &::-webkit-slider-thumb:hover {
      box-shadow: 0 0 0 calc(#{map.get($theme, state-layer-size)}/ 4) #6750a415;
    }
    &::-webkit-slider-thumb:active {
      box-shadow: 0 0 0 calc(#{map.get($theme, state-layer-size)}/ 4) #6750a455;
    }
  }
}
</style>
