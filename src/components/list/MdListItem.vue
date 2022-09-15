<template>
  <li class="md-list-item" :class="{ 'md-list-item--selected': selected }">
    <div class="md-list-item__state-layer"></div>
    <MdRipple></MdRipple>
    <div class="md-list-item__start">
      <MdIcon v-if="icon">{{ icon }}</MdIcon>
      <slot name="start" />
    </div>
    <div class="md-list-item__body">
      <span class="md-list-item__label-text">
        <slot />
      </span>
      <span class="md-list-item__supporting-text">
        <slot name="supporting-text" />
      </span>
    </div>
    <div class="md-list-item__end">
      <slot name="end" />
    </div>
  </li>
</template>

<script setup>
import MdIcon from '../icon/MdIcon.vue';
import MdRipple from '../ripple/MdRipple.vue';

defineProps({
  label: {
    type: String,
  },
  icon: {
    type: String,
  },
  selected: {
    type: Boolean,
  },
});
</script>

<style lang="scss">
@use 'sass:map';
@use '../../styles/tokens';

$theme: tokens.md-comp-list-values();

.md-list-item {
  $this: &;
  display: flex;
  align-items: center;
  height: map.get($theme, list-item-container-height);
  border-radius: map.get($theme, list-item-container-shape);
  position: relative;

  &__state-layer {
    position: absolute;
    inset: 0;
    border-radius: inherit;
  }

  &__start {
    flex: 0 0 auto;

    .md-icon {
      margin-right: 16px;
    }
  }

  &__body {
    flex: 1 1 100%;

    #{$this}__label-text {
      color: map.get($theme, list-item-label-text-color);
      font-family: map.get($theme, list-item-label-text-font);
      line-height: map.get($theme, list-item-label-text-line-height);
      font-size: map.get($theme, list-item-label-text-size);
      letter-spacing: map.get($theme, list-item-label-text-tracking);
      font-weight: map.get($theme, list-item-label-text-weight);
    }
  }

  &__end {
    flex: 0 0 auto;
  }
}
</style>
