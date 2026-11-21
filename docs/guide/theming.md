# Theming

Vue Material 3 uses the Material Design 3 color, typography, and component token model. Load `vue-material-3/style.css` once before applying theme overrides.

Use **Color palette** in the documentation header to preview primary, secondary, tertiary, and surface colors in light and dark mode. The selection is saved in your browser. Choose **Original** to restore the default colors.

## Load styles and typography

```js
import 'vue-material-3/style.css';
```

The published JavaScript does not load this stylesheet. Roboto and icon fonts must be loaded separately; see [Installation](/guide/installation#load-fonts).

## Switch color schemes

The default scheme is light. Apply `.light` or `.dark` to an ancestor to select a scheme:

```html
<div class="dark">
  <!-- Material components inside use dark theme tokens. -->
</div>
```

Alternatively, set `data-theme="light|dark"` or `data-color-scheme="light|dark"` on an ancestor, such as the document root:

```js
document.documentElement.dataset.theme = 'dark';
```

Choose one selector convention for the application. The package does not automatically follow the operating system's color preference; the application owns that choice.

## Customize tokens

Override public CSS custom properties on the relevant component or an ancestor. For example, customize a button without changing the rest of the theme:

```vue
<script setup>
import { MdFilledButton } from 'vue-material-3';
</script>

<template>
  <MdFilledButton label="Save" style="--md-sys-color-primary: #386a20; --md-sys-color-on-primary: #ffffff" />
</template>
```

Use each component reference for its documented sizing or color variables. Check contrast and disabled/focus states when changing colors.

## Density

[`--md-sys-density-scale`](/guide/density) tightens the containers that are meant to compress. `0` is the default size. `-1`, `-2`, and `-3` each remove 4px of height. Text size, icon size, and horizontal padding stay the same. Set it on any ancestor, the same way as a color override. The library clamps the value to the range `-3` through `0`. The [density guide](/guide/density) shows the four scales side by side.

```html
<section style="--md-sys-density-scale: -2">
  <!-- Buttons, fields, lists, tabs, chips, and icon buttons inside are two steps denser. -->
</section>
```

These components follow the scale: buttons, segmented buttons, lists, single-line text fields, selects, autocomplete, date and time fields, search, tabs, icon buttons, and chips. A component stops at its own minimum when another step would clip its content. Search does not go below 48px, because its leading icon is a 48px target.

Menus, select options, snackbars, dialogs, sheets, banners, date and time picker dialogs, FABs, navigation bars, rails, drawers, and top app bars stay at their default size.

Density is opt-in. A denser control can be shorter than the 48px target. Keep the control that changes this setting at scale `0`.

## Repository token sources

Contributors can inspect SCSS sources such as:

```text
src/styles/tokens/_md-comp-filled-button.scss
src/styles/tokens/_md-comp-outlined-text-field.scss
src/styles/tokens/_md-ref-palette.scss
```

These repository paths are implementation sources, not supported imports from the published package. Verify token changes in light and dark themes using the component examples and Storybook.

## Related documentation

- [Installation](/guide/installation)
- [Components](/components/)
- [Browser and Package Checks](/testing/browser)
- [Storybook](https://mylmz10.github.io/vue-material-3/storybook/)
