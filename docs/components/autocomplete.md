<script setup>
import { ref } from 'vue';
const filledCity = ref('');
const outlinedCity = ref('');
const cities = ['Istanbul', 'Ankara', 'Izmir', 'Antalya', 'Bursa', 'Eskisehir'];
</script>

# Autocomplete

Autocomplete fields help users choose from suggested values while typing.

## Example

<div class="md-doc-preview">
  <MdFilledAutoComplete v-model="filledCity" class="md-doc-preview__field" label="Filled city" :items="cities" />
  <MdOutlinedAutoComplete v-model="outlinedCity" class="md-doc-preview__field" label="Outlined city" :items="cities" />
</div>

## Import

```js
import { MdFilledAutoComplete, MdOutlinedAutoComplete } from 'vue-material-3';
```

## Usage

```vue
<script setup>
import { ref } from 'vue';
import { MdFilledAutoComplete, MdOutlinedAutoComplete } from 'vue-material-3';
const city = ref('');
const cities = ['Istanbul', 'Ankara', 'Izmir'];
</script>

<template>
  <MdFilledAutoComplete v-model="city" label="City" :items="cities" />
  <MdOutlinedAutoComplete v-model="city" label="City" :items="cities" />
</template>
```

## API

### Props

| Prop                  | Default | Description                              |
| --------------------- | ------- | ---------------------------------------- |
| `modelValue`          | `null`  | Selected string; bind with `v-model`.    |
| `items`               | `[]`    | Suggested strings.                       |
| `label`               | `null`  | Accessible field label.                  |
| `disabled / readonly` | `false` | Prevent editing and opening suggestions. |

### Events

`update:modelValue(value)` commits the selected value; `update:search(text)` reports the search text.

### Slots

No public slots.

### Keyboard interaction

Following the [W3C combobox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/), Arrow Down/Up highlights the next/previous suggestion while focus stays in the input. Enter accepts the highlighted value. Escape closes suggestions and restores the committed model value; typing reopens them. Tab closes suggestions and follows normal focus navigation. Readonly and disabled fields do not open suggestions.

## Storybook

Explore variants and controls in [Storybook](https://mylmz10.github.io/vue-material-3/storybook/?path=/story/components-autocomplete--filled-auto-complete).
