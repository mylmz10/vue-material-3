<script setup>
import { ref } from 'vue';
const destination = ref(0);
const expanded = ref(false);
const items = [
  { label: 'Home', icon: 'home' },
  { label: 'Inbox', icon: 'mail', badge: 3, badgeLabel: '3 unread messages' },
  { label: 'Settings', icon: 'settings' },
];
</script>

# Navigation Rail

`MdNavigationRail` implements the standard compact Material 3 rail: an 80px column for primary destinations on larger screens. Use the navigation bar instead on compact screens; the host application chooses its breakpoint. Use `variant="expressive"` to opt into the collapsed and expanded Expressive layouts.

## Example

<div class="md-doc-preview">
  <MdNavigationRail v-model="destination" :items="items" aria-label="Example navigation" />
  <p role="status">Selected destination: {{ items[destination].label }}</p>
</div>

## Expressive rail

<div class="md-doc-preview">
  <MdOutlinedButton :label="expanded ? 'Collapse rail' : 'Expand rail'" aria-controls="expressive-rail-example" :aria-expanded="expanded" @click="expanded = !expanded" />
  <MdNavigationRail id="expressive-rail-example" v-model="destination" variant="expressive" :expanded="expanded" :items="items" aria-label="Expressive navigation" />
</div>

Set `expanded` from the application layout or connect it to a menu button. Inline expansion preserves the destination buttons and their focus. For a modal rail, place the expanded rail inside `MdDialog` and close the dialog after choosing a destination. The Component Gallery demonstrates this pattern inside its preview frame.

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
| `variant`    | `'baseline'`           | Use `'expressive'` for the wide rail layouts.                     |
| `expanded`   | `false`                | Show the horizontal layout in the Expressive variant.           |
| `labels`     | `'all'`                | Show `all`, `selected`, or `none` of the visible labels.         |
| `ariaLabel`  | `'Primary navigation'` | Accessible navigation landmark name.                             |

### Events

`update:modelValue(index)` requests destination selection.

### Slots

`header` and `footer` hold optional controls or content. The `header` slot receives the current `expanded` state.

`modelValue` is the selected item index, matching `MdNavigationBar`. Selection is controlled: handle `update:modelValue` or use `v-model`. Items accept `label`, `icon`, `activeIcon`, `disabled`, `badge` (number/string, or `true` for a dot), and `badgeLabel` for an accessible badge description. Supply a meaningful label for every destination. `labels` accepts `all` (default), `selected`, or `none`; hidden labels remain accessible. `ariaLabel` names the navigation landmark.

Up/Down wrap through enabled destinations; Home/End focus the first/last. Moving focus does not change selection. Enter/Space activate native destination buttons. Header and footer slots accommodate a menu button or FAB and additional content; provide accessible names on slotted controls.

Reference: [Material navigation rail](https://m3.material.io/components/navigation-rail/overview). The Expressive rail uses 96 px collapsed and 220 px expanded widths by default. Override `--md-navigation-rail-expanded-width` if destinations need more room.

## Storybook

Explore variants and controls in [Storybook](https://mylmz10.github.io/vue-material-3/storybook/?path=/story/components-navigationrail--standard).
