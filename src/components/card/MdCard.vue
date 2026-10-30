<template>
  <div
    class="md-card"
    :class="{
      'md-card--elevated': type === 'elevated',
      'md-card--filled': type === 'filled',
      'md-card--outlined': type === 'outlined',
      'md-card--interactive': interactive,
      'md-card--with-footer': actionButtonText || cancelButtonText,
    }"
    :role="interactive ? 'button' : undefined"
    :tabindex="interactive ? 0 : undefined"
    @click="handleClick"
    @keydown="handleKeydown"
  >
    <div class="md-card__state-layer"></div>

    <div v-if="avatar || avatarInitials || headerTitle || headerSubTitle" class="md-card__header">
      <MdAvatar v-if="avatar || avatarInitials" :image="avatar" :initials="avatarInitials"></MdAvatar>
      <div class="md-card__title-container">
        <div v-if="headerTitle" class="md-card__header-title">{{ headerTitle }}</div>
        <div v-if="headerSubTitle" class="md-card__header-sub-title">{{ headerSubTitle }}</div>
      </div>
    </div>

    <div v-if="image" class="md-card__image-container">
      <img :src="image" alt="" class="md-card__image" />
    </div>

    <div class="md-card__content">
      <slot />
    </div>

    <div v-if="actionButtonText || cancelButtonText" class="md-card__footer">
      <div class="md-card__action">
        <MdOutlinedButton v-if="cancelButtonText" :label="cancelButtonText" @click.prevent.stop="$emit('cancel', $event)" />
        <MdFilledButton v-if="actionButtonText" :label="actionButtonText" @click.stop.prevent="$emit('action', $event)" />
      </div>
    </div>
  </div>
</template>

<script setup>
import MdFilledButton from '../button/MdFilledButton.vue';
import MdOutlinedButton from '../button/MdOutlinedButton.vue';
import MdAvatar from '../avatar/MdAvatar.vue';

const props = defineProps({
  type: {
    type: String,
    default: 'elevated',
  },
  headerTitle: {
    type: String,
  },
  headerSubTitle: {
    type: String,
  },
  image: {
    type: String,
  },
  actionButtonText: {
    type: String,
  },
  cancelButtonText: {
    type: String,
  },
  avatar: {
    type: String,
  },
  avatarInitials: {
    type: String,
  },
  interactive: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['action', 'cancel', 'click']);

const handleClick = (event) => {
  const control = event.target.closest('a[href],button,input,select,textarea,summary,[tabindex],[contenteditable="true"],[contenteditable=""],[role="button"],[role="link"]');
  if (props.interactive && (event.defaultPrevented || (control && control !== event.currentTarget))) return;
  emit('click', event);
};

const handleKeydown = (event) => {
  if (!props.interactive || event.target !== event.currentTarget || (event.key !== 'Enter' && event.key !== ' ')) {
    return;
  }

  event.preventDefault();
  event.currentTarget.click();
};
</script>

<style lang="scss">
@use 'sass:map';
@use '../elevation/elevation';
@use '../../styles/tokens';
@use '../../styles/theme/md-sys-color' as theme;

.md-card {
  margin: 0 8px;
  cursor: default;

  $this: &;

  box-sizing: border-box;
  flex: 1 1 0%;
  position: relative;
  overflow: hidden;
  z-index: 0;
  border-radius: inherit;
  color: #{theme.value('on-surface')};

  &:before {
    border-radius: inherit;
    content: '';
    display: flex;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: -1;
  }

  &__header {
    padding: 16px;
    display: flex;

    .md-avatar {
      margin-right: 8px;
    }

    #{$this}__title-container {
      #{$this}__header-title {
        font-size: 16px;
        line-height: 24px;
        font-weight: 500;
      }

      #{$this}__header-sub-title {
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 0.25px;
      }
    }
  }

  #{$this}__image-container {
    #{$this}__image {
      display: block;
      width: 100%;
      height: auto;
    }
  }

  #{$this}__content {
    padding: 16px;
  }

  &#{$this}--with-footer {
    #{$this}__content {
      padding-bottom: 0;
    }
  }

  &__footer {
    padding: 16px;

    #{$this}__action {
      display: flex;
      gap: 8px;
      width: 100%;
      justify-content: flex-end;
    }
  }

  &__state-layer {
    border-radius: inherit;
    height: 100%;
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    visibility: hidden;
    z-index: -1;
  }

  &--interactive {
    cursor: pointer;

    &:focus-visible {
      outline: 2px solid #{theme.value('primary')};
      outline-offset: 2px;
    }
  }

  &--elevated {
    $theme: tokens.md-comp-elevated-card-values();
    border-radius: map.get($theme, container-shape);
    box-shadow: elevation.resolve-box-shadow(map.get($theme, container-elevation), map.get($theme, container-shadow-color));

    &:before {
      background: #{theme.value('surface-container-low')};
    }

    &#{$this}--interactive:hover {
      box-shadow: elevation.resolve-box-shadow(map.get($theme, hover-container-elevation), map.get($theme, container-shadow-color));

      #{$this}__state-layer {
        visibility: visible;
        background-color: #{theme.value('on-surface')};
        opacity: map.get($theme, hover-state-layer-opacity);
      }
    }
  }
  &--filled {
    $theme: tokens.md-comp-filled-card-values();
    border-radius: map.get($theme, container-shape);

    &:before {
      background: #{theme.value('surface-container-highest')};
    }

    &#{$this}--interactive:hover {
      box-shadow: elevation.resolve-box-shadow(map.get($theme, hover-container-elevation), map.get($theme, container-shadow-color));

      #{$this}__state-layer {
        visibility: visible;
        background-color: #{theme.value('on-surface')};
        opacity: map.get($theme, hover-state-layer-opacity);
      }
    }
  }
  &--outlined {
    $theme: tokens.md-comp-outlined-card-values();
    border-radius: map.get($theme, container-shape);

    border-style: solid;
    border-width: map.get($theme, outline-width);
    border-color: #{theme.value('outline-variant')};
    &:before {
      background: #{theme.value('surface')};
    }

    &#{$this}--interactive:hover {
      box-shadow: elevation.resolve-box-shadow(map.get($theme, hover-container-elevation), map.get($theme, container-shadow-color));

      border-color: #{theme.value('outline-variant')};

      #{$this}__state-layer {
        visibility: visible;
        background-color: #{theme.value('on-surface')};
        opacity: map.get($theme, hover-state-layer-opacity);
      }
    }
  }
}
</style>
