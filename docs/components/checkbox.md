<script setup>
import { ref } from 'vue';
const checked = ref(true);
</script>

# Checkbox

Checkboxes let users select one or more options.

## Example

<div class="md-doc-preview">
  <MdCheckbox aria-label="Email notifications" v-model="checked" />
  <MdCheckbox aria-label="Email notifications" checked disabled />
</div>

## Import

```js
import { MdCheckbox } from 'vue-material-3';
```

## Usage

```vue
<script setup>
import { ref } from 'vue';
import { MdCheckbox } from 'vue-material-3';
const checked = ref(false);
</script>

<template>
  <MdCheckbox aria-label="Email notifications" v-model="checked" />
</template>
```

## API

### Props

| Prop                             | Default     | Description                                                        |
| -------------------------------- | ----------- | ------------------------------------------------------------------ |
| `modelValue / checked`           | `undefined` | Boolean model or fallback checked state when no model is supplied. |
| `indeterminate`                  | `false`     | Display a mixed selection state.                                   |
| `disabled / readonly / required` | `false`     | Native control constraints.                                        |
| `value`                          | `'on'`      | Value used for form submission.                                    |

### Events

`update:modelValue`, `input`, and `change` report the checked boolean; `focus` and `blur` report focus changes.

### Slots

No public slots.

## Storybook

Explore variants and controls in [Storybook](https://mylmz10.github.io/vue-material-3/storybook/?path=/story/components-checkbox--checkbox).
