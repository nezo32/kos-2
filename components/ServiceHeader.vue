<script setup lang="ts">
import MenuIcon from "@/assets/svg/menu.svg?component";
defineProps<{
  username: string;
  email: string;
  picture?: string;
}>();
import type { RouteLocationNormalized } from "vue-router";

const emit = defineEmits(["menuClick"]);

type F = (r: RouteLocationNormalized) => Promise<string>;

const router = useRouter();

async function getName() {
  const getFunc = router.currentRoute.value.meta.pageName as F | undefined;
  if (!getFunc) return "placeholder";
  return await getFunc(router.currentRoute.value);
}

const pageName = ref("");

watch(
  router.currentRoute,
  async () => {
    pageName.value = await getName();
  },
  { deep: true, immediate: true }
);

onMounted(async () => {
  pageName.value = await getName();
});
</script>

<template>
  <div class="service__header">
    <div class="service__header__routing">
      <h3 class="typography__title__4">{{ pageName }}</h3>
    </div>
    <section class="mobile">
      <Profile :username="username" :email="email" :picture="picture" />
      <MenuIcon @click="emit('menuClick')" />
    </section>
    <Profile :username="username" :email="email" :picture="picture" class="full" />
  </div>
</template>

<style scoped lang="scss">
.service__header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  > section {
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: center;

    svg {
      cursor: pointer;
    }
  }

  h3 {
    margin: 0;
  }

  margin-top: 30px;

  @media screen and (max-width: 999px) {
    .full {
      display: none;
    }
  }
  @media screen and (min-width: 1000px) {
    .mobile {
      display: none;
    }
  }

  &__routing {
    color: var(--text-color);
  }
}
</style>
