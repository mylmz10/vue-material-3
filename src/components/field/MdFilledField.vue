<template>
  <MdField class="md-field--filled" v-bind="$props">
    <template v-for="(_, slot) in $slots" v-slot:[slot]>
      <slot :name="slot"></slot>
    </template>
  </MdField>
</template>

<script setup>
import { defineProps } from 'vue';
import MdField from './MdField.vue';

defineProps({
  disabled: { type: Boolean },
  error: { type: Boolean },
  label: { type: String },
  populated: { type: Boolean },
  required: { type: Boolean },
  focused: { type: Boolean },
});
</script>

<style lang="scss">
@use 'sass:map';
@use '../../styles/tokens';

$theme: tokens.md-comp-filled-text-field-values();

.md-field {
  position: relative;
  $this: &;

  &--filled {
    #{$this}__outline {
      border-style: solid;
      border-color: map.get($theme, active-indicator-color);
      border-left: none;
      border-right: none;
      border-top: none;
      border-bottom-width: map.get($theme, active-indicator-height);
      border-radius: map.get($theme, container-shape);
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      box-sizing: border-box;
    }

    #{$this}__container {
      background-color: map.get($theme, container-color);
      border-radius: map.get($theme, container-shape);
      #{$this}__label {
        font-size: map.get($theme, label-text-size);
        line-height: map.get($theme, label-text-line-height);
        font-family: map.get($theme, label-text-font);
        font-weight: map.get($theme, label-text-weight);
        letter-spacing: map.get($theme, label-text-tracking);
        color: map.get($theme, label-text-color);
      }
    }

    #{$this}__container:hover {
      .md-field__state-layer {
        background-color: map.get($theme, hover-state-layer-color);
        opacity: map.get($theme, hover-state-layer-opacity);
      }
    }

    #{$this}__supporting-text {
      color: map.get($theme, supporting-text-color);
      font-family: map.get($theme, supporting-text-font);
      line-height: map.get($theme, supporting-text-line-height);
      font-size: map.get($theme, supporting-text-size);
      font-weight: map.get($theme, supporting-text-weight);
      padding-top: 4px;
    }

    &#{$this}--focused {
      #{$this}__outline {
        border-color: map.get($theme, focus-active-indicator-color);
        border-bottom-width: map.get($theme, focus-active-indicator-height);
      }

      #{$this}__middle {
        #{$this}__label {
          color: map.get($theme, focus-label-text-color);
        }
        #{$this}__content {
        }
      }
    }
  }
}
</style>
