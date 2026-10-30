<script setup>
import { reactive, ref } from 'vue';
import coast from '../../stories/assets/coast.svg';
import MdTimePickerDial from '../../src/components/timepicker/MdTimePickerDial.vue';
import * as components from '../../src/main.js';
const {
  MdBottomSheet,
  MdSideSheet,
  MdNavigationRail,
  MdTopAppBar,
  MdCarousel,
  MdSegmentedButtonSet,
  MdSegmentedButton,
  MdDialog,
  MdNavigationDrawer,
  MdOutlinedAutoComplete,
  MdOutlinedSelect,
  MdSelectOption,
  MdTabs,
  MdPrimaryTab,
  MdSlider,
  MdChipSet,
  MdInputChip,
  MdDatePicker,
  MdOutlinedTextField,
  MdIconButton,
  MdIcon,
  MdCircularProgressIndicator,
  MdLinearProgressIndicator,
  MdRadio,
  MdMenu,
  MdMenuItem,
  MdSubMenu,
} = components;
const state = reactive({
  appbarVariant: 'large',
  bottom: false,
  side: false,
  rail: 0,
  carousel: 0,
  segment: 0,
  dialog: false,
  nested: false,
  drawer: false,
  menu: false,
  text: '',
  selected: 'b',
  tab: 0,
  slider: 20,
  dialHour: 10,
  hour: '10:30',
  chips: ['one', 'two'],
  readonly: false,
  disabled: false,
  error: false,
  progress: 40,
  loading: false,
});
const mounted = ref(true);
window.fixture = { state, mounted, components };
</script>
<template>
  <main>
    <h1>Browser regression fixtures</h1>
    <button id="open-dialog" @click="state.dialog = true">Open dialog</button>
    <button id="open-drawer" @click="state.drawer = true">Open drawer</button>
    <button id="toggle-mount" @click="mounted = !mounted">Toggle fixtures</button>
    <button id="open-bottom" @click="state.bottom = true">Open bottom sheet</button>
    <button id="open-side" @click="state.side = true">Open side sheet</button>
    <MdBottomSheet v-model="state.bottom" headline="Bottom sheet"
      ><p v-for="i in 40" :key="i">Scrollable content {{ i }}</p></MdBottomSheet
    >
    <MdSideSheet modal v-model="state.side" headline="Side sheet"
      ><p v-for="i in 40" :key="i">Scrollable content {{ i }}</p></MdSideSheet
    >
    <section id="new-components">
      <MdTopAppBar
        title="A long application title that must fit on a narrow screen"
        :variant="state.appbarVariant"
        :navigation-icon="'menu'"
        navigation-label="Open navigation"
        :actions="[
          { icon: 'search', label: 'Search' },
          { icon: 'edit', label: 'Edit' },
        ]"
      />
      <MdNavigationRail
        v-model="state.rail"
        :items="[
          { label: 'Home', icon: 'home' },
          { label: 'Library', icon: 'book' },
          { label: 'Settings', icon: 'settings' },
        ]"
      />
      <MdCarousel
        v-model="state.carousel"
        :items="[
          { label: 'First', image: coast },
          { label: 'Second', image: coast },
          { label: 'Third', image: coast },
        ]"
      />
      <MdSegmentedButtonSet v-model="state.segment" :items="[{ label: 'One' }, { label: 'Two' }]"
        ><MdSegmentedButton :value="1" label="One" /><MdSegmentedButton :value="2" label="Two"
      /></MdSegmentedButtonSet>
    </section>
    <section v-if="mounted" id="fixtures">
      <MdDialog v-model="state.dialog" aria-label="Outer dialog">
        <template #header>Dialog</template>
        <button hidden>Hidden target</button>
        <fieldset disabled><button>Disabled target</button></fieldset>
        <button id="nested-open" @click="state.nested = true">Nested dialog</button>
        <button id="outer-last" @click="state.dialog = false">Close outer</button>
        <MdDialog v-model="state.nested" aria-label="Inner dialog"><button id="inner-close" @click="state.nested = false">Close inner</button></MdDialog>
      </MdDialog>
      <MdNavigationDrawer :opened="state.drawer" modal @change="state.drawer = $event" aria-label="Navigation drawer"
        ><button id="drawer-close" @click="state.drawer = false">Close drawer</button></MdNavigationDrawer
      >
      <MdMenu v-model="state.menu"
        ><template #activator="{ onClick, onKeydown }"><button id="menu-open" @click="onClick" @keydown="onKeydown">Menu</button></template><MdMenuItem label="First action" /><MdSubMenu label="More"
          ><MdMenuItem label="Nested action" /></MdSubMenu
      ></MdMenu>
      <section id="autocomplete"><MdOutlinedAutoComplete v-model="state.text" label="City" :items="['Berlin', 'Boston', 'Paris']" :readonly="state.readonly" :disabled="state.disabled" /></section>
      <section id="select">
        <MdOutlinedSelect v-model="state.selected" label="Selection" required
          ><MdSelectOption value="a">Alpha</MdSelectOption><MdSelectOption value="b">Beta</MdSelectOption><MdSelectOption value="c">Gamma</MdSelectOption></MdOutlinedSelect
        >
      </section>
      <MdTabs v-model="state.tab"><MdPrimaryTab label="First" /><MdPrimaryTab label="Second" /></MdTabs>
      <section id="slider"><MdSlider v-model="state.slider" aria-label="Volume" /></section>
      <MdChipSet><MdInputChip v-for="chip in state.chips" :key="chip" :label="chip" removable @remove="state.chips = state.chips.filter((item) => item !== chip)" /></MdChipSet>
      <section id="field">
        <MdOutlinedTextField v-model="state.text" label="Name" required :readonly="state.readonly" :disabled="state.disabled" :error="state.error" error-text="Enter a valid name" />
      </section>
      <MdIconButton aria-label="Favorite" :disabled="state.disabled"><MdIcon>favorite</MdIcon></MdIconButton>
      <MdCircularProgressIndicator :value="state.progress" :indeterminate="state.loading" aria-label="Upload" /><MdLinearProgressIndicator :value="state.progress" :indeterminate="state.loading" />
      <section id="radios"><MdRadio name="fixture-radio" value="a" checked /><MdRadio name="fixture-radio" value="b" /></section>
      <section id="time" class="md-time-picker-dialog"><MdTimePickerDial :hour24="state.dialHour" :minute="30" @select-hour="state.dialHour = $event" /></section>
      <section id="date"><MdDatePicker model-value="2026-10-15" variant="docked" /></section>
    </section>
  </main>
</template>
<style>
body {
  margin: 0;
  background: var(--md-sys-color-surface);
  color: var(--md-sys-color-on-surface);
  font-family: Arial, sans-serif;
}
main {
  padding: 16px;
  max-width: 960px;
  margin: auto;
}
section {
  margin-block: 16px;
}
button {
  font: inherit;
}
</style>
