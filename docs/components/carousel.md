<script setup>
import { ref } from 'vue';
import mountains from '../../stories/assets/mountains.svg';
import coast from '../../stories/assets/coast.svg';
import forest from '../../stories/assets/forest.svg';
const selected = ref(0);
const items = [
  { id: 'mountains', label: 'Mountains', image: mountains, alt: 'Illustrated mountain peaks' },
  { id: 'coast', label: 'Coast', image: coast, alt: 'Illustrated turquoise bay' },
  { id: 'forest', label: 'Forest', image: forest, alt: 'Illustrated forest trail' },
  { id: 'summit', label: 'Summit', image: mountains, alt: 'Mountain summit' },
  { id: 'bay', label: 'Bay', image: coast, alt: 'A sheltered bay' },
  { id: 'trail', label: 'Trail', image: forest, alt: 'A woodland trail' },
];
</script>

# Carousel

`MdCarousel` uses the Material 3 **multi-browse** layout by default. Large, medium and small rounded items fit the container; their visible widths change continuously while scrolling. Media is cropped through a moving mask rather than stretched. Native touch/trackpad scrolling and snap alignment remain in use.

## Example

<div class="md-doc-preview md-doc-preview--column">
  <MdCarousel v-model="selected" :items="items" aria-label="Explore destinations" />
  <p role="status">Selected destination: {{ items[selected].label }}</p>
</div>

## Import

```js
import { MdCarousel } from 'vue-material-3';
```

## Usage

```vue
<script setup>
import { ref } from 'vue';
import { MdCarousel } from 'vue-material-3';
const selected = ref(0);
const items = ['Mountains', 'Coast', 'Forest'];
</script>

<template>
  <MdCarousel v-model="selected" :items="items" aria-label="Explore destinations" />
</template>
```

## API

### Props

| Prop         | Default      | Description                                                                    |
| ------------ | ------------ | ------------------------------------------------------------------------------ |
| `layout`     | `'multi-browse'` | `multi-browse` for dynamic masks; `uncontained` for equal-size items. |
| `items`      | `[]`         | Strings or objects with `id`, `label`, `image`, and `alt`.                     |
| `modelValue` | `undefined`  | Selected zero-based index; bind with `v-model` or omit for internal selection. |
| `ariaLabel`  | `'Carousel'` | Accessible name for the carousel region.                                       |

### Events

`update:modelValue(index)` and `change(index)` report selection.

### Slots

`item` receives `{ item, index, selected }` for custom slide content.

### Items and slots

`items` accepts strings or objects. The built-in rendering uses `id`, `label`, `image`, and `alt`. Use stable unique `id` values when reordering objects. The `item` scoped slot receives `{ item, index, selected }`; use it for cards, links, or other custom content. Each item retains its slide group and position label. Custom content is masked as one full-size surface; use the `md-carousel__image` and `md-carousel__label md-carousel__label--media` classes for the built-in image and adaptive-label treatment. Wrap label text in `md-carousel__label-text` for two-line clamping.

```vue
<script setup>
import { MdCarousel } from 'vue-material-3';
const destinations = [
  { id: 'mountains', label: 'Mountains', description: 'Plan a mountain walk.' },
  { id: 'coast', label: 'Coast', description: 'Explore a sheltered bay.' },
];
</script>

<template>
  <MdCarousel :items="destinations" aria-label="Destinations">
    <template #item="{ item }">
      <article>
        <h3>{{ item.label }}</h3>
        <p>{{ item.description }}</p>
      </article>
    </template>
  </MdCarousel>
</template>
```

`modelValue` is a zero-based index. Omit it for internal selection. Both native scrolling and controls emit `update:modelValue` and `change` with the index. Controlled consumers should accept updates through `v-model`. Invalid indices are clamped for display without emitting during prop synchronization. The exposed `select(index)` method selects and scrolls to an item.

### Accessibility and input

Name the region with `aria-label` (or the `ariaLabel` prop). Arrow keys browse when the scrolling viewport has focus; RTL reverses horizontal direction. Home and End reach the first and last items. Tab leaves normally, and keys inside slotted controls remain untouched. Previous/next buttons have 48px targets and configurable `previousLabel`/`nextLabel` names. `viewportLabel` localizes the viewport instructions. Each slide exposes its position; the controls announce the selected position politely.

Touch, pointer wheel, and trackpad scrolling use browser behavior. Arrow buttons, keyboard navigation and independent model changes move smoothly; resize/item-list alignment stays instant. Intermediate animation frames do not overwrite the requested controlled index. Pointer or wheel input interrupts a programmed move. Built-in images use a subtle parallax offset. Reduced motion switches navigation to instant and disables parallax; the preference is tracked live. There is no auto-advance. Fully hidden masks are inert so Tab cannot land on invisible controls. Arrow keys expose more items; Show all makes every item available in a vertical list. Focusing a visible slotted control brings its item into view.

### Sizing and theme

Override `--md-carousel-item-width`, `--md-carousel-item-height`, `--md-carousel-item-shape`, and `--md-carousel-gap`. The width token sets the preferred maximum large-item width, defaulting to 360px. Defaults are 240px high, 28px corners, 8px spacing, and 16px horizontal/8px vertical viewport padding. Multi-browse derives large and medium widths from the container, with a 48px small item. Short collections fit without artificial preview slots; very narrow containers use one full-width item. Built-in labels use at most two lines and fade out as masks become small. Colors use system theme roles. Custom slotted content is responsible for its text contrast and image alternatives.

### M3 layout and vertical alternative

The default **multi-browse** layout packs large items followed by medium and small previews. Near the end, previews move to the leading edge and the last item becomes fully visible at the trailing edge. Image dimensions stay constant throughout masking. Set `layout="uncontained"` to retain equal-size items. Hero and full-screen layouts are not implemented. These layouts and masking are standard M3 features, not Expressive-only features.

The built-in **Show all** button switches to a vertically flowing list so all items can be reached without horizontal scrolling. **Show carousel** restores the selected carousel position. Localize these actions with `showAllLabel`, `showCarouselLabel` and `allItemsLabel`. This meets the guideline’s alternate-navigation purpose without requiring an application-specific route.

Navigation actions use the library’s tonal `MdIconButton`; Show all uses `MdTextButton`. All navigation controls are non-submitting buttons.

## Storybook

Explore variants and controls in [Storybook](https://mylmz10.github.io/vue-material-3/storybook/?path=/story/components-carousel--browse).
