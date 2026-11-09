<script setup>
import { ref } from 'vue';
const selectedChip = ref(1);
const removed = ref(false);
</script>

# Chips

Chips represent compact actions, filters, inputs, and suggestions.

## Example

<div class="md-doc-preview md-doc-preview--column">
  <div class="md-doc-preview__row">
    <MdAssistChip label="Assist" leading-icon="schedule" />
    <MdSuggestionChip label="Suggestion" leading-icon="lightbulb" />
    <MdFilterChip label="Filter" selected />
    <MdInputChip v-if="!removed" label="Input" removable @remove="removed = true" />
  </div>
  <MdChipSet v-model="selectedChip" selection-mode="single">
    <MdFilterChip label="Day" :value="1" />
    <MdFilterChip label="Week" :value="2" />
    <MdFilterChip label="Month" :value="3" />
  </MdChipSet>
</div>

## Import

```js
import { MdChip, MdAssistChip, MdChipSet, MdFilterChip, MdInputChip, MdSuggestionChip } from 'vue-material-3';
```

## Usage

```vue
<script setup>
import { ref } from 'vue';
import { MdAssistChip, MdChipSet, MdFilterChip, MdInputChip, MdSuggestionChip } from 'vue-material-3';
const selectedChip = ref(1);
</script>

<template>
  <MdChipSet v-model="selectedChip" selection-mode="single">
    <MdFilterChip label="Day" :value="1" />
    <MdFilterChip label="Week" :value="2" />
  </MdChipSet>
</template>
```

## API

`MdChip` is the low-level base used by the public chip variants. Prefer a variant for application UI.

### Props

| Prop                      | Default     | Description                                                  |
| ------------------------- | ----------- | ------------------------------------------------------------ |
| `MdChipSet.modelValue`    | `undefined` | Selected value; an array in multi-selection mode.            |
| `MdChipSet.selectionMode` | `'single'`  | `single` or `multi` selection.                               |
| `label`                   | `''`        | Chip label.                                                  |
| `selected`                | `false`     | Filter/input chip selection; bind with `v-model:selected`.   |
| `removable`               | `false`     | Enable a filter/input chip removal action.                   |
| `disabled / softDisabled` | `false`     | Block chip actions; soft disabled chips retain focusability. |

### Events

`MdChipSet` emits `update:modelValue` and `change`. Filter/input chips emit `update:selected`, `input`, `change`, `click`, `remove`, `focus`, and `blur`. Assist/suggestion chips emit `click`, `focus`, and `blur`.

### Slots

`MdChipSet.default` holds chips. Chips support `default`, `leading-icon`, and `trailing-icon`; filter/input chips also support `avatar`.

### Disabled focus behavior

`soft-disabled` chips remain focusable and discoverable through chip-set arrow navigation, while clicks, selection and removal remain blocked. Hard-disabled chips are skipped unless `always-focusable` is set; that override permits focus but does not enable actions.

### Keyboard removal

Focused removable chips accept Delete or Backspace. The forward horizontal arrow moves from the chip to its remove button, and the reverse arrow returns to the chip (Right/Left in LTR; Left/Right in RTL). Enter or Space on the remove button emits `remove`; disabled and soft-disabled chips cannot remove.

Inside `MdChipSet`, removing a focused chip moves focus to the next focusable chip, then the previous one if needed. If no focusable chips remain, focus stays on the set. The parent still owns removing the chip from its data; focus is retained if removal is declined. For standalone chips, the parent should move focus to the appropriate input or control after removal. See the [M3 chip accessibility guidance](https://m3.material.io/components/chips/accessibility).

## Storybook

Explore variants and controls in [Storybook](https://mylmz10.github.io/vue-material-3/storybook/?path=/story/components-chips--assist-chip).
