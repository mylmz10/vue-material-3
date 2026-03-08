<template>
  <div class="md-switch" :class="{ 'md-switch--disabled': disabled, 'md-switch--checked': _checked }">
    <input
      ref="inputEl"
      :checked="_checked"
      :disabled="disabled"
      :name="name || undefined"
      type="checkbox"
      :value="value"
      :form="form || undefined"
      :required="required"
      :readonly="readonly"
      @input="onInput"
      @change="onInputChange"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
    />
    <div class="md-switch__track">
      <div class="md-switch__handle-container">
        <div class="md-switch__handle"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';

const _checked = ref(false);
const inputEl = ref(null);
const initialChecked = ref(false);
let formEl = null;

const emit = defineEmits(['update:modelValue', 'input', 'change', 'focus', 'blur']);

const props = defineProps({
  checked: { type: Boolean, default: undefined },
  disabled: { type: Boolean, default: false },
  form: { type: String, default: '' },
  modelValue: { type: Boolean, default: undefined },
  name: { type: String, default: '' },
  readonly: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
  value: { type: [String, Number], default: 'on' },
});

const resolveChecked = () => {
  if (props.modelValue !== undefined) {
    return !!props.modelValue;
  }

  if (props.checked !== undefined) {
    return !!props.checked;
  }

  return false;
};

watch(
  () => props.checked,
  (newValue) => {
    if (props.modelValue !== undefined || newValue === undefined) {
      return;
    }

    _checked.value = !!newValue;
  },
  { immediate: true },
);

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue === undefined) {
      return;
    }

    _checked.value = !!newValue;
  },
  { immediate: true },
);

const onInput = (ev) => {
  if (props.disabled || props.readonly) {
    return;
  }

  emit('input', ev.target.checked);
};

const onInputChange = (ev) => {
  if (props.disabled || props.readonly) {
    ev.target.checked = _checked.value;
    return;
  }

  _checked.value = ev.target.checked;
  emit('update:modelValue', _checked.value);
  emit('change', _checked.value);
};

const onFormReset = () => {
  _checked.value = initialChecked.value;
  emit('update:modelValue', _checked.value);
};

const focus = () => inputEl.value?.focus();
const blur = () => inputEl.value?.blur();
const checkValidity = () => inputEl.value?.checkValidity();
const reportValidity = () => inputEl.value?.reportValidity();
const setCustomValidity = (message) => inputEl.value?.setCustomValidity(message || '');
const getInputEl = () => inputEl.value;

defineExpose({
  focus,
  blur,
  checkValidity,
  reportValidity,
  setCustomValidity,
  getInputEl,
});

onMounted(() => {
  _checked.value = resolveChecked();
  initialChecked.value = _checked.value;
  formEl = inputEl.value?.form || null;
  formEl?.addEventListener('reset', onFormReset);
});

onBeforeUnmount(() => {
  formEl?.removeEventListener('reset', onFormReset);
});
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
    position: absolute;
    margin: 0;
    padding: 0;
    opacity: 0;
    cursor: inherit;
    z-index: 1;
    block-size: 100%;
    inline-size: 100%;
    inset: 0;
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
