<template>
  <Transition>
    <dialog
      v-if="_open"
      ref="dialogEl"
      class="md-modal"
      :class="[dialogClass, { 'md-modal--open': _open }]"
      open
      @cancel.prevent="onCancel"
      @click="handleBackdropClick"
      @keydown="onDialogKeydown"
    >
      <div ref="containerEl" class="md-modal__container" :class="containerClass" tabindex="-1">
        <div class="md-modal__header" :class="headerClass">
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

<script setup>
import MdElevationOverlay from '../elevation/MdElevationOverlay.vue';
import { nextTick, onBeforeUnmount, ref, watch } from 'vue';

let bodyScrollLockCount = 0;

const _open = ref(false);
const dialogEl = ref(null);
const containerEl = ref(null);
const previousFocusedElement = ref(null);

const props = defineProps({
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
    document.body.style.overflow = 'hidden';
  }
};

const unlockBodyScroll = () => {
  if (typeof document === 'undefined') {
    return;
  }

  bodyScrollLockCount = Math.max(0, bodyScrollLockCount - 1);
  if (bodyScrollLockCount === 0) {
    document.body.style.overflow = '';
  }
};

const getFocusableElements = () => {
  if (!containerEl.value) {
    return [];
  }

  return Array.from(containerEl.value.querySelectorAll(focusableSelector)).filter((element) => !element.hasAttribute('disabled'));
};

const resolveInitialFocusTarget = () => {
  if (!containerEl.value) {
    return null;
  }

  if (typeof props.initialFocus === 'string' && props.initialFocus) {
    const element = containerEl.value.querySelector(props.initialFocus);
    if (element) {
      return element;
    }
  }

  if (typeof props.initialFocus === 'function') {
    const element = props.initialFocus(containerEl.value);
    if (element) {
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
    focusInitialElement();
    emit('opened', { source });
  });
};

const closeDialog = ({ source = 'programmatic', emitModelUpdate = false } = {}) => {
  if (!_open.value) {
    return;
  }

  emit('close', { source });
  _open.value = false;
  unlockBodyScroll();

  if (emitModelUpdate) {
    emit('update:modelValue', false);
  }

  nextTick(() => {
    if (props.restoreFocus) {
      previousFocusedElement.value?.focus?.();
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

const onCancel = () => {
  requestClose('escape');
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
  if (event.key === 'Escape') {
    event.preventDefault();
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
@use '../ripple/ripple';

$theme: tokens.md-comp-dialog-values();
$sys-color: tokens.md-sys-color-values-light();

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
  --surface-tint-layer-color: #{map.get($sys-color, surface-tint)};

  $this: &;

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
    background-color: map.get($theme, 'container-color');
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
      color: map.get($theme, headline-color);
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
      color: map.get($theme, supporting-text-color);
      font-size: map.get($theme, supporting-text-size);
      font-family: map.get($theme, supporting-text-font);
      letter-spacing: map.get($theme, supporting-text-tracking);
      line-height: map.get($theme, supporting-text-line-height);
    }
    #{$this}__footer {
      padding-inline-start: 24px;
      padding-inline-end: 24px;
      display: flex;
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
