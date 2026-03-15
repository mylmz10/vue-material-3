<template>
  <div
    ref="dialEl"
    class="md-time-picker-dial"
    :aria-label="mode === 'hour' ? 'Select hour' : 'Select minute'"
    @pointerdown="startPointerSelection"
  >
    <svg class="md-time-picker-dial__selector" :viewBox="`0 0 ${dialSize} ${dialSize}`" aria-hidden="true">
      <line
        class="md-time-picker-dial__track"
        :x1="center"
        :y1="center"
        :x2="selectedPoint.x"
        :y2="selectedPoint.y"
      />
      <circle class="md-time-picker-dial__center" :cx="center" :cy="center" :r="centerSize / 2" />
    </svg>

    <button
      v-for="option in dialOptions"
      :key="option.value"
      type="button"
      class="md-time-picker-dial__label"
      :class="{ 'md-time-picker-dial__label--selected': isSelected(option.value) }"
      :style="getLabelStyle(option)"
      :data-dial-value="option.value"
      :aria-pressed="String(isSelected(option.value))"
      @click.stop="selectValue(option.value)"
    >
      {{ option.label }}
    </button>

    <button
      type="button"
      class="md-time-picker-dial__handle"
      :class="{ 'md-time-picker-dial__handle--tick': isTickHandle }"
      :style="handleStyle"
      :aria-label="selectedAriaLabel"
      @click.stop
    >
      {{ handleLabel }}
    </button>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, ref } from 'vue';
import {
  DIAL_CENTER_SIZE,
  DIAL_HANDLE_SIZE,
  DIAL_SIZE,
  HOUR_CYCLE_24,
  angleToPoint,
  getClosestDialValue,
  getDialDistanceFromPointer,
  getDialAngleForValue,
  getDialAngleFromPointer,
  getHourDialOptions,
  getMinuteDialOptions,
  normalizeHourCycle,
  toDisplayParts,
} from './timePickerUtils';

const props = defineProps({
  hour24: {
    type: Number,
    required: true,
  },
  minute: {
    type: Number,
    required: true,
  },
  mode: {
    type: String,
    default: 'hour',
  },
  hourCycle: {
    type: [Number, String],
    default: 12,
  },
});

const emit = defineEmits(['select-hour', 'select-minute']);

const dialEl = ref(null);
let pointerMoveListener = null;
let pointerUpListener = null;

const dialSize = DIAL_SIZE;
const handleSize = DIAL_HANDLE_SIZE;
const centerSize = DIAL_CENTER_SIZE;
const tickHandleSize = 12;
const center = dialSize / 2;
const outerLabelRadius = center - handleSize / 2 - 8;
const innerLabelRadius = outerLabelRadius - 32;
const resolvedHourCycle = computed(() => normalizeHourCycle(props.hourCycle));

const dialOptions = computed(() => (props.mode === 'hour' ? getHourDialOptions(resolvedHourCycle.value) : getMinuteDialOptions()));
const displayParts = computed(() => toDisplayParts({ hour24: props.hour24, minute: props.minute }));
const selectedValue = computed(() => {
  if (props.mode === 'minute') {
    return props.minute;
  }

  return resolvedHourCycle.value === HOUR_CYCLE_24 ? displayParts.value.hour24 : displayParts.value.hour12;
});
const isTickHandle = computed(() => props.mode === 'minute' && selectedValue.value % 5 !== 0);
const selectedRing = computed(() => (props.mode === 'hour' && resolvedHourCycle.value === HOUR_CYCLE_24 && selectedValue.value >= 12 ? 'inner' : 'outer'));
const selectedRadius = computed(() => (selectedRing.value === 'inner' ? innerLabelRadius : outerLabelRadius));
const selectedAngle = computed(() => getDialAngleForValue(props.mode, selectedValue.value, resolvedHourCycle.value));
const selectedPoint = computed(() => angleToPoint(selectedAngle.value, selectedRadius.value, center));
const handleStyle = computed(() => ({
  left: `${selectedPoint.value.x}px`,
  top: `${selectedPoint.value.y}px`,
  width: `${isTickHandle.value ? tickHandleSize : handleSize}px`,
  height: `${isTickHandle.value ? tickHandleSize : handleSize}px`,
}));
const handleLabel = computed(() => {
  if (isTickHandle.value) {
    return '';
  }

  if (props.mode === 'hour' && resolvedHourCycle.value === HOUR_CYCLE_24 && selectedValue.value === 0) {
    return '00';
  }

  return `${selectedValue.value}`;
});
const selectedAriaLabel = computed(() => (props.mode === 'hour' ? `Selected hour ${selectedValue.value}` : `Selected minute ${selectedValue.value}`));

const isSelected = (value) => selectedValue.value === value;
const getLabelStyle = (option) => {
  const radius = option?.ring === 'inner' ? innerLabelRadius : outerLabelRadius;
  const point = angleToPoint(option.angle, radius, center);
  return {
    left: `${point.x}px`,
    top: `${point.y}px`,
  };
};

const emitSelection = (value) => {
  if (props.mode === 'hour') {
    emit('select-hour', value);
    return;
  }

  emit('select-minute', value);
};

const selectValue = (value) => {
  emitSelection(value);
};

const updateFromPointer = (event) => {
  if (!dialEl.value) {
    return;
  }

  const angle = getDialAngleFromPointer(event, dialEl.value);
  const pointerDistance = getDialDistanceFromPointer(event, dialEl.value);
  const value = getClosestDialValue(props.mode, angle, pointerDistance, resolvedHourCycle.value, outerLabelRadius, innerLabelRadius);
  emitSelection(value);
};

const stopPointerSelection = () => {
  if (pointerMoveListener) {
    window.removeEventListener('pointermove', pointerMoveListener);
    pointerMoveListener = null;
  }

  if (pointerUpListener) {
    window.removeEventListener('pointerup', pointerUpListener);
    pointerUpListener = null;
  }
};

const startPointerSelection = (event) => {
  updateFromPointer(event);

  pointerMoveListener = (moveEvent) => {
    updateFromPointer(moveEvent);
  };
  pointerUpListener = () => {
    stopPointerSelection();
  };

  window.addEventListener('pointermove', pointerMoveListener);
  window.addEventListener('pointerup', pointerUpListener);
};

onBeforeUnmount(() => {
  stopPointerSelection();
});
</script>

<style lang="scss">
.md-time-picker-dial {
  align-items: center;
  background-color: var(--clock-dial-color);
  border-radius: var(--clock-dial-shape);
  block-size: var(--clock-dial-size);
  display: flex;
  inline-size: var(--clock-dial-size);
  justify-content: center;
  position: relative;
  touch-action: none;
  user-select: none;
}

.md-time-picker-dial__selector {
  inset: 0;
  position: absolute;
}

.md-time-picker-dial__track {
  stroke: var(--clock-selector-track-color);
  stroke-width: var(--clock-selector-track-width);
}

.md-time-picker-dial__center {
  fill: var(--clock-selector-center-color);
}

.md-time-picker-dial__label,
.md-time-picker-dial__handle {
  align-items: center;
  background: transparent;
  border: 0;
  color: var(--clock-dial-unselected-label-color);
  display: inline-flex;
  font-family: var(--clock-dial-label-font);
  font-size: var(--clock-dial-label-size);
  font-weight: var(--clock-dial-label-weight);
  justify-content: center;
  line-height: var(--clock-dial-label-line-height);
  padding: 0;
  position: absolute;
  transform: translate(-50%, -50%);
}

.md-time-picker-dial__label {
  block-size: 40px;
  inline-size: 40px;
  transition: color 180ms ease, background-color 180ms ease;
}

.md-time-picker-dial__handle {
  background-color: var(--clock-selector-handle-color);
  border-radius: var(--clock-selector-handle-shape);
  box-sizing: border-box;
  color: var(--clock-dial-selected-label-color);
  transition: background-color 180ms ease, border-color 180ms ease;
}

.md-time-picker-dial__handle--tick {
  background-color: var(--clock-dial-color);
  border: 2px solid var(--clock-selector-handle-color);
  color: transparent;
}

.md-time-picker-dial__label--selected {
  color: var(--clock-dial-selected-label-color);
}
</style>
