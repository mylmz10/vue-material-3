<script setup>
import { ref } from 'vue';
const selectedChip = ref(1);
const removed = ref(false);
</script>

# Chips

Chips represent compact actions, filters, inputs, and suggestions.

<div class="md-doc-preview md-doc-preview--column">
  <div class="md-doc-preview__row">
    <MdAssistChip label="Assist" leading-icon="schedule" />
    <MdSuggestionChip label="Suggestion" leading-icon="lightbulb" />
    <MdFilterChip label="Filter" selected />
    <MdInputChip v-if="!removed" label="Input" removable @remove="removed = true" />
  </div>
  <MdChipSet v-model="selectedChip" selection-mode="single">
    <MdFilterChip label="Day" :value="1" />
    <MdFilterChip label="Week" :value="2" />
    <MdFilterChip label="Month" :value="3" />
  </MdChipSet>
</div>

## Import

```js
import { MdAssistChip, MdChipSet, MdFilterChip, MdInputChip, MdSuggestionChip } from 'vue-material-3';
```

## Usage

```vue
<MdChipSet v-model="selectedChip" selection-mode="single">
  <MdFilterChip label="Day" :value="1" />
  <MdFilterChip label="Week" :value="2" />
</MdChipSet>
```

## Storybook

Use <a href="/vue-material-3/storybook/?path=/story/components-chips--assist-chip" target="_blank" rel="noreferrer">Storybook</a> for chip variants.
