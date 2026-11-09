<script setup>
import { ref } from 'vue';
const filledDate = ref('2026-03-14');
const outlinedDate = ref('2026-03-14');
const pickerOpen = ref(false);
const pickerValue = ref('2026-03-14');
</script>

# Date Picker

Date pickers let users enter or select dates.

## Example

<div class="md-doc-preview">
  <MdFilledDatePickerField v-model="filledDate" class="md-doc-preview__field" label="Filled date" picker-variant="modal" />
  <MdOutlinedDatePickerField v-model="outlinedDate" class="md-doc-preview__field" label="Outlined date" picker-variant="modal" />
</div>

<div class="md-doc-preview">
  <MdFilledButton label="Open standalone picker" @click="pickerOpen = true" />
  <MdDatePicker v-model="pickerValue" v-model:open="pickerOpen" />
  <p role="status">Selected value: {{ pickerValue }}</p>
</div>

## Import

```js
import { MdFilledDatePickerField, MdOutlinedDatePickerField, MdDatePicker } from 'vue-material-3';
```

## Usage

```vue
<script setup>
import { ref } from 'vue';
import { MdFilledDatePickerField, MdOutlinedDatePickerField, MdDatePicker } from 'vue-material-3';
const date = ref('2026-03-14');
</script>

<template>
  <MdOutlinedDatePickerField v-model="date" label="Date" picker-variant="modal" />
</template>
```

For a standalone picker, control visibility separately from the selected value:

```vue
<script setup>
import { ref } from 'vue';
import { MdDatePicker, MdFilledButton } from 'vue-material-3';
const open = ref(false);
const value = ref('2026-03-14');
</script>

<template>
  <MdFilledButton label="Open picker" @click="open = true" />
  <MdDatePicker v-model="value" v-model:open="open" />
</template>
```

## API

### Props

| Prop             | Default    | Description                                             |
| ---------------- | ---------- | ------------------------------------------------------- |
| `modelValue`     | `null`     | ISO date string; `{ start, end }` for a range.          |
| `open`           | `false`    | Standalone picker visibility; bind with `v-model:open`. |
| `selectionMode`  | `'single'` | Standalone picker: `single` or `range`.                 |
| `variant`        | `'modal'`  | Standalone picker: `modal` or `docked`.                 |
| `pickerVariant`  | `'docked'` | Field wrapper picker presentation.                      |
| `min / max`      | `''`       | ISO date bounds.                                        |
| `isDateDisabled` | `null`     | Function that excludes dates.                           |

### Events

The standalone picker emits `update:modelValue`, `update:open`, `confirm`, `cancel`, `invalid-input`, `month-change`, `year-change`, and `view-change`. Fields emit `update:modelValue` and `invalid-input`.

### Slots

No public slots.

## Storybook

Explore variants and controls in [Storybook](https://mylmz10.github.io/vue-material-3/storybook/?path=/story/components-datepicker--outlined-field-playground).
