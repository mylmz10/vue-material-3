<template>
  <span class="md-filled-text-field" @click="onClick">
    <MdFilledField :label="label" :populated="!!inputValue">
      <MdTextFieldBase ref="textFieldEl" :value="inputValue" @input="onTextFieldInput" @focus="$emit('focus', $event)" @blur="$emit('blur', $event)" />
      <template #supporting-text>
        <slot name="supporting-text" />
      </template>
    </MdFilledField>
  </span>
</template>

<script setup>
import { ref, onBeforeMount, watch } from 'vue';
import MdTextFieldBase from './MdTextFieldBase.vue';
import MdFilledField from '../field/MdFilledField.vue';

const props = defineProps({
  disabled: { type: Boolean },
  error: { type: Boolean },
  label: { type: String },
  populated: { type: Boolean },
  required: { type: Boolean },
  focused: { type: Boolean },
  value: { type: String },
  modelValue: { type: String },
});

const emit = defineEmits(['focus', 'blur', 'update:modelValue']);

const inputValue = ref('');
const textFieldEl = ref(null);

onBeforeMount(() => {
  inputValue.value = props.modelValue;
});

watch(
  () => props.modelValue,
  () => {
    inputValue.value = props.modelValue;
  }
);

const onTextFieldInput = (ev) => {
  inputValue.value = ev.target.value;
  emit('update:modelValue', inputValue.value);
};

const onClick = () => {
  const inputEl = textFieldEl.value.$el.querySelector('.md-text-field__input');
  inputEl.focus();
};
</script>

<style lang="scss">
@use 'sass:map';
@use '../../styles/tokens';

$theme: tokens.md-comp-outlined-text-field-values();

.md-filled-text-field {
  height: map.get($theme, container-height);
  border-radius: map.get($theme, container-shape);

  .md-text-field__input {
    caret-color: map.get($theme, caret-color);
    color: map.get($theme, input-text-color);
    font-family: map.get($theme, input-text-font);
    line-height: map.get($theme, input-text-line-height);
    font-size: map.get($theme, input-text-size);
    font-weight: map.get($theme, input-text-weight);
    letter-spacing: map.get($theme, input-text-tracking);
  }

  .md-field--filled {
    width: 100%;
  }
}
</style>
