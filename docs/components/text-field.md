<script setup>
import { ref } from 'vue';
const filled = ref('');
const outlined = ref('');
</script>

# Text Field

Text fields let users enter and edit text.

<div class="md-doc-preview">
  <MdFilledTextField v-model="filled" class="md-doc-preview__field" label="Filled label" supporting-text="Supporting text" prefix="$" suffix="USD" />
  <MdOutlinedTextField v-model="outlined" class="md-doc-preview__field" label="Outlined label" supporting-text="Supporting text" prefix="@" suffix=".com" />
</div>

## Import

```js
import { MdFilledTextField, MdOutlinedTextField } from 'vue-material-3';
```

## Usage

```vue
<MdFilledTextField v-model="value" label="Amount" prefix="$" suffix="USD" />
<MdOutlinedTextField v-model="email" label="Email" />
```

## Storybook

Use <a href="/vue-material-3/storybook/?path=/story/components-textfields--filled-text-field" target="_blank" rel="noreferrer">Storybook</a> for text field variants.
