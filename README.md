# Vue Material 3

Material Design 3 components for Vue 3, with light and dark color schemes and customizable CSS tokens.

[![npm version](https://img.shields.io/npm/v/vue-material-3.svg)](https://www.npmjs.com/package/vue-material-3)
[![License](https://img.shields.io/npm/l/vue-material-3.svg)](LICENSE)
[![PR validation](https://github.com/mylmz10/vue-material-3/actions/workflows/pr-validation.yml/badge.svg?branch=develop)](https://github.com/mylmz10/vue-material-3/actions/workflows/pr-validation.yml)

[Documentation](https://mylmz10.github.io/vue-material-3/) · [Component reference](https://mylmz10.github.io/vue-material-3/components/) · [Storybook](https://mylmz10.github.io/vue-material-3/storybook/)

## Getting started

Install the package in a project using Vue 3.5 or later within Vue 3.

```sh
npm install vue-material-3
```

Import the package stylesheet once in your application, then import the components you use.

```vue
<script setup>
import { MdFilledButton } from 'vue-material-3';
import 'vue-material-3/style.css';
</script>

<template>
  <MdFilledButton label="Get started" />
</template>
```

Load Roboto and Material Symbols Outlined in your app to use the default typography and icons. [Font setup](docs/guide/installation.md#load-fonts)

## Components and theming

The library includes buttons, form controls, navigation, menus, dialogs, sheets, carousels, and date and time pickers. Each component reference lists its imports, props, events, and slots. [Component index](docs/components/index.md)

- **Autocomplete** accepts strings, numbers, and labeled options. It offers docked and modal suggestions, filters locally as you type, and preserves the current selection when you leave an unconfirmed search. Use the optional debounced event for external searches. [Autocomplete](docs/components/autocomplete.md)
- **Carousel** offers multi-browse and uncontained layouts with mouse dragging, velocity-based settling, keyboard navigation, and a show-all view. [Carousel](docs/components/carousel.md)

Apply `.dark` or `data-theme="dark"` to an ancestor to switch its color scheme. Override CSS custom properties to adapt the theme to your application. [Theming guide](docs/guide/theming.md)

## Contributing

Use Node.js 22 as specified in [`.nvmrc`](.nvmrc), then run `npm install`.

| Task | Command |
| --- | --- |
| Run the documentation site | `npm run docs:dev` |
| Develop components in Storybook | `npm run storybook` |
| Check lint and run unit tests | `npm run lint:check`, `npm test` |
| Build the library, docs, and Storybook | `npm run build`, `npm run docs:build`, `npm run build-storybook` |
| Verify the packed package in a consumer app | `npm run test:package` |
| Check browser behavior and visual geometry | `npm run test:browser`, `npm run test:visual` |

The browser, visual, and package checks use a local Chrome or Chromium installation. [Browser and package checks](docs/testing/browser.md)

## License

[MIT](LICENSE)
