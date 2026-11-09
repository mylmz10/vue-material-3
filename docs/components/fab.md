# FAB

Floating action buttons represent the primary action on a screen.

## Example

<div class="md-doc-preview">
  <MdFab aria-label="Create" icon="add" size="small" />
  <MdFab aria-label="Create" icon="add" />
  <MdFab aria-label="Create" icon="add" size="large" />
  <MdBrandedFab aria-label="Book a taxi" icon="local_taxi" />
  <MdBrandedFab aria-label="Book a taxi" icon="local_taxi" size="large" />
  <MdFabExtended icon="add" label="Create" />
</div>

## Import

```js
import { MdFab, MdBrandedFab, MdFabExtended } from 'vue-material-3';
```

## Usage

```vue
<script setup>
import { MdFab, MdBrandedFab, MdFabExtended } from 'vue-material-3';
</script>

<template>
  <MdFab aria-label="Create" icon="add" size="small" />
  <MdFab aria-label="Create" icon="add" />
  <MdFab aria-label="Create" icon="add" size="large" />

  <MdBrandedFab aria-label="Book a taxi" icon="local_taxi" />
  <MdBrandedFab aria-label="Book a taxi" icon="local_taxi" size="large" />

  <MdFabExtended icon="add" label="Create" />
</template>
```

## API

### Props

| Prop                  | Default     | Description                               |
| --------------------- | ----------- | ----------------------------------------- |
| `icon`                | `undefined` | Material Symbols icon name.               |
| `disabled`            | `false`     | Disable the action.                       |
| `MdFab.size`          | `undefined` | `small`, omitted normal size, or `large`. |
| `MdBrandedFab.size`   | `'medium'`  | `medium` or `large`.                      |
| `MdFabExtended.label` | `undefined` | Visible action label.                     |

### Events

Use native `@click` to handle the action.

### Slots

`MdBrandedFab` provides an `icon` slot. `MdFab` and `MdFabExtended` have no public slots.

### Sizes

- `MdFab` supports `small`, default, and `large` sizes through the `size` prop.
- `MdBrandedFab` supports default and `large` sizes through the `size` prop.
- `MdFabExtended` uses its extended layout rather than the circular size variants.

## Storybook

Explore variants and controls in [Storybook](https://mylmz10.github.io/vue-material-3/storybook/?path=/story/components-fab--fab).
