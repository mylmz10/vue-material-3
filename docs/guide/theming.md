# Theming

Vue Material 3 uses the Material Design 3 color, typography, and component token model. Load `vue-material-3/style.css` once before applying theme overrides.

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
