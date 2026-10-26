# Installation

Install `vue-material-3` from npm:

```bash
npm install vue-material-3
```

The package targets Vue 3 applications. Load the compiled stylesheet once in your application entry (for example, `src/main.js`):

```js
import 'vue-material-3/style.css';
```

Importing components from the JavaScript entry does not load this separate CSS file.

## Peer Runtime

Make sure your application has Vue 3 installed:

```bash
npm install vue
```

## Local Development

For this repository, install dependencies and start the documentation site:

```bash
npm install
npm run docs:dev
```

Storybook remains available for interactive component examples:

```bash
npm run storybook
```
