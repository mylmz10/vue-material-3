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

## Keyboard removal

Focused removable chips accept Delete or Backspace. The forward horizontal arrow moves from the chip to its remove button, and the reverse arrow returns to the chip (Right/Left in LTR; Left/Right in RTL). Enter or Space on the remove button emits `remove`; disabled and soft-disabled chips cannot remove.

Inside `MdChipSet`, removing a focused chip moves focus to the next enabled chip, then the previous one if needed. If no enabled chips remain, focus stays on the set. The parent still owns removing the chip from its data; focus is retained if removal is declined. For standalone chips, the parent should move focus to the appropriate input or control after removal. See the [M3 chip accessibility guidance](https://m3.material.io/components/chips/accessibility).

## Storybook

Use <a href="/vue-material-3/storybook/?path=/story/components-chips--assist-chip" target="_blank" rel="noreferrer">Storybook</a> for chip variants.
