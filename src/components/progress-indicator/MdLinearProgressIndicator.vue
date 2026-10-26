<template>
  <div
    class="md-linear-progress-indicator"
    :class="{ 'md-linear-progress-indicator--indeterminate': indeterminate }"
    role="progressbar"
    :aria-label="ariaLabel"
    :aria-valuemin="indeterminate ? undefined : 0"
    :aria-valuemax="indeterminate ? undefined : 100"
    :aria-valuenow="indeterminate ? undefined : value"
  >
    <div class="md-linear-progress-indicator__track"></div>
    <div class="md-linear-progress-indicator__indicator" :style="indicatorStyle"></div>
    <div v-if="!indeterminate" class="md-linear-progress-indicator__stop" aria-hidden="true"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  ariaLabel: { type: String, default: 'Progress' },
  value: { type: [String, Number], default: 0 },
  indeterminate: { type: Boolean },
});

const indicatorStyle = computed(() => {
  return {
    width: props.indeterminate ? '' : `${props.value}%`,
  };
});
</script>

<style lang="scss">
@use 'sass:map';
@use '../../styles/tokens';
@use '../../styles/theme/md-sys-color' as theme;

$theme: tokens.md-comp-linear-progress-indicator-values();

.md-linear-progress-indicator {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  position: relative;
  overflow: hidden;

  $this: &;

  &__track {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    width: 100%;
    background-color: #{theme.value('secondary-container')};
    height: map.get($theme, track-height);
  }
  &__indicator {
    position: absolute;
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    background-color: #{theme.value('primary')};
    height: map.get($theme, active-indicator-height);
    transition: width cubic-bezier(0.4, 0, 0.2, 1) 2s;
  }

  &__stop {
    position: absolute;
    inset-inline-end: 0;
    inset-block-start: 50%;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #{theme.value('primary')};
    transform: translateY(-50%);
  }

  &--indeterminate {
    #{$this}__indicator {
      width: 100%;
      animation: indeterminate-progress-bar 2s infinite linear;
    }
  }
}

@keyframes indeterminate-progress-bar {
  0% {
    left: -90%;
    transform: scaleX(0.04);
  }
  36.65% {
    left: -50%;
    animation-timing-function: cubic-bezier(0.334731, 0.12482, 0.785844, 1);
    transform: scaleX(0.08);
  }
  69.15% {
    animation-timing-function: cubic-bezier(0.06, 0.11, 0.6, 1);
    transform: scaleX(0.661479);
  }
  100% {
    left: 50%;
    transform: scaleX(0.04);
  }
}
</style>
