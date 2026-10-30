# Bottom Sheet

`MdBottomSheet` presents supplementary content at the bottom of the viewport. The default modal variant uses a native dialog, a scrim, focus trapping, body scroll locking, Escape/backdrop dismissal, and focus restoration. It uses the baseline Material Design 3 surface, 28px top corners, and an optional 32×4px drag handle.

```vue
<script setup>
import { ref } from 'vue';
import { MdBottomSheet } from 'vue-material-3';
const open = ref(false);
</script>

<template>
  <button @click="open = true">Show details</button>
  <MdBottomSheet v-model="open" headline="Place details">
    <p>Additional information about this place.</p>
    <template #footer="{ close }"><button @click="close('done')">Done</button></template>
  </MdBottomSheet>
</template>
```

Use `:modal="false"` for a standard sheet inside your layout. It leaves the main page interactive and does not move focus on opening. Place it after the primary content; the application controls its surrounding layout. Escape dismisses it only while focus is inside, and closing returns focus to the launcher if focus was inside the sheet.

## API

| Prop                   | Default                | Behavior                                                           |
| ---------------------- | ---------------------- | ------------------------------------------------------------------ |
| `modelValue`           | `false`                | Controlled open state; bind with `v-model`.                        |
| `modal`                | `true`                 | Native modal dialog or in-flow complementary section.              |
| `headline`             | `''`                   | Visible and accessible title; `header` slot overrides its content. |
| `closeLabel`           | `'Close bottom sheet'` | Accessible name for the close button.                              |
| `closeOnEscape`        | `true`                 | Allows Escape dismissal.                                           |
| `closeOnBackdropClick` | `true`                 | Allows clicking outside a modal sheet to dismiss it.               |
| `restoreFocus`         | `true`                 | Returns focus on closing.                                          |
| `initialFocus`         | `null`                 | Modal-only selector/function, as with `MdDialog`.                  |
| `dragHandle`           | `true`                 | Shows the drag handle; close button remains available.             |
| `swipeToClose`         | `true`                 | Upward drags expand; downward drags collapse an expanded sheet or dismiss a collapsed sheet (64px threshold). |

The default and `footer` slots receive `{ close }`; `header` provides title content. `close(source)` requests dismissal. `cancel` emits `{ source }` (`close-button`, `escape`, `backdrop`, `swipe`, or your action source); `update:modelValue` emits `false`. The parent must apply the update. Custom `aria-label`/`aria-labelledby` override the automatic title.

Content scrolls inside a bounded surface; header and footer remain visible. A modal sheet initially occupies at most half the viewport height. Its handle is a keyboard-accessible button that toggles collapsed/expanded heights. Expanded sheets keep a 72px top margin on compact windows, or 56px on wider windows; wide windows also keep at least 56px side margins. Maximum width is 640px. Customize `--md-bottom-sheet-max-width`, `--md-sheet-max-height`, `--md-sheet-container-color`, and `--md-sheet-label-color` through the component style. Bottom safe-area padding is included.

Dragging starts only on the handle, so ordinary content scrolling and selection remain native. Short/canceled drags return to rest. Select the handle with Enter/Space to expand or collapse; close button and Escape dismiss. Arbitrary detents and velocity-based flings are outside this two-position baseline.

Design references: [M3 bottom sheets](https://m3.material.io/components/bottom-sheets/overview), [Material Components baseline anatomy and theme attributes](https://github.com/material-components/material-components-android/blob/master/docs/components/BottomSheet.md).

Modal sheets slide in with the shared M3 emphasized-decelerate motion tokens, slide out with emphasized-accelerate tokens, and animate height-preset changes. Reduced motion disables these transitions. The close action uses `MdIconButton`; application footer content should use the existing Material button components, as the Storybook examples do. The handle stays a dedicated accessible drag/resize control.
