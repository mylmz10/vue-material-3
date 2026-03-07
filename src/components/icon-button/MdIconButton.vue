<template>
  <component
    :is="isLink ? 'a' : 'button'"
    class="md-icon-button"
    :class="buttonClasses"
    :disabled="buttonDisabled"
    :type="buttonType"
    :href="anchorHref"
    :target="anchorTarget"
    :download="anchorDownload"
    :tabindex="resolvedTabIndex"
    :aria-disabled="ariaDisabled"
    :aria-pressed="ariaPressed"
    :name="buttonName"
    :value="buttonValue"
    :form="buttonForm"
    :formaction="buttonFormAction"
    :formenctype="buttonFormEnctype"
    :formmethod="buttonFormMethod"
    :formnovalidate="buttonFormNoValidate"
    :formtarget="buttonFormTarget"
    @click="handleClick"
  >
    <MdRipple />

    <span class="md-icon-button__icon">
      <template v-if="!isSelected">
        <MdIcon v-if="icon">{{ icon }}</MdIcon>
        <slot v-else />
      </template>

      <template v-else>
        <slot name="selected">
          <MdIcon v-if="selectedIcon">{{ selectedIcon }}</MdIcon>
          <MdIcon v-else-if="icon">{{ icon }}</MdIcon>
          <slot v-else />
        </slot>
      </template>
    </span>
  </component>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import MdRipple from '../ripple/MdRipple.vue';
import MdIcon from '../icon/MdIcon.vue';

const props = defineProps({
  icon: {
    type: String,
  },
  selectedIcon: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  softDisabled: {
    type: Boolean,
    default: false,
  },
  filled: {
    type: Boolean,
    default: false,
  },
  tonal: {
    type: Boolean,
    default: false,
  },
  outlined: {
    type: Boolean,
    default: false,
  },
  toggle: {
    type: Boolean,
    default: false,
  },
  selected: {
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
    default: 'submit',
  },
  name: {
    type: String,
  },
  value: {
    type: [String, Number],
  },
  form: {
    type: String,
  },
  formAction: {
    type: String,
  },
  formEnctype: {
    type: String,
  },
  formMethod: {
    type: String,
  },
  formNoValidate: {
    type: Boolean,
    default: false,
  },
  formTarget: {
    type: String,
  },
  tabIndex: {
    type: [Number, String],
    default: undefined,
  },
});

const emit = defineEmits(['update:selected', 'input', 'change']);

const selectedState = ref(props.selected);

watch(
  () => props.selected,
  (value) => {
    selectedState.value = value;
  }
);

const isLink = computed(() => !!props.href);
const isSelected = computed(() => selectedState.value);

const buttonClasses = computed(() => ({
  'md-icon-button--filled': props.filled,
  'md-icon-button--tonal': props.tonal,
  'md-icon-button--outlined': props.outlined,
  'md-icon-button--toggle': props.toggle,
  'md-icon-button--selected': isSelected.value,
  'md-icon-button--disabled': props.disabled,
  'md-icon-button--soft-disabled': props.softDisabled,
}));

const buttonDisabled = computed(() => (!isLink.value ? props.disabled : undefined));
const buttonType = computed(() => (!isLink.value ? props.type : undefined));

const anchorHref = computed(() => (isLink.value ? props.href : undefined));
const anchorTarget = computed(() => (isLink.value && props.target ? props.target : undefined));
const anchorDownload = computed(() => (isLink.value && props.download ? props.download : undefined));

const ariaDisabled = computed(() => {
  if (props.softDisabled || (props.disabled && isLink.value)) {
    return 'true';
  }

  return undefined;
});

const ariaPressed = computed(() => (props.toggle ? String(isSelected.value) : undefined));

const resolvedTabIndex = computed(() => {
  if (props.tabIndex !== undefined) {
    return props.tabIndex;
  }

  if (isLink.value && props.disabled && !props.softDisabled) {
    return -1;
  }

  return undefined;
});

const buttonName = computed(() => (!isLink.value ? props.name : undefined));
const buttonValue = computed(() => (!isLink.value ? props.value : undefined));
const buttonForm = computed(() => (!isLink.value ? props.form : undefined));
const buttonFormAction = computed(() => (!isLink.value ? props.formAction : undefined));
const buttonFormEnctype = computed(() => (!isLink.value ? props.formEnctype : undefined));
const buttonFormMethod = computed(() => (!isLink.value ? props.formMethod : undefined));
const buttonFormNoValidate = computed(() => (!isLink.value && props.formNoValidate ? true : undefined));
const buttonFormTarget = computed(() => (!isLink.value ? props.formTarget : undefined));

const handleClick = (event) => {
  if (props.softDisabled || (props.disabled && isLink.value)) {
    event.preventDefault();
    event.stopImmediatePropagation();
    return;
  }

  if (!props.toggle || event.defaultPrevented) {
    return;
  }

  const next = !selectedState.value;
  selectedState.value = next;
  emit('update:selected', next);
  emit('input', next);
  emit('change', next);
};
</script>

<style lang="scss">
@use 'sass:map';
@use '../../styles/tokens';
@use '../elevation/surface';
@use '../ripple/ripple';

$theme: tokens.md-comp-icon-button-values();
$filled-theme: tokens.md-comp-filled-icon-button-values();
$tonal-theme: tokens.md-comp-filled-tonal-icon-button-values();
$outlined-theme: tokens.md-comp-outlined-icon-button-values();

@mixin icon-static-styles($width-key, $height-key, $shape-key, $color-key) {
  width: map.get($theme, $width-key);
  height: map.get($theme, $height-key);
  border-radius: map.get($theme, $shape-key);
  color: map.get($theme, $color-key);
}

.md-icon-button {
  background-color: transparent;
  @include surface.root-static-styles;
  @include icon-static-styles(state-layer-width, state-layer-height, state-layer-shape, unselected-icon-color);
  border-radius: map.get($theme, state-layer-shape);
  margin: max(0px, (48px - #{map.get($theme, state-layer-width)}) / 2);
  align-items: center;
  border: none;
  box-sizing: border-box;
  cursor: pointer;
  justify-content: center;
  display: inline-flex;
  position: relative;
  overflow: hidden;
  text-decoration: none;
  padding: 0;

  .md-icon-button__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }

  @include ripple.ripple(
    $theme,
    (
      hover-state-layer-color: unselected-hover-state-layer-color,
      focus-state-layer-color: unselected-focus-state-layer-color,
      pressed-state-layer-color: unselected-pressed-state-layer-color,
      hover-state-layer-opacity: unselected-hover-state-layer-opacity,
      focus-state-layer-opacity: unselected-focus-state-layer-opacity,
      pressed-state-layer-opacity: unselected-pressed-state-layer-opacity,
    )
  );

  &:not(:disabled):not(.md-icon-button--disabled):not(.md-icon-button--soft-disabled):hover {
    color: map.get($theme, unselected-hover-icon-color);
  }

  &:not(:disabled):not(.md-icon-button--disabled):not(.md-icon-button--soft-disabled):focus {
    color: map.get($theme, unselected-focus-icon-color);
  }

  &:not(:disabled):not(.md-icon-button--disabled):not(.md-icon-button--soft-disabled):active {
    color: map.get($theme, unselected-pressed-icon-color);
  }

  &--selected {
    color: map.get($theme, selected-icon-color);

    @include ripple.ripple(
      $theme,
      (
        hover-state-layer-color: selected-hover-state-layer-color,
        focus-state-layer-color: selected-focus-state-layer-color,
        pressed-state-layer-color: selected-pressed-state-layer-color,
        hover-state-layer-opacity: selected-hover-state-layer-opacity,
        focus-state-layer-opacity: selected-focus-state-layer-opacity,
        pressed-state-layer-opacity: selected-pressed-state-layer-opacity,
      )
    );

    &:not(:disabled):not(.md-icon-button--disabled):not(.md-icon-button--soft-disabled):hover {
      color: map.get($theme, selected-hover-icon-color);
    }

    &:not(:disabled):not(.md-icon-button--disabled):not(.md-icon-button--soft-disabled):focus {
      color: map.get($theme, selected-focus-icon-color);
    }

    &:not(:disabled):not(.md-icon-button--disabled):not(.md-icon-button--soft-disabled):active {
      color: map.get($theme, selected-pressed-icon-color);
    }
  }

  &--filled {
    width: map.get($filled-theme, container-width);
    height: map.get($filled-theme, container-height);
    border-radius: map.get($filled-theme, container-shape);
    color: map.get($filled-theme, icon-color);
    margin: max(0px, (48px - #{map.get($filled-theme, container-width)}) / 2);

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background-color: map.get($filled-theme, container-color);
      z-index: 0;
    }

    @include ripple.ripple($filled-theme);

    &:not(:disabled):not(.md-icon-button--disabled):not(.md-icon-button--soft-disabled):hover {
      color: map.get($filled-theme, hover-icon-color);
    }

    &:not(:disabled):not(.md-icon-button--disabled):not(.md-icon-button--soft-disabled):focus {
      color: map.get($filled-theme, focus-icon-color);
    }

    &:not(:disabled):not(.md-icon-button--disabled):not(.md-icon-button--soft-disabled):active {
      color: map.get($filled-theme, pressed-icon-color);
    }

    &.md-icon-button--toggle {
      color: map.get($filled-theme, toggle-unselected-icon-color);

      &::before {
        background-color: map.get($filled-theme, unselected-container-color);
      }

      @include ripple.ripple(
        $filled-theme,
        (
          hover-state-layer-color: toggle-unselected-hover-state-layer-color,
          focus-state-layer-color: toggle-unselected-focus-state-layer-color,
          pressed-state-layer-color: toggle-unselected-pressed-state-layer-color,
          hover-state-layer-opacity: hover-state-layer-opacity,
          focus-state-layer-opacity: focus-state-layer-opacity,
          pressed-state-layer-opacity: pressed-state-layer-opacity,
        )
      );

      &:not(:disabled):not(.md-icon-button--disabled):not(.md-icon-button--soft-disabled):hover {
        color: map.get($filled-theme, toggle-unselected-hover-icon-color);
      }

      &:not(:disabled):not(.md-icon-button--disabled):not(.md-icon-button--soft-disabled):focus {
        color: map.get($filled-theme, toggle-unselected-focus-icon-color);
      }

      &:not(:disabled):not(.md-icon-button--disabled):not(.md-icon-button--soft-disabled):active {
        color: map.get($filled-theme, toggle-unselected-pressed-icon-color);
      }
    }

    &.md-icon-button--toggle.md-icon-button--selected {
      color: map.get($filled-theme, toggle-selected-icon-color);

      &::before {
        background-color: map.get($filled-theme, selected-container-color);
      }

      @include ripple.ripple(
        $filled-theme,
        (
          hover-state-layer-color: toggle-selected-hover-state-layer-color,
          focus-state-layer-color: toggle-selected-focus-state-layer-color,
          pressed-state-layer-color: toggle-selected-pressed-state-layer-color,
          hover-state-layer-opacity: hover-state-layer-opacity,
          focus-state-layer-opacity: focus-state-layer-opacity,
          pressed-state-layer-opacity: pressed-state-layer-opacity,
        )
      );

      &:not(:disabled):not(.md-icon-button--disabled):not(.md-icon-button--soft-disabled):hover {
        color: map.get($filled-theme, toggle-selected-hover-icon-color);
      }

      &:not(:disabled):not(.md-icon-button--disabled):not(.md-icon-button--soft-disabled):focus {
        color: map.get($filled-theme, toggle-selected-focus-icon-color);
      }

      &:not(:disabled):not(.md-icon-button--disabled):not(.md-icon-button--soft-disabled):active {
        color: map.get($filled-theme, toggle-selected-pressed-icon-color);
      }
    }
  }

  &--tonal {
    width: map.get($tonal-theme, container-width);
    height: map.get($tonal-theme, container-height);
    border-radius: map.get($tonal-theme, container-shape);
    color: map.get($tonal-theme, icon-color);
    margin: max(0px, (48px - #{map.get($tonal-theme, container-width)}) / 2);

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background-color: map.get($tonal-theme, container-color);
      z-index: 0;
    }

    @include ripple.ripple($tonal-theme);

    &:not(:disabled):not(.md-icon-button--disabled):not(.md-icon-button--soft-disabled):hover {
      color: map.get($tonal-theme, hover-icon-color);
    }

    &:not(:disabled):not(.md-icon-button--disabled):not(.md-icon-button--soft-disabled):focus {
      color: map.get($tonal-theme, focus-icon-color);
    }

    &:not(:disabled):not(.md-icon-button--disabled):not(.md-icon-button--soft-disabled):active {
      color: map.get($tonal-theme, pressed-icon-color);
    }

    &.md-icon-button--toggle {
      color: map.get($tonal-theme, toggle-unselected-icon-color);

      &::before {
        background-color: map.get($tonal-theme, unselected-container-color);
      }

      @include ripple.ripple(
        $tonal-theme,
        (
          hover-state-layer-color: toggle-unselected-hover-state-layer-color,
          focus-state-layer-color: toggle-unselected-focus-state-layer-color,
          pressed-state-layer-color: toggle-unselected-pressed-state-layer-color,
          hover-state-layer-opacity: hover-state-layer-opacity,
          focus-state-layer-opacity: focus-state-layer-opacity,
          pressed-state-layer-opacity: pressed-state-layer-opacity,
        )
      );

      &:not(:disabled):not(.md-icon-button--disabled):not(.md-icon-button--soft-disabled):hover {
        color: map.get($tonal-theme, toggle-unselected-hover-icon-color);
      }

      &:not(:disabled):not(.md-icon-button--disabled):not(.md-icon-button--soft-disabled):focus {
        color: map.get($tonal-theme, toggle-unselected-focus-icon-color);
      }

      &:not(:disabled):not(.md-icon-button--disabled):not(.md-icon-button--soft-disabled):active {
        color: map.get($tonal-theme, toggle-unselected-pressed-icon-color);
      }
    }

    &.md-icon-button--toggle.md-icon-button--selected {
      color: map.get($tonal-theme, toggle-selected-icon-color);

      &::before {
        background-color: map.get($tonal-theme, selected-container-color);
      }

      @include ripple.ripple(
        $tonal-theme,
        (
          hover-state-layer-color: toggle-selected-hover-state-layer-color,
          focus-state-layer-color: toggle-selected-focus-state-layer-color,
          pressed-state-layer-color: toggle-selected-pressed-state-layer-color,
          hover-state-layer-opacity: hover-state-layer-opacity,
          focus-state-layer-opacity: focus-state-layer-opacity,
          pressed-state-layer-opacity: pressed-state-layer-opacity,
        )
      );

      &:not(:disabled):not(.md-icon-button--disabled):not(.md-icon-button--soft-disabled):hover {
        color: map.get($tonal-theme, toggle-selected-hover-icon-color);
      }

      &:not(:disabled):not(.md-icon-button--disabled):not(.md-icon-button--soft-disabled):focus {
        color: map.get($tonal-theme, toggle-selected-focus-icon-color);
      }

      &:not(:disabled):not(.md-icon-button--disabled):not(.md-icon-button--soft-disabled):active {
        color: map.get($tonal-theme, toggle-selected-pressed-icon-color);
      }
    }
  }

  &--outlined {
    width: map.get($outlined-theme, container-width);
    height: map.get($outlined-theme, container-height);
    border-radius: map.get($outlined-theme, container-shape);
    color: map.get($outlined-theme, unselected-icon-color);
    margin: max(0px, (48px - #{map.get($outlined-theme, container-width)}) / 2);
    border-width: map.get($outlined-theme, unselected-outline-width);
    border-color: map.get($outlined-theme, unselected-outline-color);
    border-style: solid;

    @include ripple.ripple(
      $outlined-theme,
      (
        hover-state-layer-color: unselected-hover-state-layer-color,
        focus-state-layer-color: unselected-focus-state-layer-color,
        pressed-state-layer-color: unselected-pressed-state-layer-color,
        hover-state-layer-opacity: hover-state-layer-opacity,
        focus-state-layer-opacity: focus-state-layer-opacity,
        pressed-state-layer-opacity: pressed-state-layer-opacity,
      )
    );

    &:not(:disabled):not(.md-icon-button--disabled):not(.md-icon-button--soft-disabled):hover {
      color: map.get($outlined-theme, unselected-hover-icon-color);
    }

    &:not(:disabled):not(.md-icon-button--disabled):not(.md-icon-button--soft-disabled):focus {
      color: map.get($outlined-theme, unselected-focus-icon-color);
    }

    &:not(:disabled):not(.md-icon-button--disabled):not(.md-icon-button--soft-disabled):active {
      color: map.get($outlined-theme, unselected-pressed-icon-color);
    }

    &.md-icon-button--selected {
      color: map.get($outlined-theme, selected-icon-color);
      background-color: map.get($outlined-theme, selected-container-color);
      border-width: 0;

      @include ripple.ripple(
        $outlined-theme,
        (
          hover-state-layer-color: selected-hover-state-layer-color,
          focus-state-layer-color: selected-focus-state-layer-color,
          pressed-state-layer-color: selected-pressed-state-layer-color,
          hover-state-layer-opacity: hover-state-layer-opacity,
          focus-state-layer-opacity: focus-state-layer-opacity,
          pressed-state-layer-opacity: pressed-state-layer-opacity,
        )
      );

      &:not(:disabled):not(.md-icon-button--disabled):not(.md-icon-button--soft-disabled):hover {
        color: map.get($outlined-theme, selected-hover-icon-color);
      }

      &:not(:disabled):not(.md-icon-button--disabled):not(.md-icon-button--soft-disabled):focus {
        color: map.get($outlined-theme, selected-focus-icon-color);
      }

      &:not(:disabled):not(.md-icon-button--disabled):not(.md-icon-button--soft-disabled):active {
        color: map.get($outlined-theme, selected-pressed-icon-color);
      }
    }
  }

  &:disabled,
  &.md-icon-button--disabled,
  &.md-icon-button--soft-disabled {
    color: rgba(map.get($theme, disabled-icon-color), map.get($theme, disabled-icon-opacity));
    cursor: default;

    .md-ripple {
      opacity: 0;
    }
  }

  &.md-icon-button--filled,
  &.md-icon-button--tonal,
  &.md-icon-button--outlined {
    &:disabled,
    &.md-icon-button--disabled,
    &.md-icon-button--soft-disabled {
      .md-icon-button__icon {
        opacity: map.get($filled-theme, disabled-icon-opacity);
      }
    }
  }

  &.md-icon-button--filled,
  &.md-icon-button--tonal {
    &:disabled,
    &.md-icon-button--disabled,
    &.md-icon-button--soft-disabled {
      &::before {
        background-color: map.get($filled-theme, disabled-container-color);
        opacity: map.get($filled-theme, disabled-container-opacity);
      }
    }
  }

  &.md-icon-button--outlined {
    &:disabled,
    &.md-icon-button--disabled,
    &.md-icon-button--soft-disabled {
      &:not(.md-icon-button--selected) {
        border-color: map.get($outlined-theme, disabled-unselected-outline-color);
        opacity: map.get($outlined-theme, disabled-unselected-outline-opacity);
      }

      &.md-icon-button--selected {
        background-color: map.get($outlined-theme, disabled-selected-container-color);
        opacity: map.get($outlined-theme, disabled-selected-container-opacity);
      }

      .md-icon-button__icon {
        opacity: map.get($outlined-theme, disabled-icon-opacity);
      }
    }
  }
}
</style>
