<template>
  <MdField class="md-field--outlined" v-bind="$props">
    <template v-for="(_, slot) in $slots" v-slot:[slot]>
      <slot :name="slot"></slot>
    </template>
  </MdField>
</template>

<script setup>
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

$theme: tokens.md-comp-outlined-text-field-values();

.md-field {
  position: relative;
  $this: &;

  &--outlined {
    #{$this}__outline {
      position: absolute;
      inset: 0;
      box-sizing: border-box;
      border-radius: map.get($theme, container-shape);
      color: var(--md-field-outline-color, #{map.get($theme, outline-color)});
      pointer-events: none;
      --md-field-outline-color: #{map.get($theme, outline-color)};
      --md-field-outline-width: #{map.get($theme, outline-width)};
    }

    #{$this}__outline::before {
      content: '';
      position: absolute;
      inset: 0;
      box-sizing: border-box;
      border: solid var(--md-field-outline-width) var(--md-field-outline-color);
      border-radius: inherit;
    }

    #{$this}__outline-start,
    #{$this}__outline-end {
      align-self: flex-start;
      border-top: solid var(--md-field-outline-width) var(--md-field-outline-color);
      box-sizing: border-box;
      height: 0;
    }

    #{$this}__outline-start {
      flex: 0 0 calc(var(--md-field-label-offset, 0px) + 6px);
      min-width: 6px;
    }

    #{$this}__outline-notch {
      align-items: flex-start;
      display: none;
      flex: 0 0 auto;
      padding: 0 4px;
    }

    #{$this}__outline-notch-label {
      color: inherit;
      font-size: map.get($theme, label-text-populated-size);
      line-height: map.get($theme, label-text-populated-line-height);
      font-family: map.get($theme, label-text-font);
      font-weight: map.get($theme, label-text-weight);
      letter-spacing: map.get($theme, label-text-tracking);
      width: min-content;
      max-width: 100%;
    }

    #{$this}__outline-end {
      flex: 1 1 auto;
      min-width: 8px;
    }

    &#{$this}--focused,
    &#{$this}--populated {
      #{$this}__outline {
        align-items: flex-start;
        display: flex;
      }

      #{$this}__outline::before {
        border-top: none;
      }

      #{$this}__outline-start,
      #{$this}__outline-end {
        display: block;
      }

      #{$this}__outline-notch {
        display: flex;
      }
    }

    &#{$this}--focused {
      #{$this}__outline {
        --md-field-outline-color: #{map.get($theme, focus-outline-color)};
        --md-field-outline-width: #{map.get($theme, focus-outline-width)};
      }
    }

    &#{$this}--error {
      .md-text-field__input {
        caret-color: map.get($theme, error-focus-caret-color);
      }

      #{$this}__supporting-text {
        color: map.get($theme, error-supporting-text-color);
      }

      #{$this}__middle {
        #{$this}__label {
          color: map.get($theme, error-label-text-color);
        }
      }

      #{$this}__outline {
        --md-field-outline-color: #{map.get($theme, error-outline-color)};
        --md-field-outline-width: #{map.get($theme, outline-width)};
      }
    }

    &#{$this}--error#{$this}--focused {
      #{$this}__outline {
        --md-field-outline-color: #{map.get($theme, error-focus-outline-color)};
        --md-field-outline-width: #{map.get($theme, focus-outline-width)};
      }
    }

    #{$this}__container {
      #{$this}__label {
        font-size: map.get($theme, label-text-size);
        line-height: map.get($theme, label-text-line-height);
        font-family: map.get($theme, label-text-font);
        font-weight: map.get($theme, label-text-weight);
        letter-spacing: map.get($theme, label-text-tracking);
        color: map.get($theme, label-text-color);
        left: calc(var(--md-field-label-offset, 0px) + 10px);
        padding-inline: 4px;
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
      #{$this}__middle {
        #{$this}__label {
          color: map.get($theme, focus-label-text-color);
        }
        #{$this}__content {
        }
      }
    }

    &#{$this}--error {
      #{$this}__supporting-text {
        color: map.get($theme, error-supporting-text-color);
      }

      #{$this}__middle {
        #{$this}__label {
          color: map.get($theme, error-label-text-color);
        }
      }
    }
  }
}
</style>
