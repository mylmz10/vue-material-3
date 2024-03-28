<template>
  <div class="md-switch" :class="{ 'md-switch--disabled': disabled, 'md-switch--checked': _checked }" @click="toggle">
    <input :checked="_checked" :disabled="disabled" :name="name" type="checkbox" :value="value" @change="toggle" />
    <div class="md-switch__track">
      <div class="md-switch__handle-container">
        <div class="md-switch__handle"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const _checked = ref(false);

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
  checked: {
    type: Boolean,
  },
});

watch(
  () => props.checked,
  (newValue) => {
    _checked.value = newValue;
  },
  { immediate: true },
);

const toggle = () => {
  if (!props.disabled) {
    _checked.value = !_checked.value;
    emit('update:modelValue', _checked.value);
  }
};
</script>

<style lang="scss">
@use 'sass:map';
@use '../../styles/tokens';
@use '../ripple/ripple';

$theme: tokens.md-comp-switch-values();

.md-switch {
  $this: &;
  position: relative;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  display: inline-flex;
  flex-shrink: 0;
  margin: 0px;
  outline: none;
  padding: 0px;
  width: map.get($theme, track-width);
  height: map.get($theme, track-height);
  border-radius: map.get($theme, track-shape);

  input {
    display: none;
  }

  &__track {
    position: relative;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border-radius: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: map.get($theme, unselected-track-color);
    border-width: map.get($theme, track-outline-width);
    border-color: map.get($theme, unselected-handle-color);
    border-style: solid;

    #{$this}__handle-container {
      position: relative;
      margin-inline-start: initial;
      margin-inline-end: calc(#{map.get($theme, track-width)} - #{map.get($theme, track-height)});
      width: map.get($theme, unselected-handle-width);
      height: map.get($theme, unselected-handle-height);
      transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1) 0s;

      #{$this}__handle {
        width: inherit;
        height: inherit;
        background-color: map.get($theme, unselected-handle-color);
        border-radius: map.get($theme, handle-shape);
      }
    }

    &:active {
      #{$this}__handle-container {
        width: map.get($theme, pressed-handle-width);
        height: map.get($theme, pressed-handle-height);
        #{$this}__handle {
          background-color: map.get($theme, unselected-pressed-handle-color);
        }
      }
    }
    &:hover {
      #{$this}__handle-container {
        #{$this}__handle {
          background-color: map.get($theme, unselected-hover-handle-color);
        }
      }
    }
  }

  &--checked {
    #{$this}__track {
      background-color: map.get($theme, selected-track-color);
      border-color: map.get($theme, selected-track-color);

      #{$this}__handle-container {
        margin-inline-end: initial;
        margin-inline-start: calc(#{map.get($theme, track-width)} - #{map.get($theme, track-height)});
        width: map.get($theme, selected-handle-width);
        height: map.get($theme, selected-handle-height);

        #{$this}__handle {
          width: map.get($theme, selected-handle-width);
          height: map.get($theme, selected-handle-height);
          background-color: map.get($theme, selected-handle-color);
        }
      }

      &:hover {
        #{$this}__handle-container {
          #{$this}__handle {
            background-color: map.get($theme, selected-hover-handle-color);
          }
        }
      }
    }
  }

  &--disabled {
    pointer-events: none;

    #{$this}__track {
      background-color: map.get($theme, disabled-selected-handle-color);
      border-color: map.get($theme, disabled-unselected-track-outline-color);
      opacity: map.get($theme, disabled-track-opacity);

      #{$this}__handle-container {
        #{$this}__handle {
          background-color: map.get($theme, disabled-unselected-handle-color);
        }
      }
    }
    &#{$this}--checked {
      #{$this}__track {
        background-color: map.get($theme, disabled-selected-track-color);
        opacity: map.get($theme, disabled-track-opacity);
        #{$this}__handle-container {
          #{$this}__handle {
            background-color: map.get($theme, disabled-selected-handle-color);
            opacity: map.get($theme, disabled-selected-handle-opacity);
          }
        }
      }
    }
  }
}
</style>
