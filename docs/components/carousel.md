<script setup>
import { ref } from 'vue';
import mountains from '../../stories/assets/mountains.svg';
import coast from '../../stories/assets/coast.svg';
import forest from '../../stories/assets/forest.svg';
const selected = ref(0);
const featured = ref(2);
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

## Multi-browse

<div class="md-doc-preview md-doc-preview--column">
  <MdCarousel :items="items" aria-label="Explore destinations" />
</div>

## Uncontained

Equal-width items extend past the edge of the viewport. Set `--md-carousel-item-width` to size the cards and leave part of the next one visible.

<div class="md-doc-preview md-doc-preview--column">
  <MdCarousel layout="uncontained" :items="items" aria-label="Browse destinations" style="--md-carousel-item-width: 220px" />
</div>

```vue
<MdCarousel layout="uncontained" :items="items" aria-label="Browse destinations" style="--md-carousel-item-width: 220px" />
```

## Hero

One large slide takes the focus. Small previews flank it in the middle of the collection and move to one side at either end. Drag to watch each preview expand into the featured slide.

<div class="md-doc-preview md-doc-preview--column">
  <MdCarousel v-model="featured" layout="hero" :items="items" aria-label="Featured destinations" style="--md-carousel-item-height: 280px" />
</div>

```vue
<MdCarousel layout="hero" :items="items" aria-label="Featured destinations" style="--md-carousel-item-height: 280px" />
```

## Full-screen

Each slide fills the carousel viewport from edge to edge. Set the viewport height with `--md-carousel-item-height`. Scroll or drag vertically, or use Up and Down when the viewport has focus.

<div class="md-doc-preview md-doc-preview--column">
  <MdCarousel layout="full-screen" :items="items" aria-label="Destination stories" style="--md-carousel-item-height: 480px" />
</div>

```vue
<MdCarousel layout="full-screen" :items="items" aria-label="Destination stories" style="--md-carousel-item-height: 480px" />
```

## Custom Content

Use the `#item` slot to render your own content. The slot receives the item, its zero-based index and its selection state.

<div class="md-doc-preview md-doc-preview--column">
  <MdCarousel layout="uncontained" :items="items.slice(0, 3)" aria-label="Destination cards" style="--md-carousel-item-width: 240px">
    <template #item="{ item, index }">
      <article style="display: grid; grid-template-rows: 1fr auto; height: 100%; background: var(--md-sys-color-surface-container); color: var(--md-sys-color-on-surface)">
        <img :src="item.image" :alt="item.alt" draggable="false" style="width: 100%; height: 100%; min-height: 0; object-fit: cover" />
        <div style="padding: 12px 16px">{{ index + 1 }}. {{ item.label }}</div>
      </article>
    </template>
  </MdCarousel>
</div>

## Controlled

Bind `v-model` to follow or drive the selected index. Try the external controls, then drag the carousel to update the same value.

<div class="md-doc-preview md-doc-preview--column">
  <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 8px">
    <MdTextButton :disabled="selected === 0" @click="selected--">Previous destination</MdTextButton>
    <MdTextButton :disabled="selected === items.length - 1" @click="selected++">Next destination</MdTextButton>
    <output>{{ selected + 1 }} / {{ items.length }} · {{ items[selected].label }}</output>
  </div>
  <MdCarousel v-model="selected" :items="items" aria-label="Explore destinations" />
</div>

```vue
<MdTextButton :disabled="selected === 0" @click="selected--">Previous destination</MdTextButton>
<MdTextButton :disabled="selected === items.length - 1" @click="selected++">Next destination</MdTextButton>
<MdCarousel v-model="selected" :items="items" aria-label="Explore destinations" />
```

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
| `layout`     | `'multi-browse'` | `multi-browse`, `uncontained`, `hero`, or `full-screen`. |
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

Name the region with `aria-label` (or the `ariaLabel` prop). Left and Right browse horizontal layouts when the viewport has focus, with direction reversed in RTL. Up and Down browse the full-screen layout. Home and End reach the first and last items. Tab leaves normally, and keys inside slotted controls remain untouched. Previous/next buttons have 48px targets and configurable `previousLabel`/`nextLabel` names. `viewportLabel` localizes the viewport instructions. Each slide exposes its position; the controls announce the selected position politely.

Mouse dragging follows the scroll axis and settles on a snap point. Touch, wheel, and trackpad scrolling use browser behavior. Arrow buttons, keyboard navigation and independent model changes move smoothly; resize/item-list alignment stays instant. Intermediate animation frames do not overwrite the requested controlled index. Pointer or wheel input interrupts a programmed move. Built-in images use a subtle parallax offset. Reduced motion switches navigation to instant and disables parallax; the preference is tracked live. There is no auto-advance. Fully hidden masks are inert so Tab cannot land on invisible controls. The viewport hides its scrollbar and remains scrollable. Focusing a visible slotted control brings its item into view.

### Sizing and theme

Override `--md-carousel-item-width`, `--md-carousel-item-height`, `--md-carousel-item-shape`, and `--md-carousel-gap`. The width token defaults to 360px and applies to multi-browse and uncontained. Hero calculates its width from the number of previews that fit. Full-screen uses the viewport width and the height token, with square corners and zero viewport padding. Defaults are 240px high, 28px corners, 8px spacing, and 16px horizontal/8px vertical viewport padding. Multi-browse derives large and medium widths from the container, with a 48px small item. Short collections fit without artificial preview slots; very narrow containers use one full-width item. Built-in labels use at most two lines and fade out as masks become small. Colors use system theme roles. Custom slotted content is responsible for its text contrast and image alternatives.

## Storybook

Explore variants and controls in [Storybook](https://mylmz10.github.io/vue-material-3/storybook/?path=/story/components-carousel--browse).
