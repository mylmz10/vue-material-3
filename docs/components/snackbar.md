<script setup>
import { ref } from 'vue';
const open = ref(true);
</script>

# Snackbar

Snackbars show short messages about app processes.

## Example

<div class="md-doc-preview md-doc-preview--column" style="min-height: 180px;">
  <MdFilledButton label="Open snackbar" @click="open = true" />
  <MdSnackbar v-model="open" text="Message sent" action-text="Undo" @action="open = false" :timeout="6000" />
</div>

## Import

```js
import { MdSnackbar } from 'vue-material-3';
```

## Usage

```vue
<script setup>
import { ref } from 'vue';
import { MdSnackbar, MdFilledButton } from 'vue-material-3';
const open = ref(false);
</script>

<template>
  <MdFilledButton label="Open snackbar" @click="open = true" />
  <MdSnackbar v-model="open" text="Message sent" action-text="Undo" @action="open = false" />
</template>
```

## API

### Props

| Prop                       | Default     | Description                                                                   |
| -------------------------- | ----------- | ----------------------------------------------------------------------------- |
| `modelValue`               | `false`     | Open state; bind with `v-model`.                                              |
| `text`                     | `''`        | Message content.                                                              |
| `actionText`               | `undefined` | Optional action label; keeps the snackbar available.                          |
| `timeout`                  | `20000`     | Automatic dismissal delay in milliseconds without an action; `0` disables it. |
| `multiLine / longerAction` | `false`     | Layout variants.                                                              |

### Events

`update:modelValue(false)` requests dismissal. `action(event)` lets the parent handle the action and close the snackbar.

### Slots

`default` replaces the message text.

### Timeout and actions

An `action-text` keeps the snackbar open, regardless of `timeout`, until the application closes it or the user dismisses it. Adding an action cancels a running timeout; removing it starts a fresh timeout. The `action` event lets the application perform the action and close the snackbar when appropriate. Without an action, `timeout` controls automatic dismissal; `:timeout="0"` disables it.

### Accessibility

Messages are copied as text into a persistent polite status region. Opening a snackbar does not move focus; action and dismiss controls are excluded from the announcement. Custom message slots are mounted only once.

On the web, information in an auto-dismissing snackbar must also be available inline near the triggering action, such as changing a Save button’s label to “Saved”. Provide this feedback in the application, or use an actionable snackbar that remains available. See [M3 snackbar accessibility](https://m3.material.io/components/snackbar/accessibility).

## Storybook

Explore variants and controls in [Storybook](https://mylmz10.github.io/vue-material-3/storybook/?path=/story/components-snackbar--snackbar).
