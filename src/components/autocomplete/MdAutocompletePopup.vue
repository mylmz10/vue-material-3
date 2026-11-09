<template>
  <Transition name="md-autocomplete-popup">
    <div v-show="nativePopover || open" ref="surface" class="md-autocomplete-popup" :popover="nativePopover ? 'manual' : undefined" :inert="!open || undefined" :aria-hidden="!open || undefined">
      <slot />
    </div>
  </Transition>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';

const props = defineProps({
  open: Boolean,
  anchor: { type: Function, required: true },
});
const emit = defineEmits(['dismiss']);
const surface = ref(null);
const nativePopover = ref(false);
let observer;

const position = () => {
  const panel = surface.value;
  const anchor = props.anchor();
  if (!props.open || !panel || !anchor) return;

  const viewport = window.visualViewport;
  const leftEdge = (viewport?.offsetLeft ?? 0) + 8;
  const topEdge = (viewport?.offsetTop ?? 0) + 8;
  const rightEdge = leftEdge + (viewport?.width ?? window.innerWidth) - 16;
  const bottomEdge = topEdge + (viewport?.height ?? window.innerHeight) - 16;
  const rect = anchor.getBoundingClientRect();
  if (!rect.width) return;
  if (rect.bottom <= topEdge - 8 || rect.top >= bottomEdge + 8) {
    emit('dismiss');
    return;
  }
  const width = Math.min(rect.width, Math.max(0, rightEdge - leftEdge));
  const below = Math.max(0, bottomEdge - rect.bottom - 4);
  const above = Math.max(0, rect.top - topEdge - 4);
  panel.style.width = `${width}px`;
  const desired = Math.min(280, panel.scrollHeight);
  const opensAbove = below < desired && above > below;
  const height = opensAbove ? above : below;
  panel.style.left = `${Math.max(leftEdge, Math.min(rect.left, rightEdge - width))}px`;
  panel.style.top = opensAbove ? 'auto' : `${Math.max(topEdge, rect.bottom + 4)}px`;
  panel.style.bottom = opensAbove ? `${window.innerHeight - Math.min(rect.top - 4, bottomEdge)}px` : 'auto';
  panel.style.maxHeight = `${Math.min(280, height)}px`;
  panel.style.transformOrigin = opensAbove ? 'bottom' : 'top';
};

const onScroll = (event) => {
  if (event.target instanceof Node && surface.value?.contains(event.target)) return;
  position();
};

const onOutsidePress = (event) => {
  if (!surface.value?.contains(event.target) && !props.anchor()?.contains(event.target)) emit('dismiss');
};

const stop = () => {
  observer?.disconnect();
  document.removeEventListener('mousedown', onOutsidePress);
  window.removeEventListener('resize', position);
  window.removeEventListener('scroll', onScroll, true);
  window.visualViewport?.removeEventListener('resize', position);
  window.visualViewport?.removeEventListener('scroll', position);
  if (nativePopover.value && surface.value?.matches(':popover-open')) surface.value.hidePopover();
};

onMounted(() => {
  nativePopover.value = typeof surface.value?.showPopover === 'function';
});

watch(
  () => props.open,
  (open) => {
    if (!open) {
      stop();
      return;
    }
    const panel = surface.value;
    if (nativePopover.value && !panel.matches(':popover-open')) panel.showPopover();
    position();
    document.addEventListener('mousedown', onOutsidePress);
    window.addEventListener('resize', position);
    window.addEventListener('scroll', onScroll, true);
    window.visualViewport?.addEventListener('resize', position);
    window.visualViewport?.addEventListener('scroll', position);
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(position);
      const anchor = props.anchor();
      if (anchor) observer.observe(anchor);
      if (panel.firstElementChild) observer.observe(panel.firstElementChild);
    }
  },
  { flush: 'post' }
);
onBeforeUnmount(stop);
</script>

<style lang="scss">
@use '../../styles/theme/md-sys-color' as theme;

.md-autocomplete-popup {
  position: fixed;
  inset: auto;
  z-index: 20;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 4px;
  overflow: auto;
  overscroll-behavior: contain;
  color: inherit;
  background: #{theme.value('surface-container')};
  box-shadow: 0 2px 6px rgb(0 0 0 / 18%);

  .md-list {
    min-width: 0;
    max-height: none;
    overflow: visible;
    background: transparent;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .md-autocomplete-popup[popover] {
    opacity: 0;
    transform: scaleY(0.98);
    transition: opacity 110ms ease, transform 110ms ease, display 110ms allow-discrete, overlay 110ms allow-discrete;

    &:popover-open {
      opacity: 1;
      transform: scaleY(1);

      @starting-style {
        opacity: 0;
        transform: scaleY(0.98);
      }
    }
  }

  .md-autocomplete-popup-enter-active,
  .md-autocomplete-popup-leave-active {
    transition: opacity 110ms ease, transform 110ms ease;
  }
  .md-autocomplete-popup-enter-from,
  .md-autocomplete-popup-leave-to {
    opacity: 0;
    transform: scaleY(0.98);
  }
}
</style>
