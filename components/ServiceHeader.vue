<script setup lang="ts">
defineProps<{
  username: string;
  email: string;
  picture?: string;
}>();
import type { RouteLocationNormalized } from "vue-router";

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
    <Profile :username="username" :email="email" :picture="picture" />
  </div>
</template>

<style scoped lang="scss">
.service__header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  &__routing {
    color: var(--text-color);
  }
}
</style>
