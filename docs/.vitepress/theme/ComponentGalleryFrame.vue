<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { withBase } from 'vitepress';
import ColorPalette from './ColorPalette.vue';

const frame = ref(null);
let themeObserver;
let sizeObserver;
let renderObserver;

function disconnectObservers() {
  themeObserver?.disconnect();
  sizeObserver?.disconnect();
  renderObserver?.disconnect();
}

function connectFrame() {
  disconnectObservers();
  const frameDocument = frame.value?.contentDocument;
  if (!frameDocument || frameDocument.URL === 'about:blank') return;

  const preview = frameDocument.querySelector('.gallery-window');
  if (!preview) {
    // The preview can finish loading before VitePress renders its client content.
    renderObserver = new MutationObserver(() => {
      if (frameDocument.querySelector('.gallery-window')) connectFrame();
    });
    renderObserver.observe(frameDocument, { childList: true, subtree: true });
    return;
  }

  const docsRoot = document.documentElement;
  const previewRoot = frameDocument.documentElement;
  function syncTheme() {
    previewRoot.classList.toggle('dark', docsRoot.classList.contains('dark'));
    previewRoot.toggleAttribute('data-docs-palette', docsRoot.hasAttribute('data-docs-palette'));
    for (const token of ['--docs-palette-hue', '--docs-palette-chroma']) {
      previewRoot.style.setProperty(token, docsRoot.style.getPropertyValue(token));
    }
  }

  function syncHeight() {
    frame.value.style.height = Math.ceil(preview.getBoundingClientRect().height) + 'px';
  }

  syncTheme();
  syncHeight();
  themeObserver = new MutationObserver(syncTheme);
  themeObserver.observe(docsRoot, { attributes: true, attributeFilter: ['class', 'data-docs-palette', 'style'] });
  sizeObserver = new ResizeObserver(syncHeight);
  sizeObserver.observe(preview);
}

onMounted(connectFrame);
onBeforeUnmount(disconnectObservers);
</script>

<template>
  <section class="component-gallery" aria-labelledby="component-gallery-title">
    <div class="gallery-intro">
      <h2 id="component-gallery-title">Component Gallery</h2>
      <p>Explore Material 3 components in an interactive orders dashboard.</p>
      <ColorPalette inline />
    </div>
    <iframe ref="frame" :src="withBase('/gallery-preview')" title="Interactive orders dashboard" loading="lazy" @load="connectFrame" />
  </section>
</template>

<style scoped>
.component-gallery {
  margin-block: 56px;
  color: var(--md-sys-color-on-surface);
}

.gallery-intro {
  margin-bottom: 24px;
  text-align: center;
}

.gallery-intro h2 {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: clamp(28px, 4vw, 40px);
  line-height: 1.2;
}

.gallery-intro p {
  margin: 12px 0 20px;
  color: var(--md-sys-color-on-surface-variant);
}

iframe {
  display: block;
  width: 100%;
  height: 720px;
  border: 0;
  border-radius: 24px;
}
</style>
