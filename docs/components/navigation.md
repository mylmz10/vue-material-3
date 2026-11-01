<script setup>
import { ref } from 'vue';
const activeNav = ref(0);
const drawerOpen = ref(false);
const navItems = [
  { label: 'Flights', activeIcon: 'flight' },
  { label: 'Trips', activeIcon: 'luggage' },
  { label: 'Explore', activeIcon: 'explore' },
];
</script>

# Navigation

Navigation components help users move between top-level destinations.

## Example

<div class="md-doc-preview md-doc-preview--column">
  <div class="md-doc-preview__nav">
    <MdNavigationBar v-model="activeNav" :items="navItems" />
  </div>
  <div class="md-doc-preview__drawer">
    <MdNavigationDrawer opened>
      <MdList>
        <MdListItem headline="Inbox" icon="inbox" selected />
        <MdListItem headline="Starred" icon="star" />
        <MdListItem headline="Sent" icon="send" />
      </MdList>
    </MdNavigationDrawer>
  </div>
  <div class="md-doc-preview__surface">
    <MdNavigationTab label="Flights" active-icon="flight" selected />
  </div>
</div>

<div class="md-doc-preview">
  <MdFilledButton label="Open modal drawer" @click="drawerOpen = true" />
  <MdNavigationDrawer :opened="drawerOpen" modal aria-label="Example destinations" @change="drawerOpen = $event">
    <nav><MdTextButton label="Close drawer" @click="drawerOpen = false" /></nav>
  </MdNavigationDrawer>
</div>

## Import

```js
import { MdNavigationBar, MdNavigationDrawer, MdNavigationTab } from 'vue-material-3';
```

## Usage

```vue
<script setup>
import { ref } from 'vue';
import { MdNavigationBar, MdNavigationDrawer, MdNavigationTab } from 'vue-material-3';
const activeIndex = ref(0);
const items = [
  { label: 'Home', activeIcon: 'home' },
  { label: 'Inbox', activeIcon: 'mail' },
];
</script>

<template>
  <MdNavigationBar v-model="activeIndex" :items="items" />
</template>
```

## API

### Props

| Prop                                 | Default     | Description                                      |
| ------------------------------------ | ----------- | ------------------------------------------------ |
| `MdNavigationBar.items`              | `[]`        | Destination objects.                             |
| `MdNavigationBar.modelValue`         | `undefined` | Selected zero-based index.                       |
| `MdNavigationDrawer.opened`          | `false`     | Drawer visibility; use `:opened` with `@change`. |
| `MdNavigationDrawer.modal`           | `false`     | Enable native modal isolation.                   |
| `MdNavigationTab.label / activeIcon` | `undefined` | Destination name and icon.                       |
| `MdNavigationTab.selected`           | `false`     | Mark the current destination.                    |

### Events

`MdNavigationBar` emits `update:modelValue(index)`. `MdNavigationDrawer` emits `change(false)` on dismissal. `MdNavigationTab` accepts native `@click`.

### Slots

`MdNavigationDrawer.default` supplies its contents. The bar and tab have no public slots.

### Modal drawer

```vue
<script setup>
import { ref } from 'vue';
import { MdFilledButton, MdNavigationDrawer, MdTextButton } from 'vue-material-3';
const drawerOpen = ref(false);
</script>

<template>
  <MdFilledButton label="Open drawer" @click="drawerOpen = true" />
  <MdNavigationDrawer :opened="drawerOpen" modal aria-label="Main navigation" @change="drawerOpen = $event">
    <nav aria-label="Destinations">
      <MdTextButton label="Close drawer" @click="drawerOpen = false" />
    </nav>
  </MdNavigationDrawer>
</template>
```

Modal drawers use the shared native dialog behavior: focus enters the drawer, Tab stays inside, Escape or the scrim closes it, and focus returns to the launcher. The default accessible name is “Navigation”; provide `aria-label` or `aria-labelledby` when a more specific name is needed. Use links or buttons for keyboard-operable destinations. Closing retains slot components and their state. Changing the `modal` variant replaces the root and remounts slot content. Standard drawers remain nonmodal.

## Storybook

Explore variants and controls in [Storybook](https://mylmz10.github.io/vue-material-3/storybook/?path=/story/components-navigationbar--navigation-bar).
