<script setup>
import { ref } from 'vue';
const filledCity = ref('');
const outlinedCity = ref('');
const cities = ['Istanbul', 'Ankara', 'Izmir', 'Antalya', 'Bursa', 'Eskisehir'];
const user = ref(2);
const users = [{ value: 1, label: 'Alex' }, { value: 2, label: 'Alex' }, { value: 3, label: 'Unavailable', disabled: true }];
</script>

# Autocomplete

Autocomplete fields help users choose from suggested values while typing.

## Example

<div class="md-doc-preview">
  <MdFilledAutoComplete v-model="filledCity" class="md-doc-preview__field" label="Filled city" :items="cities" />
  <MdOutlinedAutoComplete v-model="outlinedCity" class="md-doc-preview__field" label="Outlined city" :items="cities" />
  <MdOutlinedAutoComplete v-model="user" class="md-doc-preview__field" label="User (modal)" :items="users" mode="modal" clearable />
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

| Prop                  | Default               | Description                                                                                                                                                                       |
| --------------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `modelValue`          | `null`                | Selected string, number, boolean or object value; bind with `v-model`.                                                                                                            |
| `items`               | `[]`                  | Strings, numbers, or `{ value, label, disabled? }` options. `label` must be a string; `null`/`undefined` values are reserved for an empty selection. Malformed items are ignored. |
| `label`               | `null`                | Accessible field label.                                                                                                                                                           |
| `disabled / readonly` | `false`               | Prevent editing, clearing and opening suggestions.                                                                                                                                |
| `mode`                | `'docked'`            | `'docked'` dropdown or `'modal'` dialog with its own search input.                                                                                                                |
| `clearable`           | `false`               | Show a clear button when there is a value or search text. Clearing emits `null`.                                                                                                  |
| `clearLabel`          | `'Clear selection'`   | Accessible label for the clear button.                                                                                                                                            |
| `closeLabel`          | `'Close suggestions'` | Modal close button label.                                                                                                                                                         |
| `noResultsText`       | `'No data available'` | Message when no options match.                                                                                                                                                    |
| `debounce`            | `0`                   | Non-negative milliseconds to delay the `debounced` event. Input, local filtering and `update:search` are immediate.                                                               |

### Option values

```vue
<script setup>
import { ref } from 'vue';
import { MdOutlinedAutoComplete } from 'vue-material-3';
const userId = ref(2);
const users = [
  { value: 1, label: 'Alex' },
  { value: 2, label: 'Alex' },
  { value: 3, label: 'Unavailable', disabled: true },
];
</script>

<template>
  <MdOutlinedAutoComplete v-model="userId" :items="users" label="User" mode="modal" clearable :debounce="150" no-results-text="No users found" />
</template>
```

The input displays the label; the model receives the original value, including `0` or `false`. Object values match by identity (Vue proxies are unwrapped), so keep the same object instance or use a stable ID as the value. Selecting an option is always immediate. String `items` keep their existing behavior.

### Events

`update:modelValue(value)` commits the selected value; `update:search(text)` reports the search text immediately. `debounced(text)` fires after the configured positive delay. Pending work is canceled on close, clear, reset, external model change, disable/readonly and unmount.

### Slots

No public slots.

### Keyboard interaction

Following the [W3C combobox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/), Arrow Down/Up highlights the next/previous suggestion while focus stays in the input. Enter accepts the highlighted value. Escape closes suggestions and restores the committed model value; typing reopens them. Clicking a focused field reopens suggestions. Tab closes suggestions and follows normal focus navigation. Disabled options are announced and skipped by Arrow navigation, and cannot be selected. Readonly and disabled fields do not open suggestions.

In modal mode, click, Enter or Arrow Down/Up opens the dialog. The dialog opens with an empty query and marks the committed option. Search focus stays inside the dialog; Tab is trapped by the dialog. Selection closes it immediately. Escape, backdrop and the close button cancel the draft and restore the committed value. Focus returns to the launcher without reopening suggestions.

In docked mode, leaving an edited draft restores the last committed value. The popup follows the field, opening above when space below is insufficient and more space is available above and scrolling when results exceed the available height. Form reset restores the initial model and its option label; canceled resets leave editing intact. Native `name`/form attributes remain on the display input, so native form submission contains the label; submit `v-model` explicitly when your backend expects an option ID or object.

## Storybook

Explore variants and controls in [Storybook](https://mylmz10.github.io/vue-material-3/storybook/?path=/story/components-autocomplete--filled-auto-complete).
