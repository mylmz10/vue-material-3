<template>
  <div class="md-date-picker-date-table" role="grid" :aria-label="ariaLabel">
    <div class="md-date-picker-date-table__header" role="row">
      <div v-for="weekDay in weekDays" :key="weekDay" class="md-date-picker-date-table__weekday-item" role="columnheader">
        {{ weekDay }}
      </div>
    </div>

    <div class="md-date-picker-date-table__days" @mouseleave="$emit('hover-date', null)">
      <div
        v-for="day in days"
        :key="day.iso"
        class="md-date-picker-date-table__day-cell"
        :class="{
          'md-date-picker-date-table__day-cell--range-start': day.isRangeStart,
          'md-date-picker-date-table__day-cell--range-end': day.isRangeEnd,
          'md-date-picker-date-table__day-cell--range-fill': day.isInRange || day.isPreviewInRange,
          'md-date-picker-date-table__day-cell--range-fill-start': day.isRangeStart && !day.isRangeEnd,
          'md-date-picker-date-table__day-cell--range-fill-end': day.isRangeEnd && !day.isRangeStart,
          'md-date-picker-date-table__day-cell--range-single': day.isRangeStart && day.isRangeEnd,
          'md-date-picker-date-table__day-cell--range-preview-end': day.isPreviewRangeEnd,
        }"
        role="gridcell"
        :aria-selected="day.isSelected ? 'true' : 'false'"
      >
        <button
          type="button"
          :data-iso="day.iso"
          class="md-date-picker-date-table__date-item"
          :class="{
            'md-date-picker-date-table__date-item--current-month': day.isCurrentMonth,
            'md-date-picker-date-table__date-item--out-of-month': !day.isCurrentMonth,
            'md-date-picker-date-table__date-item--today': day.isToday,
            'md-date-picker-date-table__date-item--selected': day.isSelected,
            'md-date-picker-date-table__date-item--focused': day.isFocused,
            'md-date-picker-date-table__date-item--in-range': day.isInRange || day.isPreviewInRange,
            'md-date-picker-date-table__date-item--preview-end': day.isPreviewRangeEnd,
          }"
          :disabled="day.isDisabled"
          :tabindex="day.isFocused && !day.isDisabled ? 0 : -1"
          :aria-current="day.isToday ? 'date' : undefined"
          :aria-label="getAriaLabel(day)"
          @click="$emit('select', day.iso)"
          @focus="$emit('focus-date', day.iso)"
          @mouseenter="$emit('hover-date', day.isDisabled ? null : day.iso)"
        >
          <div class="md-date-picker-date-table__state-layer"></div>
          <span>{{ day.label }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { getWeekdayLabels, parseModelValue } from './datePickerUtils';

const props = defineProps({
  ariaLabel: {
    type: String,
    default: 'Calendar',
  },
  days: {
    type: Array,
    default: () => [],
  },
  locale: {
    type: String,
    default: 'en-US',
  },
});

defineEmits(['focus-date', 'hover-date', 'select']);

const weekDays = computed(() => getWeekdayLabels(props.locale));

const getAriaLabel = (day) => {
  const parsedDay = parseModelValue(day.iso);
  const parts = [
    new Intl.DateTimeFormat(props.locale, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(parsedDay.toDate()),
  ];

  if (day.isToday) {
    parts.push('Today');
  }

  if (day.isSelected) {
    parts.push('Selected');
  }

  if (day.isRangeStart && day.isRangeEnd) {
    parts.push('Start and end date');
  } else {
    if (day.isRangeStart) {
      parts.push('Start date');
    }

    if (day.isRangeEnd) {
      parts.push('End date');
    }
  }

  if (day.isInRange || day.isPreviewInRange) {
    parts.push('In selected range');
  }

  if (day.isDisabled) {
    parts.push('Unavailable');
  }

  if (!day.isCurrentMonth) {
    parts.push('Outside current month');
  }

  return parts.join(', ');
};
</script>

<style lang="scss">
@use 'sass:map';
@use '../../styles/tokens';

$theme: tokens.md-comp-date-picker-docked-values();

.md-date-picker-date-table {
  width: 100%;

  &__header,
  &__days {
    display: grid;
    grid-template-columns: repeat(7, var(--date-grid-column-width, var(--date-container-width, #{map.get($theme, date-container-width)})));
    justify-content: center;
  }

  &__header {
    margin-bottom: 4px;
  }

  &__weekday-item {
    align-items: center;
    color: var(--weekdays-label-text-color, #{map.get($theme, weekdays-label-text-color)});
    display: flex;
    font-family: var(--weekdays-label-text-font, #{map.get($theme, weekdays-label-text-font)});
    font-size: var(--weekdays-label-text-size, #{map.get($theme, weekdays-label-text-size)});
    font-weight: var(--weekdays-label-text-weight, #{map.get($theme, weekdays-label-text-weight)});
    height: var(--date-grid-row-height, var(--date-container-height, #{map.get($theme, date-container-height)}));
    justify-content: center;
    letter-spacing: var(--weekdays-label-text-tracking, #{map.get($theme, weekdays-label-text-tracking)});
    line-height: var(--weekdays-label-text-line-height, #{map.get($theme, weekdays-label-text-line-height)});
    text-transform: uppercase;
    width: var(--date-grid-column-width, var(--date-container-width, #{map.get($theme, date-container-width)}));
  }

  &__day-cell {
    align-items: center;
    display: flex;
    height: var(--date-grid-row-height, var(--date-container-height, #{map.get($theme, date-container-height)}));
    justify-content: center;
    position: relative;
    width: var(--date-grid-column-width, var(--date-container-width, #{map.get($theme, date-container-width)}));

    &::before {
      background-color: transparent;
      content: '';
      height: var(--range-selection-active-indicator-container-height, var(--date-container-height, #{map.get($theme, date-container-height)}));
      inset-block-start: 50%;
      inset-inline: 0;
      opacity: 0;
      pointer-events: none;
      position: absolute;
      transform: translateY(-50%);
      transition: opacity 150ms ease;
    }

    &--range-fill::before,
    &--range-fill-start::before,
    &--range-fill-end::before,
    &--range-preview-end::before {
      background-color: var(--range-selection-active-indicator-container-color, #{map.get($theme, date-selected-container-color)});
      opacity: 1;
    }

    &--range-fill-start::before {
      inset-inline-start: 50%;
    }

    &--range-fill-end::before,
    &--range-preview-end::before {
      inset-inline-end: 50%;
    }

    &--range-single::before {
      opacity: 0;
    }
  }

  &__date-item {
    align-items: center;
    background: transparent;
    border: none;
    border-radius: var(--date-state-layer-shape, #{map.get($theme, date-state-layer-shape)});
    box-sizing: border-box;
    color: var(--date-unselected-label-text-color, #{map.get($theme, date-unselected-label-text-color)});
    cursor: pointer;
    display: inline-flex;
    font-family: var(--date-label-text-font, #{map.get($theme, date-label-text-font)});
    font-size: var(--date-label-text-size, #{map.get($theme, date-label-text-size)});
    font-weight: var(--date-label-text-weight, #{map.get($theme, date-label-text-weight)});
    height: var(--date-state-layer-height, #{map.get($theme, date-state-layer-height)});
    justify-content: center;
    letter-spacing: var(--date-label-text-tracking, #{map.get($theme, date-label-text-tracking)});
    line-height: var(--date-label-text-line-height, #{map.get($theme, date-label-text-line-height)});
    padding: 0;
    position: relative;
    z-index: 1;
    transition: background-color 150ms ease, border-color 150ms ease, color 150ms ease, transform 150ms ease;
    width: var(--date-state-layer-width, #{map.get($theme, date-state-layer-width)});

    &:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 2px;
    }

    &:hover:not(:disabled) .md-date-picker-date-table__state-layer {
      opacity: var(--date-hover-state-layer-opacity, #{map.get($theme, date-hover-state-layer-opacity)});
    }

    &:active:not(:disabled) {
      transform: scale(0.96);
    }

    &:disabled {
      cursor: default;
      opacity: 0.38;
    }

    &--out-of-month {
      color: var(--date-unselected-outside-month-label-text-color, #{map.get($theme, date-unselected-outside-month-label-text-color)});
    }

    &--today {
      border: var(--date-today-container-outline-width, #{map.get($theme, date-today-container-outline-width)}) solid var(--date-today-container-outline-color, #{map.get($theme, date-today-container-outline-color)});
      color: var(--date-today-label-text-color, #{map.get($theme, date-today-label-text-color)});
    }

    &--selected {
      background-color: var(--date-selected-container-color, #{map.get($theme, date-selected-container-color)});
      border-color: var(--date-selected-container-color, #{map.get($theme, date-selected-container-color)});
      color: var(--date-selected-label-text-color, #{map.get($theme, date-selected-label-text-color)});
    }

    &--selected .md-date-picker-date-table__state-layer {
      background-color: var(--date-selected-hover-state-layer-color, #{map.get($theme, date-selected-hover-state-layer-color)});
    }

    &--in-range {
      color: var(--range-selection-date-in-range-label-text-color, currentColor);
    }

    &--preview-end {
      border: var(--date-today-container-outline-width, #{map.get($theme, date-today-container-outline-width)}) solid var(--date-today-container-outline-color, #{map.get($theme, date-today-container-outline-color)});
      color: var(--date-today-label-text-color, #{map.get($theme, date-today-label-text-color)});
    }
  }

  &__state-layer {
    background-color: var(--date-unselected-hover-state-layer-color, #{map.get($theme, date-unselected-hover-state-layer-color)});
    border-radius: inherit;
    inset: 0;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    transition: opacity 150ms ease;
  }
}
</style>
