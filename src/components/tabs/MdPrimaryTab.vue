<template>
  <button
    ref="tabEl"
    class="md-primary-tab"
    :class="{
      'md-primary-tab--selected': isSelected,
      'md-primary-tab--disabled': disabled,
      'md-primary-tab--with-icon': !!icon,
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
    <span class="md-primary-tab__content">
      <span v-if="icon" class="md-primary-tab__icon-wrap">
        <MdIcon class="md-primary-tab__icon">{{ icon }}</MdIcon>
      </span>
      <span class="md-primary-tab__label">
        <slot>{{ label }}</slot>
      </span>
    </span>
    <span class="md-primary-tab__indicator"></span>
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
const tabId = props.id || `md-primary-tab-${Math.random().toString(36).slice(2, 10)}-${Date.now().toString(36)}`;

const register = () => {
  tabsContext?.registerTab?.({
    id: tabId,
    disabled: props.disabled,
    panelId: props.panelId,
    el: tabEl.value,
  });
};

const unregister = () => {
  tabsContext?.unregisterTab?.(tabId);
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
  unregister();
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

$theme: tokens.md-comp-primary-navigation-tab-values();

.md-primary-tab {
  position: relative;
  align-items: center;
  appearance: none;
  background: none;
  border: none;
  color: map.get($theme, with-label-text-inactive-label-text-color);
  cursor: pointer;
  display: flex;
  height: map.get($theme, with-icon-and-label-text-container-height);
  justify-content: center;
  min-width: 96px;
  padding: 0 12px;

  --md-ripple-hover-state-layer-color: #{map.get($theme, inactive-hover-state-layer-color)};
  --md-ripple-focus-state-layer-color: #{map.get($theme, inactive-focus-state-layer-color)};
  --md-ripple-pressed-state-layer-color: #{map.get($theme, inactive-pressed-state-layer-color)};
  --md-ripple-hover-state-layer-opacity: #{map.get($theme, inactive-hover-state-layer-opacity)};
  --md-ripple-focus-state-layer-opacity: #{map.get($theme, inactive-focus-state-layer-opacity)};
  --md-ripple-pressed-state-layer-opacity: #{map.get($theme, inactive-pressed-state-layer-opacity)};

  &__content {
    align-items: center;
    display: inline-flex;
    flex-direction: column;
    gap: 4px;
    justify-content: center;
    min-height: 100%;
  }

  &__icon {
    color: map.get($theme, with-icon-inactive-icon-color);
    font-size: map.get($theme, with-icon-icon-size);
  }

  &__label {
    color: inherit;
    font-family: map.get($theme, with-label-text-label-text-font);
    font-size: map.get($theme, with-label-text-label-text-size);
    font-weight: map.get($theme, with-label-text-label-text-weight);
    letter-spacing: map.get($theme, with-label-text-label-text-tracking);
    line-height: map.get($theme, with-label-text-label-text-line-height);
    white-space: nowrap;
  }

  &__indicator {
    background-color: map.get($theme, active-indicator-color);
    border-radius: map.get($theme, active-indicator-shape);
    bottom: 0;
    height: map.get($theme, active-indicator-height);
    left: 50%;
    max-width: 64px;
    opacity: 0;
    position: absolute;
    width: calc(100% - 24px);
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 0.2s ease, opacity 0.2s ease;
    translate: -50% 0;
  }

  &--selected {
    color: map.get($theme, with-label-text-active-label-text-color);
    --md-ripple-hover-state-layer-color: #{map.get($theme, active-hover-state-layer-color)};
    --md-ripple-focus-state-layer-color: #{map.get($theme, active-focus-state-layer-color)};
    --md-ripple-pressed-state-layer-color: #{map.get($theme, active-pressed-state-layer-color)};
    --md-ripple-hover-state-layer-opacity: #{map.get($theme, active-hover-state-layer-opacity)};
    --md-ripple-focus-state-layer-opacity: #{map.get($theme, active-focus-state-layer-opacity)};
    --md-ripple-pressed-state-layer-opacity: #{map.get($theme, active-pressed-state-layer-opacity)};

    .md-primary-tab__indicator {
      opacity: 1;
      transform: scaleX(1);
    }

    .md-primary-tab__icon {
      color: map.get($theme, with-icon-active-icon-color);
    }
  }

  &--disabled {
    cursor: default;
    opacity: 0.38;
  }

  &:not(&--with-icon) {
    height: map.get($theme, container-height);

    .md-primary-tab__content {
      gap: 0;
    }
  }
}
</style>
