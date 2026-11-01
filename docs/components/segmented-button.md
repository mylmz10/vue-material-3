<script setup>
import { ref } from 'vue';
const selected = ref(1);
</script>

# Segmented Button

Segmented buttons let users select from a small set of related options.

## Example

<div class="md-doc-preview">
  <MdSegmentedButtonSet v-model="selected" :items="[{ label: 'Day' }, { label: 'Week' }, { label: 'Month' }]" />
</div>

## Import

```js
import { MdSegmentedButton, MdSegmentedButtonSet } from 'vue-material-3';
```

## Usage

```vue
<script setup>
import { ref } from 'vue';
import { MdSegmentedButton, MdSegmentedButtonSet } from 'vue-material-3';
const selected = ref(0);
const items = [{ label: 'Day' }, { label: 'Week' }, { label: 'Month' }];
</script>

<template>
  <MdSegmentedButtonSet v-model="selected" :items="items" />
</template>
```

## API

### Props

| Prop                                                  | Default     | Description                                     |
| ----------------------------------------------------- | ----------- | ----------------------------------------------- |
| `MdSegmentedButtonSet.modelValue`                     | `undefined` | Selected index or index array.                  |
| `MdSegmentedButtonSet.items`                          | `[]`        | Objects with label, icon, and disabled state.   |
| `MdSegmentedButtonSet.multiselect`                    | `false`     | Allow multiple selected indices.                |
| `MdSegmentedButton.selected / disabled / noCheckmark` | `false`     | Standalone button state and selected indicator. |

### Events

`MdSegmentedButtonSet` emits `update:modelValue(index)`, `null`, or an index array. Standalone buttons accept native `@click`.

### Slots

No public slots; supply set contents through `items`.

## Storybook

Explore variants and controls in [Storybook](https://mylmz10.github.io/vue-material-3/storybook/?path=/story/components-segmented-button--segmented-button-set).
