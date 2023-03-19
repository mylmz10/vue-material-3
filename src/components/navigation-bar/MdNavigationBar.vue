<template>
  <div class="md-navigation-bar">
    <MdElevationOverlay />
    <MdNavigationTab v-for="(item, index) in items" :selected="modelValue === index" :label="item.label" :active-icon="item.activeIcon" @click="onItemClick($event, item, index)" />
  </div>
</template>

<script setup>
import MdNavigationTab from '../navigation-tab/MdNavigationTab.vue';
import MdElevationOverlay from '../elevation/MdElevationOverlay.vue';

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: Number,
  },
});

const onItemClick = ($event, item, index) => {
  emit('update:modelValue', index);
};
</script>

<style lang="scss">
@use 'sass:map';
@use '../../styles/tokens';
@use '../elevation/elevation';

$theme: tokens.md-comp-navigation-bar-values();

.md-navigation-bar {
  display: flex;
  position: relative;
  width: 100%;
  background-color: map.get($theme, container-color);
  border-radius: map.get($theme, container-shape);
  height: map.get($theme, container-height);
  box-shadow: elevation.resolve-box-shadow(map.get($theme, container-elevation), map.get($theme, container-surface-tint-layer-color));
}
</style>
