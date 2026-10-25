<template>
  <Transition>
    <dialog
      v-if="_open || keepMounted"
      ref="dialogEl"
      class="md-modal"
      :class="[dialogClass, { 'md-modal--open': _open }]"
      v-bind="$attrs"
      :inert="!_open || undefined"
      :aria-hidden="!_open ? 'true' : $attrs['aria-hidden']"
      aria-modal="true"
      :aria-labelledby="$attrs['aria-labelledby'] || (!$attrs['aria-label'] && slots.header ? headerId : undefined)"
      @close="onNativeClose"
      @cancel.prevent="onCancel"
      @click="handleBackdropClick"
      @keydown="onDialogKeydown"
    >
      <div ref="containerEl" class="md-modal__container" :class="containerClass" tabindex="-1">
        <div :id="headerId" class="md-modal__header" :class="headerClass">
          <slot name="header" />
        </div>
        <div class="md-modal__content" :class="contentClass">
          <slot />
        </div>
        <div class="md-modal__footer" :class="footerClass">
          <slot name="footer" />
        </div>
        <MdElevationOverlay />
      </div>
    </dialog>
  </Transition>
</template>

<script>
let bodyScrollLockCount = 0;
let bodyOverflowBeforeLock = '';
</script>

<script setup>
import MdElevationOverlay from '../elevation/MdElevationOverlay.vue';
import { nextTick, onBeforeUnmount, ref, useId, useSlots, watch } from 'vue';

defineOptions({ inheritAttrs: false });

const slots = useSlots();
const headerId = `md-dialog-${useId()}-header`;
const _open = ref(false);
const dialogEl = ref(null);
const containerEl = ref(null);
const previousFocusedElement = ref(null);

const props = defineProps({
  keepMounted: { type: Boolean, default: false },
  modelValue: {
    type: Boolean,
    default: false,
  },
  closeOnEscape: {
    type: Boolean,
    default: true,
  },
  closeOnBackdropClick: {
    type: Boolean,
    default: true,
  },
  trapFocus: {
    type: Boolean,
    default: true,
  },
  restoreFocus: {
    type: Boolean,
    default: true,
  },
  initialFocus: {
    type: [String, Function],
    default: null,
  },
  dialogClass: {
    type: [String, Array, Object],
    default: null,
  },
  containerClass: {
    type: [String, Array, Object],
    default: null,
  },
  headerClass: {
    type: [String, Array, Object],
    default: null,
  },
  contentClass: {
    type: [String, Array, Object],
    default: null,
  },
  footerClass: {
    type: [String, Array, Object],
    default: null,
  },
});

const emit = defineEmits(['update:modelValue', 'open', 'opened', 'close', 'closed', 'cancel']);

const focusableSelector = 'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"]),[contenteditable="true"]';

const lockBodyScroll = () => {
  if (typeof document === 'undefined') {
    return;
  }

  bodyScrollLockCount += 1;
  if (bodyScrollLockCount === 1) {
    bodyOverflowBeforeLock = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
};

const unlockBodyScroll = () => {
  if (typeof document === 'undefined') {
    return;
  }

  bodyScrollLockCount = Math.max(0, bodyScrollLockCount - 1);
  if (bodyScrollLockCount === 0) {
    document.body.style.overflow = bodyOverflowBeforeLock;
    bodyOverflowBeforeLock = '';
  }
};

const isVisibleTarget = (element) => {
  if (!containerEl.value?.contains(element) || element.closest('dialog') !== dialogEl.value || element.matches(':disabled, input[type="hidden"]') || element.closest('[hidden], [inert]')) return false;
  for (let current = element; current; current = current.parentElement) {
    const style = getComputedStyle(current);
    if (style.display === 'none' || style.visibility === 'hidden' || style.visibility === 'collapse') return false;
    if (current === dialogEl.value) break;
  }
  return true;
};

const getFocusableElements = () => {
  if (!containerEl.value) return [];
  return Array.from(containerEl.value.querySelectorAll(focusableSelector)).filter((element) => element.tabIndex >= 0 && isVisibleTarget(element));
};

const resolveInitialFocusTarget = () => {
  if (!containerEl.value) {
    return null;
  }

  if (typeof props.initialFocus === 'string' && props.initialFocus) {
    const element = containerEl.value.querySelector(props.initialFocus);
    if (element && isVisibleTarget(element)) {
      return element;
    }
  }

  if (typeof props.initialFocus === 'function') {
    const element = props.initialFocus(containerEl.value);
    if (element && isVisibleTarget(element)) {
      return element;
    }
  }

  const focusables = getFocusableElements();
  if (focusables.length) {
    return focusables[0];
  }

  return containerEl.value;
};

const focusInitialElement = () => {
  const focusTarget = resolveInitialFocusTarget();
  focusTarget?.focus?.();
};

const openDialog = ({ source = 'programmatic', emitModelUpdate = false } = {}) => {
  if (_open.value) {
    return;
  }

  previousFocusedElement.value = typeof document !== 'undefined' ? document.activeElement : null;
  _open.value = true;
  lockBodyScroll();

  emit('open', { source });
  if (emitModelUpdate) {
    emit('update:modelValue', true);
  }

  nextTick(() => {
    if (!_open.value || !dialogEl.value) return;
    dialogEl.value.showModal();
    focusInitialElement();
    emit('opened', { source });
  });
};

const closeNativeDialog = () => {
  const dialog = dialogEl.value;
  if (!dialog) return;
  // Retained descendants must not leave a modal open behind a closed surface.
  if (props.keepMounted)
    Array.from(dialog.querySelectorAll('dialog[open]'))
      .reverse()
      .forEach((child) => child.close());
  // Keep the fading surface out of focus navigation and the accessibility tree.
  dialog.setAttribute('inert', '');
  dialog.setAttribute('aria-hidden', 'true');
  const launcher = previousFocusedElement.value;
  // Native close also restores focus; suppress that when the consumer opts out.
  const suppressRestore = !props.restoreFocus && launcher && !launcher.hasAttribute('inert');
  if (suppressRestore) launcher.setAttribute('inert', '');
  try {
    dialog.close();
  } finally {
    if (suppressRestore) launcher.removeAttribute('inert');
  }
};

const closeDialog = ({ source = 'programmatic', emitModelUpdate = false } = {}) => {
  if (!_open.value) {
    return;
  }

  emit('close', { source });
  _open.value = false;
  closeNativeDialog();
  unlockBodyScroll();

  if (emitModelUpdate) {
    emit('update:modelValue', false);
  }

  nextTick(() => {
    if (props.restoreFocus) {
      if (previousFocusedElement.value?.isConnected) previousFocusedElement.value.focus?.();
    }
    emit('closed', { source });
  });
};

const requestClose = (source) => {
  if (source === 'escape' && !props.closeOnEscape) {
    return;
  }

  if (source === 'backdrop' && !props.closeOnBackdropClick) {
    return;
  }

  emit('cancel', { source });
  closeDialog({ source, emitModelUpdate: true });
};

const onCancel = (event) => {
  if (event.target !== dialogEl.value) return;
  event.stopPropagation();
  requestClose('escape');
};

const onNativeClose = (event) => {
  if (event.target !== dialogEl.value || event.target.open) return;
  if (!props.restoreFocus && document.activeElement === previousFocusedElement.value) previousFocusedElement.value.blur();
  closeDialog({ source: 'native', emitModelUpdate: true });
};

const handleBackdropClick = (event) => {
  if (event.target !== dialogEl.value) {
    return;
  }
  requestClose('backdrop');
};

const trapFocus = (event) => {
  const focusables = getFocusableElements();
  if (!focusables.length) {
    event.preventDefault();
    containerEl.value?.focus?.();
    return;
  }

  const firstFocusable = focusables[0];
  const lastFocusable = focusables[focusables.length - 1];
  const activeElement = typeof document !== 'undefined' ? document.activeElement : null;

  if (event.shiftKey) {
    if (activeElement === firstFocusable || activeElement === containerEl.value) {
      event.preventDefault();
      lastFocusable.focus();
    }
    return;
  }

  if (activeElement === lastFocusable || activeElement === dialogEl.value) {
    event.preventDefault();
    firstFocusable.focus();
  }
};

const onDialogKeydown = (event) => {
  if (event.target.closest('dialog') !== dialogEl.value || event.defaultPrevented) return;
  if (event.key === 'Escape') {
    event.preventDefault();
    event.stopPropagation();
    requestClose('escape');
    return;
  }

  if (event.key === 'Tab' && props.trapFocus) {
    trapFocus(event);
  }
};

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      openDialog({ source: 'model' });
    } else {
      closeDialog({ source: 'model' });
    }
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  if (_open.value) {
    _open.value = false;
    closeNativeDialog();
    unlockBodyScroll();
  }
});
</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.4s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>

<style lang="scss">
@use 'sass:map';
@use '../../styles/tokens';
@use '../../styles/theme/md-sys-color' as theme;
@use '../ripple/ripple';

$theme: tokens.md-comp-dialog-values();
$sys-color: theme.values();

@function dialog-token($token) {
  @return unquote('var(--md-dialog-#{$token}, #{map.get($theme, $token)})');
}

.md-modal {
  position: fixed;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  inset: 0px;
  block-size: 100vh;
  inline-size: 100vw;
  max-block-size: 100vh;
  max-inline-size: 100vw;
  border: none;
  background: rgba(0, 0, 0, 0);
  padding: 0px;
  margin: 0px;
  overflow: clip;
  z-index: 1000;
  display: none;

  --overlay-z-index: 1;
  --overlay-opacity: 0.14;
  --md-dialog-container-color: #{theme.value('surface-container-high')};
  --md-dialog-headline-color: #{theme.value('on-surface')};
  --md-dialog-supporting-text-color: #{theme.value('on-surface-variant')};
  --surface-tint-layer-color: #{map.get($sys-color, surface-tint)};

  $this: &;

  &::backdrop {
    background: transparent;
  }

  &:before {
    content: '';
    position: absolute;
    z-index: -1;
    inset: 0px;
    block-size: 100vh;
    inline-size: 100vw;
    pointer-events: none;
  }

  &__container {
    position: absolute;
    background-color: dialog-token(container-color);
    border-radius: map.get($theme, 'container-shape');
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    pointer-events: auto;
    min-block-size: 140px;
    max-block-size: min(560px, calc(100% - 48px));
    min-inline-size: 280px;
    max-inline-size: min(560px, calc(100% - 48px));
    padding-block-start: 24px;
    padding-block-end: 24px;
    -webkit-font-smoothing: antialiased;

    #{$this}__header {
      padding-inline-start: 24px;
      padding-inline-end: 24px;
      color: dialog-token(headline-color);
      font-size: map.get($theme, headline-size);
      font-family: map.get($theme, headline-font);
      letter-spacing: map.get($theme, headline-tracking);
      line-height: map.get($theme, headline-line-height);
    }
    #{$this}__content {
      padding-inline-start: 24px;
      padding-inline-end: 24px;
      margin-block-start: 16px;
      margin-block-end: 24px;
      color: dialog-token(supporting-text-color);
      font-size: map.get($theme, supporting-text-size);
      font-family: map.get($theme, supporting-text-font);
      letter-spacing: map.get($theme, supporting-text-tracking);
      line-height: map.get($theme, supporting-text-line-height);
    }
    #{$this}__footer {
      padding-inline-start: 24px;
      padding-inline-end: 24px;
      display: flex;
      gap: 8px;
      position: relative;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-end;
    }
  }

  &--open {
    display: flex;
    &:before {
      background-color: rgba(0, 0, 0, 0.32);
    }
  }
}
</style>
