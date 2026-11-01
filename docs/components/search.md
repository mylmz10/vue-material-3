<script setup>
import { ref } from 'vue';
const search = ref('');
</script>

# Search

Search fields help users enter queries and filter content.

## Example

<div class="md-doc-preview">
  <MdSearch v-model="search" placeholder="Search trips" />
</div>

## Import

```js
import { MdSearch } from 'vue-material-3';
```

## Usage

```vue
<script setup>
import { ref } from 'vue';
import { MdSearch } from 'vue-material-3';
const query = ref('');
</script>

<template>
  <MdSearch v-model="query" placeholder="Search trips" />
</template>
```

## API

### Props

| Prop                  | Default          | Description                                  |
| --------------------- | ---------------- | -------------------------------------------- |
| `modelValue`          | `''`             | Search text; bind with `v-model`.            |
| `placeholder`         | `'Search...'`    | Placeholder text.                            |
| `disabled / readonly` | `false`          | Prevent editing.                             |
| `showAvatar`          | `false`          | Display the avatar slot.                     |
| `trailingLabel`       | `'Voice search'` | Accessible label of the voice-search action. |

### Events

`update:modelValue(text)` reports edits; `searchClick` reports search-icon activation; `trailingClick` reports `close` or `mic`.

### Slots

`avatar` supplies avatar content; `trailing` receives `{ icon, dirty }`.

## Storybook

Explore variants and controls in [Storybook](https://mylmz10.github.io/vue-material-3/storybook/?path=/story/components-search--search).
