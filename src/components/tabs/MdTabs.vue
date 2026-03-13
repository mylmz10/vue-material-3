<template>
  <div class="md-tabs" role="tablist" :aria-label="ariaLabel || undefined" :aria-orientation="orientation" @keydown="onTabListKeydown">
    <slot />
  </div>
</template>

<script setup>
import { computed, nextTick, provide, ref, watch } from 'vue';
import { mdTabsContextKey } from './tabsContext';

const props = defineProps({
  modelValue: {
    type: Number,
    default: undefined,
  },
  activationMode: {
    type: String,
    default: 'auto',
    validator: (value) => ['auto', 'manual'].includes(value),
  },
  loop: {
    type: Boolean,
    default: true,
  },
  orientation: {
    type: String,
    default: 'horizontal',
    validator: (value) => ['horizontal', 'vertical'].includes(value),
  },
  ariaLabel: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue', 'change']);
const tabs = ref([]);
const selectedIndex = ref(0);
const focusedIndex = ref(0);

const isControlled = computed(() => props.modelValue !== undefined);

const orderTabs = (tabList) => {
  const ordered = [...tabList];
  ordered.sort((a, b) => {
    if (!a.el || !b.el || typeof a.el.compareDocumentPosition !== 'function') {
      return 0;
    }

    const position = a.el.compareDocumentPosition(b.el);
    if (typeof Node !== 'undefined' && position & Node.DOCUMENT_POSITION_FOLLOWING) {
      return -1;
    }
    if (typeof Node !== 'undefined' && position & Node.DOCUMENT_POSITION_PRECEDING) {
      return 1;
    }
    return 0;
  });
  return ordered;
};

const getEnabledIndices = () => {
  return tabs.value.reduce((indices, tab, index) => {
    if (!tab.disabled) {
      indices.push(index);
    }
    return indices;
  }, []);
};

const findNearestEnabledIndex = (index) => {
  const enabledIndices = getEnabledIndices();
  if (!enabledIndices.length) {
    return -1;
  }

  if (!Number.isInteger(index)) {
    return enabledIndices[0];
  }

  if (enabledIndices.includes(index)) {
    return index;
  }

  const nextForward = enabledIndices.find((candidate) => candidate > index);
  if (nextForward !== undefined) {
    return nextForward;
  }

  return enabledIndices[enabledIndices.length - 1];
};

const syncState = () => {
  tabs.value = orderTabs(tabs.value);

  if (!tabs.value.length) {
    selectedIndex.value = 0;
    focusedIndex.value = 0;
    return;
  }

  const desiredSelectedIndex = isControlled.value ? props.modelValue : selectedIndex.value;
  const nextSelectedIndex = findNearestEnabledIndex(desiredSelectedIndex);
  const nextFocusedIndex = findNearestEnabledIndex(focusedIndex.value);

  selectedIndex.value = nextSelectedIndex === -1 ? 0 : nextSelectedIndex;
  focusedIndex.value = nextFocusedIndex === -1 ? selectedIndex.value : nextFocusedIndex;

  if (isControlled.value && nextSelectedIndex !== -1 && props.modelValue !== nextSelectedIndex) {
    emit('update:modelValue', nextSelectedIndex);
  }
};

const emitSelection = (index, reason) => {
  if (index < 0 || index >= tabs.value.length || tabs.value[index]?.disabled) {
    return;
  }

  selectedIndex.value = index;
  focusedIndex.value = index;
  emit('change', { index, reason });
  emit('update:modelValue', index);
};

const getTabIndexById = (tabId) => {
  return tabs.value.findIndex((tab) => tab.id === tabId);
};

const moveFocus = (startIndex, step) => {
  if (!tabs.value.length) {
    return -1;
  }

  let iterations = 0;
  let candidate = startIndex;

  while (iterations < tabs.value.length) {
    candidate += step;
    if (props.loop) {
      candidate = (candidate + tabs.value.length) % tabs.value.length;
    }

    if (!props.loop && (candidate < 0 || candidate >= tabs.value.length)) {
      return -1;
    }

    if (!tabs.value[candidate]?.disabled) {
      return candidate;
    }

    iterations += 1;
  }

  return -1;
};

const focusTabByIndex = (index) => {
  const tab = tabs.value[index];
  if (!tab) {
    return;
  }

  focusedIndex.value = index;
  nextTick(() => {
    tab.el?.focus?.();
  });
};

const registerTab = (tab) => {
  const existingIndex = getTabIndexById(tab.id);
  if (existingIndex === -1) {
    tabs.value.push(tab);
  } else {
    tabs.value[existingIndex] = {
      ...tabs.value[existingIndex],
      ...tab,
    };
  }
  syncState();
};

const updateTab = (tabId, patch) => {
  const index = getTabIndexById(tabId);
  if (index === -1) {
    return;
  }
  tabs.value[index] = {
    ...tabs.value[index],
    ...patch,
  };
  syncState();
};

const unregisterTab = (tabId) => {
  tabs.value = tabs.value.filter((tab) => tab.id !== tabId);
  syncState();
};

const activateTab = (tabId, reason = 'programmatic') => {
  const index = getTabIndexById(tabId);
  if (index === -1 || tabs.value[index]?.disabled) {
    return;
  }

  focusedIndex.value = index;

  if (reason === 'focus' && props.activationMode === 'manual') {
    return;
  }

  emitSelection(index, reason);
};

const onTabFocused = (tabId) => {
  activateTab(tabId, 'focus');
};

const isSelected = (tabId) => {
  return getTabIndexById(tabId) === selectedIndex.value;
};

const getTabButtonIndex = (tabId) => {
  const tabIndex = getTabIndexById(tabId);
  if (tabIndex === -1) {
    return -1;
  }
  return tabIndex === focusedIndex.value ? 0 : -1;
};

const getPanelId = (tabId) => {
  const tabIndex = getTabIndexById(tabId);
  if (tabIndex === -1) {
    return undefined;
  }
  return tabs.value[tabIndex]?.panelId;
};

const resolveCurrentFocusIndex = (target) => {
  if (!target) {
    return focusedIndex.value;
  }

  const tabId = target.getAttribute?.('data-md-tab-id');
  if (!tabId) {
    return focusedIndex.value;
  }

  const tabIndex = getTabIndexById(tabId);
  return tabIndex === -1 ? focusedIndex.value : tabIndex;
};

const onTabListKeydown = (event) => {
  if (!tabs.value.length) {
    return;
  }

  const currentIndex = resolveCurrentFocusIndex(event.target);

  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
    event.preventDefault();
    const nextIndex = moveFocus(currentIndex, 1);
    if (nextIndex !== -1) {
      focusTabByIndex(nextIndex);
      if (props.activationMode === 'auto') {
        emitSelection(nextIndex, 'keyboard');
      }
    }
    return;
  }

  if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
    event.preventDefault();
    const previousIndex = moveFocus(currentIndex, -1);
    if (previousIndex !== -1) {
      focusTabByIndex(previousIndex);
      if (props.activationMode === 'auto') {
        emitSelection(previousIndex, 'keyboard');
      }
    }
    return;
  }

  if (event.key === 'Home') {
    event.preventDefault();
    const firstIndex = findNearestEnabledIndex(0);
    if (firstIndex !== -1) {
      focusTabByIndex(firstIndex);
      if (props.activationMode === 'auto') {
        emitSelection(firstIndex, 'keyboard');
      }
    }
    return;
  }

  if (event.key === 'End') {
    event.preventDefault();
    const lastIndex = findNearestEnabledIndex(tabs.value.length - 1);
    if (lastIndex !== -1) {
      focusTabByIndex(lastIndex);
      if (props.activationMode === 'auto') {
        emitSelection(lastIndex, 'keyboard');
      }
    }
    return;
  }

  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    if (focusedIndex.value >= 0) {
      emitSelection(focusedIndex.value, 'keyboard');
    }
  }
};

watch(
  () => props.modelValue,
  () => {
    syncState();
  },
  { immediate: true }
);

provide(mdTabsContextKey, {
  registerTab,
  updateTab,
  unregisterTab,
  activateTab,
  onTabFocused,
  isSelected,
  getTabIndex: getTabButtonIndex,
  getPanelId,
});

defineExpose({
  focusTabByIndex,
  activateTab,
  getSelectedIndex: () => selectedIndex.value,
});
</script>

<style lang="scss">
@use 'sass:map';
@use '../../styles/tokens';

$sys-color: tokens.md-sys-color-values-light();

.md-tabs {
  align-items: stretch;
  border-bottom: 1px solid map.get($sys-color, outline-variant);
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
}
</style>
