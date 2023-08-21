<script setup lang="ts">
defineProps<{
  username: string;
  email: string;
  picture?: string;
}>();

const router = useRouter();
</script>

<template>
  <div class="profile">
    <div class="profile__inner">
      <span class="typography__text__2">{{ username }}</span>
      <p class="typography__mail">{{ email }}</p>
    </div>
    <img
      @click="router.push('/account')"
      :src="picture ?? 'https://wallpapers-clan.com/wp-content/uploads/2023/05/cool-pfp-02.jpg'"
      alt="pfp"
      width="50"
      height="50"
      style="border-radius: 10px; cursor: pointer"
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
  @media screen and (max-width: 768px) {
    &__inner {
      display: none;
    }
  }
}
</style>
