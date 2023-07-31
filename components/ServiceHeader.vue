<script setup lang="ts">
defineProps<{
  title?: string | null;
  username: string;
  email: string;
  picture?: string;
}>();
</script>

<template>
  <div class="service__header">
    <div class="service__header__routing">
      <h3 class="typography__title__4">{{ title }}</h3>
    </div>
    <Profile :username="username" :email="email" :picture="picture" />
  </div>
</template>

<style scoped lang="scss">
.service__header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
</style>
