<script setup>
import { ref } from 'vue';
const search = ref('');
</script>

# Search

Search fields help users enter queries and filter content.

<div class="md-doc-preview">
  <MdSearch v-model="search" placeholder="Search components" supporting-text="Press Enter to search" show-avatar trailing-icon="close">
    <template #avatar>
      <MdAvatar initials="VM" />
    </template>
  </MdSearch>
</div>

## Import

```js
import { MdSearch } from 'vue-material-3';
```

## Usage

```vue
<MdSearch v-model="query" placeholder="Search components" />
```

## Storybook

Use <a href="/vue-material-3/storybook/?path=/story/components-search--search" target="_blank" rel="noreferrer">Storybook</a> for controls.
