<template>
  <MdMenu class="md-autocomplete" :class="$attrs.class" :style="$attrs.style" v-model="menuOpened" content-role="presentation" :focus-first-item-on-open="false" :restore-focus-on-close="false">
    <template v-slot:activator>
      <MdOutlinedTextField
        v-bind="getControlAttrs($attrs)"
        v-model="searchText"
        :label="props.label"
        :disabled="disabled"
        :readonly="readonly"
        role="combobox"
        aria-autocomplete="list"
        aria-haspopup="listbox"
        :aria-expanded="menuOpened"
        :aria-controls="listboxId"
        :aria-activedescendant="menuOpened && activeIndex >= 0 ? `${listboxId}-${activeIndex}` : undefined"
        @focus="onTextFieldFocus"
        @blur="menuOpened = false"
        @input="onTextFieldInput"
        @keydown="onTextFieldKeydown"
      />
    </template>

    <MdList ref="listEl" :id="listboxId" role="listbox" :aria-label="$attrs['aria-label'] || label" :aria-labelledby="$attrs['aria-labelledby']">
      <template v-if="filteredItems.length">
        <MdListItem
          v-for="(item, index) in filteredItems"
          :id="`${listboxId}-${index}`"
          :key="index"
          role="option"
          tabindex="-1"
          :aria-selected="activeIndex === index"
          :selected="activeIndex === index"
          :headline="item"
          @mousedown.prevent
          @click="onMenuListItemClick(index)"
        />
      </template>
      <template v-else>
        <MdListItem role="presentation" headline="No data available"></MdListItem>
      </template>
    </MdList>
  </MdMenu>
</template>

<script setup>
import { computed, nextTick, onBeforeMount, ref, useId, watch } from 'vue';
import MdOutlinedTextField from '../text-field/MdOutlinedTextField.vue';
import MdMenu from '../menu/MdMenu.vue';
import MdList from '../list/MdList.vue';
import MdListItem from '../list/MdListItem.vue';

import { getControlAttrs } from '../field/fieldAttrs';

defineOptions({ inheritAttrs: false });

const props = defineProps({
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  modelValue: { type: String, default: null },
  label: { type: String, default: null },
  items: { type: Array, default: () => [] },
});
const emit = defineEmits(['update:modelValue', 'update:search']);

const listboxId = `md-autocomplete-${useId()}-listbox`;
const listEl = ref(null);
const activeIndex = ref(-1);
let menuOpened = ref(false);
let searchText = ref(null);
let selecting = ref(false);
let isPristine = ref(true);

const filteredItems = computed(() => {
  if (!selecting.value && searchText.value) {
    return props.items.filter((item) => typeof item === 'string' && item.toLocaleLowerCase().includes(searchText.value.toLocaleLowerCase()));
  }
  return props.items;
});

onBeforeMount(() => {
  searchText.value = props.modelValue;
});

const onTextFieldFocus = () => {
  if (props.disabled || props.readonly) return;
  menuOpened.value = true;
};
const onTextFieldInput = () => {
  activeIndex.value = -1;
  menuOpened.value = true;
  selecting.value = false;
  isPristine.value = false;
  emit('update:search', searchText.value);
};
const onMenuListItemClick = (index) => {
  if (props.disabled || props.readonly || index < 0 || index >= filteredItems.value.length) return;
  const selectedItem = filteredItems.value[index];
  searchText.value = selectedItem;
  menuOpened.value = false;
  isPristine.value = true;
  emit('update:modelValue', selectedItem);
};

const onTextFieldKeydown = async (event) => {
  if (props.disabled || props.readonly || event.isComposing || event.keyCode === 229 || event.ctrlKey || event.metaKey || event.altKey) return;

  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault();
    event.stopPropagation();
    menuOpened.value = true;
    await nextTick();
    if (!menuOpened.value || props.disabled || props.readonly) return;
    const lastIndex = filteredItems.value.length - 1;
    if (lastIndex < 0) return;
    const direction = event.key === 'ArrowDown' ? 1 : -1;
    activeIndex.value = activeIndex.value < 0 ? (direction > 0 ? 0 : lastIndex) : Math.max(0, Math.min(lastIndex, activeIndex.value + direction));
    await nextTick();
    listEl.value?.$el.querySelector(`[id="${listboxId}-${activeIndex.value}"]`)?.scrollIntoView?.({ block: 'nearest' });
  } else if (event.key === 'Enter' && menuOpened.value && activeIndex.value >= 0) {
    event.preventDefault();
    event.stopPropagation();
    onMenuListItemClick(activeIndex.value);
  } else if (event.key === 'Escape' && menuOpened.value) {
    event.preventDefault();
    event.stopPropagation();
    searchText.value = props.modelValue;
    isPristine.value = true;
    menuOpened.value = false;
  } else if (event.key === 'Tab') {
    menuOpened.value = false;
  }
};

watch(
  () => filteredItems.value.slice(),
  () => {
    activeIndex.value = -1;
  }
);
watch([() => props.disabled, () => props.readonly], ([disabled, readonly]) => {
  if (disabled || readonly) menuOpened.value = false;
});

watch(
  () => props.modelValue,
  (newValue) => {
    activeIndex.value = -1;
    searchText.value = newValue;
    isPristine.value = true;
  }
);

watch(
  () => menuOpened.value,
  (newValue) => {
    if (newValue) {
      if (searchText.value === props.modelValue) {
        selecting.value = true;
      } else {
        selecting.value = false;
      }
    } else {
      activeIndex.value = -1;
      if (!isPristine.value) {
        searchText.value = null;
        emit('update:modelValue', null);
      }
      selecting.value = false;
    }
  }
);
</script>

<style lang="scss">
.md-autocomplete {
  width: 100%;

  .md-menu__activator {
    width: 100%;
  }

  .md-menu__content {
    width: 100%;
  }

  .md-outlined-text-field {
    width: 100%;
  }
}
</style>
