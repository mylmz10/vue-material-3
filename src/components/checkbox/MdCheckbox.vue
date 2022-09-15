<template>
  <div class="md-checkbox" :class="{ 'md-checkbox--disabled': disabled, 'md-checkbox--checked': _checked, 'md-checkbox--indeterminate': _indeterminate }" @click="toggle">
    <MdRipple />
    <input type="checkbox" />
    <div class="md-checkbox__background">
      <svg class="md-checkbox__checkmark" viewBox="0 0 24 24" aria-hidden="true">
        <path class="md-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
      </svg>
      <div class="md-checkbox__indeterminate-mark"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import MdRipple from '../ripple/MdRipple.vue';

const _checked = ref(false);
const _indeterminate = ref(false);

const props = defineProps({
  disabled: {
    type: Boolean,
  },
  checked: {
    type: Boolean,
  },
  indeterminate: {
    type: Boolean,
  },
});

watch(
  () => props.checked,
  (newValue) => {
    _checked.value = newValue;
  },
  { immediate: true }
);
watch(
  () => props.indeterminate,
  (newValue) => {
    _indeterminate.value = newValue;
  },
  { immediate: true }
);

const toggle = () => {
  if (!props.disabled) {
    _checked.value = !_checked.value;
    _indeterminate.value = false;
  }
};
</script>

<style lang="scss">
@use 'sass:map';
@use '../../styles/tokens';
@use '../ripple/ripple';

$theme: tokens.md-comp-checkbox-values();

.md-checkbox {
  $this: &;
  position: relative;
  width: 48px;
  height: 48px;
  border-radius: map.get($theme, state-layer-shape);
  align-items: center;
  border: none;
  box-sizing: border-box;
  cursor: pointer;
  justify-content: center;
  display: flex;

  input {
    display: none;
  }

  &__background {
    position: relative;
    border-style: solid;
    border-color: map.get($theme, unselected-outline-color);
    border-width: map.get($theme, unselected-outline-width);
    width: map.get($theme, container-width);
    height: map.get($theme, container-height);
    border-radius: map.get($theme, container-shape);

    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;

    svg {
      color: map.get($theme, selected-icon-color);
      padding: 1px;
      position: absolute;
      inset: 0px;
      box-sizing: border-box;
      width: 100%;
      border: none;
      transition: opacity 180ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;

      path {
        transition: stroke-dashoffset 180ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
        stroke: currentcolor;
        stroke-width: 4px;
        stroke-dashoffset: 29.7833;
        stroke-dasharray: 29.7833;
      }
    }

    #{$this}__indeterminate-mark {
      width: 100%;
      height: 0;
      border-width: 1px;
      border-style: solid;
      background-color: currentcolor;
      border-color: currentcolor;
      opacity: 0;
      transition: opacity 90ms cubic-bezier(0.4, 0, 0.6, 1) 0ms, transform 90ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
      margin: 2px;
    }
  }

  &--indeterminate {
    #{$this}__background {
      background-color: map.get($theme, selected-container-color);
      border-color: map.get($theme, selected-container-color);

      svg {
        opacity: 0;
      }

      #{$this}__indeterminate-mark {
        color: map.get($theme, selected-icon-color);
        opacity: 1;
      }
    }

    &#{$this}--checked {
      #{$this}__background {
        svg {
          opacity: 1;
        }
      }
    }
    &#{$this}--checked {
      #{$this}__background {
        #{$this}__indeterminate-mark {
          color: map.get($theme, selected-icon-color);
          transform: rotate(45deg) translate(0px, 4px) scale(0.7);
          opacity: 0;
        }
      }
    }
  }

  &--checked {
    #{$this}__background {
      background-color: map.get($theme, selected-container-color);
      border-color: map.get($theme, selected-container-color);

      svg {
        path {
          stroke-dashoffset: 0;
        }
      }
    }
  }

  &--disabled {
    pointer-events: none;

    #{$this}__background {
      opacity: map.get($theme, unselected-disabled-container-opacity);
      border-color: map.get($theme, unselected-disabled-outline-color);
      border-width: map.get($theme, unselected-disabled-outline-width);
    }
    &#{$this}--checked,
    &#{$this}--indeterminate {
      #{$this}__background {
        background-color: map.get($theme, selected-disabled-container-color);
        opacity: map.get($theme, selected-disabled-container-opacity);
        border-color: transparent;
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
