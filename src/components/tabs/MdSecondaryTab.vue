<template>
  <button
    ref="tabEl"
    class="md-secondary-tab"
    :class="{
      'md-secondary-tab--selected': isSelected,
      'md-secondary-tab--disabled': disabled,
      'md-secondary-tab--with-icon': !!icon,
    }"
    type="button"
    role="tab"
    data-md-tab="true"
    :data-md-tab-id="tabId"
    :id="tabId"
    :aria-selected="`${isSelected}`"
    :aria-controls="resolvedPanelId"
    :disabled="disabled"
    :tabindex="resolvedTabIndex"
    @click="onClick"
    @focus="onFocus"
  >
    <MdRipple />
    <MdIcon v-if="icon" class="md-secondary-tab__icon">{{ icon }}</MdIcon>
    <span class="md-secondary-tab__label">
      <slot>{{ label }}</slot>
    </span>
    <span class="md-secondary-tab__indicator"></span>
  </button>
</template>

<script setup>
import { computed, inject, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import MdIcon from '../icon/MdIcon.vue';
import MdRipple from '../ripple/MdRipple.vue';
import { mdTabsContextKey } from './tabsContext';

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
  panelId: {
    type: String,
    default: undefined,
  },
  selected: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['click', 'focus']);
const tabsContext = inject(mdTabsContextKey, null);
const tabEl = ref(null);
const tabId = props.id || `md-secondary-tab-${Math.random().toString(36).slice(2, 10)}-${Date.now().toString(36)}`;

const register = () => {
  tabsContext?.registerTab?.({
    id: tabId,
    disabled: props.disabled,
    panelId: props.panelId,
    el: tabEl.value,
  });
};

watch(
  () => [props.disabled, props.panelId],
  () => {
    tabsContext?.updateTab?.(tabId, {
      disabled: props.disabled,
      panelId: props.panelId,
      el: tabEl.value,
    });
  }
);

onMounted(() => {
  register();
});

onBeforeUnmount(() => {
  tabsContext?.unregisterTab?.(tabId);
});

const isSelected = computed(() => {
  if (!tabsContext) {
    return props.selected;
  }
  return tabsContext.isSelected(tabId);
});

const resolvedTabIndex = computed(() => {
  if (!tabsContext) {
    return isSelected.value ? 0 : -1;
  }
  return tabsContext.getTabIndex(tabId);
});

const resolvedPanelId = computed(() => {
  if (!tabsContext) {
    return props.panelId;
  }
  return tabsContext.getPanelId(tabId) || props.panelId;
});

const onClick = (event) => {
  emit('click', event);
  if (props.disabled) {
    return;
  }
  tabsContext?.activateTab?.(tabId, 'click');
};

const onFocus = (event) => {
  emit('focus', event);
  if (props.disabled) {
    return;
  }
  tabsContext?.onTabFocused?.(tabId);
};
</script>

<style lang="scss">
@use 'sass:map';
@use '../../styles/tokens';

$theme: tokens.md-comp-secondary-navigation-tab-values();

.md-secondary-tab {
  position: relative;
  align-items: center;
  appearance: none;
  background: none;
  border: none;
  color: map.get($theme, inactive-label-text-color);
  cursor: pointer;
  display: flex;
  gap: 8px;
  height: map.get($theme, container-height);
  justify-content: center;
  min-width: 96px;
  padding: 0 24px;

  --md-ripple-hover-state-layer-color: #{map.get($theme, hover-state-layer-color)};
  --md-ripple-focus-state-layer-color: #{map.get($theme, focus-state-layer-color)};
  --md-ripple-pressed-state-layer-color: #{map.get($theme, pressed-state-layer-color)};
  --md-ripple-hover-state-layer-opacity: #{map.get($theme, hover-state-layer-opacity)};
  --md-ripple-focus-state-layer-opacity: #{map.get($theme, focus-state-layer-opacity)};
  --md-ripple-pressed-state-layer-opacity: #{map.get($theme, pressed-state-layer-opacity)};

  &__icon {
    color: map.get($theme, with-icon-inactive-icon-color);
    font-size: map.get($theme, with-icon-icon-size);
  }

  &__label {
    color: inherit;
    font-family: map.get($theme, label-text-font);
    font-size: map.get($theme, label-text-size);
    font-weight: map.get($theme, label-text-weight);
    letter-spacing: map.get($theme, label-text-tracking);
    line-height: map.get($theme, label-text-line-height);
    white-space: nowrap;
  }

  &__indicator {
    background-color: map.get($theme, active-indicator-color);
    bottom: 0;
    height: map.get($theme, active-indicator-height);
    left: 0;
    opacity: 0;
    position: absolute;
    right: 0;
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 0.2s ease, opacity 0.2s ease;
  }

  &--selected {
    color: map.get($theme, active-label-text-color);

    .md-secondary-tab__icon {
      color: map.get($theme, with-icon-active-icon-color);
    }

    .md-secondary-tab__indicator {
      opacity: 1;
      transform: scaleX(1);
    }
  }

  &--disabled {
    cursor: default;
    opacity: 0.38;
  }
}
</style>
