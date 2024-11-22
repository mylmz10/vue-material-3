<template>
  <Transition>
    <div v-if="modelValue" class="md-snackbar" :class="{ 'md-snackbar--multiline': multiLine, 'md-snackbar--longer-action': longerAction }">
      <div class="md-snackbar__supporting-text">
        Two-line snackbar with <br />
        longer action and close affordance
      </div>
      <div v-if="actionText" class="md-snackbar__action-text">
        <div class="md-snackbar__state-layer"></div>
        <span @click="onActionClick">{{ actionText }}</span>
      </div>
      <div class="md-snackbar__actions" @click="close">
        <MdIcon class="md-snackbar__icon">close</MdIcon>
        <div class="md-snackbar__state-layer"></div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { onMounted } from 'vue';
import MdIcon from '../icon/MdIcon.vue';

const { timeout, multiLine, modelValue } = defineProps({
  timeout: {
    type: Number,
    default: 20000,
  },
  multiLine: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
  actionText: {
    type: String,
  },
  longerAction: {
    type: Boolean,
  },
});

const emit = defineEmits(['update:modelValue', 'action']);

const close = () => {
  emit('update:modelValue', false);
};
const onActionClick = ($event) => {
  emit('action', $event);
};
onMounted(() => {
  setTimeout(() => {
    close();
  }, timeout);
});
</script>

<style lang="scss">
@use 'sass:map';
@use '../../styles/tokens';
@use '../ripple/ripple';
@use '../elevation/elevation';

$theme: tokens.md-comp-snackbar-values();

.md-snackbar {
  position: fixed;
  z-index: 100;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  box-sizing: content-box;
  line-height: map.get($theme, supporting-text-line-height);

  background-color: map.get($theme, container-color);
  border-radius: map.get($theme, container-shape);
  height: map.get($theme, with-single-line-container-height);

  max-width: 672px;
  min-width: 344px;
  overflow: hidden;
  padding: 0;

  box-shadow: elevation.resolve-box-shadow(map.get($theme, container-elevation), map.get($theme, container-shadow-color));

  $this: &;

  &__state-layer {
    border-radius: inherit;
    height: 100%;
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    z-index: -1;
  }

  &--multiline {
    height: map.get($theme, with-two-lines-container-height);
  }

  &__actions {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin: 0 12px;
    width: calc(#{map.get($theme, icon-size)} * 1.5);
    height: calc(#{map.get($theme, icon-size)} * 1.5);
    border-radius: 24px;
    cursor: pointer;
    user-select: none;

    #{$this}__icon {
      color: map.get($theme, icon-color);
      width: map.get($theme, icon-size);
      height: map.get($theme, icon-size);
    }

    #{$this}__icon:hover {
      color: map.get($theme, icon-hover-icon-color);
    }

    #{$this}__icon:hover ~ #{$this}__state-layer {
      background-color: map.get($theme, icon-hover-state-layer-color);
      opacity: map.get($theme, icon-hover-state-layer-opacity);
    }

    #{$this}__icon:active ~ #{$this}__state-layer {
      background-color: map.get($theme, icon-pressed-state-layer-color);
      opacity: map.get($theme, icon-pressed-state-layer-opacity);
    }
  }

  &__action-text {
    color: map.get($theme, action-label-text-color);
    font-size: map.get($theme, action-label-text-size);
    line-height: map.get($theme, action-label-text-line-height);
    font-family: map.get($theme, action-label-text-font);
    position: relative;
    padding: 8px 12px;
    border-radius: 24px;
    cursor: pointer;
    user-select: none;

    &:hover {
      #{$this}__state-layer {
        opacity: map.get($theme, action-hover-state-layer-opacity);
        color: map.get($theme, action-hover-label-text-color);
        background-color: map.get($theme, action-hover-state-layer-color);
      }
    }
    &:active {
      #{$this}__state-layer {
        opacity: map.get($theme, action-pressed-state-layer-opacity);
        color: map.get($theme, action-pressed-label-text-color);
        background-color: map.get($theme, action-pressed-state-layer-color);
      }
    }
  }

  &__supporting-text {
    color: map.get($theme, supporting-text-color);
    font-size: map.get($theme, supporting-text-size);
    margin-left: 16px;
    margin-right: 16px;
    flex-grow: 1;
  }

  &--longer-action {
    flex-wrap: wrap;
    padding: 12px 0 6px 0;
    height: auto;

    .md-snackbar__supporting-text {
      width: 100%;
    }

    .md-snackbar__action-text {
      margin-left: auto;
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
