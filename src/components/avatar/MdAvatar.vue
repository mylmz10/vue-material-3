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
    background-color: #6750a4;
    color: #ffffff;
    border-radius: 50%;
  }
}
</style>
