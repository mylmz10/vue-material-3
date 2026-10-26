<script setup>
import { ref } from 'vue';
const filled = ref('');
const outlined = ref('');
</script>

# Text Field

Text fields let users enter and edit text.

<div class="md-doc-preview">
  <MdFilledTextField v-model="filled" class="md-doc-preview__field" label="Filled label" supporting-text="Supporting text" prefix="$" suffix="USD" />
  <MdOutlinedTextField v-model="outlined" class="md-doc-preview__field" label="Outlined label" supporting-text="Supporting text" prefix="@" suffix=".com" />
</div>

## Import

```js
import { MdFilledTextField, MdOutlinedTextField } from 'vue-material-3';
```

## Usage

```vue
<MdFilledTextField v-model="value" label="Amount" prefix="$" suffix="USD" />
<MdOutlinedTextField v-model="email" label="Email" />
```

## Value precedence

A supplied `v-model` takes precedence over the legacy `value` prop, including `''`, `0`, and `null` (displayed as empty). When the model is absent (`undefined`), `value` initializes the input and remains reactive. Form reset restores the initial resolved value unless the reset event is canceled.

## Accessibility

The visible label names the native input, and supporting/error text is linked as its description. Input IDs are generated when omitted. Consumer `id`, ARIA and other control attributes are forwarded to the input; `class` and `style` stay on the wrapper. An external `aria-describedby` is combined with the field description. The same forwarding applies to autocomplete and date/time picker fields.

## Storybook

Use <a href="/vue-material-3/storybook/?path=/story/components-textfields--filled-text-field" target="_blank" rel="noreferrer">Storybook</a> for text field variants.
