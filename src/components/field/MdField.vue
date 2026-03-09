<template>
  <span
    class="md-field"
    :class="{
      'md-field--focused': focused,
      'md-field--populated': populated,
      'md-field--error': error,
      'md-field--with-start': hasStartContent,
      'md-field--with-end': hasEndContent,
    }"
    @focusin="onFocusin"
    @focusout="onFocusout"
  >
    <span class="md-field__container">
      <span class="md-field__outline"></span>
      <span class="md-field__state-layer"></span>
      <span class="md-field__start" :class="{ 'md-field__start--empty': !hasStartContent }">
        <slot name="start"></slot>
      </span>
      <span class="md-field__middle">
        <span class="md-field__label" aria-hidden="false">{{ label }}</span>

        <span class="md-field__content">
          <slot></slot>
        </span>
      </span>
      <span class="md-field__end" :class="{ 'md-field__end--empty': !hasEndContent }">
        <slot name="end"></slot>
      </span>

      <span class="md-field__active-indicator"></span>
    </span>

    <span class="md-field__supporting-text">
      <span class="md-field__supporting-text-start">
        <slot name="supporting-text"></slot>
      </span>
      <span class="md-field__supporting-text-end">
        <slot name="supporting-text-end"></slot>
      </span>
    </span>
  </span>
</template>

<script setup>
import { Comment, Text, computed, ref, useSlots } from 'vue';

defineProps({
  disabled: { type: Boolean },
  error: { type: Boolean },
  label: { type: String },
  populated: { type: Boolean },
  required: { type: Boolean },
  focused: { type: Boolean },
});

let focused = ref(false);
const slots = useSlots();

const hasRenderableVNode = (vnodes = []) => {
  return vnodes.some((vnode) => {
    if (vnode.type === Comment) {
      return false;
    }

    if (vnode.type === Text) {
      return typeof vnode.children === 'string' && vnode.children.trim().length > 0;
    }

    if (Array.isArray(vnode.children)) {
      return hasRenderableVNode(vnode.children);
    }

    return true;
  });
};

const hasStartContent = computed(() => hasRenderableVNode(slots.start?.() || []));
const hasEndContent = computed(() => hasRenderableVNode(slots.end?.() || []));

const onFocusin = () => {
  focused.value = true;
};
const onFocusout = () => {
  focused.value = false;
};
</script>

<style lang="scss">
.md-field {
  display: inline-flex;
  flex-direction: column;
  // Allow the use of block/inline reflexive RTL properties without impacting
  // structure when languages change.
  writing-mode: horizontal-tb;

  &__container {
    align-items: center;
    box-sizing: border-box;
    display: flex;
    flex: 1;
    position: relative;
    flex-basis: var(--md-filled-field-container-height, 56px);
  }

  $this: &;

  &__start,
  &__middle,
  &__end {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 100%;
    position: relative;
  }

  &__start {
    width: auto;
    min-width: 0;
    flex-shrink: 0;
  }

  &__start:not(.md-field__start--empty) {
    min-width: 16px;
  }

  &__middle {
    position: relative;
    flex: 1 1 auto;
    min-width: 0;

    #{$this}__label {
      position: absolute;
      left: var(--md-field-label-offset, 0px);
      padding: 0 16px;
      pointer-events: none;
      transition: 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
      transition-duration: 0.3s;
      font-size: 16px;
      line-height: 20px;

      overflow: hidden;
      max-width: 100%;
      text-overflow: ellipsis;
      white-space: nowrap;
      z-index: 1;
    }
    #{$this}__content {
      width: 100%;
      padding-inline-start: var(--md-field-leading-space, 16px);
      padding-inline-end: var(--md-field-trailing-space, 16px);
    }
  }

  &--with-start {
    #{$this}__content {
      padding-inline-start: 0;
    }
  }

  &--with-end {
    #{$this}__content {
      padding-inline-end: 0;
    }
  }

  &--focused,
  &--populated {
    #{$this}__middle {
      #{$this}__label {
        transform: translateY(-27px) translateX(-15%) scale(0.75);
        background-color: #ffffff;
      }
      #{$this}__content {
      }
    }
  }

  &#{$this}--focused,
  &#{$this}--populated {
    &#{$this}--filled {
      #{$this}__middle {
        #{$this}__label {
          transform: translateY(-13px) translateX(-21%) scale(0.75);
          background: none;
        }
        #{$this}__content {
          transform: translateY(6px) translateX(0);
        }
      }
    }
  }

  &__end {
    width: auto;
    min-width: 0;
    justify-content: flex-end;
    flex-shrink: 0;
  }

  &__end:not(.md-field__end--empty) {
    min-width: 16px;
  }

  &__state-layer {
    width: 100%;
    height: 100%;
    position: absolute;
  }
}
</style>
