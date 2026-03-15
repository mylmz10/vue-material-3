<template>
  <div class="md-date-picker-header" :class="`md-date-picker-header--${variant}`">
    <template v-if="variant === 'docked'">
      <div class="md-date-picker-header__group">
        <MdIconButton icon="chevron_left" type="button" :disabled="!canPrevMonth" @click="$emit('prev-month')" />
        <button type="button" class="md-date-picker-header__value" :class="{ 'md-date-picker-header__value--disabled': viewMode === 'years' }" @click="$emit('toggle-months')">
          <span>{{ monthLabel }}</span>
          <MdIcon>arrow_drop_down</MdIcon>
        </button>
        <MdIconButton icon="chevron_right" type="button" :disabled="!canNextMonth" @click="$emit('next-month')" />
      </div>

      <div class="md-date-picker-header__group">
        <MdIconButton icon="chevron_left" type="button" :disabled="!canPrevYear" @click="$emit('prev-year')" />
        <button type="button" class="md-date-picker-header__value" :class="{ 'md-date-picker-header__value--disabled': viewMode === 'months' }" @click="$emit('toggle-years')">
          <span>{{ year }}</span>
          <MdIcon>arrow_drop_down</MdIcon>
        </button>
        <MdIconButton icon="chevron_right" type="button" :disabled="!canNextYear" @click="$emit('next-year')" />
      </div>
    </template>

    <template v-else>
      <button
        type="button"
        class="md-date-picker-header__value md-date-picker-header__value--combined"
        :class="{ 'md-date-picker-header__value--active': viewMode === 'years' }"
        @click="$emit('toggle-years')"
      >
        <span>{{ combinedMonthYearLabel }}</span>
        <MdIcon>{{ viewMode === 'years' ? 'arrow_drop_up' : 'arrow_drop_down' }}</MdIcon>
      </button>
      <div v-if="viewMode !== 'years'" class="md-date-picker-header__group md-date-picker-header__group--trailing">
        <MdIconButton icon="chevron_left" type="button" :disabled="!canPrevMonth" @click="$emit('prev-month')" />
        <MdIconButton icon="chevron_right" type="button" :disabled="!canNextMonth" @click="$emit('next-month')" />
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import MdIconButton from '../icon-button/MdIconButton.vue';
import MdIcon from '../icon/MdIcon.vue';
import { formatMonthLabel, getCombinedMonthYearLabel } from './datePickerUtils';

const props = defineProps({
  canNextMonth: {
    type: Boolean,
    default: true,
  },
  canNextYear: {
    type: Boolean,
    default: true,
  },
  canPrevMonth: {
    type: Boolean,
    default: true,
  },
  canPrevYear: {
    type: Boolean,
    default: true,
  },
  locale: {
    type: String,
    default: 'en-US',
  },
  month: {
    type: Number,
    required: true,
  },
  variant: {
    type: String,
    default: 'modal',
  },
  viewMode: {
    type: String,
    default: 'day',
  },
  year: {
    type: Number,
    required: true,
  },
});

defineEmits(['next-month', 'next-year', 'prev-month', 'prev-year', 'toggle-months', 'toggle-years']);

const monthLabel = computed(() => formatMonthLabel(props.year, props.month, props.locale, { short: props.variant === 'docked' }));
const combinedMonthYearLabel = computed(() => getCombinedMonthYearLabel(props.year, props.month, props.locale));
</script>

<style lang="scss">
@use 'sass:map';
@use '../../styles/tokens';

$docked-theme: tokens.md-comp-date-picker-docked-values();
$modal-theme: tokens.md-comp-date-picker-modal-values();

.md-date-picker-header {
  align-items: center;
  display: flex;
  gap: 8px;
  justify-content: space-between;
  padding: 8px 12px 12px;

  &--docked {
    gap: 12px;
  }

  &__group,
  &__modal-center {
    align-items: center;
    display: flex;
    gap: 8px;
  }

  &__group {
    flex: 1;
    justify-content: space-between;
  }

  &__group--trailing {
    flex: 0 0 auto;
    justify-content: flex-end;
  }

  &__modal-center {
    flex: 1;
    justify-content: center;
  }

  &__value {
    align-items: center;
    background: transparent;
    border: none;
    border-radius: 999px;
    color: var(--menu-button-label-text-color, #{map.get($docked-theme, menu-button-label-text-color)});
    cursor: pointer;
    display: inline-flex;
    font-family: var(--menu-button-label-text-font, #{map.get($docked-theme, menu-button-label-text-font)});
    font-size: var(--menu-button-label-text-size, #{map.get($docked-theme, menu-button-label-text-size)});
    font-weight: var(--menu-button-label-text-weight, #{map.get($docked-theme, menu-button-label-text-weight)});
    gap: 4px;
    min-height: var(--menu-button-container-height, #{map.get($docked-theme, menu-button-container-height)});
    padding: 0 12px;
    transition: background-color 150ms ease, color 150ms ease;

    &:hover,
    &:focus-visible {
      background-color: rgba(103, 80, 164, 0.08);
      outline: none;
    }

    &--active {
      background-color: rgba(103, 80, 164, 0.12);
    }

    &--disabled {
      opacity: 0.6;
    }
  }

  &--modal {
    align-items: center;
    gap: 8px;
    min-height: 48px;
    padding: 4px 8px 4px 24px;

    .md-date-picker-header__value {
      color: var(--modal-menu-button-label-text-color, #{map.get($modal-theme, weekdays-label-text-color)});
      min-height: 40px;
    }

    .md-date-picker-header__value--combined {
      justify-content: flex-start;
      padding-inline-start: 16px;
      padding-inline-end: 8px;
    }

    .md-date-picker-header__group--trailing {
      gap: 0;
    }

    .md-icon-button {
      height: 48px;
      margin: 0;
      width: 48px;
    }
  }
}
</style>
