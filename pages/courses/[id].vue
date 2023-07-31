<script setup lang="ts">
import type { RouteLocationNormalized } from "vue-router";

definePageMeta({
  pageName: async (r: RouteLocationNormalized) => "Курс"
});
type ViewType = "description" | "progress" | "schedule";

const router = useRouter();

const view = ref<ViewType>(
  (router.currentRoute.value.query.view as ViewType | undefined) ?? "description"
);

watch(router.currentRoute, (n) => {
  view.value = (n.query.view as ViewType | undefined) ?? "description";
});
onMounted(() => {
  view.value = (router.currentRoute.value.query.view as ViewType | undefined) ?? "description";
});
</script>

<template>
  <div class="course">
    <CoursesSwitcherViewType v-model="view" />
  </div>
</template>

<style scoped lang="scss"></style>
