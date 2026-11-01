# Avatar

Avatars represent people or entities with initials or imagery.

## Example

<div class="md-doc-preview">
  <MdAvatar initials="MY" />
  <MdAvatar initials="VM" />
</div>

## Import

```js
import { MdAvatar } from 'vue-material-3';
```

## Usage

```vue
<script setup>
import { MdAvatar } from 'vue-material-3';
</script>

<template>
  <MdAvatar initials="MY" />
</template>
```

## API

### Props

| Prop       | Default     | Description                                               |
| ---------- | ----------- | --------------------------------------------------------- |
| `image`    | `undefined` | Image URL; omit it to display initials.                   |
| `initials` | `undefined` | Initials to display; also used as image alternative text. |

### Events

No component events.

### Slots

No public slots.

## Storybook

Explore variants and controls in [Storybook](https://mylmz10.github.io/vue-material-3/storybook/?path=/story/components-avatar--avatar).
