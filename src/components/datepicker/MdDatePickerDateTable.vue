<template>
  {{ direction }}
  <div class="md-date-picker-date-table">
    <transition :name="tableTransitionName" mode="out-in">
      <table :key="props.year + '-' + props.month">
        <thead>
          <tr>
            <th v-for="weekDay in weekDays">
              <span class="md-date-picker-date-table__weekday-item">
                {{ weekDay }}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="week in getAllDays">
            <td v-for="weekDay in week.dates">
              <button class="md-date-picker-date-table__date-item" :class="{
                'md-date-picker-date-table__date-item--current-month': weekDay.isCurrentMonth,
                'md-date-picker-date-table__date-item--today': weekDay.isCurrentDay,
                'md-date-picker-date-table__date-item--selected': weekDay.isCurrentMonth && weekDay.isPickerDay,
              }" @click="setDay(weekDay.day)">
                <div class="date-item__state-layer"></div>
                <span v-if="weekDay.isCurrentMonth">{{ weekDay.day }}</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </transition>
    <MdElevationOverlay />
  </div>
</template>

<script setup>
import { computed, defineEmits, ref, watch } from 'vue';
import dayjs from 'dayjs';
import MdElevationOverlay from '../elevation/MdElevationOverlay.vue';

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

const setDay = (day) => {
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
  let weekDates = [];

  let weekCounter = 1;

  while (currentDate.weekday(0).toObject().months !== nextMonth) {
    const formatted = formatDateObject(currentDate);
    weekDates.push(formatted);
    if (weekCounter === 7) {
      allDates.push({ dates: weekDates });
      weekDates = [];
      weekCounter = 0;
    }
    weekCounter++;
    currentDate = currentDate.add(1, 'day');
  }
  return allDates;
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

.md-date-picker-date-table {
  padding: 0 12px;

  --overlay-z-index: 1;
  --overlay-opacity: 0.12;
  --surface-tint-layer-color: #{map.get($theme, container-surface-tint-layer-color)};

  table {
    width: 100%;

    //height: 100%;
    tbody {
      td {
        text-align: center;
        height: var(--date-container-height);
        padding: 0;
      }
    }
  }

  &__weekday-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--date-container-width);
    height: var(--date-container-height);
    border-radius: var(--date-container-shape);
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
