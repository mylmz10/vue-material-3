<template>
  <button class="md-button"><slot /></button>
</template>

<script>
export default {
  name: 'MdButtonBase',
};
</script>

<style lang="scss">
@use '../elevation/surface';

.md-button {
  @include surface.root-static-styles;
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

  &:not(:disabled):hover {
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
    cursor: pointer;
  }
}
</style>
