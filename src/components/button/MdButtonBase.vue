<template>
  <component
    :is="href ? 'a' : 'button'"
    class="md-button"
    :class="{ 'md-button--soft-disabled': softDisabled }"
    :disabled="href ? undefined : disabled"
    :type="href ? undefined : type"
    :href="href || undefined"
    :target="href ? target || undefined : undefined"
    :download="href ? download || undefined : undefined"
    :aria-disabled="disabled || softDisabled || undefined"
    :tabindex="href && disabled && !softDisabled ? -1 : undefined"
    @click="handleClick"
  >
    <div class="md-button__background"></div>
    <slot />
  </component>
</template>

<script setup>
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  softDisabled: {
    type: Boolean,
    default: false,
  },
  href: {
    type: String,
    default: '',
  },
  download: {
    type: String,
    default: '',
  },
  target: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'button',
  },
});

const handleClick = (event) => {
  if (props.softDisabled || (props.disabled && props.href)) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }
};
</script>

<style lang="scss">
@use '../elevation/surface';

.md-button {
  @include surface.root-static-styles;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-width: 64px;
  border: none;
  outline: 0px;
  line-height: inherit;
  user-select: none;
  appearance: none;
  vertical-align: middle;
  background: 0px 0px;
  text-decoration: none;
  padding: 0 20px;
  -webkit-font-smoothing: antialiased;

  &:not(:disabled):not(.md-button--soft-disabled):hover {
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
    cursor: pointer;
  }

  &__background {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    z-index: 0;
  }

  &__trailing-icon {
    display: inline-flex;
    align-items: center;
    margin-inline-start: 8px;
  }

  > .md-ripple {
    z-index: 1;
  }

  > :not(.md-button__background):not(.md-ripple) {
    z-index: 2;
  }

  .md-ripple-surface {
    &::before,
    &::after {
      z-index: 0;
    }
  }

  &:disabled,
  &.md-button--soft-disabled {
    .md-ripple {
      opacity: 0;
    }
  }
}
</style>
