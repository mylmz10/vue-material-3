<script setup>
import { ref } from 'vue';
const open = ref(true);
</script>

# Snackbar

Snackbars show short messages about app processes.

<div class="md-doc-preview md-doc-preview--column" style="min-height: 180px;">
  <MdFilledButton label="Open snackbar" @click="open = true" />
  <MdSnackbar v-model="open" text="Message sent" action-text="Undo" :timeout="6000" />
</div>

## Import

```js
import { MdSnackbar } from 'vue-material-3';
```

## Usage

```vue
<MdSnackbar v-model="open" text="Message sent" action-text="Undo" />
```

## Timeout and actions

An `action-text` keeps the snackbar open, regardless of `timeout`, until the application closes it or the user dismisses it. Adding an action cancels a running timeout; removing it starts a fresh timeout. The `action` event lets the application perform the action and close the snackbar when appropriate. Without an action, `timeout` controls automatic dismissal; `:timeout="0"` disables it.

## Accessibility

Messages are copied as text into a persistent polite status region. Opening a snackbar does not move focus; action and dismiss controls are excluded from the announcement. Custom message slots are mounted only once.

On the web, information in an auto-dismissing snackbar must also be available inline near the triggering action, such as changing a Save button’s label to “Saved”. Provide this feedback in the application, or use an actionable snackbar that remains available. See [M3 snackbar accessibility](https://m3.material.io/components/snackbar/accessibility).

## Storybook

Use <a href="/vue-material-3/storybook/?path=/story/components-snackbar--snackbar" target="_blank" rel="noreferrer">Storybook</a> for controls.
