<template>
  <li class="md-list-divider"></li>
</template>

<script>
export default {
  name: 'MdListDivider',
};
</script>

<style lang="scss">
@use 'sass:map';
@use '../../styles/tokens';

$theme: tokens.md-comp-list-values();

.md-list-divider {
  box-sizing: border-box;
  border-bottom: solid 1px map.get($theme, divider-color);
  margin: 0 16px;
}
</style>
