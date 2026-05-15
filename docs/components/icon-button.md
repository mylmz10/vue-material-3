<script setup>
import { ref } from 'vue';
const selected = ref(false);
</script>

# Icon Button

Icon buttons expose common icon-only actions and toggle actions.

<div class="md-doc-preview">
  <MdIconButton icon="star" />
  <MdIconButton icon="favorite" filled />
  <MdIconButton icon="bookmark" tonal />
  <MdIconButton icon="settings" outlined />
  <MdIconButton v-model:selected="selected" toggle icon="visibility" selected-icon="visibility_off" />
</div>

## Import

```js
import { MdIconButton } from 'vue-material-3';
```

## Usage

```vue
<MdIconButton icon="star" />
<MdIconButton v-model:selected="selected" toggle icon="visibility" selected-icon="visibility_off" />
```

## Storybook

Use <a href="/vue-material-3/storybook/?path=/story/components-icon-button--icon-button" target="_blank" rel="noreferrer">Storybook</a> for controls.
