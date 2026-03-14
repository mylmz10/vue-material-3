<template>
  <div class="md-date-picker-date-table">
    <transition :name="tableTransitionName" mode="out-in">
      <div class="md-date-picker-date-table__grid" :key="props.year + '-' + props.month">
        <div class="md-date-picker-date-table__header">
          <div v-for="weekDay in weekDays" class="md-date-picker-date-table__weekday-item">
            {{ weekDay }}
          </div>
        </div>
        <div class="md-date-picker-date-table__days">
          <button v-for="day in flatDays" :key="day.day" class="md-date-picker-date-table__date-item" :class="{
            'md-date-picker-date-table__date-item--current-month': day.isCurrentMonth,
            'md-date-picker-date-table__date-item--today': day.isCurrentDay,
            'md-date-picker-date-table__date-item--selected': day.isCurrentMonth && day.isPickerDay,
          }" @click="setDay(day)">
            <div class="date-item__state-layer"></div>
            <span v-if="day.isCurrentMonth">{{ day.day }}</span>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import dayjs from 'dayjs';

const emit = defineEmits(['input', 'update:day']);

const props = defineProps({
  modelValue: {
    type: String,
    default: '2023-02-03',
  },
  locale: {
    type: String,
    default: 'tr-TR',
  },
  format: {
    type: String,
    default: 'YYYY-MM-DD', // Provide a default format
  },
  month: {
    type: Number,
  },
  year: {
    type: Number,
  },
  direction: {
    type: String,
    default: 'right'
  }
});

const tableTransitionName = computed(() => {
  return props.direction === 'left' ? 'fade-slide-left' : 'fade-slide-right';
});

const pickerDate = ref(props.modelValue);

const now = dayjs().locale(props.locale);

const weekDays = computed(() => {
  const dateFormat = 'dddd';
  const days = [];
  for (let i = 0; i < 7; i++) {
    days.push(now.weekday(i).format(dateFormat)[0]);
  }
  return days;
});

const changePickerDay = (value) => {
  pickerDate.value = dayjs(pickerDate.value).locale(props.locale).date(value).format(props.format);
};

const currentMonth = computed(() => {
  return dayjs(pickerDate.value).year(props.year).month(props.month).locale(props.locale);
});

const setDay = (weekDay) => {
  const { day, isCurrentMonth } = weekDay;
  if (isCurrentMonth === false) return;
  pickerDate.value = dayjs()
    .year(props.year)
    .month(props.month)
    .date(day)
    .locale(props.locale)
    .format(props.format);
  emit('update:day', day);
};

const formatDateObject = (date) => {
  const clonedObject = { ...date.toObject() };
  return {
    day: clonedObject.date,
    month: clonedObject.months,
    year: clonedObject.years,
    isCurrentMonth: clonedObject.months === currentMonth.value.month(),
    isCurrentDay: date.isToday(),
    isPickerDay: date.isSame(pickerDate.value, 'day') && date.isSame(pickerDate.value, 'month') && date.isSame(pickerDate.value, 'year'),
    isCurrentYear: date.year() === currentMonth.value.year(), // Fix isCurrentYear logic
  };
};

const getAllDays = computed(() => {
  let currentDate = currentMonth.value.startOf('month').weekday(0);
  const nextMonth = currentMonth.value.add(1, 'month').month();
  let allDates = [];

  while (currentDate.weekday(0).toObject().months !== nextMonth) {
    const formatted = formatDateObject(currentDate);
    allDates.push(formatted);
    currentDate = currentDate.add(1, 'day');
  }

  // Group days into weeks for weekCount calculation
  return Array.from({ length: Math.ceil(allDates.length / 7) }, (_, i) =>
    ({ dates: allDates.slice(i * 7, (i + 1) * 7) })
  );
});

const flatDays = computed(() => {
  return getAllDays.value.flatMap(week => week.dates);
});

const weekCount = computed(() => {
  return getAllDays.value.length;
});

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== undefined && newValue !== null) {
      changePickerDay(dayjs(newValue).date());
    }
  },
  { immediate: true }
);

defineExpose({
  weekCount,
})
</script>

<style lang="scss">
@use 'sass:map';
@use '../../styles/tokens';

$theme: tokens.md-comp-date-picker-docked-values();

.md-date-picker-date-table {
  padding: 0 12px;
  width: 100%;

  &__grid {
    display: flex;
    flex-direction: column;
    height: calc(var(--week-count) * var(--date-container-height) + var(--date-container-height));
  }

  &__header {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    width: 100%;
  }

  &__days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-auto-rows: var(--date-container-height);
    flex: 1;
  }

  &__weekday-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--date-container-height);
    font-family: var(--date-label-text-font);
    line-height: var(--date-label-text-line-height);
    font-size: var(--date-label-text-size);
    letter-spacing: var(--date-label-text-tracking);
    font-weight: var(--date-label-text-weight);
  }

  &__date-item {
    width: var(--date-container-width);
    height: var(--date-container-height);
    border-radius: var(--date-container-shape);
    background: none;
    border: none;
    position: relative;
    overflow: hidden;
    color: var(--date-unselected-label-text-color);

    font-family: var(--date-label-text-font);
    line-height: var(--date-label-text-line-height);
    font-size: var(--date-label-text-size);
    letter-spacing: var(--date-label-text-tracking);
    font-weight: var(--date-label-text-weight);

    .date-item__state-layer {
      position: absolute;
      inset: 0;
      opacity: var(--date-hover-state-layer-opacity);
      pointer-events: none;
    }

    transform-origin: center;
    transform: scale(1);
    transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform;

    &:active {
      transform: scale(0.8);
      transition-duration: 100ms;
    }

    cursor: default;

    &--current-month:hover {
      cursor: pointer;

      .date-item__state-layer {
        position: absolute;
        inset: 0;
        background-color: var(--date-unselected-hover-state-layer-color);
      }
    }

    &--today {
      border-style: solid;
      border-color: var(--date-today-container-outline-color);
      border-width: var(--date-today-container-outline-width);
      color: var(--date-today-label-text-color);

      &:hover {
        .date-item__state-layer {
          background-color: var(--date-today-hover-state-layer-color);
        }
      }
    }

    &--selected {
      background-color: var(--date-selected-container-color);
      color: var(--date-selected-label-text-color);

      &:hover {
        .date-item__state-layer {
          background-color: var(--date-selected-hover-state-layer-color);
        }
      }

      &:active {
        .date-item__state-layer {
          background-color: var(--date-selected-pressed-state-layer-color);
        }
      }
    }
  }
}
</style>
