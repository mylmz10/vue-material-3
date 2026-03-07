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
    position: relative;
    display: flex;
    width: map.get($theme, active-indicator-width);
    height: map.get($theme, active-indicator-height);
    justify-content: center;
    align-items: center;
    margin-bottom: 4px;

    .md-navigation-tab__active-indicator {
      position: absolute;
      inset: 0;
      width: 32px;
      height: map.get($theme, active-indicator-height);
      border-radius: map.get($theme, active-indicator-shape);
      opacity: 0;
      transition: width 100ms cubic-bezier(0.2, 0, 0, 1), opacity 100ms cubic-bezier(0.2, 0, 0, 1);
    }

    .md-navigation-tab__icon {
      position: relative;
      z-index: 1;
      color: map.get($theme, inactive-icon-color);
      font-size: map.get($theme, icon-size);
      --mdc-icon-size: #{map.get($theme, icon-size)};
    }
  }

  &__label {
    font-family: map.get($theme, label-text-font);
    font-size: map.get($theme, label-text-size);
    line-height: map.get($theme, label-text-line-height);
    letter-spacing: map.get($theme, label-text-tracking);
    font-weight: map.get($theme, label-text-weight);
    color: map.get($theme, inactive-label-text-color);
  }

  &--selected {
    .md-navigation-tab__label {
      color: map.get($theme, active-label-text-color);
      font-weight: map.get($theme, active-label-text-weight);
    }

    .md-navigation-tab__icon {
      color: map.get($theme, active-icon-color);
    }

    .md-navigation-tab__active-indicator {
      background-color: map.get($theme, active-indicator-color);
      width: map.get($theme, active-indicator-width);
      opacity: 1;
    }
  }
}
</style>
