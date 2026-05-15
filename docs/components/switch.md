<script setup>
import { ref } from 'vue';
const enabled = ref(true);
</script>

# Switch

Switches toggle a single setting on or off.

<div class="md-doc-preview">
  <MdSwitch v-model="enabled" />
  <MdSwitch disabled />
</div>

## Import

```js
import { MdSwitch } from 'vue-material-3';
```

## Usage

```vue
<MdSwitch v-model="enabled" />
```

## Storybook

Use <a href="/vue-material-3/storybook/?path=/story/components-switch--switch" target="_blank" rel="noreferrer">Storybook</a> for controls.
