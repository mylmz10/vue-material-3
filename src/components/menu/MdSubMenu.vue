<template>
  <div class="md-sub-menu" :class="{ 'md-sub-menu--open': isOpen, 'md-sub-menu--disabled': disabled }">
    <MdMenuItem
      ref="triggerItemEl"
      class="md-sub-menu__trigger"
      :label="label"
      :icon="icon"
      :disabled="disabled"
      :submenu="true"
      :keep-open="true"
      trailing-icon="chevron_right"
      @click="onTriggerClick"
      @keydown="onTriggerKeydown"
      @submenu-open-request="openAndFocusFirst"
    >
      <slot name="trigger">{{ label }}</slot>
    </MdMenuItem>
    <MdMenu
      ref="subMenuEl"
      class="md-sub-menu__menu"
      :model-value="isOpen"
      :nested="true"
      :close-on-select="closeOnSelect"
      :focus-first-item-on-open="false"
      :restore-focus-on-close="false"
      @update:modelValue="onSubMenuModelUpdate"
      @close="onSubMenuClose"
    >
      <slot />
    </MdMenu>
  </div>
</template>

<script setup>
import { inject, nextTick, onBeforeUnmount, onMounted, provide, ref, watch } from 'vue';
import MdMenu from './MdMenu.vue';
import MdMenuItem from './MdMenuItem.vue';

const props = defineProps({
  label: {
    type: [String, Number],
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: Boolean,
    default: undefined,
  },
  closeOnSelect: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['update:modelValue', 'open', 'close']);
const subMenuEl = ref(null);
const triggerItemEl = ref(null);
const isOpen = ref(!!props.modelValue);
const mdMenuContextKey = 'mdMenuContext';
const mdSubMenuContextKey = 'mdSubMenuContext';
const parentMenuContext = inject(mdMenuContextKey, null);
const subMenuId = `md-sub-menu-${Math.random().toString(36).slice(2, 10)}-${Date.now().toString(36)}`;

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue === undefined) {
      return;
    }
    if (newValue === isOpen.value) {
      return;
    }
    setOpen(!!newValue, { emitModelUpdate: false });
  },
  { immediate: true }
);

const setOpen = (nextOpen, options = {}) => {
  const { emitModelUpdate = true, focusTrigger = false } = options;
  if (props.disabled && nextOpen) {
    return;
  }
  if (nextOpen === isOpen.value) {
    return;
  }

  isOpen.value = nextOpen;

  if (emitModelUpdate) {
    emit('update:modelValue', nextOpen);
  }

  if (nextOpen) {
    parentMenuContext?.requestOpenSubMenu?.(subMenuId);
    emit('open');
    return;
  }

  parentMenuContext?.notifySubMenuClosed?.(subMenuId);
  emit('close');
  if (focusTrigger) {
    triggerItemEl.value?.focus?.();
  }
};

const openAndFocusFirst = () => {
  setOpen(true, { emitModelUpdate: true });
  nextTick(() => {
    subMenuEl.value?.focusFirstItem?.();
  });
};

const closeAndFocusTrigger = () => {
  setOpen(false, { emitModelUpdate: true, focusTrigger: true });
};

const onTriggerClick = () => {
  if (isOpen.value) {
    setOpen(false, { emitModelUpdate: true });
    return;
  }
  openAndFocusFirst();
};

const onTriggerKeydown = (event) => {
  if (event.key === 'ArrowRight') {
    event.preventDefault();
    openAndFocusFirst();
    return;
  }

  if ((event.key === 'Escape' || event.key === 'ArrowLeft') && isOpen.value) {
    event.preventDefault();
    closeAndFocusTrigger();
  }
};

const onSubMenuModelUpdate = (nextValue) => {
  setOpen(nextValue, { emitModelUpdate: true });
};

const onSubMenuClose = () => {
  setOpen(false, { emitModelUpdate: true });
};

provide(mdSubMenuContextKey, {
  closeAndFocusTrigger,
});

onMounted(() => {
  parentMenuContext?.registerSubMenu?.(subMenuId, {
    close: ({ emitModelUpdate = true, focusTrigger = false } = {}) => {
      setOpen(false, { emitModelUpdate, focusTrigger });
    },
  });
});

onBeforeUnmount(() => {
  parentMenuContext?.unregisterSubMenu?.(subMenuId);
});
</script>

<style lang="scss">
.md-sub-menu {
  position: relative;
}
</style>
