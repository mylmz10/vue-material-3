<template>
  <nav class="md-navigation-rail" :class="{ 'md-navigation-rail--expressive': variant === 'expressive', 'md-navigation-rail--expanded': isExpanded }" :aria-label="ariaLabel">
    <div v-if="$slots.header" class="md-navigation-rail__header"><slot name="header" :expanded="isExpanded" /></div>
    <div class="md-navigation-rail__destinations" @keydown="onKeydown">
      <button
        v-for="(item, index) in items"
        :key="index"
        type="button"
        class="md-navigation-rail__destination"
        :class="{ 'md-navigation-rail__destination--selected': modelValue === index }"
        :disabled="item.disabled"
        :aria-label="[item.label, item.badgeLabel].filter(Boolean).join(' — ')"
        :aria-current="modelValue === index ? 'page' : undefined"
        :tabindex="index === tabStop ? 0 : -1"
        @focus="focusedIndex = index"
        @click="select(index)"
      >
        <MdRipple class="md-navigation-rail__ripple" />
        <span class="md-navigation-rail__indicator">
          <MdIcon aria-hidden="true">{{ modelValue === index ? item.activeIcon || item.icon : item.icon || item.activeIcon }}</MdIcon>
          <span v-if="isExpanded" class="md-navigation-rail__expanded-label">{{ item.label }}</span>
          <MdBadge v-if="item.badge !== undefined && item.badge !== false" :value="item.badge === true ? undefined : item.badge" :absolute="!isExpanded" aria-hidden="true" />
        </span>
        <span v-if="!isExpanded && (labels === 'all' || (labels === 'selected' && modelValue === index))" class="md-navigation-rail__label">{{ item.label }}</span>
        <span v-if="item.badgeLabel" class="md-navigation-rail__badge-label">{{ item.badgeLabel }}</span>
      </button>
    </div>
    <slot name="footer" />
  </nav>
</template>

<script setup>
import { computed, ref } from 'vue';
import MdIcon from '../icon/MdIcon.vue';
import MdBadge from '../badge/MdBadge.vue';
import MdRipple from '../ripple/MdRipple.vue';

const props = defineProps({
  variant: { type: String, default: 'baseline', validator: (value) => ['baseline', 'expressive'].includes(value) },
  expanded: { type: Boolean, default: false },
  items: { type: Array, default: () => [] },
  modelValue: { type: Number, default: undefined },
  ariaLabel: { type: String, default: 'Primary navigation' },
  labels: { type: String, default: 'all', validator: (value) => ['all', 'selected', 'none'].includes(value) },
});
const emit = defineEmits(['update:modelValue']);
const isExpanded = computed(() => props.variant === 'expressive' && props.expanded);
const focusedIndex = ref(-1);
const enabled = computed(() => props.items.map((item, index) => (item.disabled ? -1 : index)).filter((index) => index !== -1));
const tabStop = computed(() => (enabled.value.includes(focusedIndex.value) ? focusedIndex.value : enabled.value.includes(props.modelValue) ? props.modelValue : enabled.value[0]));
const select = (index) => {
  if (!props.items[index]?.disabled) emit('update:modelValue', index);
};
const onKeydown = (event) => {
  if (event.altKey || event.ctrlKey || event.metaKey || !enabled.value.length) return;
  const current = enabled.value.indexOf(tabStop.value);
  let index;
  if (event.key === 'ArrowDown') index = enabled.value[(current + 1) % enabled.value.length];
  else if (event.key === 'ArrowUp') index = enabled.value[(current - 1 + enabled.value.length) % enabled.value.length];
  else if (event.key === 'Home') index = enabled.value[0];
  else if (event.key === 'End') index = enabled.value.at(-1);
  else return;
  event.preventDefault();
  event.currentTarget.children[index]?.focus();
};
</script>

<style lang="scss">
@use 'sass:map';
@use '../../styles/tokens';
@use '../../styles/theme/md-sys-color' as theme;
$theme: tokens.md-comp-navigation-rail-values();
.md-navigation-rail {
  width: map.get($theme, container-width);
  flex: 0 0 map.get($theme, container-width);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-block: 12px;
  background: #{theme.value('surface')};
  color: #{theme.value('on-surface-variant')};
  &__header {
    margin-bottom: 12px;
  }
  &__destinations {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  &__destination {
    position: relative;
    border: 0;
    background: transparent;
    color: inherit;
    font: inherit;
    cursor: pointer;
    --md-ripple-hover-state-layer-color: #{theme.value('on-surface')};
    --md-ripple-focus-state-layer-color: #{theme.value('on-surface')};
    --md-ripple-pressed-state-layer-color: #{theme.value('on-surface')};
    --md-ripple-hover-state-layer-opacity: 0.08;
    --md-ripple-focus-state-layer-opacity: 0.12;
    --md-ripple-pressed-state-layer-opacity: 0.12;

    min-height: 60px;
    width: 100%;
    padding: 4px 0 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    &:focus-visible {
      outline: 2px solid #{theme.value('primary')};
      outline-offset: -2px;
    }
    &:disabled {
      opacity: 0.38;
      cursor: default;
    }
  }
  &__ripple {
    z-index: 1;
    inset-block-start: 4px;
    inset-block-end: auto;
    inset-inline-start: calc(50% - #{map.get($theme, active-indicator-width)} / 2);
    inset-inline-end: auto;
    width: map.get($theme, active-indicator-width);
    height: map.get($theme, active-indicator-height);
    border-radius: map.get($theme, active-indicator-shape);
  }
  &__indicator {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: map.get($theme, active-indicator-width);
    height: map.get($theme, active-indicator-height);
    border-radius: map.get($theme, active-indicator-shape);
    .md-icon {
      position: relative;
      z-index: 2;
    }
  }
  &__destination--selected {
    color: #{theme.value('on-surface')};
    font-weight: 700;
    .md-icon {
      font-variation-settings: 'FILL' 1;
    }
  }
  &__destination--selected &__indicator {
    background: #{theme.value('secondary-container')};
    color: #{theme.value('on-secondary-container')};
  }
  &__label {
    font-size: 12px;
    line-height: 16px;
    max-width: 100%;
    overflow-wrap: anywhere;
  }
  &__badge-label {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
  }
}

.md-navigation-rail--expressive {
  --md-navigation-rail-collapsed-width: 96px;
  --md-navigation-rail-expanded-width: 220px;
  inline-size: var(--md-navigation-rail-collapsed-width);
  flex: none;
  max-inline-size: 100%;
  transition: inline-size 250ms cubic-bezier(0.2, 0, 0, 1);

  .md-navigation-rail__destination--selected .md-navigation-rail__label {
    color: #{theme.value('secondary')};
  }
}

.md-navigation-rail--expanded {
  inline-size: var(--md-navigation-rail-expanded-width);
  align-items: stretch;
  background: #{theme.value('surface-container')};

  .md-navigation-rail__header {
    padding-inline: 12px;
  }

  .md-navigation-rail__destination {
    display: grid;
    grid-template-columns: minmax(0, max-content) 1fr;
    min-block-size: 60px;
    padding: 2px 12px;
    text-align: start;
  }

  .md-navigation-rail__indicator {
    grid-area: 1 / 1;
    inline-size: auto;
    min-inline-size: 0;
    block-size: auto;
    min-block-size: 56px;
    justify-content: flex-start;
    gap: 8px;
    padding: 8px 16px;
    border-radius: 999px;
  }

  .md-navigation-rail__ripple {
    position: relative;
    grid-area: 1 / 1;
    align-self: stretch;
    inset: auto;
    inline-size: auto;
    block-size: auto;
  }

  .md-navigation-rail__expanded-label {
    position: relative;
    z-index: 2;
    font-size: 14px;
    line-height: 20px;
    min-inline-size: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    animation: md-navigation-rail-label-in 160ms 90ms both;
  }

  &:dir(rtl) .md-navigation-rail__expanded-label {
    --md-navigation-rail-label-clip: inset(0 0 0 100%);
  }

  .md-icon,
  .md-badge {
    flex: none;
  }
}

@keyframes md-navigation-rail-label-in {
  from {
    clip-path: var(--md-navigation-rail-label-clip, inset(0 100% 0 0));
  }

  to {
    clip-path: inset(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .md-navigation-rail--expressive {
    transition: none;
  }

  .md-navigation-rail__expanded-label {
    animation: none;
  }
}
</style>
