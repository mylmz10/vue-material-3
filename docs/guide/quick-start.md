# Quick Start

After [installing the package, styles, and fonts](/guide/installation), import the components you need into a Vue single-file component.

## Usage

```vue
<script setup>
import { ref } from 'vue';
import { MdFilledButton, MdOutlinedTextField } from 'vue-material-3';
import 'vue-material-3/style.css';

const name = ref('');
const savedName = ref('');
</script>

<template>
  <MdOutlinedTextField v-model="name" label="Name" />
  <MdFilledButton label="Save" @click="savedName = name" />
  <p role="status">Saved name: {{ savedName }}</p>
</template>
```

The stylesheet can instead be imported once in your application entry. `v-model` keeps the field and the parent state in sync.

## Explore components

Component pages include a live example, imports, complete basic usage, and an API summary. Storybook adds more variants and interactive Controls. Use the component page for the written contract and Storybook to explore visual states.

## Related documentation

- [Components](/components/)
- [API Reference](/api/)
- [Theming](/guide/theming)
- [Storybook](https://mylmz10.github.io/vue-material-3/storybook/)
