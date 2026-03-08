<template>
  <div class="md-radio" :class="{ 'md-radio--disabled': disabled, 'md-radio--checked': checked }">
    <MdRipple />
    <input
      ref="inputEl"
      :checked="checked"
      :disabled="disabled"
      :name="name || undefined"
      type="radio"
      :value="value"
      :form="form || undefined"
      :required="required"
      @input="onInput"
      @change="onChange"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
    />
    <div class="md-radio__background">
      <div class="md-radio__outer-circle"></div>
      <div class="md-radio__inner-circle"></div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import MdRipple from '../ripple/MdRipple.vue';

const emit = defineEmits(['update:modelValue', 'input', 'change', 'focus', 'blur']);

const props = defineProps({
  checked: { type: Boolean, default: undefined },
  disabled: { type: Boolean, default: false },
  form: { type: String, default: '' },
  modelValue: { type: [String, Number, Boolean], default: undefined },
  name: { type: String, default: '' },
  required: { type: Boolean, default: false },
  value: { type: [String, Number, Boolean], default: '' },
});

const inputEl = ref(null);
const internalChecked = ref(false);
const initialChecked = ref(false);
let formEl = null;

const resolveChecked = () => {
  if (props.modelValue !== undefined) {
    return props.modelValue === props.value;
  }

  return !!props.checked;
};

watch(
  () => props.modelValue,
  () => {
    internalChecked.value = resolveChecked();
  },
  { immediate: true },
);

watch(
  () => props.checked,
  () => {
    if (props.modelValue !== undefined) {
      return;
    }

    internalChecked.value = resolveChecked();
  },
  { immediate: true },
);

const onInput = (ev) => {
  if (props.disabled) {
    return;
  }

  emit('input', ev.target.checked ? props.value : null);
};

const onChange = (ev) => {
  if (props.disabled) {
    ev.target.checked = internalChecked.value;
    return;
  }

  internalChecked.value = ev.target.checked;
  if (internalChecked.value) {
    emit('update:modelValue', props.value);
    emit('change', props.value);
  }
};

const onFormReset = () => {
  internalChecked.value = initialChecked.value;
  if (internalChecked.value) {
    emit('update:modelValue', props.value);
  }
};

const checked = computed(() => internalChecked.value);

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
  internalChecked.value = resolveChecked();
  initialChecked.value = internalChecked.value;
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

$theme: tokens.md-comp-radio-button-values();
$sys-color: tokens.md-sys-color-values-light();

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
  display: inline-flex;

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
      border-color: map.get($sys-color, outline);
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
