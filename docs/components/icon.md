# Icon

`MdIcon` renders a Material Symbols icon by name.

<div class="md-doc-preview">
  <MdIcon>star</MdIcon>
  <MdIcon>favorite</MdIcon>
  <MdIcon>settings</MdIcon>
</div>

## Import

```js
import { MdIcon } from 'vue-material-3';
```

## Usage

```vue
<MdIcon>star</MdIcon>
```

## Storybook

Use <a href="/vue-material-3/storybook/?path=/story/components-icon--icon" target="_blank" rel="noreferrer">Storybook</a> for the rendered icon.

Icons are decorative (`aria-hidden="true"`) by default, so ligature names do not enter button names. Give an icon-only control its own `aria-label`. For a standalone meaningful icon, pass `aria-label` or `aria-labelledby` to `MdIcon`; it then exposes an image role.
