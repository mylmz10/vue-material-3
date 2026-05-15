<script setup>
import { ref } from 'vue';
const primary = ref(0);
const secondary = ref(0);
</script>

# Tabs

Tabs organize content across related views.

<div class="md-doc-preview md-doc-preview--column">
  <div class="md-doc-preview__tabs">
    <MdTabs v-model="primary" aria-label="Primary tabs">
      <MdPrimaryTab panel-id="flights-panel" icon="flight">Flights</MdPrimaryTab>
      <MdPrimaryTab panel-id="trips-panel" icon="luggage">Trips</MdPrimaryTab>
      <MdPrimaryTab panel-id="explore-panel" icon="explore">Explore</MdPrimaryTab>
    </MdTabs>
  </div>
  <div class="md-doc-preview__tabs">
    <MdTabs v-model="secondary" aria-label="Secondary tabs">
      <MdSecondaryTab panel-id="overview-panel">Overview</MdSecondaryTab>
      <MdSecondaryTab panel-id="details-panel">Details</MdSecondaryTab>
    </MdTabs>
  </div>
</div>

## Import

```js
import { MdTabs, MdPrimaryTab, MdSecondaryTab } from 'vue-material-3';
```

## Usage

```vue
<MdTabs v-model="activeIndex">
  <MdPrimaryTab panel-id="flights-panel" icon="flight">Flights</MdPrimaryTab>
</MdTabs>
```

## Storybook

Use <a href="/vue-material-3/storybook/?path=/story/components-tabs--primary-tabs" target="_blank" rel="noreferrer">Storybook</a> for primary and secondary tabs.
