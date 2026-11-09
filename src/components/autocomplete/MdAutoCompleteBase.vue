<template>
  <div class="md-autocomplete" :class="$attrs.class" :style="$attrs.style">
    <component
      :is="fieldComponent"
      ref="textFieldEl"
      v-bind="getControlAttrs($attrs)"
      :model-value="mode === 'modal' ? displayValue : searchText"
      :label="label"
      :disabled="disabled"
      :readonly="readonly || mode === 'modal'"
      role="combobox"
      aria-autocomplete="list"
      :aria-haspopup="mode === 'modal' ? 'dialog' : 'listbox'"
      :aria-expanded="opened"
      :aria-controls="mode === 'modal' ? (opened ? dialogId : undefined) : listboxId"
      :aria-activedescendant="mode === 'docked' ? activeId : undefined"
      @focus="onFocus"
      @click="open()"
      @blur="mode === 'docked' && close()"
      @input="onInput"
      @keydown="onKeydown"
    >
      <template v-if="showClear" #end>
        <button class="md-autocomplete__clear" type="button" :aria-label="clearLabel" @mousedown.prevent @click.stop="clear">
          <MdIcon>close</MdIcon>
        </button>
      </template>
    </component>
    <MdAutocompletePopup v-if="mode === 'docked'" :open="opened" :anchor="() => textFieldEl?.getInputEl()?.closest('.md-field')" @dismiss="close()">
      <AutocompleteList />
    </MdAutocompletePopup>
    <MdDialog
      v-if="mode === 'modal'"
      :id="dialogId"
      :model-value="opened"
      :initial-focus="() => modalFieldEl?.getInputEl()"
      :aria-label="$attrs['aria-label'] || label || 'Suggestions'"
      dialog-class="md-autocomplete__dialog"
      @update:modelValue="(value) => !value && close()"
    >
      <component
        :is="fieldComponent"
        ref="modalFieldEl"
        :model-value="searchText"
        :label="label"
        :placeholder="$attrs.placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :aria-label="$attrs['aria-label'] || label || 'Suggestions'"
        role="combobox"
        aria-autocomplete="list"
        aria-haspopup="listbox"
        :aria-expanded="opened"
        :aria-controls="listboxId"
        :aria-activedescendant="activeId"
        @input="onInput"
        @keydown="onKeydown"
      >
        <template v-if="showClear" #end>
          <button class="md-autocomplete__clear" type="button" :aria-label="clearLabel" @mousedown.prevent @click.stop="clear">
            <MdIcon>close</MdIcon>
          </button>
        </template>
      </component>
      <AutocompleteList />
      <template #footer><MdTextButton :label="closeLabel" @click="close()" /></template>
    </MdDialog>
  </div>
</template>

<script setup>
import { computed, h, inject, nextTick, onBeforeUnmount, ref, shallowRef, toRaw, useAttrs, useId, watch } from 'vue';
import { autocompleteProps } from './autocompleteProps';
import { getControlAttrs } from '../field/fieldAttrs';
import { useFormReset } from '../../composables/useFormReset';
import MdFilledTextField from '../text-field/MdFilledTextField.vue';
import MdOutlinedTextField from '../text-field/MdOutlinedTextField.vue';
import MdAutocompletePopup from './MdAutocompletePopup.vue';
import MdList from '../list/MdList.vue';
import MdListItem from '../list/MdListItem.vue';
import MdDialog from '../dialog/MdDialog.vue';
import MdIcon from '../icon/MdIcon.vue';
import MdTextButton from '../button/MdTextButton.vue';

defineOptions({ inheritAttrs: false });
const props = defineProps({ ...autocompleteProps, variant: { type: String, default: 'filled' } });
const emit = defineEmits(['update:modelValue', 'update:search', 'debounced']);
const attrs = useAttrs();
const fieldComponent = computed(() => (props.variant === 'outlined' ? MdOutlinedTextField : MdFilledTextField));
const id = `md-autocomplete-${useId()}`;
const listboxId = `${id}-listbox`;
const dialogId = `${id}-dialog`;
const textFieldEl = ref(null);
const modalFieldEl = ref(null);
const listEl = ref(null);
const opened = ref(false);
const activeIndex = ref(-1);
const initialValue = shallowRef(props.modelValue);
const selectedValue = ref(props.modelValue);
const dirty = ref(false);
let filterTimer;
let suppressFocus = false;

const isValue = (value) =>
  typeof value === 'string' || typeof value === 'boolean' || (typeof value === 'number' && Number.isFinite(value)) || (value != null && typeof value === 'object' && !Array.isArray(value));
const options = computed(() =>
  props.items.flatMap((item) => {
    if (typeof item === 'string' || (typeof item === 'number' && Number.isFinite(item))) return [{ value: item, label: String(item), disabled: false }];
    if (item && !Array.isArray(item) && typeof item === 'object' && typeof item.label === 'string' && isValue(item.value)) {
      return [{ value: item.value, label: item.label, disabled: !!item.disabled }];
    }
    return [];
  })
);
const labelFor = (value) => {
  const option = options.value.find((item) => Object.is(toRaw(item.value), toRaw(value)));
  return option ? option.label : value != null && typeof value !== 'object' ? String(value) : '';
};
const displayValue = computed(() => labelFor(selectedValue.value));
const searchText = ref(props.mode === 'modal' ? '' : displayValue.value);
const filteredItems = computed(() => {
  const query = dirty.value ? searchText.value.toLocaleLowerCase() : '';
  return options.value.filter((item) => item.label.toLocaleLowerCase().includes(query));
});
const activeId = computed(() => (opened.value && activeIndex.value >= 0 ? `${listboxId}-${activeIndex.value}` : undefined));
const showClear = computed(() => props.clearable && !props.disabled && !props.readonly && (selectedValue.value != null || !!searchText.value));

// Render the same option surface in the menu and dialog, keeping IDs and guards identical.
const AutocompleteList = () =>
  h(
    MdList,
    { ref: listEl, id: listboxId, role: 'listbox', 'aria-label': attrs['aria-label'] || props.label || 'Suggestions', 'aria-labelledby': attrs['aria-labelledby'] },
    {
      default: () =>
        filteredItems.value.length
          ? filteredItems.value.map((item, index) => {
              const committed = Object.is(toRaw(item.value), toRaw(selectedValue.value));
              const active = activeIndex.value === index;
              return h(
                MdListItem,
                {
                  id: `${listboxId}-${index}`,
                  key: index,
                  role: 'option',
                  tabindex: '-1',
                  'aria-selected': activeIndex.value >= 0 ? active : committed,
                  'aria-disabled': item.disabled || undefined,
                  class: { 'md-autocomplete__option--disabled': item.disabled, 'md-autocomplete__option--committed': committed },
                  selected: active,
                  headline: item.label,
                  onMousedown: (event) => event.preventDefault(),
                  onClick: () => select(index),
                },
                committed ? { end: () => h(MdIcon, null, { default: () => 'check' }) } : undefined
              );
            })
          : h(MdListItem, { role: 'presentation', headline: props.noResultsText }),
    }
  );

const cancelFilter = () => {
  clearTimeout(filterTimer);
  filterTimer = undefined;
};
const resetQuery = () => {
  cancelFilter();
  searchText.value = props.mode === 'modal' ? '' : displayValue.value;
  activeIndex.value = -1;
  dirty.value = false;
};
const open = () => {
  if (props.disabled || props.readonly || opened.value) return;
  opened.value = true;
};
const close = () => {
  if (!opened.value) return;
  opened.value = false;
  resetQuery();
};
const onFocus = () => {
  if (!suppressFocus && props.mode === 'docked') open();
};
const onInput = (value) => {
  if (props.disabled || props.readonly) return;
  cancelFilter();
  searchText.value = value;
  activeIndex.value = -1;
  dirty.value = true;
  open();
  emit('update:search', value);
  if (props.debounce > 0) {
    filterTimer = setTimeout(() => {
      filterTimer = undefined;
      emit('debounced', value);
    }, props.debounce);
  }
};
const select = (index) => {
  const item = filteredItems.value[index];
  if (props.disabled || props.readonly || !opened.value || !item || item.disabled) return;
  selectedValue.value = item.value;
  dirty.value = false;
  close();
  emit('update:modelValue', toRaw(item.value));
};
const clear = () => {
  if (props.disabled || props.readonly) return;
  selectedValue.value = null;
  resetQuery();
  emit('update:modelValue', null);
  emit('update:search', '');
  suppressFocus = true;
  (props.mode === 'modal' && opened.value ? modalFieldEl : textFieldEl).value?.focus();
  suppressFocus = false;
};
const onKeydown = async (event) => {
  if (props.disabled || props.readonly || event.isComposing || event.keyCode === 229 || event.ctrlKey || event.metaKey || event.altKey) return;
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault();
    event.stopPropagation();
    const wasOpen = opened.value;
    open();
    await nextTick();
    if (!opened.value || props.disabled || props.readonly) return;
    if (props.mode === 'modal' && !wasOpen) return;
    const enabled = filteredItems.value.map((item, index) => (item.disabled ? -1 : index)).filter((index) => index !== -1);
    const position = enabled.indexOf(activeIndex.value);
    const next = position < 0 ? (event.key === 'ArrowDown' ? 0 : enabled.length - 1) : Math.max(0, Math.min(enabled.length - 1, position + (event.key === 'ArrowDown' ? 1 : -1)));
    activeIndex.value = enabled[next] ?? -1;
    await nextTick();
    listEl.value?.$el.querySelector(`[id="${activeId.value}"]`)?.scrollIntoView?.({ block: 'nearest' });
  } else if (event.key === 'Enter' && opened.value && activeIndex.value >= 0) {
    event.preventDefault();
    event.stopPropagation();
    select(activeIndex.value);
  } else if (event.key === 'Enter' && props.mode === 'modal' && !opened.value) {
    event.preventDefault();
    open();
  } else if (event.key === 'Escape' && opened.value) {
    event.preventDefault();
    event.stopPropagation();
    close();
  } else if (event.key === 'Tab' && props.mode === 'docked') close();
};

watch(filteredItems, () => (activeIndex.value = -1), { deep: true });
watch(
  () => props.modelValue,
  (value) => {
    selectedValue.value = value;
    resetQuery();
  }
);
watch(displayValue, (value) => {
  if (!dirty.value && props.mode === 'docked') searchText.value = value;
});
watch([() => props.disabled, () => props.readonly, () => props.mode], () => close());
watch(() => props.debounce, cancelFilter);
const parentDialog = inject('mdDialogOpen', null);
if (parentDialog)
  watch(parentDialog, (open) => {
    if (!open) close();
  });
useFormReset(
  () => textFieldEl.value?.getInputEl(),
  () => {
    selectedValue.value = initialValue.value;
    close();
    resetQuery();
    emit('update:modelValue', toRaw(initialValue.value));
    emit('update:search', displayValue.value);
  }
);
onBeforeUnmount(cancelFilter);
</script>

<style lang="scss">
@use '../../styles/theme/md-sys-color' as theme;

.md-autocomplete__option--committed {
  background-color: #{theme.value('secondary-container')};
}

.md-autocomplete {
  width: 100%;
  .md-filled-text-field,
  .md-outlined-text-field {
    width: 100%;
  }
}
.md-autocomplete__clear {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  min-height: 40px;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: inherit;
  cursor: pointer;
  &:focus-visible {
    outline: 2px solid currentColor;
  }
}
.md-autocomplete__option--disabled {
  opacity: 0.38;
  cursor: default;
}
.md-autocomplete__dialog {
  .md-filled-text-field,
  .md-outlined-text-field {
    width: 100%;
  }
  .md-list {
    width: 100%;
    min-width: 0;
    max-height: min(50dvh, 400px);
    overflow-y: auto;
  }
}
</style>
