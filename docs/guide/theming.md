# Theming

Vue Material 3 follows the Material Design 3 token model. Component styles are backed by SCSS token files under `src/styles/tokens`.

## Typography

The project includes Material 3 type scale styles. Import the compiled stylesheet once in your application entry to load component styles, typography and theme variables:

```js
import 'vue-material-3/style.css';
```

The published JavaScript and CSS are separate assets; importing a component does not load the stylesheet. Source examples in this repository use Storybook’s global styles, so they do not demonstrate this required package import.

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
