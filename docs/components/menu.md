<script setup>
import { ref } from 'vue';
const open = ref(false);
</script>

# Menu

Menus display a list of actions from a temporary surface.

<div class="md-doc-preview md-doc-preview__menu-anchor">
  <MdMenu v-model="open">
    <template #activator="{ onClick, onKeydown }">
      <MdFilledButton label="Open menu" @click="onClick" @keydown="onKeydown" />
    </template>
    <MdMenuItem label="Profile" icon="person" />
    <MdSubMenu label="Share" icon="share">
      <MdMenuItem label="Copy link" icon="link" />
      <MdMenuItem label="Email" icon="mail" />
    </MdSubMenu>
    <MdMenuItem label="Archive" icon="archive" />
    <MdMenuItem label="Delete" icon="delete" disabled />
  </MdMenu>
</div>

## Import

```js
import { MdMenu, MdMenuItem, MdSubMenu } from 'vue-material-3';
```

## Usage

```vue
<MdMenu v-model="open">
  <template #activator="{ onClick }">
    <MdFilledButton label="Open menu" @click="onClick" />
  </template>
  <MdMenuItem label="Profile" icon="person" />
</MdMenu>
```

## Storybook

Use <a href="/vue-material-3/storybook/?path=/story/components-menu--menu" target="_blank" rel="noreferrer">Storybook</a> for menu examples.
