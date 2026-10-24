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

## Accessibility

Dialogs use native `showModal()`/`close()` so the browser excludes background content while they are open. The header slot supplies the accessible name; use `aria-label` or `aria-labelledby` to provide a more specific name. `initialFocus` targets must be visible and inside the dialog. Tab navigation skips hidden, inert and disabled controls; nested dialogs keep focus within the active dialog. Closing restores the launcher focus unless `restoreFocus` is false. Closing surfaces remain inert during their exit animation.

Browsers must support the [native dialog modal API](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal). `trapFocus` controls the custom Tab wrapping; native modal isolation remains active when it is false.

## Storybook

Use <a href="/vue-material-3/storybook/?path=/story/components-dialog--detailed-dialog" target="_blank" rel="noreferrer">Storybook</a> for dialog examples.
