# Carousel

`MdCarousel` provides a responsive horizontal media collection with rounded containers, a partially visible next item, native touch/trackpad scrolling, and scroll snapping. This is a standard M3 baseline; it does not implement expressive masking, hero transitions, or automatic rotation.

```vue
<script setup>
import { ref } from 'vue';
import { MdCarousel } from 'vue-material-3';
const selected = ref(0);
const items = [
  { id: 'mountains', label: 'Mountains', image: '/mountains.jpg', alt: 'Snowy peaks' },
  { id: 'coast', label: 'Coast', image: '/coast.jpg', alt: 'A rocky coastline' },
];
</script>

<template>
  <MdCarousel v-model="selected" :items="items" aria-label="Explore destinations" />
</template>
```

## Items and slots

`items` accepts strings or objects. The built-in rendering uses `id`, `label`, `image`, and `alt`. Use stable unique `id` values when reordering objects. The `item` scoped slot receives `{ item, index, selected }`; use it for cards, links, or other custom content. Each item retains its slide group and position label.

```vue
<MdCarousel :items="destinations" aria-label="Destinations">
  <template #item="{ item }">
    <a :href="item.href">{{ item.label }}</a>
  </template>
</MdCarousel>
```

`modelValue` is a zero-based index. Omit it for internal selection. Both native scrolling and controls emit `update:modelValue` and `change` with the index. Controlled consumers should accept updates through `v-model`. Invalid indices are clamped for display without emitting during prop synchronization. The exposed `select(index)` method selects and scrolls to an item.

## Accessibility and input

Name the region with `aria-label` (or the `ariaLabel` prop). Arrow keys browse when the scrolling viewport has focus; RTL reverses horizontal direction. Home and End reach the first and last items. Tab leaves normally, and keys inside slotted controls remain untouched. Previous/next buttons have 48px targets and configurable `previousLabel`/`nextLabel` names. `viewportLabel` localizes the viewport instructions. Each slide exposes its position; the controls announce the selected position politely.

Touch, pointer wheel, and trackpad scrolling use browser behavior. Arrow buttons, keyboard navigation and independent model changes move smoothly; resize/item-list alignment stays instant. Intermediate animation frames do not overwrite the requested controlled index. Pointer or wheel input interrupts a programmed move. Built-in images use a subtle parallax offset. Reduced motion switches navigation to instant and disables parallax; the preference is tracked live. There is no auto-advance. Offscreen content is not made inert: native keyboard focus can still reach links in every item.

## Sizing and theme

Override `--md-carousel-item-width`, `--md-carousel-item-height`, `--md-carousel-item-shape`, and `--md-carousel-gap`. Defaults are responsive up to 360px wide, 240px high, 28px corners, and 8px spacing. Items shrink to fit narrow containers. Colors use system theme roles. Custom slotted content is responsible for its text contrast and image alternatives.

## M3 layout and vertical alternative

This is the **uncontained** M3 layout: equal-sized items may extend beyond the viewport edge. Snap scrolling is supported by that layout. Multi-browse, hero and full-screen are separate M3 layouts, not Expressive-only features, and are not implemented here.

The built-in **Show all** button switches to a vertically flowing list so all items can be reached without horizontal scrolling. **Show carousel** restores the selected carousel position. Localize these actions with `showAllLabel`, `showCarouselLabel` and `allItemsLabel`. This meets the guideline’s alternate-navigation purpose without requiring an application-specific route.

Navigation actions use the library’s tonal `MdIconButton`; Show all uses `MdTextButton`. All navigation controls are non-submitting buttons.
