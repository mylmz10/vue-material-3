# Installation

Vue Material 3 requires **Vue 3.5 or later within Vue 3** (`^3.5.0`). The package ships JavaScript and CSS separately.

## Install the package

```bash
npm install vue-material-3 vue@^3.5.0
```

## Load styles

Import the compiled stylesheet once in your application entry, such as `src/main.js`:

```js
import 'vue-material-3/style.css';
```

Importing components does not load this CSS file automatically.

## Load fonts

Add these links to the application's HTML document head, or self-host the equivalent fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;600;700;900&display=swap" />
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" />
```

Roboto supplies the default typography. Material Symbols Outlined and legacy Material Icons supply the icon ligatures used by components. These fonts are external assets, not bundled package files. Storybook and this documentation site load them for their examples.

## Local development

Contributors should use Node 22 as specified in `.nvmrc`:

```bash
npm install
npm run docs:dev
```

VitePress and Storybook are separate development servers. To inspect local stories, run this in another terminal:

```bash
npm run storybook
```

Open local Storybook at `http://localhost:6006`. Documentation links target the published Storybook so they also work while browsing `docs:dev`. The site deployment bundles Storybook with the built documentation; `docs:dev` alone does not serve Storybook.

## Related documentation

- [Quick Start](/guide/quick-start)
- [Theming](/guide/theming)
- [Components](/components/)
- [Storybook](https://mylmz10.github.io/vue-material-3/storybook/)
