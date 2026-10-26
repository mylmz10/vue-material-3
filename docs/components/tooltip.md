# Tooltip

Tooltips provide supporting text for a focused or hovered element.

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
<MdTooltip text="Add to list">
  <MdFilledButton label="Hover me" />
</MdTooltip>
```

## Accessibility

While open, the tooltip adds its ID to the native trigger control’s `aria-describedby`, preserving existing description IDs. Closing or unmounting removes only the tooltip’s own ID.

## Storybook

Use <a href="/vue-material-3/storybook/?path=/story/components-tooltip--playground" target="_blank" rel="noreferrer">Storybook</a> for plain and rich tooltips.
