<template>
  <component
    :is="isLink ? 'a' : 'div'"
    class="md-chip"
    :class="chipClasses"
    :href="anchorHref"
    :target="anchorTarget"
    :download="anchorDownload"
    :tabindex="resolvedTabIndex"
    :role="isLink ? undefined : 'button'"
    :aria-disabled="ariaDisabled"
    :aria-pressed="ariaPressed"
    data-md-chip="true"
    @click="handleClick"
    @keydown="handleKeydown"
    @focus="emit('focus', $event)"
    @blur="emit('blur', $event)"
  >
    <div class="md-chip__background"></div>
    <div class="md-chip__outline"></div>

    <MdRipple v-if="showRipple" />

    <span v-if="showLeadingVisual" class="md-chip__leading">
      <img v-if="avatar && !hasAvatarSlot" :src="avatar" alt="" />
      <slot v-else-if="hasAvatarSlot" name="avatar" />
      <template v-else>
        <MdIcon v-if="showLeadingCheckIcon">check</MdIcon>
        <MdIcon v-else-if="leadingIcon">{{ leadingIcon }}</MdIcon>
        <slot v-else name="leading-icon" />
      </template>
    </span>

    <span class="md-chip__text">
      <slot>{{ label }}</slot>
    </span>

    <button
      v-if="showRemoveButton"
      class="md-chip__remove"
      type="button"
      :tabindex="-1"
      :aria-label="removeAriaLabel"
      @click.stop="handleRemove"
      @keydown.enter.stop.prevent="handleRemove"
      @keydown.space.stop.prevent="handleRemove"
    >
      <MdIcon>close</MdIcon>
    </button>

    <span v-else-if="showTrailingVisual" class="md-chip__trailing">
      <MdIcon v-if="trailingIcon">{{ trailingIcon }}</MdIcon>
      <slot v-else name="trailing-icon" />
    </span>
  </component>
</template>

<script setup>
import { computed, ref, useSlots, watch } from 'vue';
import MdIcon from '../icon/MdIcon.vue';
import MdRipple from '../ripple/MdRipple.vue';

const slots = useSlots();

const props = defineProps({
  alwaysFocusable: { type: Boolean, default: false },
  avatar: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  download: { type: String, default: '' },
  elevated: { type: Boolean, default: false },
  href: { type: String, default: '' },
  label: { type: String, default: '' },
  leadingIcon: { type: String, default: '' },
  removable: { type: Boolean, default: false },
  removeAriaLabel: { type: String, default: 'Remove' },
  selected: { type: Boolean, default: false },
  softDisabled: { type: Boolean, default: false },
  tabIndex: { type: [Number, String], default: undefined },
  target: { type: String, default: '' },
  trailingIcon: { type: String, default: '' },
  value: { type: [String, Number, Boolean, Object], default: undefined },
  variant: {
    type: String,
    default: 'filter',
    validator: (value) => ['assist', 'filter', 'input', 'suggestion'].includes(value),
  },
});

const emit = defineEmits(['update:selected', 'input', 'change', 'click', 'remove', 'focus', 'blur']);

const selectedState = ref(props.selected);

watch(
  () => props.selected,
  (nextValue) => {
    selectedState.value = nextValue;
  },
);

const hasLeadingSlot = computed(() => !!slots['leading-icon']);
const hasTrailingSlot = computed(() => !!slots['trailing-icon']);
const hasAvatarSlot = computed(() => !!slots.avatar);

const isLink = computed(() => !!props.href);
const isDisabledLike = computed(() => props.disabled || props.softDisabled);
const isFilterVariant = computed(() => props.variant === 'filter');
const isInputVariant = computed(() => props.variant === 'input');
const supportsElevated = computed(() => props.variant !== 'input');

const chipClasses = computed(() => ({
  'md-chip--always-focusable': props.alwaysFocusable,
  'md-chip--assist': props.variant === 'assist',
  'md-chip--disabled': props.disabled,
  'md-chip--elevated': supportsElevated.value && props.elevated,
  'md-chip--filter': props.variant === 'filter',
  'md-chip--input': props.variant === 'input',
  'md-chip--removable': props.removable,
  'md-chip--selected': selectedState.value,
  'md-chip--soft-disabled': props.softDisabled,
  'md-chip--suggestion': props.variant === 'suggestion',
}));

const anchorHref = computed(() => (isLink.value && !isDisabledLike.value ? props.href : undefined));
const anchorTarget = computed(() => (isLink.value && props.target ? props.target : undefined));
const anchorDownload = computed(() => (isLink.value && props.download ? props.download : undefined));

const resolvedTabIndex = computed(() => {
  if (props.tabIndex !== undefined) {
    return props.tabIndex;
  }

  if (isDisabledLike.value && !props.alwaysFocusable) {
    return -1;
  }

  return 0;
});

const ariaDisabled = computed(() => (isDisabledLike.value ? 'true' : undefined));
const ariaPressed = computed(() => (isFilterVariant.value ? String(selectedState.value) : undefined));

const showLeadingCheckIcon = computed(() => isFilterVariant.value && selectedState.value && !hasLeadingSlot.value && !props.avatar);
const showLeadingVisual = computed(() => showLeadingCheckIcon.value || !!props.leadingIcon || hasLeadingSlot.value || !!props.avatar || hasAvatarSlot.value);
const showTrailingVisual = computed(() => !!props.trailingIcon || hasTrailingSlot.value);
const showRemoveButton = computed(() => props.removable);
const showRipple = computed(() => !isDisabledLike.value);

const emitSelectedChange = (nextValue) => {
  selectedState.value = nextValue;
  emit('update:selected', nextValue);
  emit('input', nextValue);
  emit('change', nextValue);
};

const handleClick = (event) => {
  if (isDisabledLike.value) {
    event.preventDefault();
    event.stopImmediatePropagation();
    return;
  }

  emit('click', event);

  if (isFilterVariant.value) {
    emitSelectedChange(!selectedState.value);
    return;
  }

  if (isInputVariant.value && !props.removable) {
    emitSelectedChange(!selectedState.value);
  }
};

const handleRemove = () => {
  if (isDisabledLike.value) {
    return;
  }

  emit('remove', props.value);
};

const handleKeydown = (event) => {
  if (event.key !== 'Enter' && event.key !== ' ') {
    return;
  }

  if (isLink.value) {
    return;
  }

  event.preventDefault();
  handleClick(event);
};
</script>

<style lang="scss">
@use 'sass:map';
@use '../../styles/tokens';
@use '../elevation/elevation';
@use '../ripple/ripple';

$assist-theme: tokens.md-comp-assist-chip-values();
$filter-theme: tokens.md-comp-filter-chip-values();
$input-theme: tokens.md-comp-input-chip-values();
$suggestion-theme: tokens.md-comp-suggestion-chip-values();

.md-chip {
  $this: &;
  --md-chip-container-height: 32px;
  --md-chip-container-shape: 8px;
  --md-chip-label-color: currentcolor;
  --md-chip-label-disabled-color: currentcolor;
  --md-chip-label-disabled-opacity: 0.38;
  --md-chip-label-font: inherit;
  --md-chip-outline-color: transparent;
  --md-chip-outline-width: 0px;
  --md-chip-background-color: transparent;
  --md-chip-selected-background-color: transparent;
  --md-chip-disabled-background-color: transparent;
  --md-chip-disabled-background-opacity: 0;
  --md-chip-leading-icon-color: currentcolor;
  --md-chip-leading-icon-size: 18px;
  --md-chip-trailing-icon-color: currentcolor;
  --md-chip-trailing-icon-size: 18px;
  --md-chip-avatar-size: 24px;
  --md-chip-selected-label-color: var(--md-chip-label-color);
  --md-chip-selected-leading-icon-color: var(--md-chip-leading-icon-color);
  --md-chip-selected-trailing-icon-color: var(--md-chip-trailing-icon-color);
  align-items: center;
  background: transparent;
  border: none;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-flex;
  gap: 8px;
  height: var(--md-chip-container-height);
  min-width: 48px;
  outline: none;
  overflow: hidden;
  padding: 0 12px;
  position: relative;
  text-decoration: none;
  vertical-align: middle;

  &__outline,
  &__background {
    border-radius: var(--md-chip-container-shape);
    inset: 0;
    position: absolute;
  }

  &__outline {
    border-color: var(--md-chip-outline-color);
    border-style: solid;
    border-width: var(--md-chip-outline-width);
    box-sizing: border-box;
    z-index: 0;
  }

  &__background {
    background-color: var(--md-chip-background-color);
    z-index: -1;
  }

  &__leading,
  &__trailing {
    align-items: center;
    display: inline-flex;
    justify-content: center;
    line-height: 0;
    z-index: 1;
  }

  &__leading {
    color: var(--md-chip-leading-icon-color);
  }

  &__trailing {
    color: var(--md-chip-trailing-icon-color);
  }

  &__leading .md-icon,
  &__trailing .md-icon {
    font-size: var(--md-chip-leading-icon-size);
  }

  &__trailing .md-icon {
    font-size: var(--md-chip-trailing-icon-size);
  }

  &__leading img {
    border-radius: 999px;
    height: var(--md-chip-avatar-size);
    object-fit: cover;
    width: var(--md-chip-avatar-size);
  }

  &__text {
    color: var(--md-chip-label-color);
    font: var(--md-chip-label-font);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    z-index: 1;
  }

  &__remove {
    align-items: center;
    background: none;
    border: none;
    color: var(--md-chip-trailing-icon-color);
    cursor: inherit;
    display: inline-flex;
    justify-content: center;
    margin: 0;
    padding: 0;
    z-index: 1;

    .md-icon {
      font-size: var(--md-chip-trailing-icon-size);
    }
  }

  &--selected {
    #{$this}__background {
      background-color: var(--md-chip-selected-background-color);
    }

    #{$this}__text {
      color: var(--md-chip-selected-label-color);
    }

    #{$this}__leading {
      color: var(--md-chip-selected-leading-icon-color);
    }

    #{$this}__trailing,
    #{$this}__remove {
      color: var(--md-chip-selected-trailing-icon-color);
    }
  }

  &--disabled,
  &--soft-disabled {
    cursor: default;
  }

  &--disabled:not(&--always-focusable) {
    pointer-events: none;
  }

  &--disabled {
    #{$this}__background {
      background-color: var(--md-chip-disabled-background-color);
      opacity: var(--md-chip-disabled-background-opacity);
    }

    #{$this}__text {
      color: var(--md-chip-label-disabled-color);
      opacity: var(--md-chip-label-disabled-opacity);
    }

    #{$this}__leading,
    #{$this}__trailing,
    #{$this}__remove {
      color: var(--md-chip-label-disabled-color);
      opacity: var(--md-chip-label-disabled-opacity);
    }
  }

  &--assist {
    --md-chip-container-height: #{map.get($assist-theme, container-height)};
    --md-chip-container-shape: #{map.get($assist-theme, container-shape)};
    --md-chip-label-color: #{map.get($assist-theme, label-text-color)};
    --md-chip-label-disabled-color: #{map.get($assist-theme, disabled-label-text-color)};
    --md-chip-label-disabled-opacity: #{map.get($assist-theme, disabled-label-text-opacity)};
    --md-chip-label-font: #{map.get($assist-theme, label-text-type)};
    --md-chip-outline-color: #{map.get($assist-theme, flat-outline-color)};
    --md-chip-outline-width: #{map.get($assist-theme, flat-outline-width)};
    --md-chip-background-color: transparent;
    --md-chip-disabled-background-color: #{map.get($assist-theme, elevated-disabled-container-color)};
    --md-chip-disabled-background-opacity: #{map.get($assist-theme, elevated-disabled-container-opacity)};
    --md-chip-leading-icon-color: #{map.get($assist-theme, with-icon-icon-color)};
    --md-chip-leading-icon-size: #{map.get($assist-theme, with-icon-icon-size)};
    --md-chip-trailing-icon-color: #{map.get($assist-theme, with-icon-icon-color)};
    --md-chip-trailing-icon-size: #{map.get($assist-theme, with-icon-icon-size)};

    &.md-chip--elevated {
      --md-chip-background-color: #{map.get($assist-theme, elevated-container-color)};
      box-shadow: elevation.resolve-box-shadow(map.get($assist-theme, elevated-container-elevation), map.get($assist-theme, elevated-container-shadow-color));
    }

    @include ripple.ripple(
      $assist-theme,
      (
        hover-state-layer-color: hover-state-layer-color,
        focus-state-layer-color: focus-state-layer-color,
        pressed-state-layer-color: pressed-state-layer-color,
        hover-state-layer-opacity: hover-state-layer-opacity,
        focus-state-layer-opacity: focus-state-layer-opacity,
        pressed-state-layer-opacity: pressed-state-layer-opacity,
      )
    );
  }

  &--suggestion {
    --md-chip-container-height: #{map.get($suggestion-theme, container-height)};
    --md-chip-container-shape: #{map.get($suggestion-theme, container-shape)};
    --md-chip-label-color: #{map.get($suggestion-theme, label-text-color)};
    --md-chip-label-disabled-color: #{map.get($suggestion-theme, disabled-label-text-color)};
    --md-chip-label-disabled-opacity: #{map.get($suggestion-theme, disabled-label-text-opacity)};
    --md-chip-label-font: #{map.get($suggestion-theme, label-text-type)};
    --md-chip-outline-color: #{map.get($suggestion-theme, flat-outline-color)};
    --md-chip-outline-width: #{map.get($suggestion-theme, flat-outline-width)};
    --md-chip-leading-icon-color: #{map.get($suggestion-theme, with-leading-icon-leading-icon-color)};
    --md-chip-leading-icon-size: #{map.get($suggestion-theme, with-leading-icon-leading-icon-size)};
    --md-chip-trailing-icon-color: #{map.get($suggestion-theme, with-leading-icon-leading-icon-color)};
    --md-chip-trailing-icon-size: #{map.get($suggestion-theme, with-leading-icon-leading-icon-size)};
    --md-chip-disabled-background-color: #{map.get($suggestion-theme, elevated-disabled-container-color)};
    --md-chip-disabled-background-opacity: #{map.get($suggestion-theme, elevated-disabled-container-opacity)};

    &.md-chip--elevated {
      --md-chip-background-color: #{map.get($suggestion-theme, elevated-container-color)};
      box-shadow: elevation.resolve-box-shadow(map.get($suggestion-theme, elevated-container-elevation), map.get($suggestion-theme, elevated-container-shadow-color));
    }

    @include ripple.ripple(
      $suggestion-theme,
      (
        hover-state-layer-color: hover-state-layer-color,
        focus-state-layer-color: focus-state-layer-color,
        pressed-state-layer-color: pressed-state-layer-color,
        hover-state-layer-opacity: hover-state-layer-opacity,
        focus-state-layer-opacity: focus-state-layer-opacity,
        pressed-state-layer-opacity: pressed-state-layer-opacity,
      )
    );
  }

  &--filter {
    --md-chip-container-height: #{map.get($filter-theme, container-height)};
    --md-chip-container-shape: #{map.get($filter-theme, container-shape)};
    --md-chip-label-color: #{map.get($filter-theme, unselected-label-text-color)};
    --md-chip-label-disabled-color: #{map.get($filter-theme, disabled-label-text-color)};
    --md-chip-label-disabled-opacity: #{map.get($filter-theme, disabled-label-text-opacity)};
    --md-chip-label-font: #{map.get($filter-theme, label-text-type)};
    --md-chip-outline-color: #{map.get($filter-theme, flat-unselected-outline-color)};
    --md-chip-outline-width: #{map.get($filter-theme, flat-unselected-outline-width)};
    --md-chip-leading-icon-color: #{map.get($filter-theme, with-leading-icon-unselected-leading-icon-color)};
    --md-chip-leading-icon-size: #{map.get($filter-theme, with-icon-icon-size)};
    --md-chip-trailing-icon-color: #{map.get($filter-theme, with-trailing-icon-unselected-trailing-icon-color)};
    --md-chip-trailing-icon-size: #{map.get($filter-theme, with-icon-icon-size)};
    --md-chip-selected-background-color: #{map.get($filter-theme, flat-selected-container-color)};
    --md-chip-selected-label-color: #{map.get($filter-theme, selected-label-text-color)};
    --md-chip-selected-leading-icon-color: #{map.get($filter-theme, with-leading-icon-selected-leading-icon-color)};
    --md-chip-selected-trailing-icon-color: #{map.get($filter-theme, with-trailing-icon-selected-trailing-icon-color)};
    --md-chip-disabled-background-color: #{map.get($filter-theme, flat-disabled-selected-container-color)};
    --md-chip-disabled-background-opacity: #{map.get($filter-theme, flat-disabled-selected-container-opacity)};

    &.md-chip--elevated {
      --md-chip-background-color: #{map.get($filter-theme, elevated-unselected-container-color)};
      --md-chip-selected-background-color: #{map.get($filter-theme, elevated-selected-container-color)};
      box-shadow: elevation.resolve-box-shadow(map.get($filter-theme, elevated-container-elevation), map.get($filter-theme, elevated-container-shadow-color));
    }

    @include ripple.ripple(
      $filter-theme,
      (
        hover-state-layer-color: unselected-hover-state-layer-color,
        focus-state-layer-color: unselected-focus-state-layer-color,
        pressed-state-layer-color: unselected-pressed-state-layer-color,
        hover-state-layer-opacity: unselected-hover-state-layer-opacity,
        focus-state-layer-opacity: unselected-focus-state-layer-opacity,
        pressed-state-layer-opacity: unselected-pressed-state-layer-opacity,
      )
    );

    &.md-chip--selected {
      .md-ripple {
        --md-ripple-hover-state-layer-color: #{map.get($filter-theme, selected-hover-state-layer-color)};
        --md-ripple-focus-state-layer-color: #{map.get($filter-theme, selected-focus-state-layer-color)};
        --md-ripple-pressed-state-layer-color: #{map.get($filter-theme, selected-pressed-state-layer-color)};
        --md-ripple-hover-state-layer-opacity: #{map.get($filter-theme, selected-hover-state-layer-opacity)};
        --md-ripple-focus-state-layer-opacity: #{map.get($filter-theme, selected-focus-state-layer-opacity)};
        --md-ripple-pressed-state-layer-opacity: #{map.get($filter-theme, selected-pressed-state-layer-opacity)};
      }
    }
  }

  &--input {
    --md-chip-container-height: #{map.get($input-theme, container-height)};
    --md-chip-container-shape: #{map.get($input-theme, container-shape)};
    --md-chip-label-color: #{map.get($input-theme, unselected-label-text-color)};
    --md-chip-label-disabled-color: #{map.get($input-theme, disabled-label-text-color)};
    --md-chip-label-disabled-opacity: #{map.get($input-theme, disabled-label-text-opacity)};
    --md-chip-label-font: #{map.get($input-theme, label-text-type)};
    --md-chip-outline-color: #{map.get($input-theme, unselected-outline-color)};
    --md-chip-outline-width: #{map.get($input-theme, unselected-outline-width)};
    --md-chip-leading-icon-color: #{map.get($input-theme, with-leading-icon-unselected-leading-icon-color)};
    --md-chip-leading-icon-size: #{map.get($input-theme, with-leading-icon-leading-icon-size)};
    --md-chip-trailing-icon-color: #{map.get($input-theme, with-trailing-icon-unselected-trailing-icon-color)};
    --md-chip-trailing-icon-size: #{map.get($input-theme, with-trailing-icon-trailing-icon-size)};
    --md-chip-avatar-size: #{map.get($input-theme, with-avatar-avatar-size)};
    --md-chip-selected-background-color: #{map.get($input-theme, selected-container-color)};
    --md-chip-selected-label-color: #{map.get($input-theme, selected-label-text-color)};
    --md-chip-selected-leading-icon-color: #{map.get($input-theme, with-leading-icon-selected-leading-icon-color)};
    --md-chip-selected-trailing-icon-color: #{map.get($input-theme, with-trailing-icon-selected-trailing-icon-color)};
    --md-chip-disabled-background-color: #{map.get($input-theme, disabled-selected-container-color)};
    --md-chip-disabled-background-opacity: #{map.get($input-theme, disabled-selected-container-opacity)};

    @include ripple.ripple(
      $input-theme,
      (
        hover-state-layer-color: unselected-hover-state-layer-color,
        focus-state-layer-color: unselected-focus-state-layer-color,
        pressed-state-layer-color: unselected-pressed-state-layer-color,
        hover-state-layer-opacity: unselected-hover-state-layer-opacity,
        focus-state-layer-opacity: unselected-focus-state-layer-opacity,
        pressed-state-layer-opacity: unselected-pressed-state-layer-opacity,
      )
    );

    &.md-chip--selected {
      .md-ripple {
        --md-ripple-hover-state-layer-color: #{map.get($input-theme, selected-hover-state-layer-color)};
        --md-ripple-focus-state-layer-color: #{map.get($input-theme, selected-focus-state-layer-color)};
        --md-ripple-pressed-state-layer-color: #{map.get($input-theme, selected-pressed-state-layer-color)};
        --md-ripple-hover-state-layer-opacity: #{map.get($input-theme, selected-hover-state-layer-opacity)};
        --md-ripple-focus-state-layer-opacity: #{map.get($input-theme, selected-focus-state-layer-opacity)};
        --md-ripple-pressed-state-layer-opacity: #{map.get($input-theme, selected-pressed-state-layer-opacity)};
      }
    }
  }

  .md-ripple {
    border-radius: var(--md-chip-container-shape);
  }
}
</style>
