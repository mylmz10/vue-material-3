<script setup>
import { ref } from 'vue';
const open = ref(false);
</script>

# Dialog

Dialogs interrupt the current flow to ask for confirmation or collect focused input.

## Example

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
<script setup>
import { ref } from 'vue';
import { MdDialog, MdFilledButton, MdTextButton } from 'vue-material-3';
const open = ref(false);
</script>

<template>
  <MdFilledButton label="Open dialog" @click="open = true" />
  <MdDialog v-model="open">
    <template #header>Header</template>
    Dialog content
    <template #footer><MdTextButton label="Done" @click="open = false" /></template>
  </MdDialog>
</template>
```

## API

### Props

| Prop                                   | Default | Description                                                |
| -------------------------------------- | ------- | ---------------------------------------------------------- |
| `modelValue`                           | `false` | Open state; bind with `v-model`.                           |
| `closeOnEscape / closeOnBackdropClick` | `true`  | Allow Escape and backdrop dismissal.                       |
| `trapFocus / restoreFocus`             | `true`  | Wrap Tab focus and restore launcher focus.                 |
| `initialFocus`                         | `null`  | Selector or function identifying the initial focus target. |
| `keepMounted`                          | `false` | Retain hidden slot content while closed.                   |

### Events

`update:modelValue` requests visibility changes. `open`, `opened`, `close`, and `closed` report lifecycle stages; `cancel` reports dismissal.

### Slots

`header` supplies the title, `default` the body, and `footer` the actions.

### Accessibility

Dialogs use native `showModal()`/`close()` so the browser excludes background content while they are open. The header slot supplies the accessible name; use `aria-label` or `aria-labelledby` to provide a more specific name. `initialFocus` targets must be visible and inside the dialog. Tab navigation skips hidden, inert and disabled controls; nested dialogs keep focus within the active dialog. Closing restores the launcher focus unless `restoreFocus` is false. Closing surfaces remain inert during their exit animation.

Browsers must support the [native dialog modal API](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal). `trapFocus` controls the custom Tab wrapping; native modal isolation remains active when it is false.

Set `keepMounted` to retain slot components and their state while closed. Closed retained dialogs stay hidden and inert.

## Storybook

Explore variants and controls in [Storybook](https://mylmz10.github.io/vue-material-3/storybook/?path=/story/components-dialog--detailed-dialog).
