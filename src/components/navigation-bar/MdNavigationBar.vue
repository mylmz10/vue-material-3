<template>
  <div class="md-navigation-bar">
    <MdElevationOverlay />
    <MdNavigationTab v-for="(item, index) in items" :key="index" :selected="modelValue === index" :label="item.label" :active-icon="item.activeIcon" @click="onItemClick($event, item, index)" />
  </div>
</template>

<script setup>
import MdNavigationTab from '../navigation-tab/MdNavigationTab.vue';
import MdElevationOverlay from '../elevation/MdElevationOverlay.vue';

const emit = defineEmits(['update:modelValue']);

defineProps({
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
@use '../../styles/theme/md-sys-color' as theme;
@use '../elevation/elevation';

$theme: tokens.md-comp-navigation-bar-values();
$sys-color: theme.values();

.md-navigation-bar {
  display: flex;
  position: relative;
  width: 100%;
  background-color: theme.value('surface-container');
  border-radius: map.get($theme, container-shape);
  height: map.get($theme, container-height);
  box-shadow: elevation.resolve-box-shadow(map.get($theme, container-elevation), map.get($sys-color, shadow));
}
</style>
