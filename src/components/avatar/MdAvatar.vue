<template>
  <div class="md-avatar">
    <img v-if="image" :src="image" :alt="initials || ''" />
    <div v-else-if="initials">{{ initials }}</div>
  </div>
</template>

<script setup>
defineProps({
  image: {
    type: String,
  },
  initials: {
    type: String,
  },
});
</script>

<style lang="scss">
@use '../../styles/theme/md-sys-color' as theme;
.md-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 400;
    width: 100%;
    height: 100%;
    background-color: var(--md-avatar-container-color, #{theme.value('primary')});
    color: var(--md-avatar-text-color, #{theme.value('on-primary')});
    border-radius: 50%;
  }
}
</style>
