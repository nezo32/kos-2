<script setup lang="ts">
const sideBar = ref(false);

const { width } = useWindowSize();

function set() {
  viewpoint.value = width.value > 1920;
  mobile.value = width.value <= 1000;
  if (sideBar.value) return;
  if (width.value >= 1000) {
    sideBar.value = true;
  } else {
    sideBar.value = false;
  }
}

const mobile = ref(false);
const viewpoint = ref(false);

watch(width, () => {
  set();
});
onUpdated(() => {
  set();
});
onMounted(() => {
  set();
});
</script>

<template>
  <main class="application" :class="{ viewpoint: viewpoint }">
    <section v-if="viewpoint"></section>
    <template v-if="mobile">
      <Transition name="expand">
        <SideBar v-if="sideBar" class="application__sidebar" @close-menu="sideBar = !sideBar" />
      </Transition>
    </template>
    <template v-if="!mobile">
      <SideBar class="application__sidebar" v-if="sideBar" @close-menu="sideBar = !sideBar" />
    </template>
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

.expand-enter-active,
.expand-leave-active {
  transition: max-width 0.3s ease-in-out;
  overflow: hidden;
}

.expand-enter-to,
.expand-leave-from {
  max-width: 250px !important;
}

.expand-enter-from,
.expand-leave-to {
  max-width: 0px !important;
}

.application {
  > section {
    width: 244px;
  }

  position: relative;
  display: flex;
  flex-direction: row;
  min-height: 100vh;

  &.viewpoint {
    max-width: 1920px;
    margin: 0 auto;
    gap: 50px;

    .application__sidebar {
      height: 630px;
    }
  }

  &__content {
    @media screen and (min-width: 1921px) {
      width: 1920px;
      padding: 0;
      margin: 0;
    }

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
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: absolute;
      right: 0;
      height: 100%;
      z-index: 10000;
    }
  }
}
</style>
