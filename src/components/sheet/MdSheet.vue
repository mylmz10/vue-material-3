<template>
  <component
    :is="modal ? MdDialog : 'section'"
    v-if="modal || modelValue"
    ref="surfaceEl"
    v-bind="surfaceProps()"
    :class="!modal ? [sheetClasses, $attrs.class] : undefined"
    :style="[$attrs.style, { '--md-sheet-drag-offset': `${dragOffset}px`, '--md-bottom-sheet-height': bottom && modal && !expanded ? 'min(50dvh, var(--md-sheet-max-height, 100dvh))' : undefined }]"
    :aria-label="$attrs['aria-label'] || (!hasHeadline() ? `${bottom ? 'Bottom' : 'Side'} sheet` : undefined)"
    :aria-labelledby="$attrs['aria-labelledby'] || (!$attrs['aria-label'] && hasHeadline() ? headlineId : undefined)"
    @update:modelValue="emit('update:modelValue', $event)"
    @cancel="emit('cancel', $event)"
    @keydown="onKeydown"
  >
    <div class="md-sheet__body">
      <button
        v-if="bottom && dragHandle"
        type="button"
        class="md-sheet__handle-target"
        :aria-label="modal ? (expanded ? 'Collapse sheet' : 'Expand sheet') : closeLabel"
        :aria-expanded="modal ? expanded : undefined"
        @pointerdown="startDrag"
        @click="activateHandle"
      >
        <span class="md-sheet__handle" aria-hidden="true"></span>
      </button>
      <header class="md-sheet__header">
        <div v-if="hasHeadline()" :id="headlineId" class="md-sheet__headline">
          <slot name="header">{{ headline }}</slot>
        </div>
        <MdIconButton type="button" icon="close" class="md-sheet__close" :aria-label="closeLabel" @click="dismiss('close-button')" />
      </header>
      <div class="md-sheet__content"><slot :close="dismiss" /></div>
      <footer v-if="$slots.footer" class="md-sheet__footer"><slot name="footer" :close="dismiss" /></footer>
    </div>
  </component>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, ref, useAttrs, useId, useSlots, watch } from 'vue';
import MdDialog from '../dialog/MdDialog.vue';
import MdIconButton from '../icon-button/MdIconButton.vue';

defineOptions({ inheritAttrs: false });
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  modal: { type: Boolean, default: true },
  bottom: { type: Boolean, default: false },
  edge: { type: String, default: 'end', validator: (value) => ['start', 'end'].includes(value) },
  headline: { type: String, default: '' },
  closeLabel: { type: String, default: 'Close sheet' },
  closeOnEscape: { type: Boolean, default: true },
  closeOnBackdropClick: { type: Boolean, default: true },
  restoreFocus: { type: Boolean, default: true },
  initialFocus: { type: [String, Function], default: null },
  dragHandle: { type: Boolean, default: true },
  swipeToClose: { type: Boolean, default: true },
});
const emit = defineEmits(['update:modelValue', 'cancel']);
const attrs = useAttrs();
const slots = useSlots();
const headlineId = `md-sheet-${useId()}-headline`;
const surfaceEl = ref(null);
const dragOffset = ref(0);
const expanded = ref(false);
let ignoreHandleClick = false;
const activateHandle = (event) => {
  if (ignoreHandleClick && event.detail) {
    ignoreHandleClick = false;
    return;
  }
  ignoreHandleClick = false;
  if (props.modal) expanded.value = !expanded.value;
  else dismiss('handle');
};
const hasHeadline = () => !!props.headline || !!slots.header;
const sheetClasses = computed(() => ['md-sheet', props.bottom ? 'md-sheet--bottom' : 'md-sheet--side', `md-sheet--${props.edge}`, { 'md-sheet--standard': !props.modal }]);
const surfaceProps = () => {
  const controlAttrs = { ...attrs };
  delete controlAttrs.class;
  delete controlAttrs.style;
  return props.modal
    ? {
        ...controlAttrs,
        modelValue: props.modelValue,
        dialogClass: [sheetClasses.value, attrs.class],
        containerClass: 'md-sheet__panel',
        closeOnEscape: props.closeOnEscape,
        closeOnBackdropClick: props.closeOnBackdropClick,
        restoreFocus: props.restoreFocus,
        initialFocus: props.initialFocus,
      }
    : { ...controlAttrs, role: 'complementary' };
};
const dismiss = (source = 'action') => {
  stopDrag();
  emit('cancel', { source });
  emit('update:modelValue', false);
};
const onKeydown = (event) => {
  const nestedDialog = event.target.closest('dialog');
  if (!props.modal && props.closeOnEscape && event.key === 'Escape' && !event.defaultPrevented && !(nestedDialog && surfaceEl.value?.contains(nestedDialog))) {
    event.preventDefault();
    event.stopPropagation();
    dismiss('escape');
  }
};
let previousFocus = null;
const restoreStandardFocus = () => {
  if (!props.modal && props.restoreFocus && surfaceEl.value?.contains(document.activeElement)) {
    const target = previousFocus;
    nextTick(() => {
      if (target?.isConnected) target.focus();
    });
  }
};
let activePointer = null;
let dragStart = 0;
const moveDrag = (event) => {
  if (event.pointerId !== activePointer) return;
  const distance = event.clientY - dragStart;
  if (Math.abs(distance) > 4) ignoreHandleClick = true;
  dragOffset.value = Math.max(0, distance);
};
const endDrag = (event) => {
  if (event.pointerId !== activePointer) return;
  moveDrag(event);
  const distance = event.clientY - dragStart;
  stopDrag();
  if (distance <= -64 && props.modal) expanded.value = true;
  else if (distance >= 64) {
    if (props.modal && expanded.value) expanded.value = false;
    else dismiss('swipe');
  }
};
const cancelDrag = (event) => {
  if (event.pointerId === activePointer) stopDrag();
};
function stopDrag() {
  if (typeof window !== 'undefined') {
    window.removeEventListener('pointermove', moveDrag);
    window.removeEventListener('pointerup', endDrag);
    window.removeEventListener('pointercancel', cancelDrag);
  }
  activePointer = null;
  dragOffset.value = 0;
}
const startDrag = (event) => {
  if (!props.swipeToClose || event.button !== 0 || !props.modelValue) return;
  stopDrag();
  ignoreHandleClick = false;
  activePointer = event.pointerId;
  dragStart = event.clientY;
  window.addEventListener('pointermove', moveDrag);
  window.addEventListener('pointerup', endDrag);
  window.addEventListener('pointercancel', cancelDrag);
};
watch(
  () => props.modelValue,
  (open, wasOpen) => {
    if (open && !props.modal && typeof document !== 'undefined') previousFocus = document.activeElement;
    if (!open) {
      expanded.value = false;
      stopDrag();
      if (wasOpen) restoreStandardFocus();
    }
  },
  { immediate: true }
);
onBeforeUnmount(() => {
  restoreStandardFocus();
  stopDrag();
});
</script>

<style lang="scss">
@use 'sass:map';
@use '../../styles/tokens';
@use '../../styles/theme/md-sys-color' as theme;

$motion: tokens.md-sys-motion-values();

.md-sheet {
  --md-sheet-container-color: #{theme.value('surface-container-low')};
  --md-sheet-label-color: #{theme.value('on-surface')};
  color: var(--md-sheet-label-color);

  &.md-modal .md-sheet__panel {
    background: var(--md-sheet-container-color);
    min-block-size: 0;
    min-inline-size: 0;
    max-inline-size: none;
    padding: 0;
    overflow: hidden;
    isolation: isolate;
    transform: translateY(var(--md-sheet-drag-offset, 0px));
    transition: max-block-size #{map.get($motion, duration-medium2)} #{map.get($motion, easing-emphasized)};
  }
  &.md-modal .md-modal__header,
  &.md-modal .md-modal__footer,
  &.md-modal .md-elevation-overlay {
    display: none;
  }
  &.md-modal .md-modal__content {
    display: flex;
    flex-direction: column;
    min-block-size: 0;
    padding: 0;
    margin: 0;
    color: inherit;
  }
  &__body {
    display: flex;
    flex-direction: column;
    min-block-size: 0;
    max-block-size: inherit;
  }
  &__header {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 12px 16px 12px 24px;
    flex-shrink: 0;
  }
  &__headline {
    flex: 1;
    min-inline-size: 0;
    font: 400 24px/32px var(--md-sys-typescale-font, Roboto, sans-serif);
  }
  &__close {
    margin-inline-start: auto;
    flex-shrink: 0;
    inline-size: 48px;
    block-size: 48px;
  }
  &__content {
    overflow: auto;
    overscroll-behavior: contain;
    min-block-size: 0;
    padding: 0 24px 24px;
  }
  &__footer {
    flex-shrink: 0;
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    padding: 16px 24px;
  }
  &__handle-target {
    display: grid;
    place-items: center;
    min-block-size: 48px;
    border: 0;
    padding: 0;
    background: transparent;
    color: inherit;
    &:focus-visible {
      outline: 3px solid #{theme.value('secondary')};
      outline-offset: -3px;
    }
    flex-shrink: 0;
    touch-action: none;
    cursor: grab;
  }
  &__handle {
    inline-size: 32px;
    block-size: 4px;
    border-radius: 2px;
    background: #{theme.value('on-surface-variant')};
    opacity: 0.4;
  }
  &.v-enter-active {
    transition: opacity #{map.get($motion, duration-medium3)} #{map.get($motion, easing-emphasized-decelerate)};
  }
  &.v-enter-active .md-sheet__panel {
    animation: md-sheet-enter #{map.get($motion, duration-medium3)} #{map.get($motion, easing-emphasized-decelerate)};
  }
  &.v-leave-active {
    transition: opacity #{map.get($motion, duration-short4)} #{map.get($motion, easing-emphasized-accelerate)};
  }
  &.v-leave-active .md-sheet__panel {
    animation: md-sheet-exit #{map.get($motion, duration-short4)} #{map.get($motion, easing-emphasized-accelerate)};
  }
  &--side {
    --md-sheet-enter-x: 100%;
    --md-sheet-enter-y: 0px;
  }
  &--side.md-sheet--start {
    --md-sheet-enter-x: -100%;
  }
  &--side.md-sheet--end:dir(rtl) {
    --md-sheet-enter-x: -100%;
  }
  &--side.md-sheet--start:dir(rtl) {
    --md-sheet-enter-x: 100%;
  }
  &--bottom.md-modal .md-sheet__panel {
    inset-block-end: 0;
    inline-size: min(100%, var(--md-bottom-sheet-max-width, 640px));
    max-block-size: var(--md-bottom-sheet-height, var(--md-sheet-max-height, calc(100dvh - 72px)));
    border-radius: 28px 28px 0 0;
    padding-block-end: env(safe-area-inset-bottom, 0px);
  }
  &--side.md-sheet--standard {
    --md-sheet-container-color: #{theme.value('surface')};
  }
  &--side .md-sheet__headline {
    color: #{theme.value('on-surface-variant')};
  }
  &--side .md-sheet__footer {
    justify-content: flex-start;
    padding-block-end: 24px;
  }
  &--side .md-sheet__content {
    overflow-x: hidden;
    overflow-wrap: anywhere;
  }
  &--side.md-modal .md-sheet__panel {
    inset-block: 0;
    block-size: 100%;
    max-block-size: 100%;
    inline-size: min(var(--md-side-sheet-width, 360px), calc(100% - 56px));
  }
  &--side.md-modal .md-modal__content,
  &--side.md-modal .md-sheet__body {
    flex: 1;
  }
  &--side.md-modal.md-sheet--end .md-sheet__panel {
    inset-inline-end: 0;
    border-start-start-radius: 16px;
    border-end-start-radius: 16px;
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }
  &--side.md-modal.md-sheet--start .md-sheet__panel {
    inset-inline-start: 0;
    border-start-end-radius: 16px;
    border-end-end-radius: 16px;
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }
  &--standard {
    box-sizing: border-box;
    position: relative;
    background: var(--md-sheet-container-color);
    max-block-size: var(--md-sheet-max-height, calc(100dvh - 24px));
    transform: translateY(var(--md-sheet-drag-offset, 0px));
  }
  &--standard.md-sheet--bottom {
    inline-size: 100%;
    max-inline-size: var(--md-bottom-sheet-max-width, 640px);
    margin-inline: auto;
    border-radius: 28px 28px 0 0;
  }
  &--standard.md-sheet--side {
    inline-size: var(--md-side-sheet-width, 360px);
    max-inline-size: 100%;
    flex-shrink: 0;
    background: #{theme.value('surface')};
  }
  &--standard.md-sheet--side.md-sheet--start {
    order: -1;
  }
  &--standard .md-sheet__body {
    max-block-size: inherit;
  }
  @media (min-width: 641px) {
    &--bottom.md-modal .md-sheet__panel {
      inline-size: min(var(--md-bottom-sheet-max-width, 640px), calc(100% - 112px));
      max-block-size: var(--md-bottom-sheet-height, var(--md-sheet-max-height, calc(100dvh - 56px)));
    }
  }
  @media (prefers-reduced-motion: reduce) {
    &.v-enter-active,
    &.v-leave-active {
      transition: none;
    }
    &.md-modal .md-sheet__panel {
      animation: none;
      transition: none;
    }
  }
}
</style>

<style>
@keyframes md-sheet-enter {
  from {
    translate: var(--md-sheet-enter-x, 0px) var(--md-sheet-enter-y, 100%);
  }
  to {
    translate: 0 0;
  }
}
@keyframes md-sheet-exit {
  from {
    translate: 0 0;
  }
  to {
    translate: var(--md-sheet-enter-x, 0px) var(--md-sheet-enter-y, 100%);
  }
}
</style>
