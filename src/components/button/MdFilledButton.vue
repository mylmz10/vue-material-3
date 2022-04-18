<template>
  <MdButtonBase class="md-filled-button">
    <template v-if="label">
      {{ label }}
    </template>
    <slot v-else />
  </MdButtonBase>
</template>

<script>
import MdButtonBase from "./MdButtonBase.vue";

export default {
  components: { MdButtonBase },
  props: {
    label: {
      type: String,
    },
  },
};
</script>

<style lang="scss">
@use "sass:map";
@use "../../styles/tokens";

$theme: tokens.md-comp-filled-button-values();

.md-filled-button {
  background-color: map.get($theme, container-color);
  height: map.get($theme, container-height);
  border-radius: map.get($theme, container-shape);
  color: map.get($theme, label-text-color);
  font-family: map.get($theme, label-text-font);
  font-size: map.get($theme, label-text-size);
  font-weight: map.get($theme, label-text-weight);
  letter-spacing: map.get($theme, label-text-tracking);
  line-height: map.get($theme, label-text-line-height);
  box-shadow: none;

  &:hover {
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3),
      0px 1px 3px 1px rgba(0, 0, 0, 0.15);
  }
}
</style>
