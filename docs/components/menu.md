<script setup>
import { ref } from 'vue';
const open = ref(false);
</script>

# Menu

Menus display a list of actions from a temporary surface.

## Example

<div class="md-doc-preview md-doc-preview__menu-anchor">
  <MdMenu v-model="open">
    <template #activator="{ onClick, onKeydown, ariaExpanded, ariaHaspopup }">
      <MdFilledButton label="Open menu" @click="onClick" @keydown="onKeydown" :aria-expanded="ariaExpanded" :aria-haspopup="ariaHaspopup" />
    </template>
    <MdMenuItem label="Profile" icon="person" />
    <MdSubMenu label="Share" icon="share">
      <MdMenuItem label="Copy link" icon="link" />
      <MdMenuItem label="Email" icon="mail" />
    </MdSubMenu>
    <MdMenuItem label="Archive" icon="archive" />
    <MdMenuItem label="Delete" icon="delete" disabled />
  </MdMenu>
</div>

## Import

```js
import { MdMenu, MdMenuItem, MdSubMenu } from 'vue-material-3';
```

## Usage

```vue
<script setup>
import { ref } from 'vue';
import { MdMenu, MdMenuItem, MdSubMenu, MdFilledButton } from 'vue-material-3';
const open = ref(false);
</script>

<template>
  <MdMenu v-model="open">
    <template #activator="{ onClick, onKeydown, ariaExpanded, ariaHaspopup }">
      <MdFilledButton label="Open menu" @click="onClick" @keydown="onKeydown" :aria-expanded="ariaExpanded" :aria-haspopup="ariaHaspopup" />
    </template>
    <MdMenuItem label="Profile" icon="person" />
  </MdMenu>
</template>
```

## API

### Props

| Prop                                                  | Default     | Description                                                 |
| ----------------------------------------------------- | ----------- | ----------------------------------------------------------- |
| `modelValue`                                          | `undefined` | Open state; bind with `v-model` or omit for internal state. |
| `closeOnOutsideClick / closeOnSelect / closeOnEscape` | `true`      | Automatic dismissal behavior.                               |
| `focusFirstItemOnOpen / restoreFocusOnClose`          | `true`      | Focus management.                                           |
| `MdMenuItem.label`                                    | `''`        | Visible action label.                                       |
| `MdMenuItem.disabled / selected / keepOpen`           | `false`     | Item state and dismissal override.                          |

### Events

`MdMenu` emits `update:modelValue`, `open`, `close`, and `select`. `MdMenuItem` emits `click` and `select` for activation. `MdSubMenu` emits `update:modelValue`, `open`, and `close`.

### Slots

`default` holds menu items. `activator` receives `onClick`, `onKeydown`, `open`, `close`, `toggle`, `ariaExpanded`, and `ariaHaspopup`. Items support `default`, `start`, and `end`; submenus support `trigger` and `default`.

### Accessibility

Submenu triggers identify their popup as a menu and expose its expanded state. `aria-controls` references the actual nested menu content through a stable ID. Standalone menus can set `content-id` when an external control needs the same relationship.

## Storybook

Explore variants and controls in [Storybook](https://mylmz10.github.io/vue-material-3/storybook/?path=/story/components-menu--menu).
