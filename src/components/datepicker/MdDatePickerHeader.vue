<template>
  <div class="md-date-picker-header" :class="{ 'md-date-picker-header--docked': docked }">
    <template v-if="docked">
      <div class="md-date-picker-header__value">
        <span>{{ monthLongName }} {{ year }}</span>
        <MdIcon>arrow_drop_down</MdIcon>
      </div>
      <MdIconButton icon="chevron_left" />
      <MdIconButton icon="chevron_right" />
    </template>
    <template v-else>
      <div>
        <MdIconButton v-if="!showYears" icon="chevron_left" @click="onPrevMonthClick" />
        <div class="md-date-picker-header__value" :class="{ 'md-date-picker-header__value--disabled': showYears }"
          @click="$emit('showMonths', !showMonths)">
          <span>{{ monthShortName }}</span>
          <MdIcon>arrow_drop_down</MdIcon>
        </div>
        <MdIconButton v-if="!showYears" icon="chevron_right" @click="onNextMonthClick" />
      </div>
      <div>
        <MdIconButton v-if="!showMonths" icon="chevron_left" @click="onPrevYearClick" />
        <div class="md-date-picker-header__value" :class="{ 'md-date-picker-header__value--disabled': showMonths }"
          @click="$emit('showYears', !showYears)">
          <span>{{ year }}</span>
          <MdIcon>arrow_drop_down</MdIcon>
        </div>
        <MdIconButton v-if="!showMonths" icon="chevron_right" @click="onNextYearClick" />
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import dayjs from 'dayjs';
import MdIconButton from '../icon-button/MdIconButton.vue';
import MdIcon from '../icon/MdIcon.vue';

const props = defineProps({
  modelValue: {
    type: String,
  },
  locale: {
    type: String,
    default: 'tr-TR',
  },
  docked: {
    type: Boolean,
    default: true,
  },
  month: {
    type: Number,
  },
  year: {
    type: Number,
  },
  showMonths: {
    type: Boolean,
    default: false,
  },
  showYears: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:month', 'update:year', 'showYears', 'showMonths', 'direction']);

const monthShortName = computed(() => {
  return dayjs(props.modelValue).month(props.month).$d.toLocaleString(props.locale, { month: 'short' });
});

const monthLongName = computed(() => {
  return dayjs(props.modelValue).month(props.month).$d.toLocaleString(props.locale, { month: 'long' });
});

const year = computed(() => {
  return dayjs(props.modelValue).year(props.year).year();
});

const onPrevMonthClick = () => {
  let newMonth = props.month - 1;
  if (newMonth < 0) {
    newMonth = 11;
    emit('update:year', props.year - 1);
  }
  emit('update:month', newMonth);
  emit('direction', 'left');
};
const onNextMonthClick = () => {
  let newMonth = props.month + 1;
  if (newMonth > 11) {
    newMonth = 0;
    emit('update:year', props.year + 1);
  }
  emit('update:month', newMonth);
  emit('direction', 'right');
};

const onPrevYearClick = () => {
  emit('update:year', props.year - 1);
};
const onNextYearClick = () => {
  emit('update:year', props.year + 1);
};
</script>

<style lang="scss">
.md-date-picker-header {
  display: flex;
  height: 56px;
  align-items: center;
  font-size: 14px;

  .md-icon {
    font-size: 18px;
  }

  &:not(&--docked)>div {
    width: 50%;
    display: flex;
  }

  &--docked {
    .md-date-picker-header__value {
      padding-left: 24px;
    }
  }

  &:not(&--docked) {
    .md-date-picker-header__value {
      justify-content: center;
    }
  }

  &__value {
    flex-grow: 1;
    display: flex;
    align-items: center;
    cursor: pointer;

    .md-icon {
      margin-left: 8px;
    }

    &--disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }
}
</style>
