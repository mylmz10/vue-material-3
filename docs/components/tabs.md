<script setup>
import { ref } from 'vue';
const primary = ref(0);
const secondary = ref(0);
</script>

# Tabs

Tabs organize content across related views.

## Example

<div class="md-doc-preview md-doc-preview--column">
  <div class="md-doc-preview__tabs">
    <MdTabs v-model="primary" aria-label="Primary tabs">
      <MdPrimaryTab id="docs-flights-tab" panel-id="docs-flights-panel" icon="flight">Flights</MdPrimaryTab>
      <MdPrimaryTab id="docs-trips-tab" panel-id="docs-trips-panel" icon="luggage">Trips</MdPrimaryTab>
      <MdPrimaryTab id="docs-explore-tab" panel-id="docs-explore-panel" icon="explore">Explore</MdPrimaryTab>
    </MdTabs>
    <section id="docs-flights-panel" role="tabpanel" aria-labelledby="docs-flights-tab" :hidden="primary !== 0" tabindex="0">Flights content</section>
    <section id="docs-trips-panel" role="tabpanel" aria-labelledby="docs-trips-tab" :hidden="primary !== 1" tabindex="0">Trips content</section>
    <section id="docs-explore-panel" role="tabpanel" aria-labelledby="docs-explore-tab" :hidden="primary !== 2" tabindex="0">Explore content</section>
  </div>
  <div class="md-doc-preview__tabs">
    <MdTabs v-model="secondary" aria-label="Secondary tabs">
      <MdSecondaryTab id="docs-overview-tab" panel-id="docs-overview-panel">Overview</MdSecondaryTab>
      <MdSecondaryTab id="docs-details-tab" panel-id="docs-details-panel">Details</MdSecondaryTab>
    </MdTabs>
    <section id="docs-overview-panel" role="tabpanel" aria-labelledby="docs-overview-tab" :hidden="secondary !== 0" tabindex="0">Overview content</section>
    <section id="docs-details-panel" role="tabpanel" aria-labelledby="docs-details-tab" :hidden="secondary !== 1" tabindex="0">Details content</section>
  </div>
</div>

## Import

```js
import { MdTabs, MdPrimaryTab, MdSecondaryTab } from 'vue-material-3';
```

## Usage

```vue
<script setup>
import { ref } from 'vue';
import { MdTabs, MdPrimaryTab, MdSecondaryTab } from 'vue-material-3';
const activeIndex = ref(0);
</script>

<template>
  <MdTabs v-model="activeIndex" aria-label="Trip views">
    <MdPrimaryTab id="example-flights-tab" panel-id="example-flights-panel" icon="flight">Flights</MdPrimaryTab>
    <MdPrimaryTab id="example-trips-tab" panel-id="example-trips-panel" icon="luggage">Trips</MdPrimaryTab>
  </MdTabs>
  <section id="example-flights-panel" role="tabpanel" aria-labelledby="example-flights-tab" :hidden="activeIndex !== 0" tabindex="0">Available flights</section>
  <section id="example-trips-panel" role="tabpanel" aria-labelledby="example-trips-tab" :hidden="activeIndex !== 1" tabindex="0">Saved trips</section>
</template>
```

## API

### Props

| Prop                  | Default        | Description                                              |
| --------------------- | -------------- | -------------------------------------------------------- |
| `MdTabs.modelValue`   | `undefined`    | Selected tab index.                                      |
| `activationMode`      | `'auto'`       | `auto` selects on focus; `manual` selects on activation. |
| `orientation`         | `'horizontal'` | Horizontal or vertical keyboard navigation.              |
| `loop`                | `true`         | Wrap arrow-key focus at the ends.                        |
| `panelId`             | `undefined`    | On a tab: ID of its associated content panel.            |
| `disabled / selected` | `false`        | On a tab: disabled or initial selected state.            |

### Events

`MdTabs` emits `update:modelValue(index)` and `change({ index, reason })`. Individual tabs emit `click` and `focus`.

### Slots

`MdTabs.default` holds primary or secondary tabs. Each tab uses `default` for its label.

## Storybook

Explore variants and controls in [Storybook](https://mylmz10.github.io/vue-material-3/storybook/?path=/story/components-tabs--primary-tabs).
