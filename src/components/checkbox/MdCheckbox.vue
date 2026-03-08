<template>
  <div
    class="md-checkbox"
    :class="{ 'md-checkbox--disabled': disabled, 'md-checkbox--checked': _checked, 'md-checkbox--indeterminate': _indeterminate }"
  >
    <MdRipple />
    <input
      ref="inputEl"
      type="checkbox"
      :checked="_checked"
      :disabled="disabled"
      :name="name || undefined"
      :value="value"
      :form="form || undefined"
      :required="required"
      :readonly="readonly"
      @input="onInput"
      @change="onInputChange"
      @focus="onFocus"
      @blur="onBlur"
    />
    <div class="md-checkbox__background">
      <svg class="md-checkbox__checkmark" viewBox="0 0 24 24" aria-hidden="true">
        <path class="md-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
      </svg>
      <div class="md-checkbox__indeterminate-mark"></div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import MdRipple from '../ripple/MdRipple.vue';

const emit = defineEmits(['update:modelValue', 'update:model-value', 'input', 'change', 'focus', 'blur']);

const inputEl = ref(null);
const _checked = ref(false);
const _indeterminate = ref(false);
const initialChecked = ref(false);
const initialIndeterminate = ref(false);
let formEl = null;

const props = defineProps({
  checked: { type: Boolean, default: undefined },
  disabled: { type: Boolean, default: false },
  form: { type: String, default: '' },
  indeterminate: { type: Boolean, default: false },
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

const syncIndeterminateToInput = () => {
  if (inputEl.value) {
    inputEl.value.indeterminate = _indeterminate.value;
  }
};

const emitCheckedUpdate = () => {
  emit('update:modelValue', _checked.value);
  emit('update:model-value', _checked.value);
};

const onInput = (ev) => {
  if (props.disabled || props.readonly) {
    return;
  }

  emit('input', ev.target.checked);
};

const onFocus = (ev) => {
  emit('focus', ev);
};

const onBlur = (ev) => {
  emit('blur', ev);
};

const onInputChange = (ev) => {
  if (props.disabled || props.readonly) {
    ev.target.checked = _checked.value;
    syncIndeterminateToInput();
    return;
  }

  _checked.value = ev.target.checked;
  _indeterminate.value = false;
  syncIndeterminateToInput();
  emitCheckedUpdate();
  emit('change', _checked.value);
};

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
  () => props.indeterminate,
  (newValue) => {
    _indeterminate.value = newValue;
    syncIndeterminateToInput();
  },
  { immediate: true },
);

const onFormReset = () => {
  _checked.value = initialChecked.value;
  _indeterminate.value = initialIndeterminate.value;
  syncIndeterminateToInput();
  emitCheckedUpdate();
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
  initialIndeterminate.value = _indeterminate.value;
  syncIndeterminateToInput();
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

$theme: tokens.md-comp-checkbox-values();

.md-checkbox {
  $this: &;
  --md-checkbox-touch-target-size: 48px;
  position: relative;
  width: var(--md-checkbox-touch-target-size);
  height: var(--md-checkbox-touch-target-size);
  border-radius: map.get($theme, state-layer-shape);
  align-items: center;
  border: none;
  box-sizing: border-box;
  cursor: pointer;
  justify-content: center;
  display: flex;

  input {
    opacity: 0;
    position: absolute;
    inset: 0;
    appearance: none;
    outline: none;
    border: none;
    background: transparent;
    width: 100%;
    height: 100%;
    margin: 0;
    cursor: inherit;
    z-index: 1;
    box-shadow: none;

    &:focus,
    &:focus-visible {
      outline: none;
      box-shadow: none;
    }
  }

  &__background {
    position: relative;
    border-style: solid;
    border-color: map.get($theme, unselected-outline-color);
    border-width: map.get($theme, unselected-outline-width);
    width: map.get($theme, container-size);
    height: map.get($theme, container-size);
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

  .md-ripple {
    width: map.get($theme, state-layer-size);
    height: map.get($theme, state-layer-size);
    inset: 0;
    margin: auto;
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

    .md-ripple {
      --md-ripple-hover-state-layer-color: #{map.get($theme, selected-hover-state-layer-color)};
      --md-ripple-focus-state-layer-color: #{map.get($theme, selected-focus-state-layer-color)};
      --md-ripple-pressed-state-layer-color: #{map.get($theme, selected-pressed-state-layer-color)};
      --md-ripple-hover-state-layer-opacity: #{map.get($theme, selected-hover-state-layer-opacity)};
      --md-ripple-focus-state-layer-opacity: #{map.get($theme, selected-focus-state-layer-opacity)};
      --md-ripple-pressed-state-layer-opacity: #{map.get($theme, selected-pressed-state-layer-opacity)};
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

    .md-ripple {
      --md-ripple-hover-state-layer-color: #{map.get($theme, selected-hover-state-layer-color)};
      --md-ripple-focus-state-layer-color: #{map.get($theme, selected-focus-state-layer-color)};
      --md-ripple-pressed-state-layer-color: #{map.get($theme, selected-pressed-state-layer-color)};
      --md-ripple-hover-state-layer-opacity: #{map.get($theme, selected-hover-state-layer-opacity)};
      --md-ripple-focus-state-layer-opacity: #{map.get($theme, selected-focus-state-layer-opacity)};
      --md-ripple-pressed-state-layer-opacity: #{map.get($theme, selected-pressed-state-layer-opacity)};
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
