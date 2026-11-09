<script setup>
import { ref } from 'vue';
const selected = ref('2');
</script>

# Radio

Radio buttons let users select one option from a set.

## Example

<div class="md-doc-preview">
  <MdRadio aria-label="Travel option" v-model="selected" value="1" name="docs-radio" />
  <MdRadio aria-label="Travel option" v-model="selected" value="2" name="docs-radio" />
  <MdRadio aria-label="Travel option" value="3" name="docs-radio-disabled" disabled />
</div>

## Import

```js
import { MdRadio } from 'vue-material-3';
```

## Usage

```vue
<script setup>
import { ref } from 'vue';
import { MdRadio } from 'vue-material-3';
const selected = ref('1');
</script>

<template>
  <MdRadio aria-label="Travel option" v-model="selected" value="1" name="choice" />
</template>
```

## API

### Props

| Prop                  | Default     | Description                                               |
| --------------------- | ----------- | --------------------------------------------------------- |
| `modelValue`          | `undefined` | Selected group value; bind all options to the same model. |
| `value`               | `''`        | Value represented by this option.                         |
| `checked`             | `undefined` | Fallback checked state when no model is supplied.         |
| `name`                | `''`        | Shared native group name.                                 |
| `disabled / required` | `false`     | Native control constraints.                               |

### Events

`update:modelValue` and `change` report the selected value. `input` reports the value or `null`; `focus` and `blur` report focus changes.

### Slots

No public slots.

## Storybook

Explore variants and controls in [Storybook](https://mylmz10.github.io/vue-material-3/storybook/?path=/story/components-radio--radio).
