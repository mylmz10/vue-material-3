# FAB

Floating action buttons represent the primary action on a screen.

<div class="md-doc-preview">
  <MdFab icon="add" size="small" />
  <MdFab icon="add" />
  <MdFab icon="add" size="large" />
  <MdBrandedFab icon="local_taxi" />
  <MdBrandedFab icon="local_taxi" size="large" />
  <MdFabExtended icon="add" label="Create" />
</div>

## Import

```js
import { MdFab, MdBrandedFab, MdFabExtended } from 'vue-material-3';
```

## Usage

```vue
<MdFab icon="add" size="small" />
<MdFab icon="add" />
<MdFab icon="add" size="large" />

<MdBrandedFab icon="local_taxi" />
<MdBrandedFab icon="local_taxi" size="large" />

<MdFabExtended icon="add" label="Create" />
```

## Sizes

- `MdFab` supports `small`, default, and `large` sizes through the `size` prop.
- `MdBrandedFab` supports default and `large` sizes through the `size` prop.
- `MdFabExtended` uses its extended layout rather than the circular size variants.

## Storybook

Use <a href="/vue-material-3/storybook/?path=/story/components-fab--fab" target="_blank" rel="noreferrer">Storybook</a> for FAB variants.
