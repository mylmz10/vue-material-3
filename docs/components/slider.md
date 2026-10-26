<script setup>
import { ref } from 'vue';
const value = ref(40);
const start = ref(25);
const end = ref(75);
</script>

# Slider

Sliders let users choose values from a range.

<div class="md-doc-preview md-doc-preview--column">
  <MdSlider v-model="value" class="md-doc-preview__slider" :min="0" :max="100" labeled ticks :step="10" />
  <MdSlider class="md-doc-preview__slider" range :value-start="start" :value-end="end" @update:valueStart="start = $event" @update:valueEnd="end = $event" />
</div>

## Import

```js
import { MdSlider } from 'vue-material-3';
```

## Usage

```vue
<MdSlider v-model="value" :min="0" :max="100" />
<MdSlider range :value-start="start" :value-end="end" />
```

For a range, `v-model` uses an object with `valueStart` and `valueEnd`:

```vue
<script setup>
import { ref } from 'vue';
const range = ref({ valueStart: 25, valueEnd: 75 });
</script>

<template>
  <MdSlider range v-model="range" />
</template>
```

Each model endpoint takes precedence over its corresponding `value-start` or `value-end` prop. Missing model endpoints fall back to those props, then the minimum or maximum on initialization. Values are aligned to `step`, clamped to the bounds, and ordered from start to end.

## Storybook

Use <a href="/vue-material-3/storybook/?path=/story/components-slider--single" target="_blank" rel="noreferrer">Storybook</a> for slider variants.
