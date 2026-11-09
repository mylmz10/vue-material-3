<script setup>
import { ref } from 'vue';
const destination = ref(0);
const items = [
  { label: 'Home', icon: 'home' },
  { label: 'Inbox', icon: 'mail', badge: 3, badgeLabel: '3 unread messages' },
  { label: 'Settings', icon: 'settings' },
];
</script>

# Navigation Rail

`MdNavigationRail` implements the standard compact Material 3 rail: an 80px column for primary destinations on larger screens. Use the navigation bar instead on compact screens; the host application chooses its breakpoint. This component does not implement Expressive expanded rails.

## Example

<div class="md-doc-preview">
  <MdNavigationRail v-model="destination" :items="items" aria-label="Example navigation" />
  <p role="status">Selected destination: {{ items[destination].label }}</p>
</div>

## Import

```js
import { MdNavigationRail } from 'vue-material-3';
```

## Usage

```vue
<script setup>
import { ref } from 'vue';
import { MdNavigationRail } from 'vue-material-3';
const destination = ref(0);
const items = [
  { label: 'Home', icon: 'home' },
  { label: 'Inbox', icon: 'mail', badge: 3, badgeLabel: '3 unread messages' },
];
</script>

<template>
  <MdNavigationRail v-model="destination" :items="items" aria-label="Primary navigation" />
</template>
```

## API

### Props

| Prop         | Default                | Description                                                      |
| ------------ | ---------------------- | ---------------------------------------------------------------- |
| `modelValue` | `undefined`            | Selected zero-based index; bind with `v-model`.                  |
| `items`      | `[]`                   | Destination objects with label, icon, badge, and disabled state. |
| `labels`     | `'all'`                | Show `all`, `selected`, or `none` of the visible labels.         |
| `ariaLabel`  | `'Primary navigation'` | Accessible navigation landmark name.                             |

### Events

`update:modelValue(index)` requests destination selection.

### Slots

`header` and `footer` hold optional controls or content.

`modelValue` is the selected item index, matching `MdNavigationBar`. Selection is controlled: handle `update:modelValue` or use `v-model`. Items accept `label`, `icon`, `activeIcon`, `disabled`, `badge` (number/string, or `true` for a dot), and `badgeLabel` for an accessible badge description. Supply a meaningful label for every destination. `labels` accepts `all` (default), `selected`, or `none`; hidden labels remain accessible. `ariaLabel` names the navigation landmark.

Up/Down wrap through enabled destinations; Home/End focus the first/last. Moving focus does not change selection. Enter/Space activate native destination buttons. Header and footer slots accommodate a menu button or FAB and additional content; provide accessible names on slotted controls.

Reference: [Material navigation rail](https://m3.material.io/components/navigation-rail/overview). Geometry follows the repository's standard M3 tokens, not Expressive dimensions.

## Storybook

Explore variants and controls in [Storybook](https://mylmz10.github.io/vue-material-3/storybook/?path=/story/components-navigationrail--standard).
