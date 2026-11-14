<script setup>
import { onMounted, shallowRef } from 'vue';
import MdMenu from '../../../src/components/menu/MdMenu.vue';
import MdMenuItem from '../../../src/components/menu/MdMenuItem.vue';

const palettes = [
  { name: 'Original', color: '#6750a4' },
  { name: 'Mulberry', hue: 335, chroma: 0.15 },
  { name: 'Raspberry', hue: 357, chroma: 0.17 },
  { name: 'Carmine', hue: 14, chroma: 0.17 },
  { name: 'Brick', hue: 32, chroma: 0.13 },
  { name: 'Terracotta', hue: 47, chroma: 0.14 },
  { name: 'Amber', hue: 70, chroma: 0.13 },
  { name: 'Goldenrod', hue: 92, chroma: 0.12 },
  { name: 'Olive', hue: 113, chroma: 0.11 },
  { name: 'Fern', hue: 136, chroma: 0.13 },
  { name: 'Pine', hue: 155, chroma: 0.12 },
  { name: 'Jade', hue: 174, chroma: 0.1 },
  { name: 'Lagoon', hue: 193, chroma: 0.1 },
  { name: 'Glacier', hue: 212, chroma: 0.1 },
  { name: 'Cerulean', hue: 234, chroma: 0.13 },
  { name: 'Cobalt', hue: 255, chroma: 0.17 },
  { name: 'Iris', hue: 274, chroma: 0.17 },
  { name: 'Orchid', hue: 312, chroma: 0.15 },
  { name: 'Slate', hue: 245, chroma: 0.04 },
  { name: 'Walnut', hue: 57, chroma: 0.06 },
];
const storageKey = 'vue-material-3-docs-palette';
const selected = shallowRef(palettes[0]);
const swatch = ({ color, hue, chroma }) => color ?? `oklch(58% ${chroma} ${hue})`;

function applyPalette(palette) {
  selected.value = palette;
  const root = document.documentElement;
  root.toggleAttribute('data-docs-palette', palette !== palettes[0]);
  if (palette === palettes[0]) {
    root.style.removeProperty('--docs-palette-hue');
    root.style.removeProperty('--docs-palette-chroma');
  } else {
    root.style.setProperty('--docs-palette-hue', palette.hue);
    root.style.setProperty('--docs-palette-chroma', palette.chroma);
  }
}

function selectPalette(palette) {
  applyPalette(palette);
  try {
    localStorage.setItem(storageKey, palette.name);
  } catch {
    // The current page still uses the selected palette when storage is unavailable.
  }
}

onMounted(() => {
  try {
    const saved = palettes.find(({ name }) => name === localStorage.getItem(storageKey));
    if (saved) applyPalette(saved);
  } catch {
    // Keep the default palette when storage is unavailable.
  }
});
</script>

<template>
  <MdMenu class="docs-palette">
    <template #activator="{ onClick, onKeydown, ariaExpanded, ariaHaspopup }">
      <button
        class="docs-palette__trigger"
        type="button"
        :aria-label="`Color palette, ${selected.name} selected`"
        title="Color palette"
        :aria-expanded="ariaExpanded"
        :aria-haspopup="ariaHaspopup"
        @click="onClick"
        @keydown="onKeydown"
      >
        <span class="material-symbols-outlined" aria-hidden="true">palette</span>
      </button>
    </template>
    <MdMenuItem
      v-for="palette in palettes"
      :key="palette.name"
      :label="palette.name"
      :selected="palette === selected"
      role="menuitemradio"
      :aria-checked="palette === selected"
      @click="selectPalette(palette)"
    >
      <template #start>
        <span class="docs-palette__swatch" :style="{ backgroundColor: swatch(palette) }" aria-hidden="true"></span>
      </template>
    </MdMenuItem>
  </MdMenu>
</template>

<style scoped>
.docs-palette {
  margin-inline: 4px;
  pointer-events: auto;
}
.docs-palette > :deep(.md-menu__content) {
  inset-inline: auto 0;
  max-block-size: calc(100dvh - var(--vp-nav-height) - 12px);
  overflow: auto;
}
.docs-palette__trigger {
  display: grid;
  place-items: center;
  inline-size: 44px;
  block-size: 44px;
  border-radius: 50%;
  color: var(--vp-c-text-1);
}
.docs-palette__trigger:hover,
.docs-palette__trigger[aria-expanded='true'] {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}
.docs-palette__trigger:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: -2px;
}
.docs-palette__swatch {
  display: block;
  inline-size: 18px;
  block-size: 18px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 50%;
}
</style>
