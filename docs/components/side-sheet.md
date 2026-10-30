# Side Sheet

`MdSideSheet` holds supplementary details, filters, or actions alongside the primary content. Its default is a standard in-flow sheet; opt into `modal` on compact layouts or when users must finish before returning to the page. This is the baseline Material Design 3 treatment, without Expressive motion or shapes.

```vue
<script setup>
import { ref } from 'vue';
import { MdSideSheet } from 'vue-material-3';
const open = ref(true);
</script>

<template>
  <div style="display: flex; align-items: stretch">
    <main style="flex: 1; min-width: 0"><button @click="open = true">Filters</button></main>
    <MdSideSheet v-model="open" headline="Filters">
      <label><input type="checkbox" /> Available now</label>
    </MdSideSheet>
  </div>
</template>
```

Set `modal` to reuse `MdDialog`'s native modality, focus trap, scroll lock, initial focus and focus restoration. A modal sheet covers the full viewport height and leaves a scrim area even on a narrow viewport. Standard sheets do not trap or steal focus and remain part of your flex/grid layout; choose the appropriate variant with your application's responsive layout state rather than silently changing modality.

## API

| Prop                   | Default              | Behavior                                                                                                                |
| ---------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `modelValue`           | `false`              | Controlled open state; bind with `v-model`.                                                                             |
| `modal`                | `false`              | Opts into native modal dialog behavior.                                                                                 |
| `edge`                 | `'end'`              | Logical `'start'` or `'end'`; modal positioning mirrors in RTL. In flex layouts, standard start sheets use `order: -1`. |
| `headline`             | `''`                 | Visible and accessible title; `header` slot overrides content.                                                          |
| `closeLabel`           | `'Close side sheet'` | Accessible name for the close button.                                                                                   |
| `closeOnEscape`        | `true`               | Escape dismisses while focus is within the sheet.                                                                       |
| `closeOnBackdropClick` | `true`               | Allows modal backdrop dismissal.                                                                                        |
| `restoreFocus`         | `true`               | Returns focus after closing when applicable.                                                                            |
| `initialFocus`         | `null`               | Modal-only selector/function, as with `MdDialog`.                                                                       |

Default and `footer` slots receive `{ close }`. `header` provides title content. `cancel` emits `{ source }`, and `update:modelValue` emits the requested open state. The parent must apply updates. Custom `aria-label`/`aria-labelledby` override the title-derived accessible name. The close button remains keyboard accessible in either variant.

The default width is 360px, bounded by the available screen. Content scrolls independently while header and footer stay visible. Customize `--md-side-sheet-width`, `--md-sheet-max-height` (standard only), `--md-sheet-container-color` (modal), and `--md-sheet-label-color`. Modal sheets use `surface-container-low` and 16px inner corners; standard sheets use `surface` and square corners.

Design references: [M3 side sheets](https://m3.material.io/components/side-sheets/overview), [Material Components baseline anatomy and theme attributes](https://github.com/material-components/material-components-android/blob/master/docs/components/SideSheet.md).

Standard sheets use the `surface` role; modal sheets use `surface-container-low`. Content scrolls vertically and wraps long text; horizontal scrolling is suppressed. Footer actions align to the logical start.
