# Theming

Vue Material 3 follows the Material Design 3 token model. Component styles are backed by SCSS token files under `src/styles/tokens`.

## Typography

The project includes Material 3 type scale styles. Import the package entry in your app to include the library styles exposed by the package:

```js
import 'vue-material-3';
```

When working inside this repository, Storybook and the package entry import the typography styles used by the component examples.

## Tokens

Component tokens live in files such as:

```text
src/styles/tokens/_md-comp-filled-button.scss
src/styles/tokens/_md-comp-outlined-text-field.scss
src/styles/tokens/_md-ref-palette.scss
```

Use these files as the source of truth when documenting or updating component-level theme behavior.

## Storybook

Use Storybook to verify visual states after token changes:

```bash
npm run storybook
```
