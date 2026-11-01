<script setup>
import { ref } from 'vue';
const enabled = ref(true);
</script>

# Switch

Switches toggle a single setting on or off.

## Example

<div class="md-doc-preview">
  <MdSwitch aria-label="Notifications" v-model="enabled" />
  <MdSwitch aria-label="Notifications" v-model="enabled" icon />
  <MdSwitch aria-label="Notifications" disabled />
</div>

## Import

```js
import { MdSwitch } from 'vue-material-3';
```

## Usage

```vue
<script setup>
import { ref } from 'vue';
import { MdSwitch } from 'vue-material-3';
const enabled = ref(true);
</script>

<template>
  <MdSwitch aria-label="Notifications" v-model="enabled" />
  <MdSwitch aria-label="Notifications" v-model="enabled" icon />
</template>
```

## API

### Props

| Prop                             | Default     | Description                                                        |
| -------------------------------- | ----------- | ------------------------------------------------------------------ |
| `modelValue / checked`           | `undefined` | Boolean model or fallback checked state when no model is supplied. |
| `icon`                           | `false`     | Show an icon in the thumb.                                         |
| `disabled / readonly / required` | `false`     | Native control constraints.                                        |
| `value`                          | `'on'`      | Value used for form submission.                                    |

### Events

`update:modelValue`, `input`, and `change` report a boolean; `focus` and `blur` report focus changes.

### Slots

No public slots.

## Storybook

Explore variants and controls in [Storybook](https://mylmz10.github.io/vue-material-3/storybook/?path=/story/components-switch--switch).
