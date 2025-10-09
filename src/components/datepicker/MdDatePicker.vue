<template>
  <div class="md-date-picker">
    <MdDatePickerHeader :modelValue="modelValue" :docked="false" :locale="locale" v-model:month="selectedMonth"
      v-model:year="selectedYear" :show-months="showMonths" :show-years="showYears" @showMonths="showMonths = $event"
      @showYears="showYears = $event" @direction="direction = $event" />
    <MdDatePickerDateTable
      ref="dateTable"
      :format="format"
      :modelValue="modelValue"
      v-model:day="selectedDay"
      :month="selectedMonth"
      :year="selectedYear"
      :direction="direction"
      :key="selectedYear + '-' + selectedMonth"
    />
    <div class="md-date-picker__actions">
      <MdTextButton>Cancel</MdTextButton>
      <MdTextButton @click="setDate">OK</MdTextButton>
    </div>
    <transition name="fade-grow">
      <MdDatePickerList v-if="showMonths" :modelValue="selectedMonth" type="month" :locale="locale" @input="updateMonth" />
    </transition>
    <transition name="fade-grow">
      <MdDatePickerList v-if="showYears" :modelValue="selectedYear" type="year" @input="updateYear" />
    </transition>
  </div>
</template>

<script setup>
import { ref, watch, defineEmits } from 'vue';
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
const dateTable = ref(null);
const direction = ref('right');

const selectedDay = ref(dayjs(modelValue).date());
const selectedMonth = ref(dayjs(modelValue).month());
const selectedYear = ref(dayjs(modelValue).year());

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

  // Takvim tablosu için fade+slide animasyonu
  .fade-slide-right-enter-active,
  .fade-slide-right-leave-active,
  .fade-slide-left-enter-active,
  .fade-slide-left-leave-active {
    transition: opacity 0.25s cubic-bezier(0.4,0,0.2,1),
                transform 0.25s cubic-bezier(0.4,0,0.2,1);
    will-change: opacity, transform;
    position: relative;
    z-index: 1;
  }
  .fade-slide-right-enter-from,
  .fade-slide-left-leave-to {
    opacity: 0;
    transform: translateX(32px);
  }
  .fade-slide-right-leave-to,
  .fade-slide-left-enter-from {
    opacity: 0;
    transform: translateX(-32px);
  }
  .fade-slide-right-enter-to,
  .fade-slide-right-leave-from,
  .fade-slide-left-enter-to,
  .fade-slide-left-leave-from {
    opacity: 1;
    transform: translateX(0);
  }
  
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

  width: var(--container-width);
  //height: var(--container-height);
  border-radius: var(--container-shape);
  background-color: var(--container-color);
  position: relative;
  overflow: hidden;

  &__actions {
    display: flex;
    justify-content: flex-end;
    padding: 8px;
  }

  // Fade + grow transition for date picker list
  .fade-grow-enter-active,
  .fade-grow-leave-active {
    transition: opacity 0.25s cubic-bezier(0.4,0,0.2,1),
                transform 0.25s cubic-bezier(0.4,0,0.2,1);
    will-change: opacity, transform;
  }
  .fade-grow-enter-from,
  .fade-grow-leave-to {
    opacity: 0;
    transform: translateY(-16px) scaleY(0.95);
  }
  .fade-grow-enter-to,
  .fade-grow-leave-from {
    opacity: 1;
    transform: translateY(0) scaleY(1);
  }
}
</style>
