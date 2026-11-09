# Progress

Progress indicators communicate that a process is underway.

## Example

<div class="md-doc-preview md-doc-preview--column">
  <MdLinearProgressIndicator :value="40" />
  <MdCircularProgressIndicator aria-label="Loading" :value="40" />
  <MdLinearProgressIndicator indeterminate />
  <MdCircularProgressIndicator aria-label="Loading" indeterminate />
</div>

## Import

```js
import { MdLinearProgressIndicator, MdCircularProgressIndicator } from 'vue-material-3';
```

## Usage

```vue
<script setup>
import { MdLinearProgressIndicator, MdCircularProgressIndicator } from 'vue-material-3';
</script>

<template>
  <MdLinearProgressIndicator :value="40" />
  <MdCircularProgressIndicator aria-label="Loading" indeterminate />
</template>
```

## API

### Props

| Prop                                  | Default      | Description                                                  |
| ------------------------------------- | ------------ | ------------------------------------------------------------ |
| `value`                               | `0`          | String or number clamped to the 0–100 range.                 |
| `indeterminate`                       | `false`      | Show activity without a known completion value.              |
| `MdLinearProgressIndicator.ariaLabel` | `'Progress'` | Accessible name; use `aria-label` on the circular indicator. |

### Events

No component events.

### Slots

No public slots.

### Determinate endpoint

Determinate linear indicators include a 4px, primary-colored stop marker to identify the end of low-contrast tracks. It merges into the active bar at completion and follows the inline direction in RTL layouts. Indeterminate and circular indicators do not use a stop marker.

## Storybook

Explore variants and controls in [Storybook](https://mylmz10.github.io/vue-material-3/storybook/?path=/story/components-progress-indicators--linear-progress-indicator).
