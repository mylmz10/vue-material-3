<template>
  <MdMenu class="md-autocomplete" v-model="menuOpened">
    <template v-slot:activator>
      <MdFilledTextField v-model="searchText" :label="props.label" @focus="onTextFieldFocus" @input="onTextFieldInput"></MdFilledTextField>
    </template>

    <MdList>
      <template v-if="filteredItems.length">
        <MdListItem v-for="(item, index) in filteredItems" :selected="modelValue === item" :headline="item" @click="onMenuListItemClick(index)"></MdListItem>
      </template>
      <template v-else>
        <MdListItem headline="No data available"></MdListItem>
      </template>
    </MdList>
  </MdMenu>
</template>

<script setup>
import { computed, onBeforeMount, ref, watch } from 'vue';
import MdFilledTextField from '../text-field/MdFilledTextField.vue';
import MdMenu from '../menu/MdMenu.vue';
import MdList from '../list/MdList.vue';
import MdListItem from '../list/MdListItem.vue';

const props = defineProps({ modelValue: { type: String, default: null }, label: { type: String, default: null }, items: { type: Array, default: null } });
const emit = defineEmits(['update:modelValue', 'update:search']);

let menuOpened = ref(false);
let searchText = ref(null);
let selecting = ref(false);
let isPristine = ref(true);

const filteredItems = computed(() => {
  if (!selecting.value && searchText.value) {
    return props.items.filter((item) => item.toLocaleLowerCase().includes(searchText.value.toLocaleLowerCase()));
  }
  return props.items;
});

onBeforeMount(() => {
  searchText.value = props.modelValue;
});

const onTextFieldFocus = () => {
  menuOpened.value = true;
};
const onTextFieldInput = () => {
  selecting.value = false;
  isPristine.value = false;
  emit('update:search', searchText.value);
};
const onMenuListItemClick = (index) => {
  searchText.value = filteredItems.value[index];
  menuOpened.value = false;
  isPristine.value = true;
  emit('update:modelValue', filteredItems.value[index]);
};

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

  .md-filled-text-field {
    width: 100%;
  }
}
</style>
