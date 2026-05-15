<script setup>
import { ref } from 'vue';
const filledDate = ref('2026-03-14');
const outlinedDate = ref('2026-03-14');
</script>

# Date Picker

Date pickers let users enter or select dates.

<div class="md-doc-preview">
  <MdFilledDatePickerField v-model="filledDate" class="md-doc-preview__field" label="Filled date" picker-variant="modal" />
  <MdOutlinedDatePickerField v-model="outlinedDate" class="md-doc-preview__field" label="Outlined date" picker-variant="modal" />
</div>

## Import

```js
import { MdFilledDatePickerField, MdOutlinedDatePickerField, MdDatePicker } from 'vue-material-3';
```

## Usage

```vue
<MdOutlinedDatePickerField v-model="date" label="Date" picker-variant="modal" />
```

## Storybook

Use <a href="/vue-material-3/storybook/?path=/story/components-datepicker--outlined-field-playground" target="_blank" rel="noreferrer">Storybook</a> for date picker variants and range selection.
