<template>
  <section class="md-carousel" role="region" aria-roledescription="carousel" :aria-label="ariaLabel">
    <div
      :id="viewportId"
      ref="viewportEl"
      class="md-carousel__viewport"
      :class="{ 'md-carousel__viewport--all': showAll }"
      tabindex="0"
      :aria-label="showAll ? allItemsLabel : viewportLabel"
      @keydown="onKeydown"
      @scroll.passive="onScroll"
      @scrollend="finishNavigation"
      @pointerdown="cancelNavigation"
      @wheel.passive="cancelNavigation"
    >
      <div
        v-for="(item, index) in items"
        :key="item?.id ?? index"
        class="md-carousel__item"
        role="group"
        aria-roledescription="slide"
        :aria-label="`${index + 1} of ${items.length}${item?.label ? `: ${item.label}` : ''}`"
      >
        <slot name="item" :item="item" :index="index" :selected="selectedIndex === index">
          <img v-if="item?.image" class="md-carousel__image" :src="item.image" :alt="item.alt || ''" :loading="index ? 'lazy' : 'eager'" draggable="false" />
          <span class="md-carousel__label">{{ item?.label ?? item }}</span>
        </slot>
      </div>
    </div>
    <div v-if="items.length > 1 && !showAll" class="md-carousel__controls">
      <MdIconButton
        type="button"
        tonal
        :icon="isRtl() ? 'arrow_forward' : 'arrow_back'"
        :aria-label="previousLabel"
        :disabled="selectedIndex <= 0"
        @click="select((navigationTarget ?? selectedIndex) - 1)"
      />
      <span class="md-carousel__position" dir="ltr" aria-live="polite" aria-atomic="true">{{ selectedIndex + 1 }} / {{ items.length }}</span>
      <MdIconButton
        type="button"
        tonal
        :icon="isRtl() ? 'arrow_back' : 'arrow_forward'"
        :aria-label="nextLabel"
        :disabled="selectedIndex >= items.length - 1"
        @click="select((navigationTarget ?? selectedIndex) + 1)"
      />
    </div>
    <MdTextButton v-if="items.length > 1" type="button" class="md-carousel__show-all" :aria-expanded="showAll" :aria-controls="viewportId" @click="showAll = !showAll">
      {{ showAll ? showCarouselLabel : showAllLabel }}
    </MdTextButton>
  </section>
</template>

<script setup>
import MdIconButton from '../icon-button/MdIconButton.vue';
import MdTextButton from '../button/MdTextButton.vue';
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch, useId } from 'vue';

const props = defineProps({
  items: { type: Array, default: () => [] },
  modelValue: { type: Number, default: undefined },
  ariaLabel: { type: String, default: 'Carousel' },
  viewportLabel: { type: String, default: 'Items; use left and right arrow keys to browse' },
  showAllLabel: { type: String, default: 'Show all' },
  showCarouselLabel: { type: String, default: 'Show carousel' },
  allItemsLabel: { type: String, default: 'All items' },
  previousLabel: { type: String, default: 'Previous item' },
  nextLabel: { type: String, default: 'Next item' },
});
const emit = defineEmits(['update:modelValue', 'change']);
const viewportEl = ref(null);
const viewportId = `md-carousel-${useId()}`;
const internalIndex = ref(0);
const showAll = ref(false);
let resizeObserver;
let scrollFrame;
let requestedIndex;
let navigationTarget;
let navigationIdleTimer;
let motionQuery;
const clearNavigation = () => {
  clearTimeout(navigationIdleTimer);
  navigationIdleTimer = undefined;
  navigationTarget = undefined;
};
const cancelNavigation = () => {
  const navigating = navigationTarget !== undefined;
  if (navigating) requestedIndex = undefined;
  clearNavigation();
  if (navigating) viewportEl.value?.scrollTo?.({ left: viewportEl.value.scrollLeft, behavior: 'instant' });
};
const finishNavigation = () => {
  if (navigationTarget === undefined) return;
  const target = navigationTarget;
  clearNavigation();
  if (props.modelValue !== undefined && selectedIndex.value !== target) {
    requestedIndex = undefined;
    scrollToIndex(selectedIndex.value);
    return;
  }
  onScroll();
};
const waitForScrollEnd = () => {
  clearTimeout(navigationIdleTimer);
  navigationIdleTimer = setTimeout(finishNavigation, 160);
};
const clamp = (index) => Math.max(0, Math.min(Number.isFinite(index) ? Math.trunc(index) : 0, props.items.length - 1));
const selectedIndex = computed(() => clamp(props.modelValue ?? internalIndex.value));
const isRtl = () => viewportEl.value && getComputedStyle(viewportEl.value).direction === 'rtl';
const slideElements = () => Array.from(viewportEl.value?.children || []);
const scrollToIndex = (index, animate = false) => {
  if (showAll.value) return;
  const viewport = viewportEl.value;
  const slide = slideElements()[index];
  if (!viewport || !slide) return;
  const bounds = viewport.getBoundingClientRect();
  const target = slide.getBoundingClientRect();
  const delta = isRtl() ? target.right - bounds.right + 4 : target.left - bounds.left - 4;
  clearNavigation();
  const smooth = animate && !motionQuery?.matches && Math.abs(delta) > 1;
  if (animate && Math.abs(delta) > 1 && viewport.scrollBy) {
    navigationTarget = index;
    waitForScrollEnd();
  }
  viewport.scrollBy?.({ left: delta, behavior: smooth ? 'smooth' : 'instant' });
};
const updateSelection = (index) => {
  if (index === selectedIndex.value) return;
  internalIndex.value = index;
  requestedIndex = index;
  emit('update:modelValue', index);
  emit('change', index);
};
const select = (index) => {
  if (!props.items.length) return;
  const nextIndex = clamp(index);
  updateSelection(nextIndex);
  scrollToIndex(nextIndex, true);
};
const onKeydown = (event) => {
  if (showAll.value || event.target !== viewportEl.value || event.altKey || event.ctrlKey || event.metaKey || event.isComposing) return;
  const currentIndex = navigationTarget ?? selectedIndex.value;
  let index;
  if (event.key === 'ArrowRight') index = currentIndex + (isRtl() ? -1 : 1);
  else if (event.key === 'ArrowLeft') index = currentIndex + (isRtl() ? 1 : -1);
  else if (event.key === 'Home') index = 0;
  else if (event.key === 'End') index = props.items.length - 1;
  else return;
  event.preventDefault();
  select(index);
};
const onScroll = () => {
  if (showAll.value) return;
  if (navigationTarget !== undefined) waitForScrollEnd();
  if (scrollFrame) cancelAnimationFrame(scrollFrame);
  scrollFrame = requestAnimationFrame(() => {
    scrollFrame = null;
    const viewport = viewportEl.value;
    if (showAll.value || !viewport || !props.items.length) return;
    const bounds = viewport.getBoundingClientRect();
    const rtl = isRtl();
    const edge = rtl ? bounds.right - 4 : bounds.left + 4;
    const distances = slideElements().map((slide) => {
      const rect = slide.getBoundingClientRect();
      const shift = motionQuery?.matches ? 0 : Math.max(-16, Math.min(16, ((rect.left + rect.right - bounds.left - bounds.right) / 2) * 0.08));
      slide.style.setProperty('--md-carousel-parallax', `${shift}px`);
      return Math.abs((rtl ? rect.right : rect.left) - edge);
    });
    if (navigationTarget === undefined) updateSelection(distances.indexOf(Math.min(...distances)));
  });
};
watch(
  () => props.modelValue,
  (index) => {
    // A v-model acknowledgement must not interrupt native scroll momentum.
    if (clamp(index) === requestedIndex) {
      requestedIndex = undefined;
      return;
    }
    requestedIndex = undefined;
    nextTick(() => scrollToIndex(selectedIndex.value, true));
  }
);
watch(
  () => props.items.length,
  () =>
    nextTick(() => {
      internalIndex.value = clamp(props.modelValue ?? internalIndex.value);
      scrollToIndex(selectedIndex.value);
    })
);
watch(showAll, () => {
  cancelNavigation();
  if (!showAll.value) nextTick(() => scrollToIndex(selectedIndex.value));
});
const onMotionChange = () => {
  if (motionQuery.matches) {
    cancelNavigation();
    scrollToIndex(selectedIndex.value);
  }
};
onMounted(() => {
  motionQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
  motionQuery?.addEventListener('change', onMotionChange);
  scrollToIndex(selectedIndex.value);
  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(() => scrollToIndex(selectedIndex.value));
    resizeObserver.observe(viewportEl.value);
  }
});
onBeforeUnmount(() => {
  clearNavigation();
  motionQuery?.removeEventListener('change', onMotionChange);
  resizeObserver?.disconnect();
  if (scrollFrame) cancelAnimationFrame(scrollFrame);
});
defineExpose({ select });
</script>

<style lang="scss">
@use '../../styles/theme/md-sys-color' as theme;
.md-carousel {
  --md-carousel-item-width: clamp(160px, 60vw, 360px);
  --md-carousel-item-height: 240px;
  --md-carousel-item-shape: 28px;
  --md-carousel-gap: 8px;
  min-inline-size: 0;
  color: #{theme.value('on-surface')};
  &__viewport {
    display: flex;
    gap: var(--md-carousel-gap);
    overflow-x: auto;
    overscroll-behavior-inline: contain;
    scroll-snap-type: x mandatory;
    scrollbar-width: thin;
    padding: 4px;
    scroll-padding-inline: 4px;
    &::after {
      content: '';
      flex: 0 0 max(0px, calc(100% - min(var(--md-carousel-item-width), calc(100% - 8px)) - var(--md-carousel-gap)));
    }
  }
  &__viewport--all {
    display: grid;
    overflow: visible;
    scroll-snap-type: none;
    &::after {
      display: none;
    }
  }
  &__show-all {
    min-block-size: 48px;
  }
  &__item {
    flex: 0 0 min(var(--md-carousel-item-width), calc(100% - 8px));
    min-inline-size: 0;
    block-size: var(--md-carousel-item-height);
    border-radius: var(--md-carousel-item-shape);
    overflow: hidden;
    position: relative;
    scroll-snap-align: start;
    background: #{theme.value('surface-container')};
  }
  &__image {
    inline-size: calc(100% + 32px);
    max-inline-size: none;
    margin-inline-start: -16px;
    block-size: 100%;
    object-fit: cover;
    transform: translateX(var(--md-carousel-parallax, 0px));
  }
  &__label {
    display: block;
    padding: 16px;
  }
  &__image + &__label {
    position: absolute;
    inset-inline: 0;
    inset-block-end: 0;
    color: white;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
    padding: 48px 24px 24px;
    font-size: 22px;
    line-height: 28px;
    font-weight: 500;
  }
  &__controls {
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 8px;
    padding-block: 8px;
  }
  &__controls .md-icon-button {
    inline-size: 48px;
    block-size: 48px;
  }
  &__viewport:focus-visible {
    outline: 2px solid #{theme.value('primary')};
    outline-offset: 2px;
  }
  @media (prefers-reduced-motion: reduce) {
    &__image {
      transform: none;
    }
  }
  &__viewport--all &__image {
    transform: none;
  }
}
</style>
