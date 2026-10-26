# Progress

Progress indicators communicate that a process is underway.

<div class="md-doc-preview md-doc-preview--column">
  <MdLinearProgressIndicator :value="40" />
  <MdCircularProgressIndicator :value="40" />
  <MdLinearProgressIndicator indeterminate />
  <MdCircularProgressIndicator indeterminate />
</div>

## Import

```js
import { MdLinearProgressIndicator, MdCircularProgressIndicator } from 'vue-material-3';
```

## Usage

```vue
<MdLinearProgressIndicator :value="40" />
<MdCircularProgressIndicator indeterminate />
```

## Determinate endpoint

Determinate linear indicators include a 4px, primary-colored stop marker to identify the end of low-contrast tracks. It merges into the active bar at completion and follows the inline direction in RTL layouts. Indeterminate and circular indicators do not use a stop marker.

## Storybook

Use <a href="/vue-material-3/storybook/?path=/story/components-progress-indicators--linear-progress-indicator" target="_blank" rel="noreferrer">Storybook</a> for controls.
