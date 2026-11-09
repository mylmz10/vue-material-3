# Tooltip

Tooltips provide supporting text for a focused or hovered element.

## Example

<div class="md-doc-preview md-doc-preview__tooltip-target">
  <MdTooltip text="Add to list">
    <MdFilledButton label="Hover me" />
  </MdTooltip>
</div>

## Import

```js
import { MdTooltip } from 'vue-material-3';
```

## Usage

```vue
<script setup>
import { MdTooltip, MdFilledButton } from 'vue-material-3';
</script>

<template>
  <MdTooltip text="Add to list">
    <MdFilledButton label="Hover me" />
  </MdTooltip>
</template>
```

## API

### Props

| Prop                               | Default     | Description                                                             |
| ---------------------------------- | ----------- | ----------------------------------------------------------------------- |
| `text / supportingText / headline` | `''`        | Tooltip content.                                                        |
| `variant`                          | `'plain'`   | `plain` or `rich` presentation.                                         |
| `modelValue`                       | `undefined` | Optional controlled visibility.                                         |
| `interactive`                      | `null`      | Override automatic interactive behavior.                                |
| `disabled`                         | `false`     | Disable the tooltip.                                                    |
| `persistent`                       | `false`     | Rich tooltips only: open on click and remain available until dismissed. |
| `actionLabel`                      | `''`        | Rich tooltip action label.                                              |

### Events

`open`, `close`, and `update:modelValue` report visibility; `action` reports the rich action.

### Slots

`default` supplies the trigger; `headline`, `supporting-text`, and `action` customize rich content.

### Accessibility

While open, the tooltip adds its ID to the native trigger control’s `aria-describedby`, preserving existing description IDs. Closing or unmounting removes only the tooltip’s own ID.

## Storybook

Explore variants and controls in [Storybook](https://mylmz10.github.io/vue-material-3/storybook/?path=/story/components-tooltip--playground).
