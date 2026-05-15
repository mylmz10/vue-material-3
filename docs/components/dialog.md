<script setup>
import { ref } from 'vue';
const open = ref(false);
</script>

# Dialog

Dialogs interrupt the current flow to ask for confirmation or collect focused input.

<div class="md-doc-preview">
  <MdFilledButton label="Open dialog" @click="open = true" />
  <MdDialog v-model="open">
    <template #header>Project settings</template>
    <p>Review and update release metadata before publishing.</p>
    <template #footer>
      <MdTextButton label="Cancel" @click="open = false" />
      <MdFilledButton label="Save" @click="open = false" />
    </template>
  </MdDialog>
</div>

## Import

```js
import { MdDialog } from 'vue-material-3';
```

## Usage

```vue
<MdDialog v-model="open">
  <template #header>Header</template>
  Dialog content
  <template #footer>Actions</template>
</MdDialog>
```

## Storybook

Use <a href="/vue-material-3/storybook/?path=/story/components-dialog--detailed-dialog" target="_blank" rel="noreferrer">Storybook</a> for dialog examples.
