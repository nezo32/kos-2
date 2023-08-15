<script setup lang="ts">
import type { PropsType } from "types";
import type { RouteLocationNormalized } from "vue-router";
import Card from "components/courses/Card.vue";

definePageMeta({
  alias: "/",
  pageName: async (r: RouteLocationNormalized) => "Мои курсы"
});

const current = ref(0);

const data = ref<PropsType<typeof Card>[]>([
  {
    title: "Менеджмент организации. Специализация байер",
    text: "Специализация «байер» обучает основам управления закупками и управления поставками. Студенты изучат методы и процедуры закупок, а также научатся определять требования рынка и принимать решения в соответствии с этими требованиями.",
    current: 12,
    max: 20,
    id: "1"
  },
  {
    title: "Товароведение и экспертиза товаров",
    text: "Курс предназначен для изучения методов и процедур экспертизы качества товаров и их соответствия стандартам и требованиям рынка.",
    current: 12,
    max: 20,
    id: "1"
  },
  {
    title: "Дизайн костюма и аксессуаров",
    text: "Наш курс рассчитан на дизайнеров, которые хотят расширять свои границы и открывать новые грани данной профессии. Во время обучения Вы сможете изучить все теоретические аспекты истории создания дизайна, что на практике создать собственный макет, а далее и полноценное изделие.",
    current: 12,
    max: 20,
    id: "1"
  }
]);

const coursesContainer = ref<HTMLElement>();

const { width } = useElementSize(coursesContainer);

watch(width, (n) => {
  if (n < 1245) {
    coursesContainer.value?.classList.add("max");
  } else {
    coursesContainer.value?.classList.remove("max");
  }
});
</script>

<template>
  <div class="courses">
    <CoursesSwitcherType
      v-model="current"
      :list="['Все курсы', 'Активные курсы', 'Пройденные курсы', 'Каталог курсов']"
    />
    <div class="courses__content" ref="coursesContainer">
      <CoursesCard
        v-for="(v, i) of data"
        :key="i"
        :title="v.title"
        :text="v.text"
        :id="v.id"
        :current="v.current"
        :max="v.max"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.courses {
  display: flex;
  flex-direction: column;
  gap: 30px;

  &__content {
    display: flex;
    flex-direction: row;
    gap: 30px;
    flex-wrap: wrap;

    > * {
      width: calc((100% - 30px) / 2);
    }

    &.max {
      flex-direction: column;
      > * {
        width: 100%;
      }
    }
  }
}
</style>
