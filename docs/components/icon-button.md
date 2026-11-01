<script setup>
import { ref } from 'vue';
const selected = ref(false);
</script>

# Icon Button

Icon buttons expose common icon-only actions and toggle actions.

## Example

<div class="md-doc-preview">
  <MdIconButton type="button" icon="star" aria-label="Add to favorites" />
  <MdIconButton type="button" icon="favorite" aria-label="Like" filled />
  <MdIconButton type="button" icon="bookmark" aria-label="Save" tonal />
  <MdIconButton type="button" icon="settings" aria-label="Open settings" outlined />
  <MdIconButton type="button" v-model:selected="selected" toggle aria-label="Toggle visibility" icon="visibility" selected-icon="visibility_off" />
</div>

## Import

```js
import { MdIconButton } from 'vue-material-3';
```

## Usage

```vue
<script setup>
import { ref } from 'vue';
import { MdIconButton } from 'vue-material-3';
const selected = ref(false);
</script>

<template>
  <MdIconButton type="button" icon="star" aria-label="Add to favorites" />
  <MdIconButton type="button" v-model:selected="selected" toggle aria-label="Toggle visibility" icon="visibility" selected-icon="visibility_off" />
</template>
```

## API

### Props

| Prop                        | Default     | Description                                                        |
| --------------------------- | ----------- | ------------------------------------------------------------------ |
| `icon / selectedIcon`       | `undefined` | Default and selected Material Symbols names.                       |
| `toggle / selected`         | `false`     | Enable toggle behavior and bind selection with `v-model:selected`. |
| `filled / tonal / outlined` | `false`     | Visual variant flags.                                              |
| `disabled / softDisabled`   | `false`     | Block activation.                                                  |
| `type`                      | `'submit'`  | Native button type; set `button` for actions inside forms.         |

### Events

`update:selected`, `input`, and `change` report toggle selection. Use native `@click` for activation.

### Slots

`default` supplies icon content when `icon` is omitted; `selected` overrides selected-state content.

## Storybook

Explore variants and controls in [Storybook](https://mylmz10.github.io/vue-material-3/storybook/?path=/story/components-icon-button--icon-button).
