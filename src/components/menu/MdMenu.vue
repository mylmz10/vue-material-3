<template>
  <div class="md-menu" :class="{ 'md-menu--open': isOpen, 'md-menu--nested': nested }">
    <div v-if="hasActivator" ref="activatorEl" class="md-menu__activator">
      <slot name="activator" :onClick="onActivatorClick" :onKeydown="onActivatorKeydown" :open="open" :close="close" :toggle="toggle" :ariaExpanded="`${isOpen}`" :ariaHaspopup="'menu'" />
    </div>
    <div v-show="isOpen" ref="contentEl" class="md-menu__content" role="menu" tabindex="-1" @keydown="onMenuKeydown">
      <div class="md-menu__surface"></div>
      <slot />
    </div>
  </div>
</template>

<script setup>
import { computed, inject, nextTick, onBeforeUnmount, onMounted, provide, ref, useSlots, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: undefined,
  },
  closeOnOutsideClick: {
    type: Boolean,
    default: true,
  },
  closeOnSelect: {
    type: Boolean,
    default: true,
  },
  closeOnEscape: {
    type: Boolean,
    default: true,
  },
  focusFirstItemOnOpen: {
    type: Boolean,
    default: true,
  },
  restoreFocusOnClose: {
    type: Boolean,
    default: true,
  },
  nested: {
    type: Boolean,
    default: false,
  },
});

const slots = useSlots();
const activatorEl = ref(null);
const contentEl = ref(null);
const isOpen = ref(!!props.modelValue);
const openSubMenuId = ref(null);
const subMenuRegistry = new Map();
const mdMenuContextKey = 'mdMenuContext';
const mdSubMenuContextKey = 'mdSubMenuContext';
const parentMenuContext = inject(mdMenuContextKey, null);
const parentSubMenuContext = inject(mdSubMenuContextKey, null);
const hasActivator = computed(() => !!slots.activator);
const emit = defineEmits(['update:modelValue', 'open', 'close', 'select']);

onMounted(() => {
  document.addEventListener('mousedown', handleOutsideClick);
});

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleOutsideClick);
  closeAllSubMenus();
});

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue === undefined) {
      return;
    }
    if (newValue === isOpen.value) {
      return;
    }
    setOpen(!!newValue, { emitModelUpdate: false, source: 'model' });
  },
  { immediate: true }
);

const getMenuItems = () => {
  if (!contentEl.value) {
    return [];
  }

  return Array.from(contentEl.value.querySelectorAll('[data-md-menu-item="true"]')).filter((itemEl) => {
    if (itemEl.closest('.md-menu__content') !== contentEl.value) {
      return false;
    }
    if (itemEl.getAttribute('aria-disabled') === 'true') {
      return false;
    }
    if (itemEl.hasAttribute('disabled')) {
      return false;
    }
    return true;
  });
};

const getFocusedItemIndex = () => {
  const menuItems = getMenuItems();
  const focusedIndex = menuItems.findIndex((itemEl) => itemEl === document.activeElement);
  return {
    focusedIndex,
    menuItems,
  };
};

const focusItemByIndex = (index) => {
  const menuItems = getMenuItems();
  if (!menuItems.length) {
    return;
  }

  const boundedIndex = Math.max(0, Math.min(index, menuItems.length - 1));
  menuItems[boundedIndex]?.focus();
};

const focusFirstItem = () => {
  focusItemByIndex(0);
};

const focusLastItem = () => {
  const menuItems = getMenuItems();
  if (!menuItems.length) {
    return;
  }
  focusItemByIndex(menuItems.length - 1);
};

const moveFocus = (offset) => {
  const { focusedIndex, menuItems } = getFocusedItemIndex();
  if (!menuItems.length) {
    return;
  }

  const nextIndex = focusedIndex === -1 ? 0 : (focusedIndex + offset + menuItems.length) % menuItems.length;
  menuItems[nextIndex]?.focus();
};

const closeAllSubMenus = () => {
  openSubMenuId.value = null;
  Array.from(subMenuRegistry.values()).forEach((subMenuApi) => {
    subMenuApi?.close?.({ emitModelUpdate: true, focusTrigger: false });
  });
};

const setOpen = (nextOpen, options = {}) => {
  const { emitModelUpdate = true, source = 'programmatic', restoreFocus = props.restoreFocusOnClose } = options;

  if (nextOpen === isOpen.value) {
    return;
  }

  isOpen.value = nextOpen;

  if (emitModelUpdate) {
    emit('update:modelValue', nextOpen);
  }

  if (nextOpen) {
    emit('open', { source });
    nextTick(() => {
      if (props.focusFirstItemOnOpen) {
        focusFirstItem();
      }
    });
    return;
  }

  closeAllSubMenus();
  emit('close', { source });
  if (restoreFocus) {
    nextTick(() => {
      activatorEl.value?.focus?.();
    });
  }
};

const open = (options = {}) => {
  setOpen(true, options);
};

const close = (options = {}) => {
  setOpen(false, options);
};

const toggle = (options = {}) => {
  setOpen(!isOpen.value, options);
};

const onActivatorClick = () => {
  toggle({ source: 'activator-click' });
};

const onActivatorKeydown = (event) => {
  if (event.key === 'ArrowDown') {
    event.preventDefault();
    open({ source: 'activator-key' });
    nextTick(() => {
      focusFirstItem();
    });
    return;
  }

  if (event.key === 'ArrowUp') {
    event.preventDefault();
    open({ source: 'activator-key' });
    nextTick(() => {
      focusLastItem();
    });
    return;
  }

  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    toggle({ source: 'activator-key' });
  }
};

const onMenuKeydown = (event) => {
  if (event.key === 'ArrowDown') {
    event.preventDefault();
    moveFocus(1);
    return;
  }

  if (event.key === 'ArrowUp') {
    event.preventDefault();
    moveFocus(-1);
    return;
  }

  if (event.key === 'Home') {
    event.preventDefault();
    focusFirstItem();
    return;
  }

  if (event.key === 'End') {
    event.preventDefault();
    focusLastItem();
    return;
  }

  if (event.key === 'ArrowLeft' && parentSubMenuContext?.closeAndFocusTrigger) {
    event.preventDefault();
    parentSubMenuContext.closeAndFocusTrigger();
    return;
  }

  if (event.key === 'Escape') {
    event.preventDefault();
    if (parentSubMenuContext?.closeAndFocusTrigger) {
      parentSubMenuContext.closeAndFocusTrigger();
      return;
    }
    if (props.closeOnEscape) {
      close({ source: 'escape' });
    }
    return;
  }

  if (event.key === 'Tab') {
    if (parentSubMenuContext?.closeAndFocusTrigger) {
      parentSubMenuContext.closeAndFocusTrigger();
      return;
    }
    close({ source: 'tab', restoreFocus: false });
  }
};

const handleOutsideClick = (event) => {
  if (!props.closeOnOutsideClick || !isOpen.value) {
    return;
  }

  const eventPath = typeof event.composedPath === 'function' ? event.composedPath() : [];
  const clickInContent = contentEl.value && (eventPath.includes(contentEl.value) || contentEl.value.contains(event.target));
  const clickInActivator = activatorEl.value && (eventPath.includes(activatorEl.value) || activatorEl.value.contains(event.target));

  if (!clickInContent && !clickInActivator) {
    close({ source: 'outside-click', restoreFocus: false });
  }
};

provide(mdMenuContextKey, {
  onItemSelect(payload) {
    emit('select', payload);
    parentMenuContext?.onDescendantItemSelect?.(payload);
    if (props.closeOnSelect) {
      close({ source: 'item-select', restoreFocus: !props.nested });
    }
  },
  onDescendantItemSelect(payload) {
    emit('select', payload);
    parentMenuContext?.onDescendantItemSelect?.(payload);
    if (props.closeOnSelect) {
      close({ source: 'descendant-item-select', restoreFocus: !props.nested });
    }
  },
  registerSubMenu(id, subMenuApi) {
    subMenuRegistry.set(id, subMenuApi);
  },
  unregisterSubMenu(id) {
    subMenuRegistry.delete(id);
    if (openSubMenuId.value === id) {
      openSubMenuId.value = null;
    }
  },
  requestOpenSubMenu(id) {
    if (openSubMenuId.value && openSubMenuId.value !== id) {
      subMenuRegistry.get(openSubMenuId.value)?.close?.({ emitModelUpdate: true, focusTrigger: false });
    }
    openSubMenuId.value = id;
  },
  notifySubMenuClosed(id) {
    if (openSubMenuId.value === id) {
      openSubMenuId.value = null;
    }
  },
  closeMenu(options = {}) {
    close(options);
  },
  focusFirstItem,
  focusLastItem,
});

defineExpose({
  open,
  close,
  toggle,
  focusFirstItem,
  focusLastItem,
});
</script>

<style lang="scss">
@use 'sass:map';
@use '../../styles/tokens';
@use '../elevation/surface';
@use '../elevation/elevation';

$theme: tokens.md-comp-menu-values();

.md-menu {
  border-radius: map.get($theme, container-shape);
  position: relative;
  user-select: none;
  z-index: 2;

  &--open {
    z-index: 20;
  }

  $this: &;

  &__activator {
    display: inline-block;
  }

  &__content {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    box-shadow: elevation.resolve-box-shadow(map.get($theme, container-elevation), map.get($theme, container-shadow-color));
    border-radius: inherit;
    background-color: map.get($theme, container-color);
    transform-origin: top;
    transition: transform 0.25s ease-in-out;
    overflow: visible;
    min-width: 180px;
    pointer-events: auto;

    .md-menu__surface {
      position: absolute;
      inset: 0;
      background-color: transparent;
      opacity: 0.11;
      pointer-events: none;
    }

    .md-list {
      background-color: transparent;
      border-radius: inherit;

      .md-list-item:hover {
        cursor: pointer;
      }
    }
  }

  &:not(&--open) {
    #{$this}__content {
      transform: scaleY(0);
      pointer-events: none;
    }
  }

  &--nested {
    position: static;
    z-index: auto;

    #{$this}__content {
      top: 0;
      left: calc(100% - 8px);
      transform-origin: left top;
      z-index: 1;
    }
  }
}
</style>
