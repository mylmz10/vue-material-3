<template>
  <div class="md-radio" :class="{ 'md-radio--disabled': disabled, 'md-radio--checked': checked }">
    <MdRipple />
    <input :checked="checked" :disabled="disabled" :name="name" type="radio" :value="value" @change="toggle" />
    <div class="md-radio__background">
      <div class="md-radio__outer-circle"></div>
      <div class="md-radio__inner-circle"></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import MdRipple from '../ripple/MdRipple.vue';

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  disabled: {
    type: Boolean,
  },
  name: {
    type: String,
  },
  value: {
    type: String,
  },
  modelValue: {
    type: String,
  },
});

const toggle = () => {
  if (!props.disabled) {
    emit('update:modelValue', props.value);
  }
};

const checked = computed(() => props.modelValue === props.value);
</script>

<style lang="scss">
@use 'sass:map';
@use '../../styles/tokens';
@use '../ripple/ripple';

$theme: tokens.md-comp-radio-button-values();

.md-radio {
  $this: &;
  position: relative;
  block-size: map.get($theme, state-layer-size);
  inline-size: map.get($theme, state-layer-size);
  align-items: center;
  border: none;
  box-sizing: border-box;
  cursor: pointer;
  justify-content: center;
  display: flex;

  input {
    position: absolute;
    margin: 0px;
    padding: 0px;
    opacity: 0;
    cursor: inherit;
    z-index: 1;
    block-size: 100%;
    inline-size: 100%;
    inset: 0px;
  }

  &__background {
    position: relative;
    height: map.get($theme, icon-size);
    width: map.get($theme, icon-size);
    display: inline-flex;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;

    #{$this}__outer-circle {
      position: absolute;
      inset-block-start: 0px;
      inset-inline-start: 0px;
      box-sizing: border-box;
      block-size: 100%;
      inline-size: 100%;
      border-width: 2px;
      border-style: solid;
      border-radius: 50%;
      border-color: map.get($theme, unselected-icon-color);
    }
    #{$this}__inner-circle {
      position: absolute;
      box-sizing: border-box;
      block-size: 50%;
      inline-size: 50%;
      transform: scale(0);
      border-radius: 50%;
      transition: transform 120ms cubic-bezier(0.4, 0, 0.6, 1) 0s, border-color 120ms cubic-bezier(0.4, 0, 0.6, 1) 0s;
    }
  }

  &--checked {
    #{$this}__background {
      #{$this}__outer-circle {
        border-color: map.get($theme, selected-icon-color);
      }
      #{$this}__inner-circle {
        background-color: map.get($theme, selected-icon-color);
        transform: scale(1);
        transition: transform 120ms cubic-bezier(0, 0, 0.2, 1) 0s, border-color 120ms cubic-bezier(0, 0, 0.2, 1) 0s;
      }
    }
  }

  &--disabled {
    pointer-events: none;

    #{$this}__background {
      #{$this}__outer-circle {
        opacity: map.get($theme, disabled-unselected-icon-opacity);
        border-color: map.get($theme, disabled-unselected-icon-color);
      }
      #{$this}__inner-circle {
      }
    }
    &#{$this}--checked {
      #{$this}__background {
        #{$this}__outer-circle {
        }
        #{$this}__inner-circle {
          background-color: map.get($theme, disabled-selected-icon-color);
          opacity: map.get($theme, disabled-selected-icon-opacity);
        }
      }
    }
  }

  @include ripple.ripple(
    $theme,
    (
      hover-state-layer-color: unselected-hover-state-layer-color,
      focus-state-layer-color: unselected-focus-state-layer-color,
      pressed-state-layer-color: unselected-pressed-state-layer-color,
      hover-state-layer-opacity: unselected-hover-state-layer-opacity,
      focus-state-layer-opacity: unselected-focus-state-layer-opacity,
      pressed-state-layer-opacity: unselected-pressed-state-layer-opacity,
    )
  );
}
</style>
