<template>
  <div
    v-if="isDocked"
    class="md-date-picker md-date-picker--docked"
    @keydown="handleCalendarKeydown"
  >
    <MdDatePickerHeader
      variant="docked"
      :locale="locale"
      :month="displayedMonth"
      :year="displayedYear"
      :view-mode="viewMode"
      :can-prev-month="canPrevMonth"
      :can-next-month="canNextMonth"
      :can-prev-year="canPrevYear"
      :can-next-year="canNextYear"
      @prev-month="goToPreviousMonth"
      @next-month="goToNextMonth"
      @prev-year="goToPreviousYear"
      @next-year="goToNextYear"
      @toggle-months="toggleView('months')"
      @toggle-years="toggleView('years')"
    />

    <div ref="bodyEl" class="md-date-picker__body">
      <transition name="fade-grow" mode="out-in">
        <MdDatePickerList
          v-if="viewMode === 'months'"
          key="months"
          aria-label="Months"
          :items="monthItems"
          @select="selectMonth"
        />
        <MdDatePickerList
          v-else-if="viewMode === 'years'"
          key="years"
          aria-label="Years"
          :items="yearItems"
          @select="selectYear"
        />
        <div v-else key="days" ref="calendarViewEl" class="md-date-picker__calendar-view">
          <transition :name="monthTransitionName" mode="out-in">
            <MdDatePickerDateTable
              :key="calendarKey"
              aria-label="Calendar"
              :days="calendarDays"
              :locale="locale"
              @select="selectDay"
              @focus-date="setFocusedIso"
              @hover-date="setHoveredRangeEndIso"
            />
          </transition>
        </div>
      </transition>
    </div>

    <MdElevationOverlay />
  </div>

  <MdDialog
    v-else
    :modelValue="dialogOpen"
    :close-on-backdrop-click="true"
    :close-on-escape="true"
    :initial-focus="resolveDialogInitialFocus"
    :dialog-class="['md-date-picker-dialog', { 'md-date-picker-dialog--input': viewMode === 'input' }]"
    container-class="md-date-picker-dialog__container"
    header-class="md-date-picker-dialog__header"
    content-class="md-date-picker-dialog__content"
    footer-class="md-date-picker-dialog__footer"
    @cancel="handleDialogCancel"
    @update:modelValue="handleDialogModelValue"
  >
    <template #header>
      <div class="md-date-picker__modal-header">
        <div class="md-date-picker__modal-copy">
          <div class="md-date-picker__modal-supporting">{{ resolvedSupportingText }}</div>
          <div class="md-date-picker__modal-headline">{{ headlineText }}</div>
        </div>
        <MdIconButton
          class="md-date-picker__modal-toggle"
          type="button"
          :icon="viewMode === 'input' ? 'calendar_month' : 'edit'"
          @click="toggleEntryMode"
        />
      </div>
    </template>

    <div class="md-date-picker md-date-picker--modal" :class="{ 'md-date-picker--input': viewMode === 'input' }">
      <div class="md-date-picker__divider"></div>

      <div ref="bodyEl" class="md-date-picker__body" :class="{ 'md-date-picker__body--input': viewMode === 'input' }">
        <transition name="fade-grow" mode="out-in">
          <div v-if="viewMode === 'input'" key="input" class="md-date-picker__input-panel">
            <MdOutlinedTextField
              v-model="inputText"
              :label="inputLabel"
              :supporting-text="inputSupportingText"
              :error="inputError"
              :error-text="inputErrorText"
              @change="parseInputText"
              @keydown="handleInputKeydown"
            >
              <template #end>
                <button
                  type="button"
                  class="md-date-picker__field-icon-button"
                  aria-label="Switch to calendar view"
                  @click.stop="setViewMode('day')"
                >
                  <MdIcon>calendar_month</MdIcon>
                </button>
              </template>
            </MdOutlinedTextField>
          </div>

          <div v-else key="calendar" class="md-date-picker__calendar-shell" @keydown="handleCalendarKeydown">
            <MdDatePickerHeader
              variant="modal"
              :locale="locale"
              :month="displayedMonth"
              :year="displayedYear"
              :view-mode="viewMode"
              :can-prev-month="canPrevMonth"
              :can-next-month="canNextMonth"
              @prev-month="goToPreviousMonth"
              @next-month="goToNextMonth"
              @toggle-months="toggleView('months')"
              @toggle-years="toggleView('years')"
            />

            <transition name="fade-grow" mode="out-in">
              <MdDatePickerYearGrid
                v-if="viewMode === 'years'"
                key="modal-years"
                aria-label="Years"
                :items="yearItems"
                @select="selectYear"
              />
              <div v-else-if="viewMode === 'months'" key="modal-months">
                <MdDatePickerList aria-label="Months" :items="monthItems" @select="selectMonth" />
              </div>
              <div v-else key="modal-days" ref="calendarViewEl" class="md-date-picker__calendar-view">
                <transition :name="monthTransitionName" mode="out-in">
                  <MdDatePickerDateTable
                    :key="calendarKey"
                    aria-label="Calendar"
                    :days="calendarDays"
                    :locale="locale"
                    @select="selectDay"
                    @focus-date="setFocusedIso"
                    @hover-date="setHoveredRangeEndIso"
                  />
                </transition>
              </div>
            </transition>
          </div>
        </transition>
      </div>
    </div>

    <template #footer>
      <div class="md-date-picker__actions">
        <MdTextButton type="button" @click="cancelSelection('action')">{{ cancelText }}</MdTextButton>
        <MdTextButton type="button" :disabled="!canConfirm" @click="confirmSelection">{{ confirmText }}</MdTextButton>
      </div>
    </template>
  </MdDialog>
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue';
import MdDialog from '../dialog/MdDialog.vue';
import MdElevationOverlay from '../elevation/MdElevationOverlay.vue';
import MdIcon from '../icon/MdIcon.vue';
import MdIconButton from '../icon-button/MdIconButton.vue';
import MdOutlinedTextField from '../text-field/MdOutlinedTextField.vue';
import MdTextButton from '../button/MdTextButton.vue';
import MdDatePickerDateTable from './MdDatePickerDateTable.vue';
import MdDatePickerHeader from './MdDatePickerHeader.vue';
import MdDatePickerList from './MdDatePickerList.vue';
import MdDatePickerYearGrid from './MdDatePickerYearGrid.vue';
import dayjs, {
  DEFAULT_DISPLAY_FORMAT,
  buildMonthGrid,
  canNavigateMonth,
  canNavigateYear,
  findFirstFocusableDate,
  formatDisplayValue,
  formatHeadlineDate,
  formatRangeDisplayValue,
  formatRangeHeadlineDate,
  getMonthOptions,
  getYearOptions,
  isDateAllowed,
  isRangeAllowed,
  moveFocusDate,
  parseDisplayValue,
  parseModelValue,
  parseRangeDisplayValue,
  parseRangeModelValue,
  resolveDayjsLocale,
  sortRangeDates,
  shiftMonth,
  toIso,
  toRangeIso,
} from './datePickerUtils';

const props = defineProps({
  cancelText: {
    type: String,
    default: 'Cancel',
  },
  confirmText: {
    type: String,
    default: 'OK',
  },
  displayFormat: {
    type: String,
    default: DEFAULT_DISPLAY_FORMAT,
  },
  entryMode: {
    type: String,
    default: 'calendar',
  },
  format: {
    type: String,
    default: '',
  },
  isDateDisabled: {
    type: Function,
    default: null,
  },
  locale: {
    type: String,
    default: 'en-US',
  },
  max: {
    type: String,
    default: '',
  },
  min: {
    type: String,
    default: '',
  },
  modelValue: {
    type: [String, Object],
    default: null,
  },
  open: {
    type: Boolean,
    default: false,
  },
  selectionMode: {
    type: String,
    default: 'single',
  },
  supportingText: {
    type: String,
    default: '',
  },
  variant: {
    type: String,
    default: 'modal',
  },
});

const emit = defineEmits(['cancel', 'confirm', 'invalid-input', 'month-change', 'update:modelValue', 'update:open', 'view-change', 'year-change']);

const isDocked = computed(() => props.variant === 'docked');
const isRangeSelection = computed(() => props.selectionMode === 'range');
const localeKey = computed(() => resolveDayjsLocale(props.locale));
const effectiveDisplayFormat = computed(() => props.format || props.displayFormat || DEFAULT_DISPLAY_FORMAT);
const resolvedSupportingText = computed(() => props.supportingText || (isRangeSelection.value ? 'Select dates' : 'Select date'));
const inputLabel = computed(() => (isRangeSelection.value ? 'Date range' : 'Date'));
const inputSupportingText = computed(() => (isRangeSelection.value ? `${effectiveDisplayFormat.value} - ${effectiveDisplayFormat.value}` : effectiveDisplayFormat.value));
const inputErrorText = computed(() => (isRangeSelection.value ? 'Enter a valid date range' : 'Enter a valid date'));
const constraints = computed(() => ({
  min: props.min,
  max: props.max,
  isDateDisabled: props.isDateDisabled,
}));
const currentModelDate = computed(() => (isRangeSelection.value ? null : parseModelValue(typeof props.modelValue === 'string' ? props.modelValue : null)));
const currentModelRange = computed(() => (isRangeSelection.value ? parseRangeModelValue(props.modelValue) : { start: null, end: null }));

const draftDate = ref(null);
const draftRange = ref({ start: null, end: null });
const displayedMonth = ref(dayjs().month());
const displayedYear = ref(dayjs().year());
const focusedIso = ref(null);
const hoveredRangeEndIso = ref(null);
const viewMode = ref('day');
const inputText = ref('');
const inputError = ref(false);
const isReversing = ref(false);
const dialogOpen = ref(props.open);
const calendarViewEl = ref(null);
const bodyEl = ref(null);

const getRangeAnchorDate = (rangeValue) => rangeValue.end || rangeValue.start || null;
const getRangeFocusIso = (rangeValue) => toIso(rangeValue.end || rangeValue.start || null);

const syncFromModel = () => {
  if (isRangeSelection.value) {
    const normalizedRange = sortRangeDates(currentModelRange.value.start, currentModelRange.value.end);
    draftRange.value = normalizedRange;
    draftDate.value = null;
    const baseDate = getRangeAnchorDate(normalizedRange) || dayjs().startOf('day');
    displayedMonth.value = baseDate.month();
    displayedYear.value = baseDate.year();
    focusedIso.value = findFirstFocusableDate({
      year: displayedYear.value,
      month: displayedMonth.value,
      selectedIso: getRangeFocusIso(normalizedRange),
      constraints: constraints.value,
    });
    hoveredRangeEndIso.value = null;
    inputText.value = formatRangeDisplayValue(toRangeIso(normalizedRange), effectiveDisplayFormat.value, props.locale);
    inputError.value = false;
    return;
  }

  draftDate.value = currentModelDate.value;
  draftRange.value = { start: null, end: null };
  const baseDate = currentModelDate.value || dayjs().startOf('day');
  displayedMonth.value = baseDate.month();
  displayedYear.value = baseDate.year();
  focusedIso.value = findFirstFocusableDate({
    year: displayedYear.value,
    month: displayedMonth.value,
    selectedIso: toIso(currentModelDate.value),
    constraints: constraints.value,
  });
  hoveredRangeEndIso.value = null;
  inputText.value = formatDisplayValue(currentModelDate.value, effectiveDisplayFormat.value, props.locale);
  inputError.value = false;
};

const calendarKey = computed(() => `${displayedYear.value}-${displayedMonth.value}`);
const monthTransitionName = computed(() => (isReversing.value ? 'fade-slide-left' : 'fade-slide-right'));
const headlineText = computed(() => {
  if (isRangeSelection.value) {
    if (draftRange.value.start || draftRange.value.end) {
      return formatRangeHeadlineDate(draftRange.value, props.locale);
    }

    return formatRangeHeadlineDate(currentModelRange.value, props.locale);
  }

  return formatHeadlineDate(draftDate.value || currentModelDate.value, props.locale);
});
const calendarDays = computed(() => buildMonthGrid({
  year: displayedYear.value,
  month: displayedMonth.value,
  locale: localeKey.value,
  selectedIso: isRangeSelection.value ? null : toIso(draftDate.value),
  focusedIso: focusedIso.value,
  constraints: constraints.value,
  rangeStartIso: isRangeSelection.value ? toIso(draftRange.value.start) : null,
  rangeEndIso: isRangeSelection.value ? toIso(draftRange.value.end) : null,
  previewRangeEndIso: isRangeSelection.value ? hoveredRangeEndIso.value : null,
}));
const monthItems = computed(() => getMonthOptions(displayedYear.value, props.locale, constraints.value).map((item) => ({
  ...item,
  selected: item.value === displayedMonth.value,
})));
const yearItems = computed(() => getYearOptions(displayedYear.value, constraints.value).map((item) => ({
  ...item,
  selected: item.value === displayedYear.value,
})));
const canPrevMonth = computed(() => canNavigateMonth({ year: displayedYear.value, month: displayedMonth.value }, -1, constraints.value));
const canNextMonth = computed(() => canNavigateMonth({ year: displayedYear.value, month: displayedMonth.value }, 1, constraints.value));
const canPrevYear = computed(() => canNavigateYear(displayedYear.value, -1, constraints.value));
const canNextYear = computed(() => canNavigateYear(displayedYear.value, 1, constraints.value));
const canConfirm = computed(() => {
  if (inputError.value) {
    return false;
  }

  if (!isRangeSelection.value) {
    return true;
  }

  return !!draftRange.value.start && !!draftRange.value.end;
});

const setViewMode = (nextViewMode) => {
  viewMode.value = nextViewMode;
  emit('view-change', nextViewMode);
};

const toggleView = (nextViewMode) => {
  setViewMode(viewMode.value === nextViewMode ? 'day' : nextViewMode);
};

const getSelectedFocusIso = () => (isRangeSelection.value ? getRangeFocusIso(draftRange.value) : toIso(draftDate.value));

const updateFocusedDate = async () => {
  const currentFocusedDate = parseModelValue(focusedIso.value);
  if (!currentFocusedDate || currentFocusedDate.year() !== displayedYear.value || currentFocusedDate.month() !== displayedMonth.value) {
    focusedIso.value = findFirstFocusableDate({
      year: displayedYear.value,
      month: displayedMonth.value,
      selectedIso: getSelectedFocusIso(),
      constraints: constraints.value,
    });
  }

  await nextTick();
  const activeButton = calendarViewEl.value?.querySelector?.(`[data-iso="${focusedIso.value}"]`);
  activeButton?.focus?.();
};

const setFocusedIso = (value) => {
  focusedIso.value = value;
};

const setHoveredRangeEndIso = (value) => {
  if (!isRangeSelection.value || !draftRange.value.start || draftRange.value.end || !value) {
    hoveredRangeEndIso.value = null;
    return;
  }

  if (value === toIso(draftRange.value.start)) {
    hoveredRangeEndIso.value = null;
    return;
  }

  hoveredRangeEndIso.value = value;
};

const updateDisplayedMonth = (amount) => {
  const nextMonth = shiftMonth({ year: displayedYear.value, month: displayedMonth.value }, amount);
  displayedMonth.value = nextMonth.month;
  displayedYear.value = nextMonth.year;
  emit('month-change', { month: displayedMonth.value, year: displayedYear.value });
};

const goToPreviousMonth = async () => {
  if (!canPrevMonth.value) {
    return;
  }

  isReversing.value = true;
  updateDisplayedMonth(-1);
  await updateFocusedDate();
};

const goToNextMonth = async () => {
  if (!canNextMonth.value) {
    return;
  }

  isReversing.value = false;
  updateDisplayedMonth(1);
  await updateFocusedDate();
};

const goToPreviousYear = async () => {
  if (!canPrevYear.value) {
    return;
  }

  displayedYear.value -= 1;
  emit('year-change', displayedYear.value);
  await updateFocusedDate();
};

const goToNextYear = async () => {
  if (!canNextYear.value) {
    return;
  }

  displayedYear.value += 1;
  emit('year-change', displayedYear.value);
  await updateFocusedDate();
};

const selectMonth = async (value) => {
  displayedMonth.value = value;
  emit('month-change', { month: displayedMonth.value, year: displayedYear.value });
  setViewMode('day');
  await updateFocusedDate();
};

const selectYear = async (value) => {
  displayedYear.value = value;
  emit('year-change', displayedYear.value);
  setViewMode('day');
  await updateFocusedDate();
};

const updateDraftDate = (date, { commit = false } = {}) => {
  draftDate.value = date;
  draftRange.value = { start: null, end: null };
  hoveredRangeEndIso.value = null;
  inputText.value = formatDisplayValue(date, effectiveDisplayFormat.value, props.locale);
  inputError.value = false;

  if (date) {
    displayedMonth.value = date.month();
    displayedYear.value = date.year();
    focusedIso.value = toIso(date);
  }

  if (commit) {
    emit('update:modelValue', toIso(date));
  }
};

const updateDraftRange = (rangeValue, { commit = false } = {}) => {
  const normalizedRange = sortRangeDates(rangeValue.start, rangeValue.end);
  draftRange.value = normalizedRange;
  draftDate.value = null;
  hoveredRangeEndIso.value = null;
  inputText.value = formatRangeDisplayValue(toRangeIso(normalizedRange), effectiveDisplayFormat.value, props.locale);
  inputError.value = false;

  const anchorDate = getRangeAnchorDate(normalizedRange);
  if (anchorDate) {
    displayedMonth.value = anchorDate.month();
    displayedYear.value = anchorDate.year();
    focusedIso.value = toIso(anchorDate);
  }

  if (commit) {
    emit('update:modelValue', toRangeIso(normalizedRange));
  }
};

const selectDay = (isoDate) => {
  const selectedDate = parseModelValue(isoDate);
  if (!selectedDate) {
    return;
  }

  if (!isRangeSelection.value) {
    updateDraftDate(selectedDate, { commit: isDocked.value });
    return;
  }

  const currentStart = draftRange.value.start;
  const currentEnd = draftRange.value.end;

  if (!currentStart || currentEnd) {
    updateDraftRange({ start: selectedDate, end: null }, { commit: isDocked.value });
    return;
  }

  if (selectedDate.isSame(currentStart, 'day')) {
    updateDraftRange({ start: selectedDate, end: selectedDate }, { commit: isDocked.value });
    return;
  }

  const nextRange = sortRangeDates(currentStart, selectedDate);
  if (!isRangeAllowed(nextRange, constraints.value)) {
    return;
  }

  updateDraftRange(nextRange, { commit: isDocked.value });
};

const confirmSelection = () => {
  if (!canConfirm.value) {
    return;
  }

  const value = isRangeSelection.value ? toRangeIso(draftRange.value) : toIso(draftDate.value);
  emit('update:modelValue', value);
  emit('confirm', { value });
  dialogOpen.value = false;
  emit('update:open', false);
};

const cancelSelection = (source = 'action') => {
  syncFromModel();
  emit('cancel', { source });
  dialogOpen.value = false;
  emit('update:open', false);
};

const handleDialogCancel = (payload = {}) => {
  syncFromModel();
  emit('cancel', { source: payload.source || 'dismiss' });
};

const handleDialogModelValue = (value) => {
  dialogOpen.value = value;
  emit('update:open', value);

  if (!value) {
    syncFromModel();
  }
};

const toggleEntryMode = () => {
  setViewMode(viewMode.value === 'input' ? 'day' : 'input');
};

const parseInputText = () => {
  if (isRangeSelection.value) {
    const parsedRange = parseRangeDisplayValue(inputText.value, effectiveDisplayFormat.value, props.locale);

    if (inputText.value === '') {
      updateDraftRange({ start: null, end: null });
      return;
    }

    if (!parsedRange || !parsedRange.start || !parsedRange.end) {
      inputError.value = true;
      emit('invalid-input', inputText.value);
      return;
    }

    if (!isDateAllowed(parsedRange.start, constraints.value) || !isDateAllowed(parsedRange.end, constraints.value) || !isRangeAllowed(parsedRange, constraints.value)) {
      inputError.value = true;
      emit('invalid-input', inputText.value);
      return;
    }

    updateDraftRange(parsedRange);
    return;
  }

  const parsedValue = parseDisplayValue(inputText.value, effectiveDisplayFormat.value, props.locale);

  if (inputText.value === '') {
    updateDraftDate(null);
    return;
  }

  if (!parsedValue) {
    inputError.value = true;
    emit('invalid-input', inputText.value);
    return;
  }

  if (!isDateAllowed(parsedValue, constraints.value)) {
    inputError.value = true;
    emit('invalid-input', inputText.value);
    return;
  }

  updateDraftDate(parsedValue);
};

const handleInputKeydown = (event) => {
  if (event.key === 'Enter') {
    parseInputText();
    if (!inputError.value) {
      setViewMode('day');
    }
  }

  if (event.key === 'Escape') {
    event.preventDefault();
    if (props.variant === 'modal') {
      cancelSelection('escape');
    }
  }
};

const resolveDialogInitialFocus = (containerEl) => {
  if (viewMode.value === 'input') {
    return containerEl.querySelector('input');
  }

  if (viewMode.value === 'years') {
    return containerEl.querySelector('.md-date-picker-year-grid__item[tabindex="0"]');
  }

  if (viewMode.value === 'months') {
    return containerEl.querySelector('.md-date-picker-list__item[tabindex="0"]');
  }

  return containerEl.querySelector(`[data-iso="${focusedIso.value}"]`) || containerEl.querySelector('.md-date-picker-date-table__date-item');
};

const focusCalendarDate = async (nextDate) => {
  displayedMonth.value = nextDate.month();
  displayedYear.value = nextDate.year();
  focusedIso.value = toIso(nextDate);
  await updateFocusedDate();
};

const handleCalendarKeydown = async (event) => {
  if (viewMode.value !== 'day') {
    if (event.key === 'Escape') {
      setViewMode('day');
    }
    return;
  }

  const focusHandlers = {
    ArrowLeft: () => moveFocusDate(focusedIso.value, -1, 'day', constraints.value),
    ArrowRight: () => moveFocusDate(focusedIso.value, 1, 'day', constraints.value),
    ArrowUp: () => moveFocusDate(focusedIso.value, -7, 'day', constraints.value),
    ArrowDown: () => moveFocusDate(focusedIso.value, 7, 'day', constraints.value),
    PageUp: () => moveFocusDate(focusedIso.value, -1, event.shiftKey ? 'year' : 'month', constraints.value),
    PageDown: () => moveFocusDate(focusedIso.value, 1, event.shiftKey ? 'year' : 'month', constraints.value),
  };

  if (event.key === 'Home' || event.key === 'End') {
    event.preventDefault();
    const focusedDate = parseModelValue(focusedIso.value) || dayjs().year(displayedYear.value).month(displayedMonth.value).date(1);
    const firstDayOfWeek = dayjs().locale(localeKey.value).localeData().firstDayOfWeek();
    const targetWeekday = event.key === 'Home' ? firstDayOfWeek : (firstDayOfWeek + 6) % 7;
    let candidate = focusedDate.weekday(targetWeekday);
    if (event.key === 'Home' && candidate.isAfter(focusedDate, 'day')) {
      candidate = candidate.subtract(1, 'week');
    }
    if (event.key === 'End' && candidate.isBefore(focusedDate, 'day')) {
      candidate = candidate.add(1, 'week');
    }
    await focusCalendarDate(candidate.startOf('day'));
    return;
  }

  if (focusHandlers[event.key]) {
    event.preventDefault();
    const nextDate = focusHandlers[event.key]();
    await focusCalendarDate(nextDate.startOf('day'));
    return;
  }

  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    if (focusedIso.value) {
      selectDay(focusedIso.value);
    }
    return;
  }

  if (event.key === 'Escape') {
    event.preventDefault();
    if (isDocked.value) {
      setViewMode('day');
    } else {
      cancelSelection('escape');
    }
  }
};

watch(
  () => props.modelValue,
  () => {
    syncFromModel();
  },
  { immediate: true, deep: true }
);

watch(
  () => props.open,
  (value) => {
    dialogOpen.value = value;
    if (value) {
      syncFromModel();
      setViewMode(props.entryMode === 'input' ? 'input' : 'day');
      nextTick(updateFocusedDate);
    } else if (!isDocked.value) {
      syncFromModel();
    }
  },
  { immediate: true }
);

watch(
  () => [
    displayedMonth.value,
    displayedYear.value,
    props.min,
    props.max,
    props.selectionMode,
    typeof props.modelValue === 'string' ? props.modelValue : props.modelValue?.start,
    typeof props.modelValue === 'object' ? props.modelValue?.end : null,
  ],
  () => {
    updateFocusedDate();
  },
  { immediate: true }
);

watch(
  () => viewMode.value,
  async (value) => {
    await nextTick();

    if (value === 'input') {
      const inputEl = bodyEl.value?.querySelector?.('.md-date-picker__input-panel input');
      inputEl?.focus?.();
      return;
    }

    if (value === 'months' || value === 'years') {
      const activeItem = bodyEl.value?.querySelector?.(
        value === 'years'
          ? '.md-date-picker-year-grid__item[tabindex="0"]'
          : '.md-date-picker-list__item[tabindex="0"]'
      );
      activeItem?.focus?.();
      return;
    }

    updateFocusedDate();
  }
);
</script>

<style lang="scss">
@use 'sass:map';
@use '../../styles/tokens';
@use '../elevation/elevation';

$docked-theme: tokens.md-comp-date-picker-docked-values();
$modal-theme: tokens.md-comp-date-picker-modal-values();
$date-input-theme: tokens.md-comp-date-input-modal-values();
$divider-theme: tokens.md-comp-divider-values();
$sys-color: tokens.md-sys-color-values-light();
$motion: tokens.md-sys-motion-values();

.md-date-picker-dialog {
  --md-date-picker-dialog-width: #{map.get($modal-theme, container-width)};
  --md-date-picker-dialog-container-color: #{map.get($modal-theme, container-color)};

  &--input {
    --md-date-picker-dialog-width: #{map.get($date-input-theme, container-width)};
    --md-date-picker-dialog-container-color: #{map.get($date-input-theme, container-color)};
  }

  .md-date-picker-dialog__container {
    background-color: var(--md-date-picker-dialog-container-color);
    inline-size: min(var(--md-date-picker-dialog-width), calc(100vw - 48px));
    max-block-size: calc(100% - 48px);
    max-inline-size: calc(100% - 48px);
    min-block-size: 0;
    min-inline-size: 0;
    overflow: hidden;
    padding: 0;
  }

  .md-date-picker-dialog__header,
  .md-date-picker-dialog__content,
  .md-date-picker-dialog__footer {
    margin: 0;
    padding: 0;
  }

  .md-date-picker-dialog__footer {
    justify-content: stretch;
  }
}

.md-date-picker {
  background-color: var(--container-color);
  border-radius: var(--container-shape);
  color: var(--date-unselected-label-text-color);
  overflow: hidden;
  position: relative;
  width: var(--container-width);

  &--docked {
    --container-color: #{map.get($docked-theme, container-color)};
    --container-shape: #{map.get($docked-theme, container-shape)};
    --container-width: #{map.get($docked-theme, container-width)};
    --date-container-width: #{map.get($docked-theme, date-container-width)};
    --date-container-height: #{map.get($docked-theme, date-container-height)};
    --date-state-layer-width: #{map.get($docked-theme, date-state-layer-width)};
    --date-state-layer-height: #{map.get($docked-theme, date-state-layer-height)};
    --date-state-layer-shape: #{map.get($docked-theme, date-state-layer-shape)};
    --date-container-shape: #{map.get($docked-theme, date-container-shape)};
    --date-label-text-font: #{map.get($docked-theme, date-label-text-font)};
    --date-label-text-line-height: #{map.get($docked-theme, date-label-text-line-height)};
    --date-label-text-size: #{map.get($docked-theme, date-label-text-size)};
    --date-label-text-tracking: #{map.get($docked-theme, date-label-text-tracking)};
    --date-label-text-weight: #{map.get($docked-theme, date-label-text-weight)};
    --date-unselected-label-text-color: #{map.get($docked-theme, date-unselected-label-text-color)};
    --date-unselected-outside-month-label-text-color: #{map.get($docked-theme, date-unselected-outside-month-label-text-color)};
    --date-unselected-hover-state-layer-color: #{map.get($docked-theme, date-unselected-hover-state-layer-color)};
    --date-hover-state-layer-opacity: #{map.get($docked-theme, date-hover-state-layer-opacity)};
    --date-today-container-outline-color: #{map.get($docked-theme, date-today-container-outline-color)};
    --date-today-container-outline-width: #{map.get($docked-theme, date-today-container-outline-width)};
    --date-today-label-text-color: #{map.get($docked-theme, date-today-label-text-color)};
    --date-selected-container-color: #{map.get($docked-theme, date-selected-container-color)};
    --date-selected-label-text-color: #{map.get($docked-theme, date-selected-label-text-color)};
    --date-selected-hover-state-layer-color: #{map.get($docked-theme, date-selected-hover-state-layer-color)};
    --weekdays-label-text-color: #{map.get($docked-theme, weekdays-label-text-color)};
    --weekdays-label-text-font: #{map.get($docked-theme, weekdays-label-text-font)};
    --weekdays-label-text-line-height: #{map.get($docked-theme, weekdays-label-text-line-height)};
    --weekdays-label-text-size: #{map.get($docked-theme, weekdays-label-text-size)};
    --weekdays-label-text-tracking: #{map.get($docked-theme, weekdays-label-text-tracking)};
    --weekdays-label-text-weight: #{map.get($docked-theme, weekdays-label-text-weight)};
    --menu-button-container-shape: #{map.get($docked-theme, menu-button-container-shape)};
    --menu-button-hover-state-layer-color: #{map.get($docked-theme, menu-button-hover-state-layer-color)};
    --menu-button-hover-state-layer-opacity: #{map.get($docked-theme, menu-button-hover-state-layer-opacity)};
    --menu-button-focus-state-layer-color: #{map.get($docked-theme, menu-button-focus-state-layer-color)};
    --menu-button-focus-state-layer-opacity: #{map.get($docked-theme, menu-button-focus-state-layer-opacity)};
    --menu-button-disabled-label-text-opacity: #{map.get($docked-theme, menu-button-disabled-label-text-opacity)};
    --menu-list-item-container-height: #{map.get($docked-theme, menu-list-item-container-height)};
    --menu-list-item-label-text-color: #{map.get($docked-theme, menu-list-item-label-text-color)};
    --menu-list-item-label-text-font: #{map.get($docked-theme, menu-list-item-label-text-font)};
    --menu-list-item-hover-state-layer-color: #{map.get($docked-theme, menu-list-item-hover-state-layer-color)};
    --menu-list-item-hover-state-layer-opacity: #{map.get($docked-theme, menu-list-item-hover-state-layer-opacity)};
    --menu-list-item-focus-state-layer-color: #{map.get($docked-theme, menu-list-item-focus-state-layer-color)};
    --menu-list-item-focus-state-layer-opacity: #{map.get($docked-theme, menu-list-item-focus-state-layer-opacity)};
    --menu-list-item-label-text-size: #{map.get($docked-theme, menu-list-item-label-text-size)};
    --menu-list-item-label-text-weight: #{map.get($docked-theme, menu-list-item-label-text-weight)};
    --menu-list-item-selected-container-color: #{map.get($docked-theme, menu-list-item-selected-container-color)};
    --menu-list-item-selected-leading-icon-size: #{map.get($docked-theme, menu-list-item-selected-leading-icon-size)};
    --range-selection-active-indicator-container-color: #{map.get($modal-theme, range-selection-active-indicator-container-color)};
    --range-selection-active-indicator-container-height: #{map.get($docked-theme, date-container-height)};
    --range-selection-date-in-range-label-text-color: #{map.get($modal-theme, range-selection-date-in-range-label-text-color)};
    box-shadow: elevation.resolve-box-shadow(map.get($docked-theme, container-elevation), map.get($sys-color, shadow));
  }

  &--modal {
    --container-color: #{map.get($modal-theme, container-color)};
    --container-shape: #{map.get($modal-theme, container-shape)};
    --container-width: #{map.get($modal-theme, container-width)};
    --date-container-width: #{map.get($modal-theme, date-container-width)};
    --date-container-height: #{map.get($modal-theme, date-container-height)};
    --date-grid-column-width: #{map.get($docked-theme, date-container-width)};
    --date-grid-row-height: #{map.get($docked-theme, date-container-height)};
    --date-state-layer-width: #{map.get($modal-theme, date-state-layer-width)};
    --date-state-layer-height: #{map.get($modal-theme, date-state-layer-height)};
    --date-state-layer-shape: #{map.get($modal-theme, date-state-layer-shape)};
    --date-container-shape: #{map.get($modal-theme, date-container-shape)};
    --modal-menu-button-label-text-color: #{map.get($modal-theme, range-selection-month-subhead-color)};
    --date-label-text-font: #{map.get($modal-theme, date-label-text-font)};
    --date-label-text-line-height: #{map.get($modal-theme, date-label-text-line-height)};
    --date-label-text-size: #{map.get($modal-theme, date-label-text-size)};
    --date-label-text-tracking: #{map.get($modal-theme, date-label-text-tracking)};
    --date-label-text-weight: #{map.get($modal-theme, date-label-text-weight)};
    --date-unselected-label-text-color: #{map.get($modal-theme, date-unselected-label-text-color)};
    --date-unselected-hover-state-layer-color: #{map.get($modal-theme, date-unselected-hover-state-layer-color)};
    --date-hover-state-layer-opacity: #{map.get($modal-theme, date-hover-state-layer-opacity)};
    --date-today-container-outline-color: #{map.get($modal-theme, date-today-container-outline-color)};
    --date-today-container-outline-width: #{map.get($modal-theme, date-today-container-outline-width)};
    --date-today-label-text-color: #{map.get($modal-theme, date-today-label-text-color)};
    --date-selected-container-color: #{map.get($modal-theme, date-selected-container-color)};
    --date-selected-label-text-color: #{map.get($modal-theme, date-selected-label-text-color)};
    --date-selected-hover-state-layer-color: #{map.get($modal-theme, date-selected-hover-state-layer-color)};
    --date-unselected-outside-month-label-text-color: #{map.get($modal-theme, date-unselected-outside-month-label-text-color)};
    --weekdays-label-text-color: #{map.get($modal-theme, weekdays-label-text-color)};
    --weekdays-label-text-font: #{map.get($modal-theme, weekdays-label-text-font)};
    --weekdays-label-text-line-height: #{map.get($modal-theme, weekdays-label-text-line-height)};
    --weekdays-label-text-size: #{map.get($modal-theme, weekdays-label-text-size)};
    --weekdays-label-text-tracking: #{map.get($modal-theme, weekdays-label-text-tracking)};
    --weekdays-label-text-weight: #{map.get($modal-theme, weekdays-label-text-weight)};
    --menu-button-container-shape: #{map.get($docked-theme, menu-button-container-shape)};
    --menu-button-hover-state-layer-color: #{map.get($docked-theme, menu-button-hover-state-layer-color)};
    --menu-button-hover-state-layer-opacity: #{map.get($docked-theme, menu-button-hover-state-layer-opacity)};
    --menu-button-focus-state-layer-color: #{map.get($docked-theme, menu-button-focus-state-layer-color)};
    --menu-button-focus-state-layer-opacity: #{map.get($docked-theme, menu-button-focus-state-layer-opacity)};
    --menu-button-disabled-label-text-opacity: #{map.get($docked-theme, menu-button-disabled-label-text-opacity)};
    --menu-list-item-container-height: #{map.get($docked-theme, menu-list-item-container-height)};
    --menu-list-item-label-text-color: #{map.get($docked-theme, menu-list-item-label-text-color)};
    --menu-list-item-label-text-font: #{map.get($docked-theme, menu-list-item-label-text-font)};
    --menu-list-item-hover-state-layer-color: #{map.get($docked-theme, menu-list-item-hover-state-layer-color)};
    --menu-list-item-hover-state-layer-opacity: #{map.get($docked-theme, menu-list-item-hover-state-layer-opacity)};
    --menu-list-item-focus-state-layer-color: #{map.get($docked-theme, menu-list-item-focus-state-layer-color)};
    --menu-list-item-focus-state-layer-opacity: #{map.get($docked-theme, menu-list-item-focus-state-layer-opacity)};
    --menu-list-item-label-text-size: #{map.get($docked-theme, menu-list-item-label-text-size)};
    --menu-list-item-label-text-weight: #{map.get($docked-theme, menu-list-item-label-text-weight)};
    --menu-list-item-selected-container-color: #{map.get($docked-theme, menu-list-item-selected-container-color)};
    --menu-list-item-selected-leading-icon-size: #{map.get($docked-theme, menu-list-item-selected-leading-icon-size)};
    --modal-header-headline-color: #{map.get($modal-theme, header-headline-color)};
    --modal-header-headline-font: #{map.get($modal-theme, header-headline-font)};
    --modal-header-headline-size: #{map.get($modal-theme, header-headline-size)};
    --modal-header-headline-weight: #{map.get($modal-theme, header-headline-weight)};
    --modal-header-headline-tracking: #{map.get($modal-theme, header-headline-tracking)};
    --modal-header-headline-line-height: #{map.get($modal-theme, header-headline-line-height)};
    --modal-header-supporting-text-color: #{map.get($modal-theme, header-supporting-text-color)};
    --modal-header-supporting-text-font: #{map.get($modal-theme, header-supporting-text-font)};
    --modal-header-supporting-text-size: #{map.get($modal-theme, header-supporting-text-size)};
    --modal-header-supporting-text-weight: #{map.get($modal-theme, header-supporting-text-weight)};
    --modal-header-supporting-text-tracking: #{map.get($modal-theme, header-supporting-text-tracking)};
    --modal-header-supporting-text-line-height: #{map.get($modal-theme, header-supporting-text-line-height)};
    --year-selection-year-container-width: #{map.get($modal-theme, year-selection-year-container-width)};
    --year-selection-year-container-height: #{map.get($modal-theme, year-selection-year-container-height)};
    --year-selection-year-state-layer-width: #{map.get($modal-theme, year-selection-year-state-layer-width)};
    --year-selection-year-state-layer-height: #{map.get($modal-theme, year-selection-year-state-layer-height)};
    --year-selection-year-state-layer-shape: #{map.get($modal-theme, year-selection-year-state-layer-shape)};
    --year-selection-year-label-text-font: #{map.get($modal-theme, year-selection-year-label-text-font)};
    --year-selection-year-label-text-line-height: #{map.get($modal-theme, year-selection-year-label-text-line-height)};
    --year-selection-year-label-text-size: #{map.get($modal-theme, year-selection-year-label-text-size)};
    --year-selection-year-label-text-tracking: #{map.get($modal-theme, year-selection-year-label-text-tracking)};
    --year-selection-year-label-text-weight: #{map.get($modal-theme, year-selection-year-label-text-weight)};
    --year-selection-year-unselected-label-text-color: #{map.get($modal-theme, year-selection-year-unselected-label-text-color)};
    --year-selection-year-unselected-hover-state-layer-color: #{map.get($modal-theme, year-selection-year-unselected-hover-state-layer-color)};
    --year-selection-year-unselected-hover-state-layer-opacity: #{map.get($modal-theme, year-selection-year-hover-state-layer-opacity)};
    --year-selection-year-unselected-focus-state-layer-color: #{map.get($modal-theme, year-selection-year-unselected-focus-state-layer-color)};
    --year-selection-year-unselected-focus-state-layer-opacity: #{map.get($modal-theme, year-selection-year-focus-state-layer-opacity)};
    --year-selection-year-selected-container-color: #{map.get($modal-theme, year-selection-year-selected-container-color)};
    --year-selection-year-selected-label-text-color: #{map.get($modal-theme, year-selection-year-selected-label-text-color)};
    --range-selection-active-indicator-container-color: #{map.get($modal-theme, range-selection-active-indicator-container-color)};
    --range-selection-active-indicator-container-height: #{map.get($modal-theme, range-selection-active-indicator-container-height)};
    --range-selection-date-in-range-label-text-color: #{map.get($modal-theme, range-selection-date-in-range-label-text-color)};
    min-width: var(--container-width);
  }

  &__body {
    background-color: var(--container-color);
    min-height: 0;
    padding: 0 0 8px;
  }

  &__body--input {
    min-height: 0;
  }

  &__calendar-shell,
  &__calendar-view {
    flex: 1 0 auto;
  }

  &__calendar-shell {
    display: flex;
    flex-direction: column;
    min-height: 336px;
  }

  &__calendar-view {
    min-height: 288px;
  }

  &__divider {
    background-color: #{map.get($divider-theme, color)};
    height: #{map.get($divider-theme, thickness)};
    width: 100%;
  }

  &__modal-header {
    align-items: center;
    display: flex;
    gap: 8px;
    justify-content: space-between;
    padding: 16px 12px 10px 24px;
  }

  &__modal-copy {
    flex: 1;
    min-width: 0;
  }

  &__modal-supporting {
    color: var(--modal-header-supporting-text-color, #{map.get($modal-theme, header-supporting-text-color)});
    font-family: var(--modal-header-supporting-text-font, #{map.get($modal-theme, header-supporting-text-font)});
    font-size: var(--modal-header-supporting-text-size, #{map.get($modal-theme, header-supporting-text-size)});
    font-weight: var(--modal-header-supporting-text-weight, #{map.get($modal-theme, header-supporting-text-weight)});
    letter-spacing: var(--modal-header-supporting-text-tracking, #{map.get($modal-theme, header-supporting-text-tracking)});
    line-height: var(--modal-header-supporting-text-line-height, #{map.get($modal-theme, header-supporting-text-line-height)});
    margin-bottom: 16px;
  }

  &__modal-headline {
    color: var(--modal-header-headline-color, #{map.get($modal-theme, header-headline-color)});
    font-family: var(--modal-header-headline-font, #{map.get($modal-theme, header-headline-font)});
    font-size: var(--modal-header-headline-size, #{map.get($modal-theme, header-headline-size)});
    font-weight: var(--modal-header-headline-weight, #{map.get($modal-theme, header-headline-weight)});
    letter-spacing: var(--modal-header-headline-tracking, #{map.get($modal-theme, header-headline-tracking)});
    line-height: var(--modal-header-headline-line-height, #{map.get($modal-theme, header-headline-line-height)});
  }

  &__modal-toggle {
    flex: 0 0 auto;
    height: #{map.get($docked-theme, date-container-height)};
    margin: 0;
    width: #{map.get($docked-theme, date-container-width)};
  }

  &__input-panel {
    padding: 16px 24px;
  }

  &__field-icon-button {
    align-items: center;
    background: transparent;
    border: none;
    color: inherit;
    cursor: pointer;
    display: inline-flex;
    height: 24px;
    justify-content: center;
    padding: 0;
    width: 24px;
  }

  &__actions {
    display: flex;
    gap: 8px;
    justify-content: flex-end;
    padding: 8px 12px 12px;
    width: 100%;
  }

  &--input {
    --container-width: #{map.get($date-input-theme, container-width)};
    --modal-header-headline-color: #{map.get($date-input-theme, header-headline-color)};
    --modal-header-headline-font: #{map.get($date-input-theme, header-headline-font)};
    --modal-header-headline-size: #{map.get($date-input-theme, header-headline-size)};
    --modal-header-headline-weight: #{map.get($date-input-theme, header-headline-weight)};
    --modal-header-headline-tracking: #{map.get($date-input-theme, header-headline-tracking)};
    --modal-header-headline-line-height: #{map.get($date-input-theme, header-headline-line-height)};
    --modal-header-supporting-text-color: #{map.get($date-input-theme, header-supporting-text-color)};
    --modal-header-supporting-text-font: #{map.get($date-input-theme, header-supporting-text-font)};
    --modal-header-supporting-text-size: #{map.get($date-input-theme, header-supporting-text-size)};
    --modal-header-supporting-text-weight: #{map.get($date-input-theme, header-supporting-text-weight)};
    --modal-header-supporting-text-tracking: #{map.get($date-input-theme, header-supporting-text-tracking)};
    --modal-header-supporting-text-line-height: #{map.get($date-input-theme, header-supporting-text-line-height)};
    width: var(--container-width);
  }

  &--input .md-date-picker__modal-header {
    padding: 16px 24px 10px;
  }

  &--input .md-date-picker__input-panel {
    padding: 16px 24px 16px;
  }

  &--input .md-date-picker__actions {
    padding: 8px 16px 12px;
  }

  .fade-grow-enter-active,
  .fade-grow-leave-active {
    transition: opacity #{map.get($motion, duration-medium2)} #{map.get($motion, easing-standard)}, transform #{map.get($motion, duration-medium2)} #{map.get($motion, easing-standard)};
  }

  .fade-grow-enter-from,
  .fade-grow-leave-to {
    opacity: 0;
    transform: scale(0.98);
  }

  .fade-slide-right-enter-active,
  .fade-slide-right-leave-active,
  .fade-slide-left-enter-active,
  .fade-slide-left-leave-active {
    transition: transform #{map.get($motion, duration-medium2)} #{map.get($motion, easing-emphasized)}, opacity #{map.get($motion, duration-medium2)} #{map.get($motion, easing-standard)};
  }

  .fade-slide-right-enter-from,
  .fade-slide-left-leave-to {
    opacity: 0;
    transform: translateX(24px);
  }

  .fade-slide-right-leave-to,
  .fade-slide-left-enter-from {
    opacity: 0;
    transform: translateX(-24px);
  }
}
</style>
