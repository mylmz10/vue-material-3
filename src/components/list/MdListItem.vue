<template>
  <li
    class="md-list-item"
    :class="{
      'md-list-item--selected': selected,
      'md-list-item--multiline': !!supportingTextMultiline,
      'md-list-item--two-line': supportingTextMultiline === 2,
      'md-list-item--three-line': supportingTextMultiline === 3,
    }"
  >
    <div class="md-list-item__state-layer"></div>
    <MdRipple style="z-index: 0"></MdRipple>
    <div class="md-list-item__start">
      <MdIcon v-if="icon">{{ icon }}</MdIcon>
      <slot name="start" />
    </div>
    <div class="md-list-item__body">
      <span class="md-list-item__label-text">
        {{ headline }}
        <slot />
      </span>
      <span class="md-list-item__supporting-text" :class="{ 'md-list-item__supporting-text--multiline': !!supportingTextMultiline }">
        {{ supportingText }}
        <slot name="supporting-text" />
      </span>
    </div>
    <div class="md-list-item__end">
      <span v-if="trailingText" class="md-list-item__trailing-text">{{ trailingText }}</span>
      <slot name="end" />
    </div>
  </li>
</template>

<script setup>
import MdIcon from '../icon/MdIcon.vue';
import MdRipple from '../ripple/MdRipple.vue';

defineProps({
  headline: {
    type: String,
  },
  supportingText: {
    type: String,
  },
  supportingTextMultiline: {
    type: Number,
  },
  trailingText: {
    type: [String, Number],
    default: '18',
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
@use '../ripple/ripple';
@use '../elevation/surface';

$theme: tokens.md-comp-list-values();

$theme: map.set($theme, 'list-item-three-line-container-height', 96px);

.md-list-item {
  $this: &;
  position: relative;
  display: flex;
  align-items: center;
  min-height: map.get($theme, list-item-one-line-container-height);
  border-radius: map.get($theme, list-item-container-shape);
  --line: 1;
  cursor: default;

  &--two-line {
    --line: 2;
    min-height: map.get($theme, list-item-two-line-container-height);
  }
  &--three-line {
    --line: 3;
    min-height: map.get($theme, list-item-three-line-container-height);
  }

  $ripple-tokens: (
    hover-state-layer-color: list-item-hover-state-layer-color,
    focus-state-layer-color: list-item-focus-state-layer-color,
    pressed-state-layer-color: list-item-pressed-state-layer-color,
    hover-state-layer-opacity: list-item-hover-state-layer-opacity,
    focus-state-layer-opacity: list-item-focus-state-layer-opacity,
    pressed-state-layer-opacity: list-item-pressed-state-layer-opacity,
  );
  @include ripple.ripple($theme, $ripple-tokens, 0);

  &__state-layer {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
  }

  &__start {
    flex: 0 0 auto;

    .md-icon,
    .md-avatar {
      margin-left: 16px;
    }
  }

  &__body {
    flex: 1 1 100%;
    display: flex;
    flex-direction: column;
    padding-inline-start: 16px;

    #{$this}__label-text {
      color: map.get($theme, list-item-label-text-color);
      font-family: map.get($theme, list-item-label-text-font);
      line-height: map.get($theme, list-item-label-text-line-height);
      font-size: map.get($theme, list-item-label-text-size);
      letter-spacing: map.get($theme, list-item-label-text-tracking);
      font-weight: map.get($theme, list-item-label-text-weight);
    }
    #{$this}__supporting-text {
      color: map.get($theme, list-item-supporting-text-color);
      font-family: map.get($theme, list-item-supporting-text-font);
      line-height: map.get($theme, list-item-supporting-text-line-height);
      font-size: map.get($theme, list-item-supporting-text-size);
      letter-spacing: map.get($theme, list-item-supporting-text-tracking);
      font-weight: map.get($theme, list-item-supporting-text-weight);
    }
    #{$this}__supporting-text--multiline {
      -webkit-box-orient: vertical;
      -webkit-line-clamp: var(--line);
      display: -webkit-box;
      overflow: hidden;
      white-space: normal;
      text-overflow: ellipsis;
    }
  }

  &__end {
    flex: 0 0 auto;
    padding-inline-end: 24px;

    #{$this}__trailing-text {
      padding-inline-start: 16px;
      color: map.get($theme, list-item-trailing-supporting-text-color);
      font-family: map.get($theme, list-item-trailing-supporting-text-font);
      line-height: map.get($theme, list-item-trailing-supporting-text-line-height);
      font-size: map.get($theme, list-item-trailing-supporting-text-size);
      letter-spacing: map.get($theme, list-item-trailing-supporting-text-tracking);
      font-weight: map.get($theme, list-item-trailing-supporting-text-weight);
    }
  }
}
</style>
