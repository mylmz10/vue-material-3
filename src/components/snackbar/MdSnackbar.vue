<template>
  <div class="md-snackbar__announcement" role="status" aria-live="polite" aria-atomic="true">{{ announcement }}</div>
  <Transition>
    <div v-if="modelValue" v-bind="$attrs" class="md-snackbar" :class="{ 'md-snackbar--multiline': multiLine, 'md-snackbar--longer-action': longerAction }">
      <div ref="messageEl" class="md-snackbar__supporting-text">
        <slot>{{ text }}</slot>
      </div>
      <button v-if="actionText" type="button" class="md-snackbar__action-text" @click="onActionClick">
        <div class="md-snackbar__state-layer"></div>
        {{ actionText }}
      </button>
      <button type="button" class="md-snackbar__actions" aria-label="Close snackbar" @click="close">
        <MdIcon class="md-snackbar__icon">close</MdIcon>
        <div class="md-snackbar__state-layer"></div>
      </button>
    </div>
  </Transition>
</template>

<script setup>
import { nextTick, onBeforeUnmount, ref, watch } from 'vue';
import MdIcon from '../icon/MdIcon.vue';

defineOptions({ inheritAttrs: false });

const props = defineProps({
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
  text: {
    type: String,
    default: '',
  },
  longerAction: {
    type: Boolean,
  },
});

const emit = defineEmits(['update:modelValue', 'action']);

const messageEl = ref(null);
const announcement = ref('');
let messageObserver;
const updateAnnouncement = () => {
  announcement.value = props.modelValue ? messageEl.value?.textContent?.trim() || '' : '';
};
watch(
  [messageEl, () => props.modelValue],
  ([element]) => {
    messageObserver?.disconnect();
    if (element) {
      messageObserver = new MutationObserver(updateAnnouncement);
      messageObserver.observe(element, { childList: true, characterData: true, subtree: true });
    }
    if (!props.modelValue) announcement.value = '';
    else nextTick(updateAnnouncement);
  },
  { flush: 'post' }
);

const close = () => {
  emit('update:modelValue', false);
};
const onActionClick = ($event) => {
  emit('action', $event);
};

let closeTimer;

const clearCloseTimer = () => {
  if (closeTimer) {
    clearTimeout(closeTimer);
    closeTimer = undefined;
  }
};

const scheduleClose = () => {
  clearCloseTimer();
  if (!props.modelValue || props.timeout <= 0) {
    return;
  }

  closeTimer = setTimeout(() => {
    closeTimer = undefined;
    close();
  }, props.timeout);
};

watch(() => [props.modelValue, props.timeout], scheduleClose, { immediate: true });

onBeforeUnmount(() => {
  messageObserver?.disconnect();
  clearCloseTimer();
});
</script>

<style lang="scss">
@use 'sass:map';
@use '../../styles/tokens';
@use '../../styles/theme/md-sys-color' as theme;
@use '../ripple/ripple';
@use '../elevation/elevation';

$theme: tokens.md-comp-snackbar-values();

.md-snackbar__announcement {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

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

  background-color: #{theme.value('inverse-surface')};
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
    background: transparent;
    border: 0;
    justify-content: center;
    position: relative;
    margin: 0 12px;
    width: calc(#{map.get($theme, icon-size)} * 1.5);
    height: calc(#{map.get($theme, icon-size)} * 1.5);
    border-radius: 24px;
    cursor: pointer;
    isolation: isolate;
    outline: none;
    user-select: none;

    &:focus-visible {
      outline: 2px solid #{theme.value('inverse-primary')};
      outline-offset: 2px;
    }

    #{$this}__icon {
      color: #{theme.value('inverse-on-surface')};
      width: map.get($theme, icon-size);
      height: map.get($theme, icon-size);
    }

    #{$this}__icon:hover {
      color: #{theme.value('inverse-on-surface')};
    }

    #{$this}__icon:hover ~ #{$this}__state-layer {
      background-color: #{theme.value('inverse-on-surface')};
      opacity: map.get($theme, icon-hover-state-layer-opacity);
    }

    #{$this}__icon:active ~ #{$this}__state-layer {
      background-color: #{theme.value('inverse-on-surface')};
      opacity: map.get($theme, icon-pressed-state-layer-opacity);
    }
  }

  &__action-text {
    background: transparent;
    border: 0;
    color: #{theme.value('inverse-primary')};
    font-size: map.get($theme, action-label-text-size);
    line-height: map.get($theme, action-label-text-line-height);
    font-family: map.get($theme, action-label-text-font);
    position: relative;
    padding: 8px 12px;
    border-radius: 24px;
    cursor: pointer;
    isolation: isolate;
    outline: none;
    user-select: none;

    &:focus-visible {
      outline: 2px solid #{theme.value('inverse-primary')};
      outline-offset: 2px;
    }

    &:hover {
      color: #{theme.value('inverse-primary')};

      #{$this}__state-layer {
        opacity: map.get($theme, action-hover-state-layer-opacity);
        background-color: #{theme.value('inverse-primary')};
      }
    }
    &:active {
      color: #{theme.value('inverse-primary')};

      #{$this}__state-layer {
        opacity: map.get($theme, action-pressed-state-layer-opacity);
        background-color: #{theme.value('inverse-primary')};
      }
    }
  }

  &__supporting-text {
    color: #{theme.value('inverse-on-surface')};
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
