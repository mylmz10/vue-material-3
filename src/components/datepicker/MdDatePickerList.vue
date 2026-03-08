<template>
  <div class="md-date-picker-list">
    <MdList>
      <MdListItem v-for="item in items" @click="$emit('input', item.value)" :class="{ 'md-list-item--active': item.active }">
        <template #supporting-text>
          <div class="md-date-picker-list__item" :class="{ 'md-date-picker-list__item--active': item.active }">
            <MdIcon v-if="item.active">check</MdIcon>
            <span class="md-date-picker-list__item-text">{{ item.text }}</span>
          </div>
        </template>
      </MdListItem>
    </MdList>
  </div>
</template>

<script setup>
import { computed, onMounted, nextTick } from 'vue';
import dayjs from 'dayjs';
import MdList from '../list/MdList.vue';
import MdListItem from '../list/MdListItem.vue';
import MdIcon from '../icon/MdIcon.vue';

const props = defineProps({
  modelValue: {
    type: Number,
    default: null,
  },
  locale: {
    type: String,
    default: 'tr-TR',
  },
  type: {
    type: String,
  },
  min: {
    type: Number,
  },
  max: {
    type: Number,
  },
});


const items = computed(() => {
  if (props.type === 'month') {
    const selectedMonth = props.modelValue;
    const months = dayjs().locale(props.locale).localeData().months();
    return months.map((m, i) => ({ value: i, text: m, active: i === selectedMonth }));
  } else {
    const years = [];

    const selectedYear = props.modelValue;
    const maxYear = props.max ? parseInt(props.max, 10) : selectedYear + 100;
    const minYear = Math.min(maxYear, props.min ? parseInt(props.min, 10) : selectedYear - 100);

    for (let year = maxYear; year >= minYear; year--) {
      years.push({
        value: year,
        text: year.toString(),
        active: year === selectedYear,
      });
    }
    return years;
  }
});

onMounted(async () => {
  await nextTick();
  const activeItem = document.querySelector('.md-list-item--active');
  const listEl = document.querySelector('.md-date-picker-list .md-list');

  if (activeItem && listEl) {
    listEl.scrollTop = activeItem.offsetTop - listEl.offsetHeight / 2 + activeItem.offsetHeight / 2;
  } else if (listEl) {
    listEl.scrollTop = listEl.scrollHeight / 2 - listEl.offsetHeight / 2;
  }
});
</script>

<style lang="scss">
.md-date-picker-list {
  position: absolute;
  width: 100%;
  border-top: 1px solid #cac4d0;
  top: 56px;
  bottom: 0;
  overflow: auto;

  &__item {
    display: flex;
    align-items: center;
    .md-date-picker-list__item-text {
      margin-left: 32px;
    }
    &--active {
      .md-icon {
        font-size: 20px;
      }
      .md-date-picker-list__item-text {
        margin-left: 12px;
      }
    }
  }
  .md-list {
    max-height: 100%;
  }
  .md-list-item {
    cursor: pointer;
  }
}
</style>
