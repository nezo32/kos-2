<script setup lang="ts">
import type { PropsType } from "types";
import Card from "components/courses/Card.vue";

definePageMeta({
  alias: "/",
  name: "Мои курсы"
});

const current = ref(0);

const data = ref<PropsType<typeof Card>[]>([
  {
    title: "Менеджмент организации. Специализация байер",
    text: "Специализация «байер» обучает основам управления закупками и управления поставками. Студенты изучат методы и процедуры закупок, а также научатся определять требования рынка и принимать решения в соответствии с этими требованиями.",
    current: 12,
    max: 20,
    descId: "1",
    passId: "1"
  },
  {
    title: "Менеджмент организации. Специализация байер",
    text: "Специализация «байер» обучает основам управления закупками и управления поставками. Студенты изучат методы и процедуры закупок, а также научатся определять требования рынка и принимать решения в соответствии с этими требованиями.",
    current: 12,
    max: 20,
    descId: "1",
    passId: "1"
  },
  {
    title: "Менеджмент организации. Специализация байер",
    text: "Специализация «байер» обучает основам управления закупками и управления поставками. Студенты изучат методы и процедуры закупок, а также научатся определять требования рынка и принимать решения в соответствии с этими требованиями.",
    current: 12,
    max: 20,
    descId: "1",
    passId: "1"
  }
]);
</script>

<template>
  <div class="courses">
    <CoursesSwticher v-model="current" />
    <div class="courses__content">
      <CoursesCard
        v-for="(v, i) of data"
        :key="i"
        :title="v.title"
        :text="v.text"
        :desc-id="v.descId"
        :pass-id="v.passId"
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
  }
}
</style>
