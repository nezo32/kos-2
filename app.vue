<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <main class="application">
    <SideBar />
    <div class="application__content">
      <ServiceHeader
        :title="route.name?.toString()"
        username="Анастасия"
        email="stepanova@gmail.com"
      />
      <NuxtPage />
    </div>
  </main>
</template>

<style lang="scss">
@import "@/assets/scss/main.scss";

.application {
  display: flex;
  flex-direction: row;
  min-height: 100vh;

  &__content {
    display: flex;
    flex-direction: column;
    gap: 40px;

    flex: 1;

    padding-left: 50px;
    margin-right: 80px;
  }
}
</style>
