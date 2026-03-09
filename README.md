# Vue Material 3

<p align="center">
  <a href="https://www.npmjs.com/package/vue-material-3">
    <img src="https://img.shields.io/npm/v/vue-material-3.svg" alt="npm version">
  </a>
  <a href="https://www.npmjs.com/package/vue-material-3">
    <img src="https://img.shields.io/npm/dt/vue-material-3.svg" alt="npm downloads">
  </a>
  <a href="https://www.npmjs.com/package/vue-material-3">
    <img src="https://img.shields.io/bundlephobia/min/vue-material-3.svg" alt="bundle size">
  </a>
  <a href="https://www.npmjs.com/package/vue-material-3">
    <img src="https://img.shields.io/npm/l/vue-material-3.svg" alt="license">
  </a>
  <a href="https://mylmz10.github.io/vue-material-3">
    <img src="https://img.shields.io/badge/storybook-live-ff4785.svg" alt="storybook">
  </a>
</p>

Vue Material 3 is a Vue 3 component library inspired by [Material Design 3 (Material You)](https://m3.material.io/blog/announcing-material-you).
It focuses on practical, composable UI primitives with a clean API and Storybook-first workflow.

> Note: The project is still evolving and may include breaking changes before `1.0.0`.

## Highlights

- Vue 3 component set with Material 3 visual language
- Live Storybook documentation and examples
- Unit test setup with Vitest + Vue Test Utils
- Pre-commit quality gate via Husky (`npm test`)

## Installation

```bash
npm install vue-material-3
```

## Quick Start

```vue
<template>
  <MdElevatedButton label="Get Started" />
</template>

<script setup>
import { MdElevatedButton } from 'vue-material-3';
</script>
```

## Available Components

- `Avatar`
- `Badge`
- `Button` (`ElevatedButton`, `FilledButton`, `FilledTonalButton`, `OutlinedButton`, `TextButton`)
- `Card`
- `Checkbox`
- `Chip` (`ChipSet`, `FilterChip`)
- `DatePicker`
- `Dialog`
- `Divider`
- `Fab` (`Fab`, `BrandedFab`, `FabExtended`)
- `AutoComplete` (`FilledAutoComplete`, `OutlinedAutoComplete`)
- `Icon`
- `IconButton`
- `List` (`List`, `ListItem`, `ListDivider`)
- `Menu`
- `NavigationBar`
- `NavigationDrawer`
- `NavigationTab`
- `ProgressIndicator` (`LinearProgressIndicator`, `CircularProgressIndicator`)
- `Radio`
- `Search`
- `SegmentedButton` (`SegmentedButton`, `SegmentedButtonSet`)
- `Select` (`FilledSelect`, `OutlinedSelect`, `SelectOption`)
- `Slider`
- `Snackbar`
- `Switch`
- `TextField` (`FilledTextField`, `OutlinedTextField`)

## Planned Components

These components are planned and not published in the current API yet:

- [ ] BottomSheet
- [ ] Carousel
- [ ] NavigationRail
- [ ] SideSheet
- [ ] Tabs
- [ ] TimePicker
- [ ] Tooltip
- [ ] TopAppBar

## Storybook

- Live docs: `https://mylmz10.github.io/vue-material-3`
- Local:

```bash
npm run storybook
```

## Development

Recommended local runtime:

- Node.js `20.19.0+`
- npm `10+`

Install dependencies:

```bash
npm install
```

Run tests:

```bash
npm test
```

Build Storybook:

```bash
npm run build-storybook
```

## License

MIT
