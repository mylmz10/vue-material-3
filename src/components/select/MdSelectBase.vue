<template>
  <MdMenu :class="`${selectClass}-menu`" v-model="menuOpened" :focus-first-item-on-open="false" :restore-focus-on-close="false">
    <template #activator>
      <span :class="[selectClass, { [`${selectClass}--open`]: menuOpened, [`${selectClass}--disabled`]: disabled }]">
        <input
          v-if="name || required"
          ref="formInputEl"
          :class="`${selectClass}__hidden-input`"
          type="text"
          :name="name || undefined"
          :form="form"
          :value="formValue"
          :required="required"
          :disabled="disabled"
          tabindex="-1"
          aria-hidden="true"
          @invalid.prevent="onInvalid"
          @focus="triggerEl?.focus()"
          @beforeinput.prevent
          @input="restoreFormValue"
        />

        <component :is="fieldComponent" :disabled="disabled" :error="error || validationInvalid" :label="label" :populated="isPopulated">
          <button
            ref="triggerEl"
            :class="`${selectClass}__trigger`"
            type="button"
            :form="form"
            role="combobox"
            :disabled="disabled"
            :aria-expanded="`${menuOpened}`"
            aria-haspopup="listbox"
            :aria-required="required"
            :aria-invalid="error || validationInvalid"
            :aria-controls="listboxId"
            :aria-activedescendant="activeOptionId || undefined"
            @click="toggleMenu"
            @keydown="onActivatorKeydown"
            @focus="onFocus"
            @blur="onBlur"
          >
            <span :class="[`${selectClass}__value`, { [`${selectClass}__value--placeholder`]: !displayLabel }]">
              {{ displayLabel || placeholder }}
            </span>
          </button>

          <template #end>
            <MdIcon :class="`${selectClass}__icon`">expand_more</MdIcon>
          </template>

          <template #supporting-text>
            <slot name="supporting-text">
              {{ supportingText }}
            </slot>
          </template>
        </component>
      </span>
    </template>

    <MdList :id="listboxId" :class="`${selectClass}__list`" role="listbox" @keydown="onListKeydown">
      <slot />
    </MdList>
  </MdMenu>
</template>

<script setup>
import { useFormReset } from '../../composables/useFormReset';
import { computed, nextTick, onMounted, provide, ref, toRaw, useId, watch } from 'vue';
import { selectEmits, selectProps } from './selectProps';
import MdOutlinedField from '../field/MdOutlinedField.vue';
import MdFilledField from '../field/MdFilledField.vue';
import MdIcon from '../icon/MdIcon.vue';
import MdList from '../list/MdList.vue';
import MdMenu from '../menu/MdMenu.vue';

const mdSelectContextKey = 'mdSelectContext';

const props = defineProps({
  ...selectProps,
  variant: { type: String, required: true },
});
const emit = defineEmits(selectEmits);
const selectClass = computed(() => `md-${props.variant}-select`);
const fieldComponent = computed(() => (props.variant === 'outlined' ? MdOutlinedField : MdFilledField));

const normalizeValue = (value) => {
  if (value === null || value === undefined) {
    return '';
  }

  return `${value}`;
};

const validationInvalid = ref(false);
const onInvalid = () => {
  validationInvalid.value = true;
  triggerEl.value?.focus();
};
const restoreFormValue = (event) => {
  event.target.value = formValue.value;
};
const formInputEl = ref(null);
const triggerEl = ref(null);
const menuOpened = ref(false);
const internalValue = ref(props.modelValue !== undefined ? props.modelValue : props.value ?? '');
const displayLabel = ref('');
const initialValue = ref(props.modelValue !== undefined ? props.modelValue : props.value ?? '');
const registeredOptions = ref(new Map());
const initializedFromOption = ref(false);
const activeOptionId = ref('');
const lastOpenDirection = ref(0);
const listboxId = `${selectClass.value}-listbox-${useId()}`;

const formValue = computed(() => normalizeValue(internalValue.value));
watch([formValue, () => props.required, () => props.disabled], () => {
  validationInvalid.value = false;
});

const isPopulated = computed(() => {
  return !!displayLabel.value || !!normalizeValue(internalValue.value);
});

const isValueSelected = (value) => {
  const current = internalValue.value;
  if ((current !== null && typeof current === 'object') || (value !== null && typeof value === 'object')) {
    return toRaw(current) === toRaw(value);
  }

  return normalizeValue(internalValue.value) === normalizeValue(value);
};

const getOptions = () => {
  return Array.from(registeredOptions.value.values());
};

const getEnabledOptions = () => {
  return getOptions()
    .filter((option) => !option.disabled)
    .sort((a, b) => {
      if (!a.el || !b.el) return 0;
      // Keyed options can move without registering again.
      const position = a.el.compareDocumentPosition(b.el);
      if (position & Node.DOCUMENT_POSITION_DISCONNECTED) return 0;
      if (position & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
      if (position & Node.DOCUMENT_POSITION_PRECEDING) return 1;
      return 0;
    });
};

const syncDisplayLabel = () => {
  const selectedOption = getOptions().find((option) => isValueSelected(option.value));

  if (!selectedOption) {
    displayLabel.value = '';
    return;
  }

  displayLabel.value = selectedOption.displayText || selectedOption.typeaheadText || normalizeValue(selectedOption.value);
};

const focusActiveOptionElement = () => {
  registeredOptions.value.get(activeOptionId.value)?.el?.focus();
};

const setInitialActiveOption = (direction = 0) => {
  const enabledOptions = getEnabledOptions();

  if (!enabledOptions.length) {
    activeOptionId.value = '';
    return;
  }

  const selectedOption = enabledOptions.find((option) => isValueSelected(option.value));
  if (selectedOption) {
    activeOptionId.value = selectedOption.id;
    return;
  }

  if (direction < 0) {
    activeOptionId.value = enabledOptions[enabledOptions.length - 1].id;
    return;
  }

  activeOptionId.value = enabledOptions[0].id;
};

const moveActiveOption = (step) => {
  const enabledOptions = getEnabledOptions();

  if (!enabledOptions.length) {
    activeOptionId.value = '';
    return;
  }

  const currentIndex = enabledOptions.findIndex((option) => option.id === activeOptionId.value);

  if (currentIndex === -1) {
    setInitialActiveOption(step);
    nextTick(() => {
      focusActiveOptionElement();
    });
    return;
  }

  const nextIndex = (currentIndex + step + enabledOptions.length) % enabledOptions.length;
  activeOptionId.value = enabledOptions[nextIndex].id;

  nextTick(() => {
    focusActiveOptionElement();
  });
};

const closeMenu = () => {
  menuOpened.value = false;
};

const selectValue = (nextValue, emitInteraction = false, closeAfterSelect = false) => {
  internalValue.value = nextValue;
  emit('update:modelValue', nextValue);

  if (emitInteraction) {
    emit('input', nextValue);
    emit('change', nextValue);
  }

  syncDisplayLabel();

  if (closeAfterSelect) {
    closeMenu();
    nextTick(() => {
      triggerEl.value?.focus();
    });
  }
};

const selectActiveOption = () => {
  if (props.disabled) return;
  const selectedOption = getOptions().find((option) => option.id === activeOptionId.value);
  if (!selectedOption || selectedOption.disabled) {
    return;
  }

  selectValue(selectedOption.value, true, true);
};

const onOptionInteraction = (option) => {
  if (props.disabled || option.disabled) {
    return;
  }

  activeOptionId.value = option.id;
  selectValue(option.value, true, true);
};

const onOptionSelectedStateChange = (option, selected) => {
  const cached = registeredOptions.value.get(option.id);
  if (cached) {
    registeredOptions.value.set(option.id, {
      ...cached,
      selected,
    });
  }

  if (props.disabled || option.disabled) {
    return;
  }

  if (selected) {
    activeOptionId.value = option.id;
    selectValue(option.value, false, false);
    return;
  }

  if (!isValueSelected(option.value)) {
    return;
  }

  const fallback = getOptions().find((item) => item.selected && !item.disabled && item.id !== option.id);
  selectValue(fallback ? fallback.value : '', false, false);
};

const registerOption = (option) => {
  registeredOptions.value.set(option.id, option);

  if (props.modelValue === undefined && !initializedFromOption.value && !normalizeValue(internalValue.value) && option.selected && !option.disabled) {
    initializedFromOption.value = true;
    internalValue.value = option.value;
    emit('update:modelValue', option.value);
  }

  syncDisplayLabel();
};

const unregisterOption = (optionId) => {
  registeredOptions.value.delete(optionId);

  if (activeOptionId.value === optionId) {
    activeOptionId.value = '';
  }

  syncDisplayLabel();
};

const isOptionActive = (optionId) => {
  return activeOptionId.value === optionId;
};

const getOptionTabIndex = (option) => {
  if (option.disabled || !menuOpened.value) {
    return -1;
  }

  return activeOptionId.value === option.id ? 0 : -1;
};

provide(mdSelectContextKey, {
  registerOption,
  unregisterOption,
  isValueSelected,
  onOptionInteraction,
  onOptionSelectedStateChange,
  isOptionActive,
  getOptionTabIndex,
});

const openMenu = (direction = 0) => {
  if (props.disabled || menuOpened.value) {
    return;
  }

  lastOpenDirection.value = direction;
  menuOpened.value = true;
};

const toggleMenu = () => {
  if (menuOpened.value) {
    closeMenu();
  } else {
    openMenu(0);
  }
};

const onActivatorKeydown = (event) => {
  if (props.disabled) {
    return;
  }

  if (menuOpened.value && (event.key === 'Home' || event.key === 'End')) {
    onListKeydown(event);
    return;
  }

  if (event.key === 'ArrowDown') {
    event.preventDefault();
    if (!menuOpened.value) {
      openMenu(1);
      return;
    }
    moveActiveOption(1);
    return;
  }

  if (event.key === 'ArrowUp') {
    event.preventDefault();
    if (!menuOpened.value) {
      openMenu(-1);
      return;
    }
    moveActiveOption(-1);
    return;
  }

  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    if (!menuOpened.value) {
      openMenu(0);
      return;
    }
    selectActiveOption();
    return;
  }

  if ((event.key === 'Escape' || event.key === 'Tab') && menuOpened.value) {
    closeMenu();
  }
};

watch(
  () => props.disabled,
  (disabled) => {
    if (disabled) closeMenu();
  }
);

const onListKeydown = (event) => {
  if (props.disabled) return;
  if (event.key === 'ArrowDown') {
    event.preventDefault();
    moveActiveOption(1);
    return;
  }

  if (event.key === 'ArrowUp') {
    event.preventDefault();
    moveActiveOption(-1);
    return;
  }

  if (event.key === 'Home') {
    event.preventDefault();
    activeOptionId.value = getEnabledOptions()[0]?.id || '';
    nextTick(() => {
      focusActiveOptionElement();
    });
    return;
  }

  if (event.key === 'End') {
    event.preventDefault();
    activeOptionId.value = getEnabledOptions().at(-1)?.id || '';
    nextTick(() => {
      focusActiveOptionElement();
    });
    return;
  }

  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    selectActiveOption();
    return;
  }

  if (event.key === 'Escape') {
    event.preventDefault();
    closeMenu();
    triggerEl.value?.focus();
  } else if (event.key === 'Tab') {
    closeMenu();
  }
};

const onFocus = (event) => {
  emit('focus', event);
};

const onBlur = (event) => {
  emit('blur', event);
};

const handleFormReset = () => {
  validationInvalid.value = false;
  internalValue.value = initialValue.value ?? '';
  emit('update:modelValue', internalValue.value);
  emit('input', internalValue.value);
  emit('change', internalValue.value);
  syncDisplayLabel();
};

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue === undefined || isValueSelected(newValue)) {
      return;
    }

    internalValue.value = newValue;
    syncDisplayLabel();
  }
);

watch(
  () => menuOpened.value,
  (isOpen, wasOpen) => {
    if (isOpen && !wasOpen) {
      setInitialActiveOption(lastOpenDirection.value);
      emit('open');
      nextTick(() => {
        focusActiveOptionElement();
      });
      return;
    }

    if (!isOpen && wasOpen) {
      activeOptionId.value = '';
      emit('close');
    }
  }
);

onMounted(() => {
  syncDisplayLabel();
});

useFormReset(() => formInputEl.value || triggerEl.value, handleFormReset);
</script>

<style src="./select.scss" lang="scss"></style>
