<template>
  <div class="md-date-picker" :style="{ '--week-count': currentWeekCount }">
    <MdDatePickerHeader :modelValue="modelValue" :docked="false" :locale="locale" v-model:month="selectedMonth"
      v-model:year="selectedYear" :show-months="showMonths" :show-years="showYears" @showMonths="showMonths = $event"
      @showYears="showYears = $event" @direction="direction = $event" />

    <div class="md-date-picker__content">
      <transition-group :name="tableTransitionName">
        <MdDatePickerDateTable v-for="monthOffset in [-1, 0, 1]" :key="getMonthKey(monthOffset)" :format="format"
          :modelValue="modelValue" :month="getOffsetMonth(monthOffset)" :year="getOffsetYear(monthOffset)"
          :direction="direction" :ref="el => monthOffset === 0 && (currentTable = el)" :class="{
            'md-date-picker__table--current': monthOffset === 0,
            'md-date-picker__table--prev': monthOffset === -1,
            'md-date-picker__table--next': monthOffset === 1
          }" />
      </transition-group>
    </div>

    <div class="md-date-picker__actions">
      <MdTextButton>Cancel</MdTextButton>
      <MdTextButton @click="setDate">OK</MdTextButton>
    </div>

    <transition name="fade-grow">
      <MdDatePickerList v-if="showMonths" :modelValue="selectedMonth" type="month" :locale="locale"
        @input="updateMonth" />
    </transition>
    <transition name="fade-grow">
      <MdDatePickerList v-if="showYears" :modelValue="selectedYear" type="year" @input="updateYear" />
    </transition>
    <MdElevationOverlay />
  </div>
</template>

<script setup>
import { ref, watch, defineEmits, computed } from 'vue';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import weekday from 'dayjs/plugin/weekday';
import toObject from 'dayjs/plugin/toObject';
import isToday from 'dayjs/plugin/isToday';
import localeData from 'dayjs/plugin/localeData';
import MdDatePickerDateTable from './MdDatePickerDateTable.vue';
import MdDatePickerHeader from './MdDatePickerHeader.vue';
import MdTextButton from '../button/MdTextButton.vue';
import MdDatePickerList from './MdDatePickerList.vue';
import MdElevationOverlay from '../elevation/MdElevationOverlay.vue';

import 'dayjs/locale/tr';
import 'dayjs/locale/en';

dayjs.extend(localeData);
dayjs.extend(calendar);
dayjs.extend(weekday);
dayjs.extend(toObject);
dayjs.extend(isToday);

window.dayjs = dayjs;


const emit = defineEmits(['update:modelValue']);

const { modelValue, locale, docked, format } = defineProps({
  modelValue: {
    type: String,
    default: '2025-10-06',
  },
  locale: {
    type: String,
    default: 'en-US',
  },
  docked: {
    type: Boolean,
    default: true,
  },
  format: {
    type: String,
    default: 'YYYY-MM-DD',
  },
});


const showMonths = ref(false);
const showYears = ref(false);
const currentTable = ref(null);
const direction = ref('right');

const currentWeekCount = computed(() => {
  return currentTable.value?.weekCount || 4;
});

const selectedDay = ref(dayjs(modelValue).date());
const selectedMonth = ref(dayjs(modelValue).month());
const selectedYear = ref(dayjs(modelValue).year());

const tableTransitionName = computed(() => {
  return direction.value === 'left' ? 'fade-slide-left' : 'fade-slide-right';
});

const getOffsetMonth = (offset) => {
  let month = selectedMonth.value + offset;
  let yearOffset = 0;

  if (month < 0) {
    month = 11;
    yearOffset = -1;
  } else if (month > 11) {
    month = 0;
    yearOffset = 1;
  }

  return month;
};

const getOffsetYear = (offset) => {
  let month = selectedMonth.value + offset;
  let yearOffset = 0;

  if (month < 0) {
    yearOffset = -1;
  } else if (month > 11) {
    yearOffset = 1;
  }

  return selectedYear.value + yearOffset;
};

const getMonthKey = (offset) => {
  return `${getOffsetYear(offset)}-${getOffsetMonth(offset)}`;
};

const updateMonth = (value) => {
  selectedMonth.value = value;
  showMonths.value = false;
};
const updateYear = (value) => {
  selectedYear.value = value;
  showYears.value = false;
};

const updateDay = (value) => {
  selectedDay.value = value;
};

const setDate = () => {
  const newDate = dayjs()
    .year(selectedYear.value)
    .month(selectedMonth.value)
    .date(1)
    .date(selectedDay.value)
    .format(format);
  console.log(newDate)
  emit('update:modelValue', newDate);
};


watch(
  () => modelValue,
  (newValue) => {
    selectedDay.value = dayjs(newValue).date();
    selectedMonth.value = dayjs(newValue).month();
    selectedYear.value = dayjs(newValue).year();
  },
  { immediate: true }
);
</script>

<style lang="scss">
@use 'sass:map';
@use '../../styles/tokens';

$theme: tokens.md-comp-date-picker-docked-values();

.md-date-picker {
  --date-container-width: #{map.get($theme, date-container-width)};
  --date-container-height: #{map.get($theme, date-container-height)};
  --date-container-shape: #{map.get($theme, date-container-shape)};
  --container-width: #{map.get($theme, container-width)};
  --container-height: #{map.get($theme, container-height)};
  --container-shape: #{map.get($theme, container-shape)};
  --container-color: #{map.get($theme, container-color)};
  --date-unselected-label-text-color: #{map.get($theme, date-unselected-label-text-color)};
  --date-label-text-font: #{map.get($theme, date-label-text-font)};
  --date-label-text-line-height: #{map.get($theme, date-label-text-line-height)};
  --date-label-text-size: #{map.get($theme, date-label-text-size)};
  --date-label-text-tracking: #{map.get($theme, date-label-text-tracking)};
  --date-label-text-type: #{map.get($theme, date-label-text-type)};
  --date-label-text-weight: #{map.get($theme, date-label-text-weight)};
  --date-unselected-hover-state-layer-color: #{map.get($theme, date-unselected-hover-state-layer-color)};
  --date-hover-state-layer-opacity: #{map.get($theme, date-hover-state-layer-opacity)};
  --date-today-container-outline-color: #{map.get($theme, date-today-container-outline-color)};
  --date-today-container-outline-width: #{map.get($theme, date-today-container-outline-width)};
  --date-today-label-text-color: #{map.get($theme, date-today-label-text-color)};
  --date-today-hover-state-layer-color: #{map.get($theme, date-today-hover-state-layer-color)};
  --date-selected-container-color: #{map.get($theme, date-selected-container-color)};
  --date-selected-label-text-color: #{map.get($theme, date-selected-label-text-color)};
  --date-selected-hover-state-layer-color: #{map.get($theme, date-selected-hover-state-layer-color)};
  --date-selected-pressed-state-layer-color: #{map.get($theme, date-selected-pressed-state-layer-color)};

  --overlay-z-index: 1;
  --overlay-opacity: 0.12;
  --surface-tint-layer-color: #{map.get($theme, container-surface-tint-layer-color)};

  overflow: hidden;
  width: var(--container-width);
  border-radius: var(--container-shape);
  background-color: var(--container-color);
  position: relative;

  &__content {
    position: relative;
    width: 100%;
    overflow: hidden;
    min-height: calc(calc(var(--week-count) + 1) * var(--date-container-height));
    padding-bottom: 10px;
    box-sizing: content-box;

    .md-date-picker-date-table {
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
      transition: transform 0.3s ease-out;

      &.md-date-picker__table--prev {
        transform: translateX(-100%);
      }

      &.md-date-picker__table--next {
        transform: translateX(100%);
      }

      &.md-date-picker__table--current {
        transform: translateX(0);
      }
    }
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    padding: 8px;
  }

  .fade-slide-right-move,
  .fade-slide-left-move {
    transition: transform 0.3s ease-out;
  }

  .fade-slide-right-enter-active,
  .fade-slide-left-enter-active {
    transition: all 0.3s ease-out;
    position: absolute;
    width: 100%;
  }

  .fade-slide-right-leave-active,
  .fade-slide-left-leave-active {
    transition: all 0.3s ease-out;
    position: absolute;
    width: 100%;
  }

  .fade-slide-right-enter-from {
    opacity: 0;
    transform: translateX(100%);
  }

  .fade-slide-right-leave-to {
    opacity: 0;
    transform: translateX(-100%);
  }

  .fade-slide-left-enter-from {
    opacity: 0;
    transform: translateX(-100%);
  }

  .fade-slide-left-leave-to {
    opacity: 0;
    transform: translateX(100%);
  }
}
</style>
