<script setup>
import { ref } from 'vue';
const selected = ref('2');
</script>

# Radio

Radio buttons let users select one option from a set.

<div class="md-doc-preview">
  <MdRadio v-model="selected" value="1" name="docs-radio" />
  <MdRadio v-model="selected" value="2" name="docs-radio" />
  <MdRadio value="3" name="docs-radio-disabled" disabled />
</div>

## Import

```js
import { MdRadio } from 'vue-material-3';
```

## Usage

```vue
<MdRadio v-model="selected" value="1" name="choice" />
```

## Storybook

Use <a href="/vue-material-3/storybook/?path=/story/components-radio--radio" target="_blank" rel="noreferrer">Storybook</a> for controls.
