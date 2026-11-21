<script setup>
import { ref } from 'vue';

const scales = [0, -1, -2, -3];
const name = ref('Ada');
const city = ref('ankara');
const query = ref('');
const place = ref('Ankara');
const places = ['Istanbul', 'Ankara', 'Izmir'];
</script>

# Density

`--md-sys-density-scale` tightens the containers that are meant to compress. Set it on any ancestor. `0` is the default size. `-1`, `-2`, and `-3` each remove 4px of height. Text, icons, and horizontal padding stay the same. The value is clamped to `-3` through `0`.

```html
<section style="--md-sys-density-scale: -2">
  <!-- Controls inside this section are two steps denser. -->
</section>
```

A denser control can be shorter than 48px. Keep the control that changes this setting at scale `0`. Search stops at 48px, so `-2` and `-3` look the same. Menus, dialogs, snackbars, sheets, FABs, and navigation chrome do not change.

## Compare

<div class="density-board">
  <section v-for="scale in scales" :key="scale" class="density-column" :style="{ '--md-sys-density-scale': scale }">
    <h2>Scale {{ scale }}</h2>
    <MdFilledButton label="Save" />
    <div class="density-row">
      <MdIconButton type="button" icon="favorite" aria-label="Favorite" />
      <MdFilterChip label="Filter" />
    </div>
    <MdList style="width: 100%; min-width: 0">
      <MdListItem headline="Inbox" icon="inbox" />
      <MdListItem headline="Trips" supporting-text="Next week" :supporting-text-multiline="2" icon="luggage" />
    </MdList>
    <MdFilledTextField v-model="name" label="Name" />
    <MdOutlinedTextField v-model="name" label="Name" />
    <MdFilledSelect v-model="city" label="City">
      <MdSelectOption value="ankara">Ankara</MdSelectOption>
      <MdSelectOption value="izmir">Izmir</MdSelectOption>
    </MdFilledSelect>
    <MdOutlinedAutoComplete v-model="place" label="Place" :items="places" />
    <MdSearch v-model="query" placeholder="Search" />
    <MdTabs :model-value="0" aria-label="Density tabs">
      <MdPrimaryTab icon="flight">Flights</MdPrimaryTab>
      <MdPrimaryTab>Trips</MdPrimaryTab>
    </MdTabs>
    <MdSegmentedButtonSet :model-value="0" :items="[{ label: 'Day' }, { label: 'Week' }]" />
  </section>
</div>

<style>
.density-board {
  display: grid;
  grid-template-columns: repeat(4, minmax(220px, 1fr));
  gap: 16px;
  margin: 24px 0;
  overflow-x: auto;
}

.density-column {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.density-column h2 {
  margin: 0;
  font-size: 14px;
}

.density-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.density-column :where(.md-filled-text-field, .md-outlined-text-field, .md-filled-select, .md-autocomplete, .search-wrapper, .md-tabs) {
  width: 100%;
}
</style>
