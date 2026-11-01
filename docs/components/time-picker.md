<script setup>
import { ref } from 'vue';
const filledTime = ref('07:00');
const outlinedTime = ref('18:30');
const pickerOpen = ref(false);
const pickerValue = ref('07:00');
</script>

# Time Picker

Time pickers let users enter or select a time.

## Example

<div class="md-doc-preview">
  <MdFilledTimePickerField v-model="filledTime" class="md-doc-preview__field" label="Filled time" />
  <MdOutlinedTimePickerField v-model="outlinedTime" class="md-doc-preview__field" label="Outlined time" />
</div>

<div class="md-doc-preview">
  <MdFilledButton label="Open standalone picker" @click="pickerOpen = true" />
  <MdTimePicker v-model="pickerValue" v-model:open="pickerOpen" />
  <p role="status">Selected value: {{ pickerValue }}</p>
</div>

## Import

```js
import { MdFilledTimePickerField, MdOutlinedTimePickerField, MdTimePicker } from 'vue-material-3';
```

## Usage

```vue
<script setup>
import { ref } from 'vue';
import { MdFilledTimePickerField, MdOutlinedTimePickerField, MdTimePicker } from 'vue-material-3';
const time = ref('07:00');
</script>

<template>
  <MdOutlinedTimePickerField v-model="time" label="Time" />
</template>
```

For a standalone picker, control visibility separately from the selected value:

```vue
<script setup>
import { ref } from 'vue';
import { MdTimePicker, MdFilledButton } from 'vue-material-3';
const open = ref(false);
const value = ref('07:00');
</script>

<template>
  <MdFilledButton label="Open picker" @click="open = true" />
  <MdTimePicker v-model="value" v-model:open="open" />
</template>
```

## API

### Props

| Prop         | Default   | Description                                             |
| ------------ | --------- | ------------------------------------------------------- |
| `modelValue` | `null`    | Time string in `HH:mm` format.                          |
| `open`       | `false`   | Standalone picker visibility; bind with `v-model:open`. |
| `entryMode`  | `'dial'`  | `dial` or `input` entry.                                |
| `hourCycle`  | `12`      | 12- or 24-hour display.                                 |
| `locale`     | `'en-US'` | Locale used to format labels.                           |

### Events

The standalone picker emits `update:modelValue`, `update:open`, `confirm(value)`, and `cancel`. Fields emit `update:modelValue`.

### Slots

No public slots.

## Storybook

Explore variants and controls in [Storybook](https://mylmz10.github.io/vue-material-3/storybook/?path=/story/components-timepicker--outlined-field-playground).
