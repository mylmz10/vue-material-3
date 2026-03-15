<template>
  <MdDialog
    :modelValue="dialogOpen"
    :close-on-backdrop-click="true"
    :close-on-escape="true"
    :initial-focus="resolveDialogInitialFocus"
    :dialog-class="[
      'md-time-picker-dialog',
      {
        'md-time-picker-dialog--input': viewMode === 'input',
        'md-time-picker-dialog--24h': is24Hour,
      },
    ]"
    container-class="md-time-picker-dialog__container"
    header-class="md-time-picker-dialog__header"
    content-class="md-time-picker-dialog__content"
    footer-class="md-time-picker-dialog__footer"
    @cancel="handleDialogDismiss"
    @update:modelValue="handleDialogModelValue"
  >
    <template #header>
      <div class="md-time-picker__headline">{{ headlineText }}</div>
    </template>

    <div
      class="md-time-picker"
      :class="{
        'md-time-picker--input': viewMode === 'input',
        'md-time-picker--24h': is24Hour,
      }"
    >
      <div class="md-time-picker__display-row">
        <template v-if="viewMode === 'input'">
          <label class="md-time-picker__time-field" :class="{ 'md-time-picker__time-field--active': activeSegment === 'hour' }">
            <input
              ref="hourInputEl"
              class="md-time-picker__time-input"
              type="text"
              inputmode="numeric"
              maxlength="2"
              :value="hourInputText"
              data-input="hour"
              aria-label="Hour"
              @focus="activeSegment = 'hour'"
              @input="handleHourInput"
              @blur="normalizeInputSegments"
              @keydown="handleInputKeydown('hour', $event)"
            />
          </label>
        </template>
        <button
          v-else
          type="button"
          class="md-time-picker__time-selector"
          :class="{ 'md-time-picker__time-selector--active': activeSegment === 'hour' }"
          data-segment="hour"
          @click="activeSegment = 'hour'"
        >
          {{ displayHour }}
        </button>

        <div class="md-time-picker__separator" aria-hidden="true">:</div>

        <template v-if="viewMode === 'input'">
          <label class="md-time-picker__time-field" :class="{ 'md-time-picker__time-field--active': activeSegment === 'minute' }">
            <input
              ref="minuteInputEl"
              class="md-time-picker__time-input"
              type="text"
              inputmode="numeric"
              maxlength="2"
              :value="minuteInputText"
              data-input="minute"
              aria-label="Minute"
              @focus="activeSegment = 'minute'"
              @input="handleMinuteInput"
              @blur="normalizeInputSegments"
              @keydown="handleInputKeydown('minute', $event)"
            />
          </label>
        </template>
        <button
          v-else
          type="button"
          class="md-time-picker__time-selector"
          :class="{ 'md-time-picker__time-selector--active': activeSegment === 'minute' }"
          data-segment="minute"
          @click="activeSegment = 'minute'"
        >
          {{ displayMinute }}
        </button>

        <div v-if="!is24Hour" class="md-time-picker__period-selector" role="group" aria-label="Period">
          <button
            v-for="periodOption in periodOptions"
            :key="periodOption.value"
            type="button"
            class="md-time-picker__period-button"
            :class="{ 'md-time-picker__period-button--active': meridiem === periodOption.value }"
            :data-period="periodOption.value"
            @click="setMeridiem(periodOption.value)"
          >
            {{ periodOption.label }}
          </button>
        </div>
      </div>

      <div v-if="viewMode === 'input'" class="md-time-picker__supporting-row">
        <span class="md-time-picker__supporting-text">Hour</span>
        <span class="md-time-picker__supporting-text">Minute</span>
      </div>

      <transition name="fade-grow" mode="out-in">
        <div v-if="viewMode === 'dial'" key="dial" class="md-time-picker__dial-shell">
          <MdTimePickerDial
            :hour24="draftTime.hour24"
            :minute="draftTime.minute"
            :mode="activeSegment"
            :hour-cycle="resolvedHourCycle"
            @select-hour="selectHour"
            @select-minute="selectMinute"
          />
        </div>
      </transition>
    </div>

    <template #footer>
      <div class="md-time-picker__actions-row">
        <button
          type="button"
          class="md-time-picker__entry-toggle"
          data-entry-toggle
          :aria-label="viewMode === 'dial' ? 'Switch to text input mode' : 'Switch to dial mode'"
          @click="toggleEntryMode"
        >
          <MdIcon>{{ viewMode === 'dial' ? 'keyboard' : 'schedule' }}</MdIcon>
        </button>

        <div class="md-time-picker__actions">
          <MdTextButton type="button" @click="cancelSelection('action')">{{ cancelText }}</MdTextButton>
          <MdTextButton type="button" :disabled="!canConfirm" @click="confirmSelection">{{ confirmText }}</MdTextButton>
        </div>
      </div>
    </template>
  </MdDialog>
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue';
import MdDialog from '../dialog/MdDialog.vue';
import MdIcon from '../icon/MdIcon.vue';
import MdTextButton from '../button/MdTextButton.vue';
import MdTimePickerDial from './MdTimePickerDial.vue';
import {
  HOUR_CYCLE_24,
  formatInputSegments,
  getDayPeriodLabels,
  getDefaultTime,
  normalizeHourCycle,
  padTwo,
  parseInputSegments,
  parseModelValue,
  sanitizeHourInput,
  sanitizeMinuteInput,
  toDisplayParts,
  toModelValue,
  withHour,
  withMeridiem,
  withMinute,
} from './timePickerUtils';

const props = defineProps({
  cancelText: {
    type: String,
    default: 'Cancel',
  },
  confirmText: {
    type: String,
    default: 'OK',
  },
  entryMode: {
    type: String,
    default: 'dial',
  },
  locale: {
    type: String,
    default: 'en-US',
  },
  hourCycle: {
    type: [Number, String],
    default: 12,
  },
  modelValue: {
    type: String,
    default: null,
  },
  open: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['cancel', 'confirm', 'update:modelValue', 'update:open']);

const dialogOpen = ref(false);
const viewMode = ref(props.entryMode === 'input' ? 'input' : 'dial');
const activeSegment = ref('hour');
const draftTime = ref({ hour24: 7, minute: 0 });
const hourInputText = ref('07');
const minuteInputText = ref('00');
const periodValue = ref('AM');
const hourInputEl = ref(null);
const minuteInputEl = ref(null);
const isClosingInternally = ref(false);

const resolvedHourCycle = computed(() => normalizeHourCycle(props.hourCycle));
const is24Hour = computed(() => resolvedHourCycle.value === HOUR_CYCLE_24);
const periodLabels = computed(() => getDayPeriodLabels(props.locale));
const periodOptions = computed(() => ([
  { value: 'AM', label: periodLabels.value.am || 'AM' },
  { value: 'PM', label: periodLabels.value.pm || 'PM' },
]));
const displayParts = computed(() => toDisplayParts(draftTime.value));
const displayHour = computed(() => padTwo(is24Hour.value ? displayParts.value.hour24 : displayParts.value.hour12));
const displayMinute = computed(() => padTwo(displayParts.value.minute));
const meridiem = computed(() => (is24Hour.value ? null : (viewMode.value === 'input' ? periodValue.value : displayParts.value.meridiem)));
const parsedInputValue = computed(() => parseInputSegments(hourInputText.value, minuteInputText.value, periodValue.value, resolvedHourCycle.value));
const canConfirm = computed(() => (viewMode.value === 'input' ? !!parsedInputValue.value : true));
const headlineText = computed(() => (viewMode.value === 'input' ? 'Enter time' : 'Select time'));

const syncInputSegments = () => {
  const segments = formatInputSegments(draftTime.value, resolvedHourCycle.value);
  hourInputText.value = segments.hour;
  minuteInputText.value = segments.minute;
  periodValue.value = segments.meridiem;
};

const syncFromModel = () => {
  const parsedValue = parseModelValue(props.modelValue) || getDefaultTime();
  draftTime.value = {
    hour24: parsedValue.hour(),
    minute: parsedValue.minute(),
  };
  syncInputSegments();
};

const focusActiveInput = async () => {
  await nextTick();
  if (activeSegment.value === 'minute') {
    minuteInputEl.value?.focus?.();
    minuteInputEl.value?.select?.();
    return;
  }

  hourInputEl.value?.focus?.();
  hourInputEl.value?.select?.();
};

const updateDraftFromParsedInput = () => {
  if (!parsedInputValue.value) {
    return;
  }

  draftTime.value = {
    hour24: parsedInputValue.value.hour24,
    minute: parsedInputValue.value.minute,
  };
};

const normalizeInputSegments = () => {
  if (!parsedInputValue.value) {
    return;
  }

  hourInputText.value = displayHour.value;
  minuteInputText.value = padTwo(displayParts.value.minute);
};

const setViewMode = (mode) => {
  viewMode.value = mode;
  if (mode === 'input') {
    syncInputSegments();
    focusActiveInput();
  }
};

const toggleEntryMode = () => {
  if (viewMode.value === 'dial') {
    setViewMode('input');
    return;
  }

  updateDraftFromParsedInput();
  setViewMode('dial');
};

const selectHour = (hour12) => {
  draftTime.value = withHour(draftTime.value, hour12, meridiem.value, resolvedHourCycle.value);
  activeSegment.value = 'minute';
};

const selectMinute = (minute) => {
  draftTime.value = withMinute(draftTime.value, minute);
};

const setMeridiem = (nextMeridiem) => {
  if (is24Hour.value) {
    return;
  }

  periodValue.value = nextMeridiem;
  draftTime.value = withMeridiem(draftTime.value, nextMeridiem);
  if (viewMode.value === 'input') {
    updateDraftFromParsedInput();
  }
};

const handleHourInput = (event) => {
  hourInputText.value = sanitizeHourInput(event.target.value);
  activeSegment.value = 'hour';
  updateDraftFromParsedInput();
};

const handleMinuteInput = (event) => {
  minuteInputText.value = sanitizeMinuteInput(event.target.value);
  activeSegment.value = 'minute';
  updateDraftFromParsedInput();
};

const incrementSegment = (segment, step) => {
  if (segment === 'hour') {
    if (is24Hour.value) {
      const nextHour = (displayParts.value.hour24 + step + 24) % 24;
      draftTime.value = withHour(draftTime.value, nextHour, periodValue.value, resolvedHourCycle.value);
      syncInputSegments();
      return;
    }

    const nextHour = ((displayParts.value.hour12 - 1 + step + 12) % 12) + 1;
    draftTime.value = withHour(draftTime.value, nextHour, periodValue.value, resolvedHourCycle.value);
    syncInputSegments();
    return;
  }

  const nextMinute = (displayParts.value.minute + step + 60) % 60;
  draftTime.value = withMinute(draftTime.value, nextMinute);
  syncInputSegments();
};

const handleInputKeydown = (segment, event) => {
  if (event.key === 'ArrowUp') {
    event.preventDefault();
    incrementSegment(segment, segment === 'hour' ? 1 : 1);
    return;
  }

  if (event.key === 'ArrowDown') {
    event.preventDefault();
    incrementSegment(segment, segment === 'hour' ? -1 : -1);
    return;
  }

  if (event.key === 'ArrowRight' && segment === 'hour') {
    event.preventDefault();
    activeSegment.value = 'minute';
    focusActiveInput();
    return;
  }

  if (event.key === 'ArrowLeft' && segment === 'minute') {
    event.preventDefault();
    activeSegment.value = 'hour';
    focusActiveInput();
    return;
  }

  if (event.key === 'Enter' && canConfirm.value) {
    event.preventDefault();
    confirmSelection();
    return;
  }

  if (event.key === 'Escape') {
    event.preventDefault();
    cancelSelection('escape');
  }
};

const closeDialog = (source) => {
  isClosingInternally.value = true;
  dialogOpen.value = false;
  emit('update:open', false);
  nextTick(() => {
    isClosingInternally.value = false;
  });
};

const cancelSelection = (source) => {
  syncFromModel();
  emit('cancel', { source });
  closeDialog(source);
};

const confirmSelection = () => {
  const nextValue = viewMode.value === 'input' ? parsedInputValue.value : draftTime.value;
  if (!nextValue) {
    return;
  }

  const modelValue = toModelValue(nextValue);
  emit('update:modelValue', modelValue);
  emit('confirm', modelValue);
  closeDialog('confirm');
};

const handleDialogDismiss = (event) => {
  if (isClosingInternally.value) {
    return;
  }

  syncFromModel();
  emit('cancel', event);
};

const handleDialogModelValue = (value) => {
  dialogOpen.value = value;
  emit('update:open', value);

  if (!value && !isClosingInternally.value) {
    syncFromModel();
  }
};

const resolveDialogInitialFocus = (containerEl) => {
  if (viewMode.value === 'input') {
    return activeSegment.value === 'minute'
      ? containerEl.querySelector('[data-input="minute"]')
      : containerEl.querySelector('[data-input="hour"]');
  }

  return containerEl.querySelector(`[data-segment="${activeSegment.value}"]`) || containerEl.querySelector('.md-time-picker__time-selector');
};

watch(
  () => props.modelValue,
  () => {
    syncFromModel();
  },
  { immediate: true }
);

watch(
  () => props.open,
  (value) => {
    dialogOpen.value = value;
    if (value) {
      syncFromModel();
      viewMode.value = props.entryMode === 'input' ? 'input' : 'dial';
      activeSegment.value = 'hour';
      if (viewMode.value === 'input') {
        focusActiveInput();
      }
    }
  },
  { immediate: true }
);

watch(
  () => viewMode.value,
  (value) => {
    if (value === 'input') {
      focusActiveInput();
    }
  }
);
</script>

<style lang="scss">
@use 'sass:map';
@use '../../styles/tokens';
@use '../elevation/elevation';

$picker-theme: tokens.md-comp-time-picker-values();
$input-theme: tokens.md-comp-time-input-values();
$sys-color: tokens.md-sys-color-values-light();
$motion: tokens.md-sys-motion-values();

.md-time-picker-dialog {
  --time-picker-container-color: #{map.get($picker-theme, container-color)};
  --time-picker-container-shape: #{map.get($picker-theme, container-shape)};
  --time-picker-headline-color: #{map.get($picker-theme, headline-color)};
  --time-picker-headline-font: #{map.get($picker-theme, headline-font)};
  --time-picker-headline-size: #{map.get($picker-theme, headline-size)};
  --time-picker-headline-weight: #{map.get($picker-theme, headline-weight)};
  --time-picker-headline-line-height: #{map.get($picker-theme, headline-line-height)};
  --time-picker-headline-tracking: #{map.get($picker-theme, headline-tracking)};
  --time-selector-width: #{map.get($picker-theme, time-selector-container-width)};
  --time-selector-24h-width: #{map.get($picker-theme, time-selector-24h-vertical-container-width)};
  --time-selector-height: #{map.get($picker-theme, time-selector-container-height)};
  --time-selector-shape: #{map.get($picker-theme, time-selector-container-shape)};
  --time-selector-selected-container-color: #{map.get($picker-theme, time-selector-selected-container-color)};
  --time-selector-selected-label-color: #{map.get($picker-theme, time-selector-selected-label-text-color)};
  --time-selector-unselected-container-color: #{map.get($picker-theme, time-selector-unselected-container-color)};
  --time-selector-unselected-label-color: #{map.get($picker-theme, time-selector-unselected-label-text-color)};
  --time-selector-label-font: #{map.get($picker-theme, time-selector-label-text-font)};
  --time-selector-label-size: #{map.get($picker-theme, time-selector-label-text-size)};
  --time-selector-label-weight: #{map.get($picker-theme, time-selector-label-text-weight)};
  --time-selector-label-line-height: #{map.get($picker-theme, time-selector-label-text-line-height)};
  --time-selector-separator-color: #{map.get($picker-theme, time-selector-separator-color)};
  --time-selector-separator-font: #{map.get($picker-theme, time-selector-separator-font)};
  --time-selector-separator-size: #{map.get($picker-theme, time-selector-separator-size)};
  --time-selector-separator-weight: #{map.get($picker-theme, time-selector-separator-weight)};
  --time-selector-separator-line-height: #{map.get($picker-theme, time-selector-separator-line-height)};
  --period-selector-width: #{map.get($picker-theme, period-selector-vertical-container-width)};
  --period-selector-height: #{map.get($picker-theme, period-selector-vertical-container-height)};
  --period-selector-shape: #{map.get($picker-theme, period-selector-container-shape)};
  --period-selector-outline-color: #{map.get($picker-theme, period-selector-outline-color)};
  --period-selector-outline-width: #{map.get($picker-theme, period-selector-outline-width)};
  --period-selector-selected-container-color: #{map.get($picker-theme, period-selector-selected-container-color)};
  --period-selector-selected-label-color: #{map.get($picker-theme, period-selector-selected-label-text-color)};
  --period-selector-unselected-label-color: #{map.get($picker-theme, period-selector-unselected-label-text-color)};
  --period-selector-label-font: #{map.get($picker-theme, period-selector-label-text-font)};
  --period-selector-label-size: #{map.get($picker-theme, period-selector-label-text-size)};
  --period-selector-label-weight: #{map.get($picker-theme, period-selector-label-text-weight)};
  --period-selector-label-line-height: #{map.get($picker-theme, period-selector-label-text-line-height)};
  --clock-dial-size: #{map.get($picker-theme, clock-dial-container-size)};
  --clock-dial-color: #{map.get($picker-theme, clock-dial-color)};
  --clock-dial-shape: #{map.get($picker-theme, clock-dial-shape)};
  --clock-dial-label-font: #{map.get($picker-theme, clock-dial-label-text-font)};
  --clock-dial-label-size: #{map.get($picker-theme, clock-dial-label-text-size)};
  --clock-dial-label-weight: #{map.get($picker-theme, clock-dial-label-text-weight)};
  --clock-dial-label-line-height: #{map.get($picker-theme, clock-dial-label-text-line-height)};
  --clock-dial-selected-label-color: #{map.get($picker-theme, clock-dial-selected-label-text-color)};
  --clock-dial-unselected-label-color: #{map.get($picker-theme, clock-dial-unselected-label-text-color)};
  --clock-selector-center-color: #{map.get($picker-theme, clock-dial-selector-center-container-color)};
  --clock-selector-handle-color: #{map.get($picker-theme, clock-dial-selector-handle-container-color)};
  --clock-selector-handle-shape: #{map.get($picker-theme, clock-dial-selector-handle-container-shape)};
  --clock-selector-track-color: #{map.get($picker-theme, clock-dial-selector-track-container-color)};
  --clock-selector-track-width: #{map.get($picker-theme, clock-dial-selector-track-container-width)};

  .md-time-picker-dialog__container {
    background-color: var(--time-picker-container-color);
    border-radius: var(--time-picker-container-shape);
    box-shadow: elevation.resolve-box-shadow(map.get($picker-theme, container-elevation), map.get($sys-color, shadow));
    inline-size: min(360px, calc(100vw - 48px));
    max-inline-size: calc(100vw - 48px);
    overflow: hidden;
    padding: 0;
  }

  .md-time-picker-dialog__header,
  .md-time-picker-dialog__content,
  .md-time-picker-dialog__footer {
    background: transparent;
    margin: 0;
    padding: 0;
  }

  .md-time-picker-dialog__footer {
    justify-content: stretch;
    inline-size: 100%;
  }
}

.md-time-picker-dialog--input {
  --time-picker-container-color: #{map.get($input-theme, container-color)};
  --time-picker-headline-color: #{map.get($input-theme, headline-color)};
  --time-picker-headline-font: #{map.get($input-theme, headline-font)};
  --time-picker-headline-size: #{map.get($input-theme, headline-size)};
  --time-picker-headline-weight: #{map.get($input-theme, headline-weight)};
  --time-picker-headline-line-height: #{map.get($input-theme, headline-line-height)};
  --time-picker-headline-tracking: #{map.get($input-theme, headline-tracking)};
  --time-selector-width: #{map.get($input-theme, time-input-field-container-width)};
  --time-selector-height: #{map.get($input-theme, time-input-field-container-height)};
  --time-selector-shape: #{map.get($input-theme, time-input-field-container-shape)};
  --time-selector-selected-container-color: #{map.get($input-theme, time-input-field-focus-container-color)};
  --time-selector-selected-label-color: #{map.get($input-theme, time-input-field-focus-label-text-color)};
  --time-selector-unselected-container-color: #{map.get($input-theme, time-input-field-container-color)};
  --time-selector-unselected-label-color: #{map.get($input-theme, time-input-field-label-text-color)};
  --time-selector-label-font: #{map.get($input-theme, time-input-field-label-text-font)};
  --time-selector-label-size: #{map.get($input-theme, time-input-field-label-text-size)};
  --time-selector-label-weight: #{map.get($input-theme, time-input-field-label-text-weight)};
  --time-selector-label-line-height: #{map.get($input-theme, time-input-field-label-text-line-height)};
  --time-selector-separator-color: #{map.get($input-theme, time-input-field-separator-color)};
  --time-selector-separator-font: #{map.get($input-theme, time-input-field-separator-font)};
  --time-selector-separator-size: #{map.get($input-theme, time-input-field-separator-size)};
  --time-selector-separator-weight: #{map.get($input-theme, time-input-field-separator-weight)};
  --time-selector-separator-line-height: #{map.get($input-theme, time-input-field-separator-line-height)};
  --period-selector-width: #{map.get($input-theme, period-selector-container-width)};
  --period-selector-height: #{map.get($input-theme, period-selector-container-height)};
  --period-selector-shape: #{map.get($input-theme, period-selector-container-shape)};
  --period-selector-outline-color: #{map.get($input-theme, period-selector-outline-color)};
  --period-selector-outline-width: #{map.get($input-theme, period-selector-outline-width)};
  --period-selector-selected-container-color: #{map.get($input-theme, period-selector-selected-container-color)};
  --period-selector-selected-label-color: #{map.get($input-theme, period-selector-selected-label-text-color)};
  --period-selector-unselected-label-color: #{map.get($input-theme, period-selector-unselected-label-text-color)};
  --period-selector-label-font: #{map.get($input-theme, period-selector-label-text-font)};
  --period-selector-label-size: #{map.get($input-theme, period-selector-label-text-size)};
  --period-selector-label-weight: #{map.get($input-theme, period-selector-label-text-weight)};
  --period-selector-label-line-height: #{map.get($input-theme, period-selector-label-text-line-height)};
}

.md-time-picker {
  background: transparent;
  box-sizing: border-box;
  color: var(--time-selector-unselected-label-color);
  inline-size: 100%;
  min-inline-size: 0;
  padding: 24px 24px 0;
}

.md-time-picker--24h {
  --time-selector-width: var(--time-selector-24h-width);
}

.md-time-picker__headline {
  color: var(--time-picker-headline-color);
  font-family: var(--time-picker-headline-font);
  font-size: var(--time-picker-headline-size);
  font-weight: var(--time-picker-headline-weight);
  letter-spacing: var(--time-picker-headline-tracking);
  line-height: var(--time-picker-headline-line-height);
  padding: 24px 24px 0;
}

.md-time-picker__display-row {
  align-items: flex-start;
  display: grid;
  gap: 12px;
  grid-template-columns: var(--time-selector-width) 24px var(--time-selector-width) var(--period-selector-width);
}

.md-time-picker--24h .md-time-picker__display-row {
  grid-template-columns: var(--time-selector-width) 24px var(--time-selector-width);
}

.md-time-picker__time-selector,
.md-time-picker__time-field {
  align-items: center;
  background-color: var(--time-selector-unselected-container-color);
  border: 0;
  border-radius: var(--time-selector-shape);
  block-size: var(--time-selector-height);
  color: var(--time-selector-unselected-label-color);
  display: inline-flex;
  inline-size: var(--time-selector-width);
  justify-content: center;
  min-inline-size: 0;
  padding: 0;
}

.md-time-picker__time-selector {
  font-family: var(--time-selector-label-font);
  font-size: var(--time-selector-label-size);
  font-weight: var(--time-selector-label-weight);
  line-height: var(--time-selector-label-line-height);
}

.md-time-picker__time-selector--active {
  background-color: var(--time-selector-selected-container-color);
  color: var(--time-selector-selected-label-color);
}

.md-time-picker__time-field {
  border: 2px solid transparent;
  transition: border-color 160ms ease, background-color 160ms ease;
}

.md-time-picker__time-field--active {
  background-color: var(--time-selector-selected-container-color);
  border-color: #{map.get($input-theme, time-input-field-focus-outline-color)};
}

.md-time-picker__time-input {
  background: transparent;
  border: 0;
  color: inherit;
  font-family: var(--time-selector-label-font);
  font-size: var(--time-selector-label-size);
  font-weight: var(--time-selector-label-weight);
  inline-size: 100%;
  line-height: var(--time-selector-label-line-height);
  outline: none;
  padding: 0;
  text-align: center;
}

.md-time-picker__separator {
  align-items: center;
  color: var(--time-selector-separator-color);
  display: inline-flex;
  font-family: var(--time-selector-separator-font);
  font-size: var(--time-selector-separator-size);
  font-weight: var(--time-selector-separator-weight);
  justify-content: center;
  line-height: var(--time-selector-separator-line-height);
}

.md-time-picker__period-selector {
  border: var(--period-selector-outline-width) solid var(--period-selector-outline-color);
  border-radius: var(--period-selector-shape);
  display: flex;
  flex-direction: column;
  inline-size: var(--period-selector-width);
  overflow: hidden;
}

.md-time-picker__period-button {
  align-items: center;
  background: transparent;
  border: 0;
  color: var(--period-selector-unselected-label-color);
  cursor: pointer;
  display: inline-flex;
  flex: 1 1 0;
  font-family: var(--period-selector-label-font);
  font-size: var(--period-selector-label-size);
  font-weight: var(--period-selector-label-weight);
  justify-content: center;
  line-height: var(--period-selector-label-line-height);
  min-block-size: calc(var(--period-selector-height) / 2);
  padding: 0;
}

.md-time-picker__period-button + .md-time-picker__period-button {
  border-top: var(--period-selector-outline-width) solid var(--period-selector-outline-color);
}

.md-time-picker__period-button--active {
  background-color: var(--period-selector-selected-container-color);
  color: var(--period-selector-selected-label-color);
}

.md-time-picker__supporting-row {
  color: #{map.get($input-theme, time-input-field-supporting-text-color)};
  display: grid;
  font-family: #{map.get($input-theme, time-input-field-supporting-text-font)};
  font-size: #{map.get($input-theme, time-input-field-supporting-text-size)};
  font-weight: #{map.get($input-theme, time-input-field-supporting-text-weight)};
  gap: 24px;
  grid-template-columns: var(--time-selector-width) var(--time-selector-width);
  line-height: #{map.get($input-theme, time-input-field-supporting-text-line-height)};
  margin-top: 12px;
}

.md-time-picker__dial-shell {
  display: flex;
  justify-content: center;
  margin-top: 36px;
  padding-bottom: 24px;
}

.md-time-picker__actions-row {
  align-items: center;
  display: flex;
  inline-size: 100%;
  justify-content: flex-start;
  padding: 24px;
}

.md-time-picker__actions {
  display: inline-flex;
  gap: 8px;
  margin-inline-start: auto;
}

.md-time-picker__entry-toggle {
  align-items: center;
  background: transparent;
  border: 0;
  border-radius: 24px;
  color: #{map.get($picker-theme, time-selector-unselected-label-text-color)};
  display: inline-flex;
  justify-content: center;
  min-block-size: 48px;
  min-inline-size: 48px;
  padding: 0;
}

.fade-grow-enter-active,
.fade-grow-leave-active {
  transition:
    opacity #{map.get($motion, duration-medium2)} #{map.get($motion, easing-standard)},
    transform #{map.get($motion, duration-medium2)} #{map.get($motion, easing-standard)};
}

.fade-grow-enter-from,
.fade-grow-leave-to {
  opacity: 0;
  transform: scale(0.98);
}
</style>
