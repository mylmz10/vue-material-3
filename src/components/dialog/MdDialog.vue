<template>
  <Transition>
    <dialog v-if="_open" class="md-modal" :class="{ 'md-modal--open': _open }" @close="handleDialogDismiss" @cancel="handleDialogDismiss" @click="handleDialogClick">
      <div class="md-modal__container">
        <div class="md-modal__header">
          <slot name="header" />
        </div>
        <div class="md-modal__content">
          <slot />
        </div>
        <div class="md-modal__footer">
          <slot name="footer" />
        </div>
        <MdElevationOverlay />
      </div>
    </dialog>
  </Transition>
</template>

<script setup>
import MdElevationOverlay from '../elevation/MdElevationOverlay.vue';
import { watch, onMounted, ref } from 'vue';

const _open = ref(false);

const props = defineProps({
  modelValue: {
    type: Boolean,
  },
});

const emit = defineEmits(['update:modelValue']);

const close = () => {
  _open.value = false;
  emit('update:modelValue', false);
};

const handleDialogDismiss = () => {
  console.log('handleDialogDismiss');
};
const handleDialogClick = (e) => {
  if (!e.composedPath().includes(document.querySelector('.md-modal__container'))) {
    close();
  }
};

onMounted(() => {
  if (props.modelValue) {
    document.body.style.overflow = 'hidden';
  }
});

watch(
  () => props.modelValue,
  (newValue) => {
    _open.value = newValue;
    document.body.style.overflow = newValue ? 'hidden' : '';
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.4s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>

<style lang="scss">
@use 'sass:map';
@use '../../styles/tokens';
@use '../ripple/ripple';

$theme: tokens.md-comp-dialog-values();

.md-modal {
  position: fixed;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  inset: 0px;
  block-size: 100vh;
  inline-size: 100vw;
  max-block-size: 100vh;
  max-inline-size: 100vw;
  border: none;
  background: rgba(0, 0, 0, 0);
  padding: 0px;
  margin: 0px;
  overflow: clip;
  z-index: 1000;
  display: none;

  --overlay-z-index: 1;
  --overlay-opacity: 0.14;
  --surface-tint-layer-color: #{map.get($theme, container-surface-tint-layer-color)};

  $this: &;

  &:before {
    content: '';
    position: absolute;
    z-index: -1;
    inset: 0px;
    block-size: 100vh;
    inline-size: 100vw;
    pointer-events: none;
  }

  &__container {
    position: absolute;
    background-color: map.get($theme, 'container-color');
    border-radius: map.get($theme, 'container-shape');
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    pointer-events: auto;
    min-block-size: 140px;
    max-block-size: min(560px, calc(100% - 48px));
    min-inline-size: 280px;
    max-inline-size: min(560px, calc(100% - 48px));
    padding-block-start: 24px;
    padding-block-end: 24px;
    -webkit-font-smoothing: antialiased;

    #{$this}__header {
      padding-inline-start: 24px;
      padding-inline-end: 24px;
      color: map.get($theme, headline-color);
      font-size: map.get($theme, headline-size);
      font-family: map.get($theme, headline-font);
      letter-spacing: map.get($theme, headline-tracking);
      line-height: map.get($theme, headline-line-height);
    }
    #{$this}__content {
      padding-inline-start: 24px;
      padding-inline-end: 24px;
      margin-block-start: 16px;
      margin-block-end: 24px;
      color: map.get($theme, supporting-text-color);
      font-size: map.get($theme, supporting-text-size);
      font-family: map.get($theme, supporting-text-font);
      letter-spacing: map.get($theme, supporting-text-tracking);
      line-height: map.get($theme, supporting-text-line-height);
    }
    #{$this}__footer {
      padding-inline-start: 24px;
      padding-inline-end: 24px;
      display: flex;
      position: relative;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-end;
    }
  }

  &--open {
    display: flex;
    &:before {
      background-color: rgba(0, 0, 0, 0.32);
    }
  }
}
</style>
