<template>
  <button class="md-navigation-tab" :class="{ 'md-navigation-tab--selected': selected }">
    <MdRipple />
    <span class="md-navigation-tab__content">
      <span class="md-navigation-tab__active-indicator"></span>
      <MdIcon class="md-navigation-tab__icon" v-if="activeIcon">{{ activeIcon }}</MdIcon>
    </span>
    <span class="md-navigation-tab__label">{{ label }}</span>
  </button>
</template>

<script setup>
import MdIcon from '../icon/MdIcon.vue';
import MdRipple from '../ripple/MdRipple.vue';

defineProps({
  label: [String, Number],
  selected: Boolean,
  activeIcon: String,
});
</script>

<style lang="scss">
@use 'sass:map';
@use '../../styles/tokens';

$theme: tokens.md-comp-navigation-bar-values();

.md-navigation-tab {
  align-items: center;
  appearance: none;
  background: none;
  border: none;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  min-height: 48px;
  min-width: 48px;
  outline: none;
  padding: 8px 0px 12px;
  position: relative;
  text-align: center;
  width: 100%;
  font: inherit;

  &__content {
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    grid-auto-rows: auto;
    align-items: center;
    .md-navigation-tab__active-indicator {
      grid-column: 1 / 2;
      grid-row: 1 / 2;
      display: flex;
      width: map.get($theme, active-indicator-width);
      height: map.get($theme, active-indicator-height);
      border-radius: map.get($theme, active-indicator-shape);
    }
    .md-navigation-tab__icon {
      grid-column: 1 / 2;
      grid-row: 1 / 2;
    }
  }

  &__label {
    margin-top: 4px;
    font-family: map.get($theme, label-text-font);
    font-size: map.get($theme, label-text-size);
    line-height: map.get($theme, label-text-line-height);
    letter-spacing: map.get($theme, label-text-tracking);
    font-weight: map.get($theme, label-text-weight);
  }

  &--selected {
    .md-navigation-tab__active-indicator {
      background-color: map.get($theme, active-indicator-color);
    }
  }
}
</style>
