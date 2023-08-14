<script setup lang="ts">
import type { RouteLocationNormalized } from "vue-router";

definePageMeta({
  pageName: async (r: RouteLocationNormalized) => "Курс"
});
type ViewType = "description" | "progress" | "schedule";

const router = useRouter();

const cover = ref<HTMLImageElement>();

const view = ref<ViewType>(
  (router.currentRoute.value.query.view as ViewType | undefined) ?? "description"
);
const countExercises = ref(21);
const currentExercise = ref(0);

const courseCover = ref("/images/placeholder-course.png");
const crumbs = ref(["Менеджмент и сервис", "Начальный", "Очный"]);
const courseName = ref("Товароведение и экспертиза товаров");
const courseDescription =
  ref(`Хотите стать опытным и востребованным товароведом, не останавливающимся в обучении? Мы предлагаем расширить свои знания и улучшить практические навыки в области товароведения и экспертизы товаров!
Студенты, обучающиеся на данном курсе, изучают теоретические аспекты товароведения и экспертизы товаров, а также приобретают практические навыки в оценке качества товаров и услуг, анализе рынка и спроса на товары и услуги, оценке рисков в данной области. Курс предназначен для всех, кто интересуется работой в сфере товароведения и экспертизы товаров, включая менеджеров по продажам, покупателей и других специалистов в этой области.
В процессе обучения вы изучите теоретические основы товароведения и экспертизы товаров, основы экспертизы, стандартизации и подтверждения соответствия, технологии и методы оценки качества товаров и услуг, анализ и прогнозирование спроса на товары и услуги, оценка рисков, а также логистика, таможенная экспертиза и многое другое.
Обучение проходит в вечернее время, так что вы спокойно сможете осваивать новую специальность без отрыва от основной деятельности!`);

const modules = ref<
  {
    name: string;
    lectures?: number;
    practices?: number;
    hours: number;
    description: string;
    open?: boolean;
  }[]
>([
  {
    name: "Основы менеджмента",
    lectures: 5,
    practices: 10,
    hours: 40,
    description:
      "Особенности маркетинга для байеров. Маркетинговые коммуникации. Поведение потребителей. Мерчандайзинг"
  },
  {
    name: "Маркетинг",
    practices: 10,
    hours: 40,
    description:
      "Особенности маркетинга для байеров. Маркетинговые коммуникации. Поведение потребителей. Мерчандайзинг"
  },
  {
    name: "Организационное поведение",
    lectures: 5,
    hours: 40,
    description:
      "Особенности маркетинга для байеров. Маркетинговые коммуникации. Поведение потребителей. Мерчандайзинг"
  }
]);
const creators = ref<{ image?: string; name: string; who: string; desc: string }[]>([
  {
    name: "Ветрова Екатерина Александровна",
    who: "Разработчик",
    desc: "Доцент кафедры Финансов и бизнес-аналитики РГУ им. А.Н. Косыгина, кандидат экономических наук, доцент. Опыт преподавания более 15 лет. Автор различных учебных пособий в сфере экономики и управления."
  },
  {
    name: "Леденева Ирина Николаевна",
    who: "Разработчик",
    desc: "Кандидат технических наук, профессор кафедры Художественного моделирования, конструирования и технологии изделий из кожи РГУ им. А.Н. Косыгина."
  },
  {
    name: "Федоров Владислав",
    who: "Разработчик",
    desc: "Профессор, доктор экономических наук"
  }
]);

watch(router.currentRoute, (n) => {
  currentExercise.value = 0;
  view.value = (n.query.view as ViewType | undefined) ?? "description";
});
onMounted(() => {
  view.value = (router.currentRoute.value.query.view as ViewType | undefined) ?? "description";
  if (!cover.value) return;
  cover.value.style.background = `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 85.94%), url(${courseCover.value}), lightgrey 0px -129.87px / 100% 340.728% no-repeat`;
});
</script>

<template>
  <div class="course">
    <div class="course__header">
      <CoursesSwitcherViewType v-model="view" />
      <CoursesExerciseChoose v-model:current="currentExercise" :count="countExercises" />
    </div>
    <ViewsAboutCourse
      :course-cover="courseCover"
      :course-description="courseDescription"
      :course-name="courseName"
      :creators="creators"
      :crumbs="crumbs"
      :modules="modules"
      v-if="currentExercise == 0 && view == 'description'"
    />
    <ViewsProgressCourse v-else-if="currentExercise == 0 && view == 'progress'" />
    <ViewsScheduleCourse v-else-if="currentExercise == 0 && view == 'schedule'" />
    <ViewsExerciseCourse v-if="currentExercise != 0" :index="currentExercise" />
  </div>
</template>

<style scoped lang="scss">
.course {
  color: var(--text-color);
  display: flex;
  flex-direction: column;
  gap: 30px;
  &__header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  > * {
    &:nth-child(2) {
      margin-bottom: 60px;
    }
  }
}
</style>
