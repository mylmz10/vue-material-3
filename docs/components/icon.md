# Icon

`MdIcon` renders a Material Symbols icon by name.

## Example

<div class="md-doc-preview">
  <MdIcon>star</MdIcon>
  <MdIcon>favorite</MdIcon>
  <MdIcon>settings</MdIcon>
</div>

## Import

```js
import { MdIcon } from 'vue-material-3';
```

## Usage

```vue
<script setup>
import { MdIcon } from 'vue-material-3';
</script>

<template>
  <MdIcon>star</MdIcon>
</template>
```

## API

### Props

No declared props.

### Events

No component events. Standard HTML and ARIA attributes are forwarded to the icon.

### Slots

`default` supplies the Material Symbols ligature name, such as `star`.

### Accessibility

Icons are decorative (`aria-hidden="true"`) by default, so ligature names do not enter button names. Give an icon-only control its own `aria-label`. For a standalone meaningful icon, pass `aria-label` or `aria-labelledby` to `MdIcon`; it then exposes an image role.

## Storybook

Explore variants and controls in [Storybook](https://mylmz10.github.io/vue-material-3/storybook/?path=/story/components-icon--icon).
