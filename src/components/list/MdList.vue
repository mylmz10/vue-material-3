<template>
  <ul class="md-list">
    <slot></slot>
  </ul>
</template>

<script>
export default {
  name: 'MdList',
};
</script>

<style lang="scss">
@use 'sass:map';
@use '../../styles/tokens';
@use '../../styles/theme/md-sys-color' as theme;

$theme: tokens.md-comp-list-values();

.md-list {
  --md-list-container-color: #{theme.value('surface')};
  display: block;
  margin: 0;
  padding: 0;
  padding-block: 8px;
  list-style-type: none;
  min-width: 300px;
  background-color: var(--md-list-container-color);
  max-height: 280px;
  overflow: auto;

  .md-avatar {
    --md-avatar-container-color: #{map.get($theme, list-item-leading-avatar-color)};
    --md-avatar-text-color: #{map.get($theme, list-item-leading-avatar-label-color)};
  }
}
</style>
