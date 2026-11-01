# List

Lists display related rows of content and actions.

## Example

<div class="md-doc-preview">
  <MdList class="md-doc-preview__surface">
    <MdListItem headline="Wi-Fi" icon="wifi" trailing-text="On" />
    <MdListItem headline="Bluetooth" icon="bluetooth" trailing-text="Off" />
    <MdListDivider />
    <MdListItem headline="Notifications" supporting-text="Manage app notifications" icon="notifications" />
  </MdList>
</div>

## Import

```js
import { MdList, MdListItem, MdListDivider } from 'vue-material-3';
```

## Usage

```vue
<script setup>
import { MdList, MdListItem, MdListDivider } from 'vue-material-3';
</script>

<template>
  <MdList>
    <MdListItem headline="Wi-Fi" icon="wifi" trailing-text="On" />
    <MdListDivider />
    <MdListItem headline="Notifications" icon="notifications" />
  </MdList>
</template>
```

For a row that performs an action, add `interactive` so it can be reached and activated with the keyboard.

```vue
<MdListItem interactive headline="Notifications" @click="$emit('open-notifications')" />
```

## API

### Props

| Prop                                   | Default     | Description                      |
| -------------------------------------- | ----------- | -------------------------------- |
| `MdListItem.headline / supportingText` | `undefined` | Primary and supporting row text. |
| `MdListItem.icon / trailingText`       | `undefined` | Leading icon and trailing text.  |
| `MdListItem.interactive`               | `false`     | Enable keyboard activation.      |
| `MdListItem.selected`                  | `false`     | Selected row styling.            |

### Events

`MdListItem` emits `click` when an interactive row is activated.

### Slots

`MdList.default` holds rows. `MdListItem` supports `default`, `start`, `end`, and `supporting-text`. `MdListDivider` has no slots.

## Storybook

Explore variants and controls in [Storybook](https://mylmz10.github.io/vue-material-3/storybook/?path=/story/components-list--list).
