<template>
  <MdMenu class="md-filled-select-menu" v-model="menuOpened">
    <template #activator>
      <span class="md-filled-select" :class="{ 'md-filled-select--open': menuOpened, 'md-filled-select--disabled': disabled }">
        <input v-if="name" class="md-filled-select__hidden-input" type="hidden" :name="name" :value="formValue" />

        <MdFilledField :disabled="disabled" :error="error" :label="label" :populated="isPopulated">
          <button
            ref="triggerEl"
            class="md-filled-select__trigger"
            type="button"
            role="combobox"
            :disabled="disabled"
            :aria-expanded="`${menuOpened}`"
            aria-haspopup="listbox"
            :aria-controls="listboxId"
            :aria-activedescendant="activeOptionId || undefined"
            @click="toggleMenu"
            @keydown="onActivatorKeydown"
            @focus="onFocus"
            @blur="onBlur"
          >
            <span class="md-filled-select__value" :class="{ 'md-filled-select__value--placeholder': !displayLabel }">
              {{ displayLabel || placeholder }}
            </span>
          </button>

          <template #end>
            <MdIcon class="md-filled-select__icon">expand_more</MdIcon>
          </template>

          <template #supporting-text>
            <slot name="supporting-text">
              {{ supportingText }}
            </slot>
          </template>
        </MdFilledField>
      </span>
    </template>

    <MdList :id="listboxId" ref="listEl" class="md-filled-select__list" role="listbox" @keydown="onListKeydown">
      <slot />
    </MdList>
  </MdMenu>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, provide, ref, watch } from 'vue';
import MdFilledField from '../field/MdFilledField.vue';
import MdIcon from '../icon/MdIcon.vue';
import MdList from '../list/MdList.vue';
import MdMenu from '../menu/MdMenu.vue';

const mdSelectContextKey = 'mdSelectContext';

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean, Object],
    default: '',
  },
  value: {
    type: [String, Number, Boolean, Object],
    default: undefined,
  },
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Boolean,
    default: false,
  },
  supportingText: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue', 'input', 'change', 'focus', 'blur', 'open', 'close']);

const normalizeValue = (value) => {
  if (value === null || value === undefined) {
    return '';
  }

  return `${value}`;
};

const triggerEl = ref(null);
const listEl = ref(null);
const menuOpened = ref(false);
const internalValue = ref(props.modelValue ?? props.value ?? '');
const displayLabel = ref('');
const initialValue = ref(props.modelValue ?? props.value ?? '');
const registeredOptions = ref(new Map());
const initializedFromOption = ref(false);
const activeOptionId = ref('');
const lastOpenDirection = ref(0);
const listboxId = `md-filled-select-listbox-${Math.random().toString(36).slice(2, 10)}`;

const formValue = computed(() => normalizeValue(internalValue.value));

const isPopulated = computed(() => {
  return !!displayLabel.value || !!normalizeValue(internalValue.value);
});

const isValueSelected = (value) => {
  return normalizeValue(internalValue.value) === normalizeValue(value);
};

const getOptions = () => {
  return Array.from(registeredOptions.value.values());
};

const getEnabledOptions = () => {
  return getOptions().filter((option) => !option.disabled);
};

const getListElement = () => {
  return listEl.value?.$el || listEl.value || null;
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
  const listElement = getListElement();
  if (!listElement || !activeOptionId.value) {
    return;
  }

  const activeElement = listElement.querySelector(`[data-option-id="${activeOptionId.value}"]`);
  activeElement?.focus();
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

  if (!initializedFromOption.value && !normalizeValue(internalValue.value) && option.selected && !option.disabled) {
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

const onListKeydown = (event) => {
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
    setInitialActiveOption(1);
    nextTick(() => {
      focusActiveOptionElement();
    });
    return;
  }

  if (event.key === 'End') {
    event.preventDefault();
    setInitialActiveOption(-1);
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

  if (event.key === 'Escape' || event.key === 'Tab') {
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
  nextTick(() => {
    internalValue.value = initialValue.value || '';
    emit('update:modelValue', internalValue.value);
    emit('input', internalValue.value);
    emit('change', internalValue.value);
    syncDisplayLabel();
  });
};

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue === undefined || normalizeValue(newValue) === normalizeValue(internalValue.value)) {
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
  triggerEl.value?.closest('form')?.addEventListener('reset', handleFormReset);
});

onBeforeUnmount(() => {
  triggerEl.value?.closest('form')?.removeEventListener('reset', handleFormReset);
});
</script>

<style lang="scss">
@use 'sass:map';
@use '../../styles/tokens';

$theme: tokens.md-comp-filled-select-values();

.md-filled-select-menu {
  width: 100%;

  .md-menu__activator {
    display: block;
    width: 100%;
  }

  .md-menu__content {
    left: 0;
    right: 0;
    width: 100%;
  }
}

.md-filled-select {
  display: block;
  width: 100%;

  .md-field--filled {
    width: 100%;
  }

  &__hidden-input {
    display: none;
  }

  &__trigger {
    align-items: center;
    appearance: none;
    background: transparent;
    border: none;
    cursor: pointer;
    display: inline-flex;
    min-height: 56px;
    outline: none;
    padding: 0;
    text-align: left;
    width: 100%;
  }

  &__value {
    align-items: center;
    color: map.get($theme, text-field-input-text-color);
    display: inline-flex;
    font-family: map.get($theme, text-field-input-text-font);
    font-size: map.get($theme, text-field-input-text-size);
    font-weight: map.get($theme, text-field-input-text-weight);
    letter-spacing: map.get($theme, text-field-input-text-tracking);
    line-height: map.get($theme, text-field-input-text-line-height);
    width: 100%;
  }

  &__value--placeholder {
    color: map.get($theme, text-field-label-text-color);
  }

  &__icon {
    color: map.get($theme, text-field-label-text-color);
    transition: transform 0.2s ease;
    user-select: none;
  }

  &--open {
    .md-filled-select__icon {
      transform: rotate(180deg);
    }
  }

  &--disabled {
    .md-filled-select__trigger {
      cursor: default;
    }
  }

  &__list {
    max-height: 320px;
    min-width: 100%;
    padding-block: 0;
  }
}
</style>
