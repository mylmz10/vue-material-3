# Divider

Dividers separate content within lists and layouts.

## Example

<div class="md-doc-preview md-doc-preview--column">
  <div class="md-doc-preview__surface">
    <span>Section one</span>
    <MdDivider />
    <span>Section two</span>
  </div>
</div>

## Import

```js
import { MdDivider } from 'vue-material-3';
```

## Usage

```vue
<script setup>
import { MdDivider } from 'vue-material-3';
</script>

<template>
  <MdDivider />
</template>
```

## API

### Props

| Prop       | Default | Description             |
| ---------- | ------- | ----------------------- |
| `vertical` | `false` | Use a vertical divider. |
| `tag`      | `'div'` | Root HTML element.      |

### Events

No component events.

### Slots

No public slots.

## Storybook

Explore variants and controls in [Storybook](https://mylmz10.github.io/vue-material-3/storybook/?path=/story/components-divider--horizontal).
