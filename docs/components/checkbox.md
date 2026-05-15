<script setup>
import { ref } from 'vue';
const checked = ref(true);
</script>

# Checkbox

Checkboxes let users select one or more options.

<div class="md-doc-preview">
  <MdCheckbox v-model="checked" />
  <MdCheckbox checked disabled />
</div>

## Import

```js
import { MdCheckbox } from 'vue-material-3';
```

## Usage

```vue
<MdCheckbox v-model="checked" />
```

## Storybook

Use <a href="/vue-material-3/storybook/?path=/story/components-checkbox--checkbox" target="_blank" rel="noreferrer">Storybook</a> for controls.
