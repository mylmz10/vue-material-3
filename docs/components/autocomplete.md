<script setup>
import { ref } from 'vue';
const filledCity = ref('');
const outlinedCity = ref('');
const cities = ['Istanbul', 'Ankara', 'Izmir', 'Antalya', 'Bursa', 'Eskisehir'];
</script>

# Autocomplete

Autocomplete fields help users choose from suggested values while typing.

<div class="md-doc-preview">
  <MdFilledAutoComplete v-model="filledCity" class="md-doc-preview__field" label="Filled city" :items="cities" />
  <MdOutlinedAutoComplete v-model="outlinedCity" class="md-doc-preview__field" label="Outlined city" :items="cities" />
</div>

## Import

```js
import { MdFilledAutoComplete, MdOutlinedAutoComplete } from 'vue-material-3';
```

## Usage

```vue
<MdFilledAutoComplete v-model="city" label="City" :items="cities" />
<MdOutlinedAutoComplete v-model="city" label="City" :items="cities" />
```

## Storybook

Use <a href="/vue-material-3/storybook/?path=/story/components-autocomplete--filled-auto-complete" target="_blank" rel="noreferrer">Storybook</a> for autocomplete variants.
