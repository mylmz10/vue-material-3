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
@use '../../styles/theme/md-sys-color' as theme;

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

  --md-navigation-tab-inactive-color: #{theme.value('on-surface-variant')};
  --md-navigation-tab-active-label-color: #{theme.value('on-surface')};
  --md-navigation-tab-active-icon-color: #{theme.value('on-secondary-container')};
  --md-navigation-tab-active-indicator-color: #{theme.value('secondary-container')};
  --md-ripple-hover-state-layer-color: #{theme.value('on-surface')};
  --md-ripple-focus-state-layer-color: #{theme.value('on-surface')};
  --md-ripple-pressed-state-layer-color: #{theme.value('on-surface')};
  --md-ripple-hover-state-layer-opacity: #{map.get($theme, hover-state-layer-opacity)};
  --md-ripple-focus-state-layer-opacity: #{map.get($theme, focus-state-layer-opacity)};
  --md-ripple-pressed-state-layer-opacity: #{map.get($theme, pressed-state-layer-opacity)};

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
      color: var(--md-navigation-tab-inactive-color);
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
    color: var(--md-navigation-tab-inactive-color);
  }

  &--selected {
    .md-navigation-tab__label {
      color: var(--md-navigation-tab-active-label-color);
      font-weight: map.get($theme, active-label-text-weight);
    }

    .md-navigation-tab__icon {
      color: var(--md-navigation-tab-active-icon-color);
    }

    .md-navigation-tab__active-indicator {
      background-color: var(--md-navigation-tab-active-indicator-color);
      width: map.get($theme, active-indicator-width);
      opacity: 1;
    }
  }
}
</style>
