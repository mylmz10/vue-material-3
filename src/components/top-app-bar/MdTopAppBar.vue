<template>
  <header class="md-top-app-bar" :class="[`md-top-app-bar--${variant}`, { 'md-top-app-bar--scrolled': scrollTop > 0, 'md-top-app-bar--collapsed': collapsed }]" :style="barStyle">
    <div class="md-top-app-bar__row">
      <div class="md-top-app-bar__navigation">
        <slot name="navigation">
          <MdIconButton v-if="navigationIcon" :icon="navigationIcon" :aria-label="navigationLabel" type="button" @click="$emit('navigation', $event)" />
        </slot>
      </div>
      <h1 v-if="!expanded" class="md-top-app-bar__title" :title="title">
        <slot name="title">{{ title }}</slot>
      </h1>
      <div v-else class="md-top-app-bar__spacer"></div>
      <div class="md-top-app-bar__actions">
        <slot name="actions">
          <MdIconButton
            v-for="(action, index) in actions"
            :key="index"
            :icon="action.icon"
            :aria-label="action.label"
            :disabled="action.disabled"
            type="button"
            @click="$emit('action', action, index, $event)"
          />
        </slot>
      </div>
    </div>
    <h1 v-if="expanded" class="md-top-app-bar__title md-top-app-bar__expanded-title" :title="title">
      <slot name="title">{{ title }}</slot>
    </h1>
  </header>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import MdIconButton from '../icon-button/MdIconButton.vue';
const props = defineProps({
  title: { type: String, default: '' },
  variant: { type: String, default: 'small', validator: (value) => ['small', 'center-aligned', 'medium', 'large'].includes(value) },
  navigationIcon: { type: String, default: '' },
  navigationLabel: { type: String, default: 'Open navigation' },
  actions: { type: Array, default: () => [], validator: (items) => items.every((item) => typeof item.label === 'string' && item.label.trim()) },
  scrollBehavior: { type: String, default: 'pinned', validator: (value) => ['pinned', 'collapse'].includes(value) },
  scrollTarget: { type: [String, Object], default: undefined },
});
defineEmits(['navigation', 'action']);
const scrollTop = ref(0);
let target;
const expandedVariant = computed(() => props.variant === 'medium' || props.variant === 'large');
const collapseDistance = computed(() => (props.variant === 'large' ? 88 : 48));
const collapsed = computed(() => expandedVariant.value && props.scrollBehavior === 'collapse' && scrollTop.value >= collapseDistance.value);
const expanded = computed(() => expandedVariant.value && !collapsed.value);
const barStyle = computed(() => ({
  '--md-top-app-bar-height': `${
    expandedVariant.value ? (props.variant === 'large' ? 152 : 112) - (props.scrollBehavior === 'collapse' ? Math.min(scrollTop.value, collapseDistance.value) : 0) : 64
  }px`,
}));
const updateScroll = () => {
  scrollTop.value = Math.max(0, target === window ? window.scrollY : target?.scrollTop || 0);
};
const bindScroll = () => {
  target?.removeEventListener('scroll', updateScroll);
  target = typeof props.scrollTarget === 'string' ? document.querySelector(props.scrollTarget) : props.scrollTarget || window;
  target?.addEventListener('scroll', updateScroll, { passive: true });
  updateScroll();
};
onMounted(bindScroll);
watch(
  () => props.scrollTarget,
  () => {
    if (typeof window !== 'undefined') bindScroll();
  }
);
onBeforeUnmount(() => target?.removeEventListener('scroll', updateScroll));
</script>

<style lang="scss">
@use '../../styles/theme/md-sys-color' as theme;
.md-top-app-bar {
  position: sticky;
  top: 0;
  z-index: 10;
  box-sizing: border-box;
  width: 100%;
  height: var(--md-top-app-bar-height);
  overflow: hidden;
  background: #{theme.value('surface')};
  color: #{theme.value('on-surface')};
  display: flex;
  flex-direction: column;
  &--scrolled {
    background: #{theme.value('surface-container')};
  }
  &__row {
    display: flex;
    align-items: center;
    min-height: 64px;
    padding-inline: 4px;
    gap: 4px;
  }
  &__navigation,
  &__actions {
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }
  &__title {
    flex: 1;
    min-width: 0;
    font-family: inherit;
    font-size: 22px;
    line-height: 28px;
    font-weight: 400;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &__spacer {
    flex: 1;
  }
  &__expanded-title {
    flex: 0 1 auto;
    min-height: 0;
    width: 100%;
    padding: 0 16px 12px;
    box-sizing: border-box;
    margin-top: auto;
    font-size: 24px;
    line-height: 32px;
  }
  &--large &__expanded-title {
    font-size: 28px;
    line-height: 36px;
  }
  &--center-aligned &__row {
    display: grid;
    grid-template-columns: minmax(max-content, 1fr) minmax(0, auto) minmax(max-content, 1fr);
  }
  &--center-aligned &__title {
    text-align: center;
  }
  &--center-aligned &__actions {
    justify-content: end;
  }
  &__navigation:empty + &__title {
    margin-inline-start: 12px;
  }
  @media (prefers-reduced-motion: no-preference) {
    transition: background-color 150ms;
  }
}
</style>
