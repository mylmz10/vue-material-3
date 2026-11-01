# Badge

Badges show small counts or status markers on top of another UI element.

## Example

<div class="md-doc-preview">
  <span class="md-doc-preview__badge-target">
    <MdIcon>mail</MdIcon>
    <MdBadge value="10" absolute />
  </span>
  <span class="md-doc-preview__badge-target">
    <MdIcon>notifications</MdIcon>
    <MdBadge absolute />
  </span>
</div>

## Import

```js
import { MdBadge } from 'vue-material-3';
```

## Usage

```vue
<script setup>
import { MdBadge, MdIcon } from 'vue-material-3';
</script>

<template>
  <span style="position: relative">
    <MdIcon>mail</MdIcon>
    <MdBadge value="10" absolute />
  </span>
</template>
```

## API

### Props

| Prop       | Default     | Description                                           |
| ---------- | ----------- | ----------------------------------------------------- |
| `value`    | `undefined` | String or number; omit for a dot badge.               |
| `absolute` | `true`      | Position relative to the nearest positioned ancestor. |

### Events

No component events.

### Slots

No public slots.

## Storybook

Explore variants and controls in [Storybook](https://mylmz10.github.io/vue-material-3/storybook/?path=/story/components-badge--badge).
