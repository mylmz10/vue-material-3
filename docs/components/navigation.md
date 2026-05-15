<script setup>
import { ref } from 'vue';
const activeNav = ref(0);
const navItems = [
  { label: 'Flights', activeIcon: 'flight' },
  { label: 'Trips', activeIcon: 'luggage' },
  { label: 'Explore', activeIcon: 'explore' },
];
</script>

# Navigation

Navigation components help users move between top-level destinations.

<div class="md-doc-preview md-doc-preview--column">
  <div class="md-doc-preview__nav">
    <MdNavigationBar v-model="activeNav" :items="navItems" />
  </div>
  <div class="md-doc-preview__drawer">
    <MdNavigationDrawer opened>
      <MdList>
        <MdListItem headline="Inbox" icon="inbox" selected />
        <MdListItem headline="Starred" icon="star" />
        <MdListItem headline="Sent" icon="send" />
      </MdList>
    </MdNavigationDrawer>
  </div>
  <div class="md-doc-preview__surface">
    <MdNavigationTab label="Flights" active-icon="flight" selected />
  </div>
</div>

## Import

```js
import { MdNavigationBar, MdNavigationDrawer, MdNavigationTab } from 'vue-material-3';
```

## Usage

```vue
<MdNavigationBar v-model="activeIndex" :items="items" />
```

## Storybook

Use <a href="/vue-material-3/storybook/?path=/story/components-navigationbar--navigation-bar" target="_blank" rel="noreferrer">Storybook</a> for navigation examples.
