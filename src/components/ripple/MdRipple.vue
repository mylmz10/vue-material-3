<template>
  <div ref="mdRipple" class="md-ripple">
    <div ref="mdRippleSurface" class="md-ripple-surface" :class="surfaceClasses"></div>
  </div>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from 'vue';

const mdRipple = ref(null);
const mdRippleSurface = ref(null);
const hovered = ref(true);
const focused = ref(false);
const pressed = ref(false);
const unbounded = ref(false);
const initialSize = ref(0);
const rippleSize = ref('');
const rippleScale = ref('');
const delayedEndPressHandle = ref(null);

// https://github.com/material-components/material-web/blob/master/components/ripple/lib/ripple.ts
const PRESS_GROW_MS = 450;
const MINIMUM_PRESS_MS = 225;
const INITIAL_ORIGIN_SCALE = 0.2;
const PADDING = 10;
const SOFT_EDGE_MINIMUM_SIZE = 75;
const SOFT_EDGE_CONTAINER_RATIO = 0.35;
const PRESS_PSEUDO = '::after';
const ANIMATION_FILL = 'forwards';
const EASING_STANDARD = 'cubic-bezier(0.4, 0, 0.2, 1)';

const surfaceClasses = computed(() => ({
  'md-ripple-surface--hovered': hovered.value,
  'md-ripple-surface--focused': focused.value,
  'md-ripple-surface--pressed': pressed.value,
  'md-ripple-surface--unbounded': unbounded.value,
}));

onMounted(() => {
  mdRipple.value.parentElement.addEventListener('focus', handleRippleFocus);
  mdRipple.value.parentElement.addEventListener('blur', handleRippleBlur);
  mdRipple.value.parentElement.addEventListener('mousedown', handleRippleActivate);
  mdRipple.value.parentElement.addEventListener('mouseenter', handleRippleMouseEnter);
  mdRipple.value.parentElement.addEventListener('mouseleave', handleRippleMouseLeave);
  mdRipple.value.parentElement.addEventListener('touchstart', handleRippleActivate);
  mdRipple.value.parentElement.addEventListener('mouseup', handleRippleDeactivate);
  mdRipple.value.parentElement.addEventListener('touchend', handleRippleDeactivate);
  mdRipple.value.parentElement.addEventListener('touchcancel', handleRippleDeactivate);
});

onBeforeUnmount(() => {
  mdRipple.value.parentElement.removeEventListener('focus', handleRippleFocus);
  mdRipple.value.parentElement.removeEventListener('blur', handleRippleBlur);
  mdRipple.value.parentElement.removeEventListener('mousedown', handleRippleActivate);
  mdRipple.value.parentElement.removeEventListener('mouseenter', handleRippleMouseEnter);
  mdRipple.value.parentElement.removeEventListener('mouseleave', handleRippleMouseLeave);
  mdRipple.value.parentElement.removeEventListener('touchstart', handleRippleActivate);
  mdRipple.value.parentElement.removeEventListener('mouseup', handleRippleDeactivate);
  mdRipple.value.parentElement.removeEventListener('touchend', handleRippleDeactivate);
  mdRipple.value.parentElement.removeEventListener('touchcancel', handleRippleDeactivate);
});

function getDimensions() {
  return (mdRipple.value.parentElement ?? mdRipple.value).getBoundingClientRect();
}

function determineRippleSize() {
  const { height, width } = getDimensions();
  const maxDim = Math.max(height, width);
  const softEdgeSize = Math.max(SOFT_EDGE_CONTAINER_RATIO * maxDim, SOFT_EDGE_MINIMUM_SIZE);

  let maxRadius = maxDim;
  let _initialSize = Math.floor(maxDim * INITIAL_ORIGIN_SCALE);

  const hypotenuse = Math.sqrt(width ** 2 + height ** 2);
  maxRadius = hypotenuse + PADDING;

  // ensure `_initialSize` is even for unbounded
  if (unbounded) {
    _initialSize = _initialSize - (_initialSize % 2);
  }

  initialSize.value = _initialSize;
  rippleScale.value = `${(maxRadius + softEdgeSize) / _initialSize}`;
  rippleSize.value = `${initialSize.value}px`;
}

function getNormalizedEventCoords(positionEvent) {
  const { scrollX, scrollY } = window;
  const { left, top } = getDimensions();
  const documentX = scrollX + left;
  const documentY = scrollY + top;
  const { pageX, pageY } = positionEvent;
  return { x: pageX - documentX, y: pageY - documentY };
}

function getTranslationCoordinates(positionEvent) {
  const { height, width } = getDimensions();
  const endPoint = {
    x: (width - initialSize.value) / 2,
    y: (height - initialSize.value) / 2,
  };

  let startPoint;
  if (positionEvent) {
    startPoint = getNormalizedEventCoords(positionEvent);
  } else {
    startPoint = {
      x: width / 2,
      y: height / 2,
    };
  }

  startPoint = {
    x: startPoint.x - initialSize.value / 2,
    y: startPoint.y - initialSize.value / 2,
  };

  return { startPoint, endPoint };
}

function startPressAnimation(positionEvent) {
  determineRippleSize();
  const { startPoint, endPoint } = getTranslationCoordinates(positionEvent);
  const translateStart = `${startPoint.x}px, ${startPoint.y}px`;
  const translateEnd = `${endPoint.x}px, ${endPoint.y}px`;

  mdRippleSurface.value.animate(
    {
      top: [0, 0],
      left: [0, 0],
      height: [rippleSize.value, rippleSize.value],
      width: [rippleSize.value, rippleSize.value],
      transform: [`translate(${translateStart}) scale(1)`, `translate(${translateEnd}) scale(${rippleScale.value})`],
    },
    {
      pseudoElement: PRESS_PSEUDO,
      duration: PRESS_GROW_MS,
      easing: EASING_STANDARD,
      fill: ANIMATION_FILL,
    }
  );
}

function handleRippleMouseEnter(hoverEvent) {
  if (hoverEvent?.pointerType !== 'touch') {
    hovered.value = true;
  }
}

function handleRippleMouseLeave() {
  hovered.value = false;
}

function handleRippleFocus() {
  focused.value = true;
}

function handleRippleBlur() {
  focused.value = false;
}

function handleRippleActivate(positionEvent) {
  pressed.value = true;
  if (delayedEndPressHandle.value !== null) {
    clearTimeout(delayedEndPressHandle.value);
    delayedEndPressHandle.value = null;
  }
  startPressAnimation(positionEvent);
}

function handleRippleDeactivate() {
  delayedEndPressHandle.value = setTimeout(() => {
    pressed.value = false;
    delayedEndPressHandle.value = null;
  }, MINIMUM_PRESS_MS);
}
</script>

<style lang="scss">
.md-ripple {
  position: absolute;
  inset: 0px;
  pointer-events: none;
  overflow: hidden;
  display: flex;

  &-surface {
    position: absolute;
    inset: 0px;
    pointer-events: none;
    overflow: hidden;
    outline: 0px;
    -webkit-tap-highlight-color: transparent;

    &::after {
      background: radial-gradient(closest-side, var(--md-ripple-pressed-state-layer-color, #000) max(100% - 70px, 65%), transparent 100%);
      position: absolute;
      opacity: 0;
      pointer-events: none;
      z-index: -1;
      content: '';
      transition: opacity 15ms linear 0s, background-color 15ms linear 0s;
      inset: 0px;
    }

    &--pressed::after {
      opacity: var(--md-ripple-pressed-state-layer-opacity, 0.12);
      transition-duration: 105ms;
    }
  }
}
</style>
