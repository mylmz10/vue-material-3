<script setup>
import { ref } from 'vue';
const filledCity = ref('istanbul');
const outlinedCity = ref('ankara');
</script>

# Select

Selects let users choose one value from a menu.

## Example

<div class="md-doc-preview">
  <MdFilledSelect v-model="filledCity" class="md-doc-preview__field" label="Filled city" supporting-text="Please select one city">
    <MdSelectOption value="">Select city</MdSelectOption>
    <MdSelectOption value="istanbul" display-text="Istanbul (TR)">Istanbul</MdSelectOption>
    <MdSelectOption value="ankara">Ankara</MdSelectOption>
    <MdSelectOption value="izmir" disabled>Izmir (disabled)</MdSelectOption>
  </MdFilledSelect>
  <MdOutlinedSelect v-model="outlinedCity" class="md-doc-preview__field" label="Outlined city" supporting-text="Please select one city">
    <MdSelectOption value="">Select city</MdSelectOption>
    <MdSelectOption value="istanbul" display-text="Istanbul (TR)">Istanbul</MdSelectOption>
    <MdSelectOption value="ankara">Ankara</MdSelectOption>
    <MdSelectOption value="izmir" disabled>Izmir (disabled)</MdSelectOption>
  </MdOutlinedSelect>
</div>

## Import

```js
import { MdFilledSelect, MdOutlinedSelect, MdSelectOption } from 'vue-material-3';
```

## Usage

```vue
<script setup>
import { ref } from 'vue';
import { MdFilledSelect, MdOutlinedSelect, MdSelectOption } from 'vue-material-3';
const city = ref('istanbul');
</script>

<template>
  <MdOutlinedSelect v-model="city" label="City">
    <MdSelectOption value="istanbul">Istanbul</MdSelectOption>
    <MdSelectOption value="ankara">Ankara</MdSelectOption>
  </MdOutlinedSelect>
</template>
```

## API

### Props

| Prop                          | Default     | Description                                                                    |
| ----------------------------- | ----------- | ------------------------------------------------------------------------------ |
| `modelValue / value`          | `undefined` | Controlled value or initial selection; strings, numbers, booleans, or objects. |
| `label / supportingText`      | `''`        | Field label and help text.                                                     |
| `disabled / required / error` | `false`     | Field state and validation.                                                    |
| `MdSelectOption.value`        | `''`        | Option value.                                                                  |
| `MdSelectOption.displayText`  | `''`        | Selected field text; falls back to option text.                                |
| `MdSelectOption.disabled`     | `false`     | Prevent option selection.                                                      |

### Events

Fields emit `update:modelValue`, `input`, `change`, `focus`, `blur`, `open`, and `close`.

### Slots

`default` holds `MdSelectOption` children; `supporting-text` customizes field help. Each option uses its `default` slot as the label.

### Value initialization

`v-model` takes precedence over `value`, including an explicitly empty string. When no model is supplied, `value` sets the initial selection and the form-reset baseline. Later changes to `value` do not update the selection; use `v-model` for reactive updates.

### Object values

Object-valued options are matched by reference identity, including reactive wrappers of the same object. Keep the model and option values tied to the same objects; a newly created object with identical properties is a different value. Primitive values retain their existing string-normalized comparison. Object equality is separate from native form serialization, which still converts the value to a string; use a primitive ID for form submissions that need a stable identifier.

## Storybook

Explore variants and controls in [Storybook](https://mylmz10.github.io/vue-material-3/storybook/?path=/story/components-select--filled-select).
