<script setup>
import { ref } from 'vue';
const open = ref(true);
</script>

# Snackbar

Snackbars show short messages about app processes.

<div class="md-doc-preview md-doc-preview--column" style="min-height: 180px;">
  <MdFilledButton label="Open snackbar" @click="open = true" />
  <MdSnackbar v-model="open" action-text="Undo" :timeout="6000" />
</div>

## Import

```js
import { MdSnackbar } from 'vue-material-3';
```

## Usage

```vue
<MdSnackbar v-model="open" action-text="Undo" />
```

## Storybook

Use <a href="/vue-material-3/storybook/?path=/story/components-snackbar--snackbar" target="_blank" rel="noreferrer">Storybook</a> for controls.
