<script setup>
import { ref } from 'vue';
const selected = ref(1);
</script>

# Segmented Button

Segmented buttons let users select from a small set of related options.

<div class="md-doc-preview">
  <MdSegmentedButtonSet v-model="selected" :items="[{ label: 'Day' }, { label: 'Week' }, { label: 'Month' }]" />
</div>

## Import

```js
import { MdSegmentedButton, MdSegmentedButtonSet } from 'vue-material-3';
```

## Usage

```vue
<MdSegmentedButtonSet v-model="selected" :items="items" />
```

## Storybook

Use <a href="/vue-material-3/storybook/?path=/story/components-segmented-button--segmented-button-set" target="_blank" rel="noreferrer">Storybook</a> for single and multi-select modes.
