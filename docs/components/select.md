<script setup>
import { ref } from 'vue';
const filledCity = ref('istanbul');
const outlinedCity = ref('ankara');
</script>

# Select

Selects let users choose one value from a menu.

<div class="md-doc-preview">
  <MdFilledSelect v-model="filledCity" class="md-doc-preview__field" label="Filled city" supporting-text="Please select one city">
    <MdSelectOption value="">Select city</MdSelectOption>
    <MdSelectOption value="istanbul" display-text="Istanbul (TR)">Istanbul</MdSelectOption>
    <MdSelectOption value="ankara">Ankara</MdSelectOption>
    <MdSelectOption value="izmir" disabled>Izmir (disabled)</MdSelectOption>
  </MdFilledSelect>
  <MdOutlinedSelect v-model="outlinedCity" class="md-doc-preview__field" label="Outlined city" supporting-text="Please select one city">
    <MdSelectOption value="">Select city</MdSelectOption>
    <MdSelectOption value="istanbul" display-text="Istanbul (TR)">Istanbul</MdSelectOption>
    <MdSelectOption value="ankara">Ankara</MdSelectOption>
    <MdSelectOption value="izmir" disabled>Izmir (disabled)</MdSelectOption>
  </MdOutlinedSelect>
</div>

## Import

```js
import { MdFilledSelect, MdOutlinedSelect, MdSelectOption } from 'vue-material-3';
```

## Usage

```vue
<MdOutlinedSelect v-model="city" label="City">
  <MdSelectOption value="istanbul">Istanbul</MdSelectOption>
  <MdSelectOption value="ankara">Ankara</MdSelectOption>
</MdOutlinedSelect>
```

## Storybook

Use <a href="/vue-material-3/storybook/?path=/story/components-select--filled-select" target="_blank" rel="noreferrer">Storybook</a> for select variants.
