<template>
  <section class="md-carousel" :class="`md-carousel--${layout}`" role="region" aria-roledescription="carousel" :aria-label="ariaLabel">
    <span ref="sizerEl" class="md-carousel__sizer" aria-hidden="true"></span>
    <div
      :id="viewportId"
      ref="viewportEl"
      class="md-carousel__viewport"
      :class="{ 'md-carousel__viewport--all': showAll }"
      tabindex="0"
      :aria-label="showAll ? allItemsLabel : viewportLabel"
      @keydown="onKeydown"
      @focusin="onItemFocus"
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
        <div class="md-carousel__mask">
          <div class="md-carousel__content">
            <slot name="item" :item="item" :index="index" :selected="selectedIndex === index">
              <img v-if="item?.image" class="md-carousel__image" :src="item.image" :alt="item.alt || ''" :loading="index ? 'lazy' : 'eager'" draggable="false" />
              <span class="md-carousel__label" :class="{ 'md-carousel__label--media': item?.image }"
                ><span class="md-carousel__label-text">{{ item?.label ?? item }}</span></span
              >
            </slot>
          </div>
        </div>
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

import { createCarouselLayout, getCarouselMask } from './carouselLayout';

const props = defineProps({
  layout: { type: String, default: 'multi-browse', validator: (value) => ['multi-browse', 'uncontained'].includes(value) },
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
const sizerEl = ref(null);
let geometry;
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
  if (geometry && Math.abs(Math.abs(viewportEl.value.scrollLeft) - scrollOffsetForIndex(target)) > 1) {
    waitForScrollEnd();
    return;
  }
  clearNavigation();
  if (props.modelValue !== undefined && selectedIndex.value !== target) {
    requestedIndex = undefined;
    scrollToIndex(selectedIndex.value);
    return;
  }
  updateMasks();
};
const waitForScrollEnd = () => {
  clearTimeout(navigationIdleTimer);
  navigationIdleTimer = setTimeout(finishNavigation, 160);
};
const clamp = (index) => Math.max(0, Math.min(Number.isFinite(index) ? Math.trunc(index) : 0, props.items.length - 1));
const selectedIndex = computed(() => clamp(props.modelValue ?? internalIndex.value));
const isRtl = () => viewportEl.value && getComputedStyle(viewportEl.value).direction === 'rtl';
const slideElements = () => Array.from(viewportEl.value?.children || []);
const scrollOffsetForIndex = (index) => Math.min(Math.max(0, viewportEl.value.scrollWidth - viewportEl.value.clientWidth), index * (geometry.large + geometry.gap));
const scrollToIndex = (index, animate = false) => {
  if (showAll.value) return;
  const viewport = viewportEl.value;
  const slide = slideElements()[index];
  if (!viewport || !slide) return;
  const bounds = viewport.getBoundingClientRect();
  const target = slide.getBoundingClientRect();
  const delta = isRtl() ? target.right - bounds.right + 16 : target.left - bounds.left - 16;
  if (!animate) requestedIndex = undefined;
  clearNavigation();
  const smooth = animate && !motionQuery?.matches && Math.abs(delta) > 1;
  if (animate && Math.abs(delta) > 1 && viewport.scrollBy) {
    navigationTarget = index;
    waitForScrollEnd();
  }
  viewport.scrollBy?.({ left: geometry?.fits ? 0 : delta, behavior: smooth ? 'smooth' : 'instant' });
  if (!smooth) updateMasks();
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
const updateMasks = () => {
  const viewport = viewportEl.value;
  if (!viewport || !geometry || showAll.value) return;
  const bounds = viewport.getBoundingClientRect();
  const rtl = isRtl();
  const offset = Math.abs(viewport.scrollLeft);
  const maxOffset = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
  const slides = slideElements().map((slide) => ({ slide, rect: slide.getBoundingClientRect() }));
  for (const { slide, rect } of slides) {
    const rawCenter = (rtl ? bounds.right - rect.right : rect.left - bounds.left) - 16 + geometry.large / 2;
    const mask = props.layout === 'multi-browse' ? getCarouselMask(geometry, rawCenter, offset, maxOffset) : { center: rawCenter, width: geometry.large };
    const left = props.layout === 'uncontained' ? mask.center - mask.width / 2 : Math.max(0, mask.center - mask.width / 2);
    const right = props.layout === 'uncontained' ? mask.center + mask.width / 2 : Math.min(geometry.available, mask.center + mask.width / 2);
    const width = Math.max(0, right - left);
    const physicalLeft = rtl ? bounds.right - 16 - right : bounds.left + 16 + left;
    const contentLeft = (rtl ? bounds.right - 16 - mask.center : bounds.left + 16 + mask.center) - geometry.large / 2;
    const surface = slide.querySelector('.md-carousel__mask');
    surface.style.width = `${width}px`;
    surface.style.transform = `translateX(${physicalLeft - rect.left}px)`;
    const hidden = width < 1 || physicalLeft + width <= bounds.left || physicalLeft >= bounds.right;
    surface.inert = hidden;
    surface.style.visibility = hidden ? 'hidden' : '';
    surface.style.setProperty('--md-carousel-content-offset', `${contentLeft - physicalLeft}px`);
    surface.style.setProperty('--md-carousel-label-left', `${physicalLeft - contentLeft}px`);
    surface.style.setProperty('--md-carousel-label-right', `${geometry.large + contentLeft - physicalLeft - width}px`);
    surface.style.setProperty(
      '--md-carousel-label-opacity',
      `${props.layout === 'uncontained' || geometry.fits || showAll.value ? 1 : Math.max(0, Math.min(1, (width - geometry.small) / Math.max(1, geometry.medium - geometry.small)))}`
    );
    surface.style.setProperty('--md-carousel-parallax', `${motionQuery?.matches ? 0 : Math.max(-16, Math.min(16, (mask.center - geometry.available / 2) * 0.08 * (rtl ? -1 : 1)))}px`);
  }
};
const reflow = () => {
  const viewport = viewportEl.value;
  if (!viewport) return;
  const available = Math.max(1, viewport.clientWidth - 32);
  if (viewport.clientWidth) {
    const width = sizerEl.value.getBoundingClientRect().width || 360;
    const measuredGap = parseFloat(getComputedStyle(viewport).columnGap);
    const gap = Number.isFinite(measuredGap) ? Math.max(0, measuredGap) : 8;
    geometry = props.layout === 'multi-browse' ? createCarouselLayout(available, width, gap, props.items.length) : { available, large: Math.min(width, available), gap, fits: false };
    viewport.style.setProperty('--md-carousel-large-width', `${geometry.large}px`);
  }
  scrollToIndex(selectedIndex.value);
  updateMasks();
};
const onItemFocus = (event) => {
  if (showAll.value || event.target === viewportEl.value) return;
  const index = slideElements().indexOf(event.target.closest('.md-carousel__item'));
  if (index >= 0) select(index);
};
const onScroll = () => {
  if (showAll.value) return;
  if (navigationTarget !== undefined) waitForScrollEnd();
  if (scrollFrame) cancelAnimationFrame(scrollFrame);
  scrollFrame = requestAnimationFrame(() => {
    scrollFrame = null;
    const viewport = viewportEl.value;
    if (showAll.value || !viewport || !props.items.length) return;
    updateMasks();
    if (navigationTarget !== undefined) return;
    const bounds = viewport.getBoundingClientRect();
    const rtl = isRtl();
    const edge = rtl ? bounds.right - 16 : bounds.left + 16;
    const distances = slideElements().map((slide) => {
      const rect = slide.getBoundingClientRect();
      return Math.abs((rtl ? rect.right : rect.left) - edge);
    });
    if (geometry) {
      const max = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
      const offset = Math.abs(viewport.scrollLeft);
      const currentOffset = scrollOffsetForIndex(selectedIndex.value);
      if (Math.abs(currentOffset - offset) < 1) return;
      if (max > 0 && offset >= max - 1) {
        updateSelection(props.items.length - 1);
        return;
      }
    }
    updateSelection(distances.indexOf(Math.min(...distances)));
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
  () => [props.layout, ...props.items.map((item, index) => item?.id ?? index)],
  (keys, previous) => {
    if (previous && keys.length === previous.length && keys.every((key, index) => key === previous[index])) return;
    nextTick(() => {
      internalIndex.value = clamp(props.modelValue ?? internalIndex.value);
      reflow();
    });
  }
);
watch(showAll, () => {
  cancelNavigation();
  nextTick(() => {
    if (!showAll.value) reflow();
    else
      for (const surface of viewportEl.value?.querySelectorAll('.md-carousel__mask') || []) {
        surface.removeAttribute('style');
        surface.inert = false;
      }
  });
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
  reflow();
  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(reflow);
    resizeObserver.observe(viewportEl.value);
    resizeObserver.observe(sizerEl.value);
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
@use 'sass:map';
@use '../../styles/tokens';
@use '../../styles/theme/md-sys-color' as theme;
$carousel: tokens.md-comp-carousel-item-values();
.md-carousel {
  --md-carousel-item-width: 360px;
  --md-carousel-item-height: 240px;
  --md-carousel-item-shape: #{map.get($carousel, container-shape)};
  --md-carousel-gap: 8px;
  position: relative;
  box-sizing: border-box;
  inline-size: 100%;
  max-inline-size: 100%;
  min-inline-size: 0;
  color: #{theme.value('on-surface')};
  &__sizer {
    position: absolute;
    inline-size: min(var(--md-carousel-item-width), 100%);
    block-size: var(--md-carousel-gap);
    visibility: hidden;
    pointer-events: none;
  }
  &__viewport {
    display: flex;
    gap: var(--md-carousel-gap);
    overflow-x: auto;
    overscroll-behavior-inline: contain;
    scroll-snap-type: x mandatory;
    scrollbar-width: thin;
    padding: 8px 16px;
    scroll-padding-inline: 16px;
  }
  &--uncontained &__viewport::after {
    content: '';
    flex: 0 0 max(0px, calc(100% - var(--md-carousel-large-width, var(--md-carousel-item-width)) - var(--md-carousel-gap)));
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
    display: flex;
    margin-inline-start: auto;
    min-block-size: 48px;
  }
  &__item {
    flex: 0 0 var(--md-carousel-large-width, min(var(--md-carousel-item-width), calc(100% - 32px)));
    min-inline-size: 0;
    block-size: var(--md-carousel-item-height);
    position: relative;
    scroll-snap-align: start;
    pointer-events: none;
  }
  &__mask {
    block-size: 100%;
    border-radius: var(--md-carousel-item-shape);
    overflow: hidden;
    position: relative;
    pointer-events: auto;
    background: #{theme.value('surface')};
  }
  &__mask:focus-within {
    outline: 2px solid #{theme.value('primary')};
    outline-offset: -2px;
  }
  &__content {
    inline-size: var(--md-carousel-large-width, 100%);
    block-size: 100%;
    position: relative;
    transform: translateX(var(--md-carousel-content-offset, 0px));
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
    position: absolute;
    left: var(--md-carousel-label-left, 0px);
    right: var(--md-carousel-label-right, 0px);
    top: 0;
    padding: 16px;
    opacity: var(--md-carousel-label-opacity, 1);
    display: block;
  }
  &__label-text {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  &__label--media {
    position: absolute;
    top: auto;
    bottom: 0;
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
  &__viewport--all &__mask {
    inline-size: 100%;
    transform: none;
  }
  &__viewport--all &__content {
    inline-size: 100%;
    transform: none;
  }
  &__viewport--all &__image {
    transform: none;
  }
}
</style>
