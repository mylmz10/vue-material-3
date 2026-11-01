<script setup>
import { ref } from 'vue';
const value = ref(40);
const start = ref(25);
const end = ref(75);
</script>

# Slider

Sliders let users choose values from a range.

## Example

<div class="md-doc-preview md-doc-preview--column">
  <MdSlider aria-label="Volume" v-model="value" class="md-doc-preview__slider" :min="0" :max="100" labeled ticks :step="10" />
  <MdSlider class="md-doc-preview__slider" range :value-start="start" :value-end="end" @update:valueStart="start = $event" @update:valueEnd="end = $event" />
</div>

## Import

```js
import { MdSlider } from 'vue-material-3';
```

## Usage

```vue
<script setup>
import { ref } from 'vue';
import { MdSlider } from 'vue-material-3';
const value = ref(40);
const range = ref({ valueStart: 25, valueEnd: 75 });
</script>

<template>
  <MdSlider aria-label="Volume" v-model="value" :min="0" :max="100" />
  <MdSlider v-model="range" range aria-label-start="Minimum price" aria-label-end="Maximum price" />
</template>
```

For a range, `v-model` uses an object with `valueStart` and `valueEnd`:

```vue
<script setup>
import { ref } from 'vue';
import { MdSlider } from 'vue-material-3';
const range = ref({ valueStart: 25, valueEnd: 75 });
</script>

<template>
  <MdSlider range v-model="range" />
</template>
```

Each model endpoint takes precedence over its corresponding `value-start` or `value-end` prop. Missing model endpoints fall back to those props, then the minimum or maximum on initialization. Values are aligned to `step`, clamped to the bounds, and ordered from start to end.

## API

### Props

| Prop                                 | Default     | Description                                                    |
| ------------------------------------ | ----------- | -------------------------------------------------------------- |
| `modelValue`                         | `undefined` | Number, or `{ valueStart, valueEnd }` for a range.             |
| `min / max`                          | `0` / `100` | Allowed bounds.                                                |
| `step`                               | `1`         | Value increment.                                               |
| `range / disabled / labeled / ticks` | `false`     | Range selection, disabled state, value labels, and tick marks. |
| `valueStart / valueEnd`              | `undefined` | Fallback range endpoint values.                                |

### Events

`update:modelValue` reports a number or range object. `update:valueStart` and `update:valueEnd` report endpoints. `input`, `change`, `focus`, and `blur` report interaction.

### Slots

No public slots.

## Storybook

Explore variants and controls in [Storybook](https://mylmz10.github.io/vue-material-3/storybook/?path=/story/components-slider--single).
