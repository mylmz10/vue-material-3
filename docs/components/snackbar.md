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

## Accessibility

Messages are copied as text into a persistent polite status region. Opening a snackbar does not move focus; action and dismiss controls are excluded from the announcement. Custom message slots are mounted only once.

## Storybook

Use <a href="/vue-material-3/storybook/?path=/story/components-snackbar--snackbar" target="_blank" rel="noreferrer">Storybook</a> for controls.
