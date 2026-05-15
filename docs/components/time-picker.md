<script setup>
import { ref } from 'vue';
const filledTime = ref('07:00');
const outlinedTime = ref('18:30');
</script>

# Time Picker

Time pickers let users enter or select a time.

<div class="md-doc-preview">
  <MdFilledTimePickerField v-model="filledTime" class="md-doc-preview__field" label="Filled time" />
  <MdOutlinedTimePickerField v-model="outlinedTime" class="md-doc-preview__field" label="Outlined time" />
</div>

## Import

```js
import { MdFilledTimePickerField, MdOutlinedTimePickerField, MdTimePicker } from 'vue-material-3';
```

## Usage

```vue
<MdOutlinedTimePickerField v-model="time" label="Time" />
```

## Storybook

Use <a href="/vue-material-3/storybook/?path=/story/components-timepicker--outlined-field-playground" target="_blank" rel="noreferrer">Storybook</a> for time picker modes.
