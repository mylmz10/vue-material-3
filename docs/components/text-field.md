<script setup>
import { ref } from 'vue';
const filled = ref('');
const outlined = ref('');
</script>

# Text Field

Text fields let users enter and edit text.

## Example

<div class="md-doc-preview">
  <MdFilledTextField v-model="filled" class="md-doc-preview__field" label="Filled label" supporting-text="Supporting text" prefix="$" suffix="USD" />
  <MdOutlinedTextField v-model="outlined" class="md-doc-preview__field" label="Outlined label" supporting-text="Supporting text" prefix="@" suffix=".com" />
</div>

## Import

```js
import { MdFilledTextField, MdOutlinedTextField } from 'vue-material-3';
```

## Usage

```vue
<script setup>
import { ref } from 'vue';
import { MdFilledTextField, MdOutlinedTextField } from 'vue-material-3';
const value = ref('');
const email = ref('');
</script>

<template>
  <MdFilledTextField v-model="value" label="Amount" prefix="$" suffix="USD" />
  <MdOutlinedTextField v-model="email" label="Email" />
</template>
```

## API

### Props

| Prop                                     | Default     | Description                                   |
| ---------------------------------------- | ----------- | --------------------------------------------- |
| `modelValue`                             | `undefined` | Controlled string or number.                  |
| `value`                                  | `''`        | Legacy value when no model is supplied.       |
| `type`                                   | `'text'`    | Native input type.                            |
| `label / supportingText / errorText`     | `''`        | Visible label, help, and validation feedback. |
| `prefix / suffix`                        | `''`        | Text before or after the input.               |
| `disabled / readonly / required / error` | `false`     | Control and validation state.                 |

### Events

`update:modelValue`, `input`, and `change` report string values. `focus`, `blur`, `invalid`, `select`, `keyup`, and `keydown` forward native events.

### Slots

`start`, `end`, `prefix`, `suffix`, `supporting-text`, and `supporting-text-end` customize field content.

### Value precedence

A supplied `v-model` takes precedence over the legacy `value` prop, including `''`, `0`, and `null` (displayed as empty). When the model is absent (`undefined`), `value` initializes the input and remains reactive. Form reset restores the initial resolved value unless the reset event is canceled.

### Accessibility

The visible label names the native input, and supporting/error text is linked as its description. Input IDs are generated when omitted. Consumer `id`, ARIA and other control attributes are forwarded to the input; `class` and `style` stay on the wrapper. An external `aria-describedby` is combined with the field description. The same forwarding applies to autocomplete and date/time picker fields.

## Storybook

Explore variants and controls in [Storybook](https://mylmz10.github.io/vue-material-3/storybook/?path=/story/components-textfields--filled-text-field).
