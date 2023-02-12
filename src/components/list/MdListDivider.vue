<template>
  <MdDivider tag="li" class="md-list-divider"></MdDivider>
</template>

<script>
import MdDivider from '../divider/MdDivider.vue';

export default {
  name: 'MdListDivider',
  components: { MdDivider },
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
  margin: 0;
}
</style>
