<script setup>
import { ref } from 'vue';
const search = ref('');
</script>

# Search

Search fields help users enter queries and filter content.

<div class="md-doc-preview">
  <MdSearch v-model="search" placeholder="Search trips" />
</div>

## Import

```js
import { MdSearch } from 'vue-material-3';
```

## Usage

```vue
<MdSearch v-model="query" placeholder="Search trips" />
```

## Storybook

Use <a href="/vue-material-3/storybook/?path=/story/components-search--search" target="_blank" rel="noreferrer">Storybook</a> for controls.
