<script setup lang="ts">
defineProps<{
  username: string;
  email: string;
  picture?: string;
}>();
</script>

<template>
  <div class="profile">
    <div class="profile__inner">
      <span class="typography__text__2">{{ username }}</span>
      <p class="typography__text__3">{{ email }}</p>
    </div>
    <img
      :src="picture ?? 'images/placeholder.png'"
      alt="pfp"
      width="50"
      height="50"
      style="border-radius: 10px"
    />
  </div>
</template>

<style scoped lang="scss">
.profile {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  &__inner {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    color: var(--text-color);
    p {
      color: var(--text-grey);
      margin: 0;
    }
    span {
      font-weight: 500;
    }
  }
}
</style>
