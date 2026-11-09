<template>
  <div class="search-wrapper" :class="$attrs.class" :style="$attrs.style">
    <div class="search-container">
      <button aria-label="Search" class="search-action search-action--leading" type="button" :disabled="disabled" @click="$emit('searchClick')">
        <MdIcon>search</MdIcon>
      </button>

      <input
        v-bind="getControlAttrs($attrs)"
        :aria-label="$attrs['aria-label'] || 'Search'"
        v-model="inputValue"
        :disabled="disabled"
        :readonly="readonly"
        type="text"
        :placeholder="placeholder"
        class="search-input"
        @input="handleInput"
      />

      <span v-if="supportingText" class="supporting-text">
        {{ supportingText }}
      </span>

      <div v-if="showAvatar" class="avatar">
        <slot name="avatar"></slot>
      </div>

      <button
        :aria-label="inputValue ? 'Clear search' : trailingLabel"
        class="search-action search-action--trailing"
        type="button"
        :disabled="disabled || (readonly && !!inputValue)"
        @click="handleTrailingClick"
      >
        <slot name="trailing" :icon="resolvedTrailingIcon" :dirty="!!inputValue">
          <MdIcon>{{ resolvedTrailingIcon }}</MdIcon>
        </slot>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import MdIcon from '../icon/MdIcon.vue';
import { getControlAttrs } from '../field/fieldAttrs';
defineOptions({ inheritAttrs: false });

const props = defineProps({
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  trailingLabel: { type: String, default: 'Voice search' },
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Search...',
  },
  supportingText: {
    type: String,
    default: '',
  },
  showAvatar: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue', 'searchClick', 'trailingClick']);

const inputValue = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    inputValue.value = newValue;
  }
);

const resolvedTrailingIcon = computed(() => (inputValue.value ? 'close' : 'mic'));

const handleInput = () => {
  emit('update:modelValue', inputValue.value);
};

const handleTrailingClick = () => {
  const action = resolvedTrailingIcon.value;
  if (props.disabled || (props.readonly && action === 'close')) return;

  if (action === 'close') {
    inputValue.value = '';
    emit('update:modelValue', '');
  }

  emit('trailingClick', action);
};
</script>

<style lang="scss" scoped>
@use 'sass:map';
@use '../../styles/tokens';
@use '../../styles/theme/md-sys-color' as theme;

$theme: tokens.md-comp-search-bar-values();

.search-wrapper {
  width: 100%;
}

.search-container {
  --md-search-container-color: #{theme.value('surface-container-high')};
  --md-search-leading-icon-color: #{theme.value('on-surface')};
  --md-search-trailing-icon-color: #{theme.value('on-surface-variant')};
  --md-search-input-text-color: #{theme.value('on-surface')};
  --md-search-supporting-text-color: #{theme.value('on-surface-variant')};
  --md-search-hover-state-layer-color: #{theme.value('on-surface')};
  --md-search-pressed-state-layer-color: #{theme.value('on-surface')};
  position: relative;
  display: flex;
  align-items: center;
  gap: 4px;
  min-height: map.get($theme, container-height);
  padding-inline: 4px;
  background: var(--md-search-container-color);
  border-radius: map.get($theme, container-shape);
  overflow: hidden;
}

.search-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  padding: 0;
  border: 0;
  border-radius: 9999px;
  background: transparent;
  color: var(--md-search-trailing-icon-color);
  cursor: pointer;
  flex: 0 0 auto;

  .material-symbols-outlined {
    font-size: 24px;
    line-height: 1;
  }

  &:hover {
    background: color-mix(in srgb, var(--md-search-hover-state-layer-color) calc(map.get($theme, hover-state-layer-opacity) * 100%), transparent);
  }

  &:active {
    background: color-mix(in srgb, var(--md-search-pressed-state-layer-color) calc(map.get($theme, pressed-state-layer-opacity) * 100%), transparent);
  }
}

.search-action--leading {
  color: var(--md-search-leading-icon-color);
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: var(--md-search-input-text-color);
  font-family: map.get($theme, input-text-font);
  font-size: map.get($theme, input-text-size);
  font-weight: map.get($theme, input-text-weight);
  letter-spacing: map.get($theme, input-text-tracking);
  line-height: map.get($theme, input-text-line-height);

  &::placeholder {
    color: var(--md-search-supporting-text-color);
  }
}

.supporting-text {
  color: var(--md-search-supporting-text-color);
  font-family: map.get($theme, supporting-text-font);
  font-size: map.get($theme, supporting-text-size);
  font-weight: map.get($theme, supporting-text-weight);
  letter-spacing: map.get($theme, supporting-text-tracking);
  line-height: map.get($theme, supporting-text-line-height);
  white-space: nowrap;
}

.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: map.get($theme, avatar-size);
  height: map.get($theme, avatar-size);
  margin-inline: 4px;
  border-radius: map.get($theme, avatar-shape);
  flex: 0 0 auto;
}
</style>
