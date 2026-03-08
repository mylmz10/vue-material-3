<template>
  <div
    ref="sliderEl"
    class="md-slider"
    :class="{
      'md-slider--disabled': disabled,
      'md-slider--labeled': labeled,
      'md-slider--range': range,
    }"
    :style="sliderStyle"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
  >
    <div v-if="labeled" class="md-slider__label-container">
      <div
        v-if="range"
        class="md-slider__label md-slider__label--start"
        :class="{ 'md-slider__label--visible': showStartLabel }"
        :style="{ left: `${startPercent}%` }"
      >
        <span>{{ startLabel }}</span>
      </div>
      <div class="md-slider__label md-slider__label--end" :class="{ 'md-slider__label--visible': showEndLabel }" :style="{ left: `${endPercent}%` }">
        <span>{{ endLabel }}</span>
      </div>
    </div>

    <div class="md-slider__track-container">
      <div class="md-slider__track md-slider__track--inactive"></div>
      <div class="md-slider__track md-slider__track--active" :style="activeTrackStyle"></div>
      <div v-if="hasTicks && tickValues.length > 0" class="md-slider__tick-container">
        <div
          v-for="tick in tickValues"
          :key="`tick-${tick}`"
          class="md-slider__tick"
          :class="{ 'md-slider__tick--active': isTickActive(tick) }"
          :style="{ left: `${toPercent(tick)}%` }"
        ></div>
      </div>
    </div>

    <input
      v-if="range"
      ref="startInputEl"
      class="md-slider__input md-slider__input--start"
      :class="{ 'md-slider__input--on-top': startOnTop }"
      type="range"
      :value="startValue"
      :min="normalizedMin"
      :max="normalizedMax"
      :step="normalizedStep"
      :disabled="disabled"
      :name="startInputName"
      :form="form || undefined"
      :required="required"
      :aria-label="ariaLabelStart || `${ariaLabel || 'slider'} start`"
      @input="onStartInput"
      @change="onStartChange"
      @focus="onStartFocus"
      @blur="onStartBlur"
    />

    <input
      ref="endInputEl"
      class="md-slider__input md-slider__input--end"
      :class="{ 'md-slider__input--on-top': !startOnTop }"
      type="range"
      :value="endValue"
      :min="normalizedMin"
      :max="normalizedMax"
      :step="normalizedStep"
      :disabled="disabled"
      :name="endInputName"
      :form="form || undefined"
      :required="required"
      :aria-label="ariaLabelEnd || ariaLabel || 'slider'"
      @input="onEndInput"
      @change="onEndChange"
      @focus="onEndFocus"
      @blur="onEndBlur"
    />
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';

const props = defineProps({
  ariaLabel: { type: String, default: '' },
  ariaLabelEnd: { type: String, default: '' },
  ariaLabelStart: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  form: { type: String, default: '' },
  labeled: { type: Boolean, default: false },
  max: { type: Number, default: 100 },
  min: { type: Number, default: 0 },
  modelValue: { type: [Number, Object, Array], default: undefined },
  name: { type: String, default: '' },
  nameEnd: { type: String, default: '' },
  nameStart: { type: String, default: '' },
  range: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
  step: { type: Number, default: 1 },
  ticks: { type: Boolean, default: false },
  value: { type: Number, default: undefined },
  valueEnd: { type: Number, default: undefined },
  valueLabel: { type: String, default: '' },
  valueLabelEnd: { type: String, default: '' },
  valueLabelStart: { type: String, default: '' },
  valueStart: { type: Number, default: undefined },
  withTickMarks: { type: Boolean, default: false },
});

const emit = defineEmits(['update:modelValue', 'update:valueStart', 'update:valueEnd', 'input', 'change', 'focus', 'blur']);

const startInputEl = ref(null);
const endInputEl = ref(null);
const sliderEl = ref(null);
const startValue = ref(0);
const endValue = ref(0);
const hovered = ref(false);
const startFocused = ref(false);
const endFocused = ref(false);
const activeThumb = ref('');

const normalizedStep = computed(() => (Number.isFinite(props.step) && props.step > 0 ? props.step : 1));

const normalizedBounds = computed(() => {
  const min = Number.isFinite(props.min) ? props.min : 0;
  const max = Number.isFinite(props.max) ? props.max : 100;
  return min <= max ? { min, max } : { min: max, max: min };
});

const normalizedMin = computed(() => normalizedBounds.value.min);
const normalizedMax = computed(() => normalizedBounds.value.max);

const hasTicks = computed(() => props.ticks || props.withTickMarks);

const getStepPrecision = (stepValue) => {
  const stepAsString = String(stepValue);

  if (stepAsString.includes('e-')) {
    return Number(stepAsString.split('e-')[1] || 0);
  }

  const decimal = stepAsString.split('.')[1];
  return decimal ? decimal.length : 0;
};

const stepPrecision = computed(() => getStepPrecision(normalizedStep.value));

const normalizeNumber = (value, fallback) => {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : fallback;
};

const clampToBounds = (value) => {
  const { min, max } = normalizedBounds.value;
  return Math.min(max, Math.max(min, value));
};

const alignToStep = (value) => {
  const { min } = normalizedBounds.value;
  const stepValue = normalizedStep.value;
  const steppedValue = min + Math.round((value - min) / stepValue) * stepValue;
  return Number(steppedValue.toFixed(stepPrecision.value));
};

const normalizeSliderValue = (value, fallback) => {
  const numericValue = normalizeNumber(value, fallback);
  return clampToBounds(alignToStep(numericValue));
};

const initializeSingle = () => {
  const { min } = normalizedBounds.value;
  const sourceValue = props.modelValue ?? props.value ?? min;
  startValue.value = min;
  endValue.value = normalizeSliderValue(sourceValue, min);
};

const initializeRange = () => {
  const { min, max } = normalizedBounds.value;
  let nextStart = normalizeSliderValue(props.valueStart ?? min, min);
  let nextEnd = normalizeSliderValue(props.valueEnd ?? max, max);

  if (nextStart > nextEnd) {
    [nextStart, nextEnd] = [nextEnd, nextStart];
  }

  startValue.value = nextStart;
  endValue.value = nextEnd;
};

const syncFromProps = () => {
  if (props.range) {
    initializeRange();
    return;
  }

  initializeSingle();
};

watch(() => [props.range, props.min, props.max, props.step], syncFromProps, { immediate: true });

watch(
  () => props.modelValue,
  (newValue) => {
    if (props.range || newValue === undefined || typeof newValue === 'object') {
      return;
    }

    endValue.value = normalizeSliderValue(newValue, endValue.value);
  },
);

watch(
  () => props.value,
  (newValue) => {
    if (props.range || props.modelValue !== undefined || newValue === undefined) {
      return;
    }

    endValue.value = normalizeSliderValue(newValue, endValue.value);
  },
);

watch(
  () => [props.valueStart, props.valueEnd],
  ([nextStart, nextEnd]) => {
    if (!props.range) {
      return;
    }

    let normalizedStart = nextStart === undefined ? startValue.value : normalizeSliderValue(nextStart, startValue.value);
    let normalizedEnd = nextEnd === undefined ? endValue.value : normalizeSliderValue(nextEnd, endValue.value);

    if (normalizedStart > normalizedEnd) {
      [normalizedStart, normalizedEnd] = [normalizedEnd, normalizedStart];
    }

    startValue.value = normalizedStart;
    endValue.value = normalizedEnd;
  },
);

const toPercent = (value) => {
  const { min, max } = normalizedBounds.value;
  if (max === min) {
    return 0;
  }
  return ((value - min) / (max - min)) * 100;
};

const startPercent = computed(() => (props.range ? toPercent(startValue.value) : 0));
const endPercent = computed(() => toPercent(endValue.value));

const startOnTop = computed(() => {
  if (!props.range) {
    return false;
  }

  if (activeThumb.value === 'start') {
    return true;
  }

  if (activeThumb.value === 'end') {
    return false;
  }

  return startValue.value >= endValue.value;
});

const activeTrackStyle = computed(() => ({
  left: `${Math.min(startPercent.value, endPercent.value)}%`,
  width: `${Math.max(endPercent.value - startPercent.value, 0)}%`,
}));

const sliderStyle = computed(() => ({
  '--slider-start-percent': `${startPercent.value}%`,
  '--slider-end-percent': `${endPercent.value}%`,
  '--md-slider-split-percent': `${(startPercent.value + endPercent.value) / 2}%`,
}));

const tickValues = computed(() => {
  if (!hasTicks.value) {
    return [];
  }

  const { min, max } = normalizedBounds.value;
  const stepValue = normalizedStep.value;
  const count = Math.floor((max - min) / stepValue) + 1;

  // Guardrail to prevent rendering hundreds/thousands of DOM nodes.
  if (count < 2 || count > 201) {
    return [];
  }

  return Array.from({ length: count }, (_, index) => Number((min + index * stepValue).toFixed(stepPrecision.value)));
});

const isTickActive = (value) => {
  if (props.range) {
    return value >= startValue.value && value <= endValue.value;
  }
  return value <= endValue.value;
};

const startLabel = computed(() => props.valueLabelStart || startValue.value);
const endLabel = computed(() => {
  if (props.range) {
    return props.valueLabelEnd || endValue.value;
  }

  return props.valueLabel || endValue.value;
});

const showStartLabel = computed(() => props.range && props.labeled && (hovered.value || startFocused.value));
const showEndLabel = computed(() => props.labeled && (hovered.value || endFocused.value));

const startInputName = computed(() => {
  if (!props.range) {
    return undefined;
  }

  return props.nameStart || props.name || undefined;
});

const endInputName = computed(() => {
  if (!props.range) {
    return props.name || undefined;
  }

  return props.nameEnd || props.nameStart || props.name || undefined;
});

const buildRangePayload = (thumb) => ({
  activeThumb: thumb,
  valueEnd: endValue.value,
  valueStart: startValue.value,
});

const emitSingle = (eventName) => {
  emit('update:modelValue', endValue.value);
  emit(eventName, endValue.value);
};

const emitRange = (eventName, thumb) => {
  emit('update:valueStart', startValue.value);
  emit('update:valueEnd', endValue.value);
  emit('update:modelValue', {
    valueEnd: endValue.value,
    valueStart: startValue.value,
  });
  emit(eventName, buildRangePayload(thumb));
};

const onStartInput = (event) => {
  if (props.disabled) {
    return;
  }

  activeThumb.value = 'start';
  const rawValue = normalizeSliderValue(event.target.value, startValue.value);
  startValue.value = Math.min(rawValue, endValue.value);
  event.target.value = String(startValue.value);
  emitRange('input', 'start');
};

const onStartChange = (event) => {
  if (props.disabled) {
    return;
  }

  activeThumb.value = 'start';
  const rawValue = normalizeSliderValue(event.target.value, startValue.value);
  startValue.value = Math.min(rawValue, endValue.value);
  event.target.value = String(startValue.value);
  emitRange('change', 'start');
};

const onEndInput = (event) => {
  if (props.disabled) {
    return;
  }

  activeThumb.value = 'end';
  const rawValue = normalizeSliderValue(event.target.value, endValue.value);

  if (props.range) {
    endValue.value = Math.max(rawValue, startValue.value);
    event.target.value = String(endValue.value);
    emitRange('input', 'end');
    return;
  }

  endValue.value = rawValue;
  event.target.value = String(endValue.value);
  emitSingle('input');
};

const onEndChange = (event) => {
  if (props.disabled) {
    return;
  }

  activeThumb.value = 'end';
  const rawValue = normalizeSliderValue(event.target.value, endValue.value);

  if (props.range) {
    endValue.value = Math.max(rawValue, startValue.value);
    event.target.value = String(endValue.value);
    emitRange('change', 'end');
    return;
  }

  endValue.value = rawValue;
  event.target.value = String(endValue.value);
  emitSingle('change');
};

const onStartFocus = (event) => {
  startFocused.value = true;
  activeThumb.value = 'start';
  emit('focus', event);
};

const onStartBlur = (event) => {
  startFocused.value = false;
  if (!endFocused.value) {
    activeThumb.value = '';
  }
  emit('blur', event);
};

const onEndFocus = (event) => {
  endFocused.value = true;
  activeThumb.value = 'end';
  emit('focus', event);
};

const onEndBlur = (event) => {
  endFocused.value = false;
  if (!startFocused.value) {
    activeThumb.value = '';
  }
  emit('blur', event);
};

const getPointerPercent = (event) => {
  const rect = sliderEl.value?.getBoundingClientRect();
  if (!rect || rect.width <= 0) {
    return endPercent.value;
  }

  const clampedX = Math.min(rect.right, Math.max(rect.left, event.clientX));
  return ((clampedX - rect.left) / rect.width) * 100;
};

const updateActiveThumbFromPointer = (event) => {
  if (!props.range || props.disabled) {
    return;
  }

  const pointerPercent = getPointerPercent(event);
  const distanceToStart = Math.abs(pointerPercent - startPercent.value);
  const distanceToEnd = Math.abs(pointerPercent - endPercent.value);
  activeThumb.value = distanceToStart <= distanceToEnd ? 'start' : 'end';
};

const onPointerDown = (event) => {
  updateActiveThumbFromPointer(event);
};

const onPointerMove = (event) => {
  if (event.buttons !== 0) {
    return;
  }

  updateActiveThumbFromPointer(event);
};

const focus = () => endInputEl.value?.focus();
const focusStart = () => startInputEl.value?.focus();
const focusEnd = () => endInputEl.value?.focus();
const blur = () => {
  startInputEl.value?.blur();
  endInputEl.value?.blur();
};
const checkValidity = () => {
  if (!props.range) {
    return endInputEl.value?.checkValidity();
  }

  const isStartValid = startInputEl.value?.checkValidity() ?? true;
  const isEndValid = endInputEl.value?.checkValidity() ?? true;
  return isStartValid && isEndValid;
};
const reportValidity = () => {
  if (!props.range) {
    return endInputEl.value?.reportValidity();
  }

  const isStartValid = startInputEl.value?.reportValidity() ?? true;
  const isEndValid = endInputEl.value?.reportValidity() ?? true;
  return isStartValid && isEndValid;
};

defineExpose({
  blur,
  checkValidity,
  focus,
  focusEnd,
  focusStart,
  reportValidity,
});
</script>

<style lang="scss">
@use 'sass:map';
@use '../../styles/tokens';

$theme: tokens.md-comp-slider-values();

.md-slider {
  --md-slider-track-height: #{map.get($theme, active-track-height)};
  --md-slider-thumb-size: #{map.get($theme, handle-width)};
  --md-slider-state-layer-size: #{map.get($theme, state-layer-size)};
  --md-slider-label-height: #{map.get($theme, label-container-height)};
  --md-slider-hover-overlay-color: #{map.get($theme, hover-state-layer-color)}1f;
  --md-slider-focus-overlay-color: #{map.get($theme, focus-state-layer-color)}33;
  --md-slider-pressed-overlay-color: #{map.get($theme, pressed-state-layer-color)}4d;
  --md-slider-top-offset: 0px;
  box-sizing: border-box;
  position: relative;
  inline-size: 100%;
  min-block-size: var(--md-slider-state-layer-size);
  user-select: none;

  &--labeled {
    --md-slider-top-offset: calc(var(--md-slider-label-height) + 8px);
    min-block-size: calc(var(--md-slider-state-layer-size) + var(--md-slider-top-offset));
  }

  &__label-container {
    position: absolute;
    inset-inline: calc(var(--md-slider-thumb-size) / 2);
    inset-block-start: 0;
    block-size: var(--md-slider-label-height);
    pointer-events: none;
    z-index: 5;
  }

  &__label {
    position: absolute;
    inset-block-start: 0;
    display: grid;
    place-items: center;
    min-inline-size: var(--md-slider-label-height);
    min-block-size: var(--md-slider-label-height);
    padding: 4px;
    border-radius: 999px;
    background: map.get($theme, label-container-color);
    color: map.get($theme, label-label-text-color);
    font: map.get($theme, label-label-text-type);
    transform: translateX(-50%) scale(0);
    transform-origin: center bottom;
    transition: transform 180ms cubic-bezier(0.2, 0, 0, 1);

    &::before {
      content: '';
      position: absolute;
      inset-block-end: calc(var(--md-slider-label-height) / -10);
      inline-size: calc(var(--md-slider-label-height) / 2);
      block-size: calc(var(--md-slider-label-height) / 2);
      transform: rotate(45deg);
      background: inherit;
    }

    span {
      position: relative;
      z-index: 1;
    }

    &--visible {
      transform: translateX(-50%) scale(1);
    }
  }

  &__track-container {
    position: absolute;
    inset-inline: calc(var(--md-slider-thumb-size) / 2);
    inset-block-start: calc(var(--md-slider-top-offset) + (var(--md-slider-state-layer-size) / 2));
    block-size: var(--md-slider-track-height);
    transform: translateY(-50%);
    z-index: 1;
  }

  &__track {
    position: absolute;
    inset-block: 0;
    border-radius: map.get($theme, inactive-track-shape);

    &--inactive {
      inset-inline: 0;
      background: map.get($theme, inactive-track-color);
    }

    &--active {
      background: map.get($theme, active-track-color);
    }
  }

  &__tick-container {
    position: absolute;
    inset-inline: 0;
    inset-block-start: 50%;
    block-size: map.get($theme, with-tick-marks-container-size);
    transform: translateY(-50%);
    z-index: 2;
    pointer-events: none;
  }

  &__tick {
    position: absolute;
    inline-size: map.get($theme, with-tick-marks-container-size);
    block-size: map.get($theme, with-tick-marks-container-size);
    border-radius: map.get($theme, with-tick-marks-container-shape);
    background-color: map.get($theme, with-tick-marks-inactive-container-color);
    opacity: map.get($theme, with-tick-marks-inactive-container-opacity);
    transform: translate(-50%, -50%);
    outline: solid map.get($theme, with-overlap-handle-outline-width) map.get($theme, with-tick-marks-inactive-container-color);

    &--active {
      background-color: map.get($theme, with-tick-marks-active-container-color);
      opacity: map.get($theme, with-tick-marks-active-container-opacity);
      outline-color: map.get($theme, with-tick-marks-active-container-color);
    }
  }

  &__input {
    position: absolute;
    inset-inline: 0;
    inset-block-start: var(--md-slider-top-offset);
    inline-size: 100%;
    block-size: var(--md-slider-state-layer-size);
    margin: 0;
    appearance: none;
    background: transparent;
    outline: none;
    cursor: pointer;
    z-index: 3;

    &--on-top {
      z-index: 4;
    }

    &::-webkit-slider-runnable-track {
      appearance: none;
      block-size: var(--md-slider-track-height);
      background: transparent;
    }

    &::-moz-range-track {
      appearance: none;
      block-size: var(--md-slider-track-height);
      background: transparent;
    }

    &::-moz-range-progress {
      appearance: none;
      block-size: var(--md-slider-track-height);
      background: transparent;
    }

    &::-webkit-slider-thumb {
      appearance: none;
      inline-size: var(--md-slider-thumb-size);
      block-size: var(--md-slider-thumb-size);
      margin-top: calc((var(--md-slider-track-height) - var(--md-slider-thumb-size)) / 2);
      border-radius: map.get($theme, handle-shape);
      background-color: map.get($theme, handle-color);
      border: 0;
      transition: box-shadow 120ms ease;
    }

    &::-moz-range-thumb {
      appearance: none;
      inline-size: var(--md-slider-thumb-size);
      block-size: var(--md-slider-thumb-size);
      border-radius: map.get($theme, handle-shape);
      background-color: map.get($theme, handle-color);
      border: 0;
      transition: box-shadow 120ms ease;
    }

    &:hover::-webkit-slider-thumb,
    &:hover::-moz-range-thumb {
      box-shadow: 0 0 0 calc(var(--md-slider-state-layer-size) / 4) var(--md-slider-hover-overlay-color);
    }

    &:focus-visible::-webkit-slider-thumb,
    &:focus-visible::-moz-range-thumb {
      box-shadow: 0 0 0 calc(var(--md-slider-state-layer-size) / 4) var(--md-slider-focus-overlay-color);
    }

    &:active::-webkit-slider-thumb,
    &:active::-moz-range-thumb {
      box-shadow: 0 0 0 calc(var(--md-slider-state-layer-size) / 4) var(--md-slider-pressed-overlay-color);
    }
  }

  &--range {
    .md-slider__input--start {
      clip-path: polygon(
        0 0,
        calc(var(--md-slider-split-percent) + (var(--md-slider-thumb-size) / 2)) 0,
        calc(var(--md-slider-split-percent) + (var(--md-slider-thumb-size) / 2)) 100%,
        0 100%
      );
    }

    .md-slider__input--end {
      clip-path: polygon(
        calc(var(--md-slider-split-percent) - (var(--md-slider-thumb-size) / 2)) 0,
        100% 0,
        100% 100%,
        calc(var(--md-slider-split-percent) - (var(--md-slider-thumb-size) / 2)) 100%
      );
    }
  }

  &--disabled {
    pointer-events: none;

    .md-slider__track--inactive {
      background: map.get($theme, disabled-inactive-track-color);
      opacity: map.get($theme, disabled-inactive-track-opacity);
    }

    .md-slider__track--active {
      background: map.get($theme, disabled-active-track-color);
      opacity: map.get($theme, disabled-active-track-opacity);
    }

    .md-slider__tick {
      background-color: map.get($theme, with-tick-marks-disabled-container-color);
      opacity: map.get($theme, with-tick-marks-disabled-container-opacity);
      outline-color: map.get($theme, with-tick-marks-disabled-container-color);
    }

    .md-slider__input {
      &::-webkit-slider-thumb,
      &::-moz-range-thumb {
        background-color: map.get($theme, disabled-handle-color);
        opacity: map.get($theme, disabled-handle-opacity);
        box-shadow: none;
      }
    }
  }
}
</style>
