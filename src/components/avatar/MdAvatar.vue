<template>
  <div class="md-avatar">
    <img v-if="image" :src="image" alt="initials" />
    <div v-if="initials">{{ initials }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  image: {
    type: String,
  },
  initials: {
    type: String,
  },
});
</script>

<style lang="scss">
.md-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  --md-avatar-container-color: #6750a4;
  --md-avatar-text-color: #ffffff;

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
    background-color: var(--md-avatar-container-color);
    color: var(--md-avatar-text-color);
    border-radius: 50%;
  }
}
</style>
