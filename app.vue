<script setup lang="ts">
const sideBar = ref(false);

const { width } = useWindowSize();

watch(width, () => {
  if (width.value >= 1000) {
    sideBar.value = true;
  } else {
    sideBar.value = false;
  }
});

onMounted(() => {
  if (width.value >= 1000) {
    sideBar.value = true;
  } else {
    sideBar.value = false;
  }
});
</script>

<template>
  <main class="application">
    <SideBar class="application__sidebar" v-if="sideBar" @close-menu="sideBar = !sideBar" />
    <div class="application__content">
      <ServiceHeader
        username="Анастасия"
        email="stepanova@gmail.com"
        @menu-click="sideBar = !sideBar"
      />
      <NuxtPage />
    </div>
    <div class="application__overlay" v-if="sideBar && width < 1000"></div>
  </main>
</template>

<style lang="scss">
@import "@/assets/scss/main.scss";

.application {
  position: relative;
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

    @media screen and (max-width: 1919px) {
      margin-right: 50px;
    }
    @media screen and (max-width: 1279px) {
      padding-left: 20px;
      margin-right: 20px;
    }
    @media screen and (max-width: 480px) {
      padding-left: 10px;
      margin-right: 10px;
    }
  }

  &__overlay {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 5000;
    position: absolute;
    background: rgba(37, 36, 44, 0.7);
  }

  @media screen and (max-width: 999px) {
    position: relative;

    &__sidebar {
      display: none;
      position: absolute;
      right: 0;
      height: 100%;
      z-index: 10000;
    }
  }
}
</style>
