<script setup>
import { ref } from 'vue';
const lastAction = ref('No action yet');
const actions = [{ icon: 'search', label: 'Search library' }];
</script>

# Top App Bar

`MdTopAppBar` supports the standard Material 3 `small`, `center-aligned`, `medium`, and `large` variants (64/64/112/152px). These are the repository's baseline M3 variants, not the newer Expressive flexible app bars.

## Example

<div class="md-doc-preview md-doc-preview--column">
  <div id="docs-app-bar-scroll" class="md-doc-preview__scroll">
    <MdTopAppBar title="Library" navigation-icon="menu" navigation-label="Open menu" :actions="actions"
      variant="large" scroll-behavior="collapse" scroll-target="#docs-app-bar-scroll"
      @navigation="lastAction = 'Menu opened'" @action="lastAction = $event.label" />
    <div class="md-doc-preview__scroll-content">Scroll this panel to collapse the app bar.</div>
  </div>
  <p role="status">{{ lastAction }}</p>
</div>

## Import

```js
import { MdTopAppBar } from 'vue-material-3';
```

## Usage

```vue
<script setup>
import { ref } from 'vue';
import { MdTopAppBar } from 'vue-material-3';
const lastAction = ref('');
const actions = [{ icon: 'search', label: 'Search library' }];
</script>

<template>
  <MdTopAppBar title="Library" navigation-icon="menu" navigation-label="Open menu" :actions="actions" @navigation="lastAction = 'Menu opened'" @action="lastAction = $event.label" />
  <p role="status">{{ lastAction }}</p>
</template>
```

## API

### Props

| Prop             | Default     | Description                                                       |
| ---------------- | ----------- | ----------------------------------------------------------------- |
| `title`          | `''`        | Visible page title.                                               |
| `variant`        | `'small'`   | `small`, `center-aligned`, `medium`, or `large`.                  |
| `navigationIcon` | `''`        | Optional navigation action icon.                                  |
| `actions`        | `[]`        | Objects with `icon`, accessible `label`, and optional `disabled`. |
| `scrollBehavior` | `'pinned'`  | `pinned` or `collapse`.                                           |
| `scrollTarget`   | `undefined` | Scroll element or selector; defaults to the window.               |

### Events

`navigation(event)` reports navigation activation; `action(action, index, event)` identifies the selected action.

### Slots

`navigation`, `title`, and `actions` replace their respective regions.

The title renders as an `h1`, truncates long text within available space, and remains available through its text/title attribute. Navigation and actions use non-submitting icon buttons. Every action requires a meaningful `label`; `navigationLabel` defaults to “Open navigation”. Actions accept `icon`, `label`, and `disabled`. The `action` event supplies `(action, index, event)`; `navigation` supplies the click event. The `title`, `navigation`, and `actions` slots replace their respective default content; name slotted icon controls yourself.

The bar is sticky at the top of its containing scroll area. `scrollBehavior="pinned"` (default) preserves its height and applies a surface fill when scrolled. `collapse` reduces medium/large bars to 64px as content scrolls. `scrollTarget` accepts a DOM element or selector; omitted, it observes the window. Set it to the containing scroll element when using an overflow panel. Dynamic targets are rebound and listeners are removed on unmount. Selector targets must exist when mounted or when the prop changes.

Reference: [Material app bars](https://m3.material.io/components/app-bars/overview).

## Storybook

Explore variants and controls in [Storybook](https://mylmz10.github.io/vue-material-3/storybook/?path=/story/components-topappbar--collapsing).
