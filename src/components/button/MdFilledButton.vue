<template>
  <MdButtonBase
    class="md-filled-button"
    :disabled="disabled"
    :soft-disabled="softDisabled"
    :href="href"
    :target="target"
    :download="download"
    :type="type"
  >
    <MdRipple />
    <span v-if="label" class="md-button__label">
      {{ label }}
    </span>
    <span v-else class="md-button__label">
      <slot />
    </span>
    <span v-if="trailingIcon || $slots['trailing-icon']" class="md-button__trailing-icon">
      <slot name="trailing-icon">
        <MdIcon>{{ trailingIcon }}</MdIcon>
      </slot>
    </span>
  </MdButtonBase>
</template>

<script setup>
import MdButtonBase from './MdButtonBase.vue';
import { buttonSharedProps } from './buttonSharedProps';
import MdRipple from '../ripple/MdRipple.vue';
import MdIcon from '../icon/MdIcon.vue';

defineProps({
  ...buttonSharedProps,
  label: {
    type: String,
  },
  trailingIcon: {
    type: String,
  },
});
</script>

<style lang="scss">
@use 'sass:map';
@use '../../styles/tokens';
@use '../ripple/ripple';

$theme: tokens.md-comp-filled-button-values();

.md-filled-button {
  height: map.get($theme, container-height);
  border-radius: map.get($theme, container-shape);
  box-shadow: none;
  @include ripple.ripple($theme, null, 100px);

  &:not(:disabled):not(.md-button--soft-disabled):hover {
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
  }

  .md-button__label {
    color: map.get($theme, label-text-color);
    font-family: map.get($theme, label-text-font);
    font-size: map.get($theme, label-text-size);
    font-weight: map.get($theme, label-text-weight);
    letter-spacing: map.get($theme, label-text-tracking);
    line-height: map.get($theme, label-text-line-height);
  }

  .md-button__background {
    background-color: map.get($theme, container-color);
  }

  &:disabled,
  &.md-button--soft-disabled {
    .md-button__background {
      background-color: map.get($theme, disabled-container-color);
      opacity: map.get($theme, disabled-container-opacity);
    }
    .md-button__label,
    .md-button__trailing-icon {
      color: map.get($theme, disabled-label-text-color);
      opacity: map.get($theme, disabled-label-text-opacity);
    }
  }
}
</style>
