# Button

Buttons communicate actions that users can take. Vue Material 3 provides the Material Design 3 button variants as separate Vue components.

## Variants

<div class="md-doc-preview">
  <MdFilledButton label="Filled" />
  <MdFilledTonalButton label="Filled tonal" />
  <MdElevatedButton label="Elevated" />
  <MdOutlinedButton label="Outlined" />
  <MdTextButton label="Text" />
</div>

| Component | Use case |
| --- | --- |
| `MdFilledButton` | High-emphasis primary actions. |
| `MdFilledTonalButton` | Medium-emphasis actions that need a filled surface. |
| `MdElevatedButton` | Actions that need separation from the background. |
| `MdOutlinedButton` | Medium-emphasis actions without a filled container. |
| `MdTextButton` | Low-emphasis actions, compact toolbars, and inline actions. |

## Import

```js
import { MdFilledButton, MdOutlinedButton, MdTextButton } from 'vue-material-3';
```

## Usage

Use the `label` prop for simple text buttons:

```vue
<template>
  <MdFilledButton label="Save" />
  <MdOutlinedButton label="Cancel" />
</template>

<script setup>
import { MdFilledButton, MdOutlinedButton } from 'vue-material-3';
</script>
```

Use the default slot when the label needs custom content:

```vue
<template>
  <MdTextButton>Learn more</MdTextButton>
</template>

<script setup>
import { MdTextButton } from 'vue-material-3';
</script>
```

## Icons

Buttons support a trailing icon through either the `trailingIcon` prop or the `trailing-icon` slot.

<div class="md-doc-preview">
  <MdFilledButton label="Next" trailing-icon="arrow_forward" />
  <MdOutlinedButton label="Open" trailing-icon="open_in_new" />
</div>

```vue
<template>
  <MdFilledButton label="Next" trailing-icon="arrow_forward" />
</template>

<script setup>
import { MdFilledButton } from 'vue-material-3';
</script>
```

## Links

When `href` is provided, the component renders an anchor instead of a native button.

<div class="md-doc-preview">
  <MdTextButton label="Open docs" href="/vue-material-3/" target="_blank" />
</div>

```vue
<template>
  <MdTextButton label="Open docs" href="/docs" target="_blank" />
</template>

<script setup>
import { MdTextButton } from 'vue-material-3';
</script>
```

## Props

All button variants share the same public props.

<div class="md-doc-preview md-doc-preview--column">
  <div class="md-doc-preview__row">
    <MdFilledButton label="Enabled" />
    <MdFilledButton label="Disabled" disabled />
    <MdFilledButton label="Soft disabled" soft-disabled />
  </div>
  <div class="md-doc-preview__row">
    <MdOutlinedButton label="Enabled" />
    <MdOutlinedButton label="Disabled" disabled />
    <MdOutlinedButton label="Soft disabled" soft-disabled />
  </div>
</div>

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | `undefined` | Text rendered inside the button. Falls back to the default slot when omitted. |
| `trailingIcon` | `string` | `undefined` | Material Symbols icon name rendered after the label. |
| `disabled` | `boolean` | `false` | Disables native button interaction. For link buttons, click is prevented and `aria-disabled` is set. |
| `softDisabled` | `boolean` | `false` | Applies disabled styling and prevents click behavior while keeping the element focus behavior softer than `disabled`. |
| `href` | `string` | `''` | Renders the button as an anchor when provided. |
| `target` | `string` | `''` | Anchor target used with `href`. |
| `download` | `string` | `''` | Anchor download attribute used with `href`. |
| `type` | `string` | `'button'` | Native button type when the component renders a `<button>`. |

## Slots

| Slot | Description |
| --- | --- |
| `default` | Button label content used when `label` is not provided. |
| `trailing-icon` | Custom trailing icon content. Overrides `trailingIcon`. |

## Accessibility

- Native buttons receive the `disabled` attribute when `disabled` is true.
- Link buttons receive `aria-disabled` when `disabled` or `softDisabled` is true.
- Disabled link buttons prevent click behavior.
- Use clear action labels; icon-only actions should use `MdIconButton` instead.

## Storybook

Use <a href="/vue-material-3/storybook/?path=/story/components-buttons--filled-button" target="_blank" rel="noreferrer">Storybook</a> to inspect button variants interactively.
