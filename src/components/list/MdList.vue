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

.md-list {
  display: block;
  margin: 0;
  padding: 0;
  padding-block: 8px;
  list-style-type: none;
  min-width: 300px;
}
</style>
