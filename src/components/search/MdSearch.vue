<template>
  <div class="search-wrapper">
    <div class="search-container">
      <button class="search-action search-action--leading" type="button" @click="$emit('searchClick')">
        <MdIcon>search</MdIcon>
      </button>

      <input
        v-model="inputValue"
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

      <button class="search-action search-action--trailing" type="button" @click="handleTrailingClick">
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

const props = defineProps({
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
  if (inputValue.value) {
    inputValue.value = '';
    emit('update:modelValue', '');
  }

  emit('trailingClick', resolvedTrailingIcon.value);
};
</script>

<style lang="scss" scoped>
@use 'sass:map';
@use '../../styles/tokens';
@use '../elevation/elevation';

$theme: tokens.md-comp-search-bar-values();
$sys-color: tokens.md-sys-color-values-light();

.search-wrapper {
  width: 100%;
}

.search-container {
  position: relative;
  display: flex;
  align-items: center;
  gap: 4px;
  min-height: map.get($theme, container-height);
  padding-inline: 4px;
  background: map.get($theme, container-color);
  border-radius: map.get($theme, container-shape);
  box-shadow: elevation.resolve-box-shadow(map.get($theme, container-elevation), map.get($sys-color, shadow));
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
  color: map.get($theme, trailing-icon-color);
  cursor: pointer;
  flex: 0 0 auto;

  .material-symbols-outlined {
    font-size: 24px;
    line-height: 1;
  }

  &:hover {
    background: color-mix(in srgb, map.get($theme, hover-state-layer-color) calc(map.get($theme, hover-state-layer-opacity) * 100%), transparent);
  }

  &:active {
    background: color-mix(in srgb, map.get($theme, pressed-state-layer-color) calc(map.get($theme, pressed-state-layer-opacity) * 100%), transparent);
  }
}

.search-action--leading {
  color: map.get($theme, leading-icon-color);
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: map.get($theme, input-text-color);
  font-family: map.get($theme, input-text-font);
  font-size: map.get($theme, input-text-size);
  font-weight: map.get($theme, input-text-weight);
  letter-spacing: map.get($theme, input-text-tracking);
  line-height: map.get($theme, input-text-line-height);

  &::placeholder {
    color: map.get($theme, supporting-text-color);
  }
}

.supporting-text {
  color: map.get($theme, supporting-text-color);
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
