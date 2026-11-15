<template>
  <MdTextField
    ref="field"
    v-bind="{ ...$attrs, ...$props }"
    variant="outlined"
    @update:modelValue="$emit('update:modelValue', $event)"
    @input="$emit('input', $event)"
    @change="$emit('change', $event)"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
    @select="$emit('select', $event)"
    @keyup="$emit('keyup', $event)"
    @keydown="$emit('keydown', $event)"
    @invalid="$emit('invalid', $event)"
  >
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </MdTextField>
</template>

<script setup>
import { ref } from 'vue';
import MdTextField from './MdTextField.vue';
import { textFieldEmits, textFieldProps } from './textFieldProps';

defineOptions({ inheritAttrs: false });
defineProps(textFieldProps);
defineEmits(textFieldEmits);

const field = ref(null);
defineExpose({
  getInputEl: () => field.value?.getInputEl(),
  focus: () => field.value?.focus(),
  blur: () => field.value?.blur(),
  checkValidity: () => field.value?.checkValidity(),
  reportValidity: () => field.value?.reportValidity(),
  setCustomValidity: (message) => field.value?.setCustomValidity(message),
});
</script>
