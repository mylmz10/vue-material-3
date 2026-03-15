<template>
  <span class="md-tooltip" :class="`md-tooltip--${variant}`">
    <span
      ref="triggerEl"
      class="md-tooltip__trigger"
      :aria-describedby="isOpen ? tooltipId : undefined"
      @mouseenter="handleTriggerMouseEnter"
      @mouseleave="handleTriggerMouseLeave"
      @focusin="handleTriggerFocusIn"
      @focusout="handleTriggerFocusOut"
      @pointerdown="handleTriggerPointerDown"
      @pointerup="handleTriggerPointerEnd"
      @pointercancel="handleTriggerPointerEnd"
      @pointerleave="handleTriggerPointerEnd"
      @click="handleTriggerClick"
    >
      <slot />
    </span>

    <teleport to="body">
      <div
        v-if="isOpen"
        :id="tooltipId"
        ref="tooltipEl"
        class="md-tooltip__surface"
        :class="{
          'md-tooltip__surface--plain': !isRich,
          'md-tooltip__surface--rich': isRich,
        }"
        :style="tooltipStyle"
        role="tooltip"
        @mouseenter="handleTooltipMouseEnter"
        @mouseleave="handleTooltipMouseLeave"
        @focusin="handleTooltipFocusIn"
        @focusout="handleTooltipFocusOut"
        @click.stop
      >
        <template v-if="!isRich">
          <span class="md-tooltip__plain-text">{{ text }}</span>
        </template>

        <template v-else>
          <div v-if="headline || $slots.headline" class="md-tooltip__headline">
            <slot name="headline">{{ headline }}</slot>
          </div>
          <div v-if="supportingText || $slots['supporting-text']" class="md-tooltip__supporting-text">
            <slot name="supporting-text">{{ supportingText }}</slot>
          </div>
          <div v-if="hasAction" class="md-tooltip__action-row">
            <slot name="action">
              <button type="button" class="md-tooltip__action" @click="handleActionClick">{{ actionLabel }}</button>
            </slot>
          </div>
        </template>
      </div>
    </teleport>
  </span>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useSlots } from 'vue';

const CLOSE_DELAY_MS = 1500;
const LONG_PRESS_DELAY_MS = 500;
const VIEWPORT_MARGIN = 8;
const RICH_GAP = 8;

let tooltipInstanceIndex = 0;

const slots = useSlots();

const props = defineProps({
  actionLabel: {
    type: String,
    default: '',
  },
  boundary: {
    type: String,
    default: 'visual',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  headline: {
    type: String,
    default: '',
  },
  inAppBar: {
    type: Boolean,
    default: false,
  },
  persistent: {
    type: Boolean,
    default: false,
  },
  supportingText: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
  variant: {
    type: String,
    default: 'plain',
  },
});

const emit = defineEmits(['action', 'close', 'open']);

const triggerEl = ref(null);
const tooltipEl = ref(null);
const isOpen = ref(false);
const tooltipStyle = ref({});
const hoveredTrigger = ref(false);
const hoveredTooltip = ref(false);
const ignoreNextClick = ref(false);

const instanceId = `md-tooltip-${++tooltipInstanceIndex}`;
const tooltipId = `${instanceId}-surface`;

let closeTimer = null;
let longPressTimer = null;
let openedFromLongPress = false;

const isRich = computed(() => props.variant === 'rich');
const isPersistentRich = computed(() => isRich.value && props.persistent);
const hasAction = computed(() => isRich.value && (!!props.actionLabel || !!slots.action));
const plainGap = computed(() => {
  if (props.inAppBar) {
    return 4;
  }

  return props.boundary === 'text' ? 8 : 4;
});

const getTooltipRegistry = () => {
  if (typeof window === 'undefined') {
    return new Map();
  }

  const storeKey = '__mdTooltipRegistry';
  if (!window[storeKey]) {
    window[storeKey] = new Map();
  }

  return window[storeKey];
};

const clearCloseTimer = () => {
  if (!closeTimer) {
    return;
  }

  window.clearTimeout(closeTimer);
  closeTimer = null;
};

const clearLongPressTimer = () => {
  if (!longPressTimer) {
    return;
  }

  window.clearTimeout(longPressTimer);
  longPressTimer = null;
};

const closeOtherTooltips = () => {
  const registry = getTooltipRegistry();
  registry.forEach((close, id) => {
    if (id === instanceId) {
      return;
    }

    close?.('handoff');
  });
};

function removeGlobalListeners() {
  window.removeEventListener('resize', handleViewportChange);
  window.removeEventListener('scroll', handleViewportChange, true);
  document.removeEventListener('mousedown', handleOutsidePointerDown);
  document.removeEventListener('keydown', handleEscapeKeydown);
}

const closeTooltip = (source = 'programmatic') => {
  if (!isOpen.value) {
    clearCloseTimer();
    clearLongPressTimer();
    return;
  }

  clearCloseTimer();
  clearLongPressTimer();
  hoveredTrigger.value = false;
  hoveredTooltip.value = false;
  isOpen.value = false;
  tooltipStyle.value = {};
  removeGlobalListeners();
  emit('close', { source });
};

const roundToStep = (value, step = 8) => Math.round(value / step) * step;
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const clampToViewport = (candidate, rect) => {
  const maxLeft = Math.max(VIEWPORT_MARGIN, window.innerWidth - rect.width - VIEWPORT_MARGIN);
  const maxTop = Math.max(VIEWPORT_MARGIN, window.innerHeight - rect.height - VIEWPORT_MARGIN);
  return {
    left: clamp(roundToStep(candidate.left), VIEWPORT_MARGIN, maxLeft),
    top: clamp(roundToStep(candidate.top), VIEWPORT_MARGIN, maxTop),
  };
};

const fitsViewport = (candidate, rect) => {
  return (
    candidate.left >= VIEWPORT_MARGIN &&
    candidate.top >= VIEWPORT_MARGIN &&
    candidate.left + rect.width <= window.innerWidth - VIEWPORT_MARGIN &&
    candidate.top + rect.height <= window.innerHeight - VIEWPORT_MARGIN
  );
};

const resolvePlainPosition = (triggerRect, surfaceRect) => {
  const centeredLeft = triggerRect.left + ((triggerRect.width - surfaceRect.width) / 2);
  const topCandidate = {
    left: centeredLeft,
    top: triggerRect.top - surfaceRect.height - plainGap.value,
  };
  const bottomCandidate = {
    left: centeredLeft,
    top: triggerRect.bottom + plainGap.value,
  };
  const orderedCandidates = props.inAppBar ? [bottomCandidate, topCandidate] : [topCandidate, bottomCandidate];
  const matchingCandidate = orderedCandidates.find((candidate) => fitsViewport(candidate, surfaceRect)) || orderedCandidates[0];
  return clampToViewport(matchingCandidate, surfaceRect);
};

const resolveRichPosition = (triggerRect, surfaceRect) => {
  const centeredBelow = {
    left: triggerRect.left + ((triggerRect.width - surfaceRect.width) / 2),
    top: triggerRect.bottom + RICH_GAP,
  };
  const candidates = [
    {
      left: triggerRect.right + RICH_GAP,
      top: triggerRect.bottom + RICH_GAP,
    },
    {
      left: triggerRect.left - surfaceRect.width - RICH_GAP,
      top: triggerRect.bottom + RICH_GAP,
    },
    {
      left: triggerRect.right + RICH_GAP,
      top: triggerRect.top - surfaceRect.height - RICH_GAP,
    },
    {
      left: triggerRect.left - surfaceRect.width - RICH_GAP,
      top: triggerRect.top - surfaceRect.height - RICH_GAP,
    },
    centeredBelow,
    {
      left: triggerRect.left + ((triggerRect.width - surfaceRect.width) / 2),
      top: triggerRect.top - surfaceRect.height - RICH_GAP,
    },
  ];
  const matchingCandidate = candidates.find((candidate) => fitsViewport(candidate, surfaceRect)) || centeredBelow;
  return clampToViewport(matchingCandidate, surfaceRect);
};

const updatePosition = () => {
  if (!triggerEl.value || !tooltipEl.value) {
    return;
  }

  const triggerRect = triggerEl.value.getBoundingClientRect();
  const surfaceRect = tooltipEl.value.getBoundingClientRect();
  const nextPosition = isRich.value ? resolveRichPosition(triggerRect, surfaceRect) : resolvePlainPosition(triggerRect, surfaceRect);
  tooltipStyle.value = {
    left: `${nextPosition.left}px`,
    top: `${nextPosition.top}px`,
  };
};

const handleViewportChange = () => {
  if (!isOpen.value) {
    return;
  }

  updatePosition();
};

const handleOutsidePointerDown = (event) => {
  if (!isOpen.value) {
    return;
  }

  const target = event.target;
  if (triggerEl.value?.contains(target) || tooltipEl.value?.contains(target)) {
    return;
  }

  closeTooltip('outside-click');
};

const handleEscapeKeydown = (event) => {
  if (event.key !== 'Escape' || !isOpen.value) {
    return;
  }

  closeTooltip('escape');
};

function addGlobalListeners() {
  window.addEventListener('resize', handleViewportChange);
  window.addEventListener('scroll', handleViewportChange, true);
  document.addEventListener('mousedown', handleOutsidePointerDown);
  document.addEventListener('keydown', handleEscapeKeydown);
}

const openTooltip = async (source = 'programmatic') => {
  if (props.disabled) {
    return;
  }

  clearCloseTimer();
  closeOtherTooltips();

  if (!isOpen.value) {
    isOpen.value = true;
    addGlobalListeners();
    emit('open', { source });
  }

  await nextTick();
  updatePosition();
};

const scheduleClose = (source = 'leave') => {
  if (isPersistentRich.value) {
    return;
  }

  clearCloseTimer();
  closeTimer = window.setTimeout(() => {
    if (hoveredTrigger.value || hoveredTooltip.value) {
      return;
    }

    closeTooltip(source);
  }, CLOSE_DELAY_MS);
};

const handleTriggerMouseEnter = () => {
  hoveredTrigger.value = true;
  clearCloseTimer();
  if (!isPersistentRich.value) {
    openTooltip('hover');
  }
};

const handleTriggerMouseLeave = () => {
  hoveredTrigger.value = false;
  scheduleClose('trigger-leave');
};

const handleTriggerFocusIn = () => {
  hoveredTrigger.value = true;
  clearCloseTimer();
  if (!isPersistentRich.value) {
    openTooltip('focus');
  }
};

const handleTriggerFocusOut = () => {
  hoveredTrigger.value = false;
  scheduleClose('trigger-blur');
};

const handleTooltipMouseEnter = () => {
  hoveredTooltip.value = true;
  clearCloseTimer();
};

const handleTooltipMouseLeave = () => {
  hoveredTooltip.value = false;
  scheduleClose('tooltip-leave');
};

const handleTooltipFocusIn = () => {
  hoveredTooltip.value = true;
  clearCloseTimer();
};

const handleTooltipFocusOut = () => {
  hoveredTooltip.value = false;
  scheduleClose('tooltip-blur');
};

const handleTriggerPointerDown = (event) => {
  if (props.disabled || isPersistentRich.value || event.pointerType === 'mouse') {
    return;
  }

  clearLongPressTimer();
  openedFromLongPress = false;
  longPressTimer = window.setTimeout(() => {
    openedFromLongPress = true;
    ignoreNextClick.value = true;
    openTooltip('long-press');
  }, LONG_PRESS_DELAY_MS);
};

const handleTriggerPointerEnd = () => {
  clearLongPressTimer();

  if (!openedFromLongPress) {
    return;
  }

  scheduleClose('long-press-release');
  window.setTimeout(() => {
    ignoreNextClick.value = false;
  }, 0);
};

const handleTriggerClick = (event) => {
  if (ignoreNextClick.value) {
    event.preventDefault();
    event.stopPropagation();
    ignoreNextClick.value = false;
    return;
  }

  if (!isPersistentRich.value) {
    return;
  }

  if (isOpen.value) {
    closeTooltip('trigger-click');
    return;
  }

  openTooltip('trigger-click');
};

const handleActionClick = () => {
  emit('action');
  if (isPersistentRich.value) {
    closeTooltip('action');
  }
};

onMounted(() => {
  getTooltipRegistry().set(instanceId, closeTooltip);
});

onBeforeUnmount(() => {
  clearCloseTimer();
  clearLongPressTimer();
  removeGlobalListeners();
  getTooltipRegistry().delete(instanceId);
});
</script>

<style lang="scss">
@use 'sass:map';
@use '../../styles/tokens';
@use '../elevation/elevation';

$plain-theme: tokens.md-comp-plain-tooltip-values();
$rich-theme: tokens.md-comp-rich-tooltip-values();

.md-tooltip {
  display: inline-flex;

  &__trigger {
    display: inline-flex;
  }

  &__surface {
    box-sizing: border-box;
    left: 0;
    position: fixed;
    top: 0;
    z-index: 60;
  }

  &__surface--plain {
    align-items: center;
    background-color: map.get($plain-theme, container-color);
    border-radius: map.get($plain-theme, container-shape);
    color: map.get($plain-theme, supporting-text-color);
    display: inline-flex;
    min-block-size: 24px;
    padding: 4px 8px;
    pointer-events: none;
  }

  &__plain-text {
    font-family: map.get($plain-theme, supporting-text-font);
    font-size: map.get($plain-theme, supporting-text-size);
    font-weight: map.get($plain-theme, supporting-text-weight);
    letter-spacing: map.get($plain-theme, supporting-text-tracking);
    line-height: map.get($plain-theme, supporting-text-line-height);
    white-space: nowrap;
  }

  &__surface--rich {
    background-color: map.get($rich-theme, container-color);
    border-radius: map.get($rich-theme, container-shape);
    box-shadow: elevation.resolve-box-shadow(map.get($rich-theme, container-elevation), map.get($rich-theme, container-shadow-color));
    color: map.get($rich-theme, supporting-text-color);
    max-inline-size: min(320px, calc(100vw - 32px));
    min-inline-size: min(200px, calc(100vw - 32px));
    padding: 12px 16px 8px;
  }

  &__headline {
    color: map.get($rich-theme, subhead-color);
    font-family: map.get($rich-theme, subhead-font);
    font-size: map.get($rich-theme, subhead-size);
    font-weight: map.get($rich-theme, subhead-weight);
    letter-spacing: map.get($rich-theme, subhead-tracking);
    line-height: map.get($rich-theme, subhead-line-height);
    margin-bottom: 4px;
  }

  &__supporting-text {
    color: map.get($rich-theme, supporting-text-color);
    font-family: map.get($rich-theme, supporting-text-font);
    font-size: map.get($rich-theme, supporting-text-size);
    font-weight: map.get($rich-theme, supporting-text-weight);
    letter-spacing: map.get($rich-theme, supporting-text-tracking);
    line-height: map.get($rich-theme, supporting-text-line-height);
  }

  &__action-row {
    margin-top: 12px;
  }

  &__action {
    background: transparent;
    border: 0;
    color: map.get($rich-theme, action-label-text-color);
    cursor: pointer;
    font-family: map.get($rich-theme, action-label-text-font);
    font-size: map.get($rich-theme, action-label-text-size);
    font-weight: map.get($rich-theme, action-label-text-weight);
    letter-spacing: map.get($rich-theme, action-label-text-tracking);
    line-height: map.get($rich-theme, action-label-text-line-height);
    margin: 0;
    min-block-size: 40px;
    padding: 0;
  }
}
</style>
