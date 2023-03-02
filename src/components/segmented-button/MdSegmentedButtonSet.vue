<template>
  <span class="md-segmented-button-set">
    <MdSegmentedButton
      v-for="(segmentedButton, index) in items"
      :label="segmentedButton.label"
      :disabled="segmentedButton.disabled"
      :selected="isSelected(index)"
      @click="handleClick($event, index)"
    />
  </span>
</template>

<script setup>
import { ref, watch } from 'vue';
import MdSegmentedButton from './MdSegmentedButton.vue';

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  multiselect: {
    type: Boolean,
  },
  items: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: [Number, Array],
  },
});

const selectedIndex = ref(null);

const handleClick = ($event, index) => {
  if (props.items[index].disabled) {
    return;
  }
  if (props.multiselect) {
    if (selectedIndex.value.includes(index)) {
      selectedIndex.value = selectedIndex.value.filter((v) => v !== index);
    } else {
      selectedIndex.value.push(index);
    }
  } else {
    if (selectedIndex.value === index) {
      selectedIndex.value = null;
    } else {
      selectedIndex.value = index;
    }
  }
};

const isSelected = (index) => {
  if (props.multiselect) {
    return selectedIndex.value.includes(index);
  }
  return selectedIndex.value === index;
};

watch(
  () => props.multiselect,
  (newValue) => {
    if (newValue) {
      selectedIndex.value = props.modelValue !== undefined ? props.modelValue : [];
    } else {
      selectedIndex.value = props.modelValue !== undefined ? props.modelValue : null;
    }
  },
  { immediate: true }
);
</script>

<style lang="scss">
@use 'sass:map';
@use '../../styles/tokens';

$theme: tokens.md-comp-outlined-segmented-button-values();
.md-segmented-button-set {
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  grid-auto-rows: auto;
  width: 100%;
  height: map.get($theme, container-height);
}
</style>
