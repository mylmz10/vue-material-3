<script setup>
import coast from '../../stories/assets/coast.svg';
</script>

# Card

Cards group related content and actions in a contained surface.

Set `interactive` when the card itself should react to pointer hover as an interactive surface.

## Example

<div class="md-doc-preview">
  <MdCard
    style="min-height: 300px; width: 300px;"
    action-button-text="Action"
    cancel-button-text="Cancel"
    avatar-initials="VM"
    :image="coast"
    type="elevated"
    header-title="Header"
    header-sub-title="Subhead"
  >
    Elevated card content
  </MdCard>
</div>

## Import

```js
import { MdCard } from 'vue-material-3';
```

## Usage

```vue
<script setup>
import { MdCard } from 'vue-material-3';
</script>

<template>
  <MdCard header-title="Header" header-sub-title="Subhead" type="elevated"> Card content </MdCard>

  <MdCard interactive header-title="Header" type="outlined"> Clickable card content </MdCard>
</template>
```

## API

### Props

| Prop                                  | Default      | Description                                           |
| ------------------------------------- | ------------ | ----------------------------------------------------- |
| `type`                                | `'elevated'` | Surface variant: `elevated`, `filled`, or `outlined`. |
| `headerTitle / headerSubTitle`        | `undefined`  | Heading and secondary heading.                        |
| `image / avatar`                      | `undefined`  | Image URLs.                                           |
| `interactive`                         | `false`      | Make the card keyboard and pointer interactive.       |
| `actionButtonText / cancelButtonText` | `undefined`  | Labels for built-in footer actions.                   |

### Events

`action` and `cancel` report footer actions. `click` reports activation of an interactive card; nested controls keep their own behavior.

### Slots

`default` supplies card content.

## Storybook

Explore variants and controls in [Storybook](https://mylmz10.github.io/vue-material-3/storybook/?path=/story/components-card--card).
