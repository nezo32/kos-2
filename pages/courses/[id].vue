<script setup lang="ts">
import type { RouteLocationNormalized } from "vue-router";
import DotIcon from "@/assets/svg/dot.svg?component";

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
const currentExercise = ref(1);

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
  view.value = (n.query.view as ViewType | undefined) ?? "description";
});
onMounted(() => {
  view.value = (router.currentRoute.value.query.view as ViewType | undefined) ?? "description";
  if (!cover.value) return;
  cover.value.style.background = `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 85.94%), url(${courseCover.value}), lightgray 0px -129.87px / 100% 340.728% no-repeat`;
});
</script>

<template>
  <div class="course">
    <div class="course__header">
      <CoursesSwitcherViewType v-model="view" />
      <CoursesExerciseChoose v-model:current="currentExercise" :count="countExercises" />
    </div>
    <div class="course__content" v-if="view == 'description'">
      <img :src="courseCover" alt="courseImage" ref="cover" />
      <div class="course__content__creators">
        <article v-for="(v, i) of creators" :key="i">
          <img :src="v.image ?? '/images/placeholder.png'" alt="creatorPfp" />
          <section>
            <h5 class="typography__title__6">{{ `${v.who}: ${v.name}` }}</h5>
            <span class="typography__text__1">{{ v.desc }}</span>
          </section>
        </article>
      </div>
      <div class="course__content__description">
        <div class="course__content__description__crumbs">
          <article v-for="(v, i) of crumbs" :key="i" class="typography__text__2">{{ v }}</article>
        </div>
        <h5 class="typography__title__6">{{ courseName }}</h5>
        <span
          class="typography__text__2"
          v-html="courseDescription.replaceAll('\n', '<br /><br />')"
        />
      </div>
      <div class="course__content__inner">
        <div class="course__content__inner__header">
          <h5 class="typography__title__6">Содержание программы</h5>
          <span class="typography__text__1">Скачать программу</span>
        </div>
        <div class="course__content__inner__data">
          <article v-for="(v, i) of modules" :key="i" :class="{ active: v.open }">
            <header>
              <section>
                <IconsModuleArrowIcon @click="modules[i].open = !v.open" />
                <span class="typography__text__2">{{ `Модуль ${i + 1}: ${v.name}` }}</span>
              </section>
              <article class="typography__text__2">
                <span v-if="v.lectures">{{ `${v.lectures} лекций` }}<DotIcon /></span>
                <span v-if="v.practices">{{ `${v.practices} практик` }}<DotIcon /></span>
                <span>{{ `${v.hours} часов` }}</span>
              </article>
            </header>
            <section v-if="v.open" class="typography__text__2">
              {{ v.description }}
            </section>
          </article>
        </div>
        <button class="typography__text__2-1">Все модули</button>
      </div>
    </div>
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
  &__content {
    margin-bottom: 62px;

    display: flex;
    flex-direction: column;
    gap: 50px;
    > img {
      width: 100%;
      height: 300px;
      object-fit: cover;
      object-position: 25% 25%;
      border-radius: 10px;
    }

    &__creators {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 30px;

      > * {
        width: calc((100% - 30px) / 2);
      }

      article {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 20px;
        img {
          width: 100px;
          height: 100px;
          border-radius: 100%;
        }

        section {
          display: flex;
          flex-direction: column;
          gap: 4px;

          h5 {
            margin: 0;
          }
        }
      }
    }

    &__description {
      display: flex;
      flex-direction: column;
      gap: 20px;
      &__crumbs {
        display: flex;
        flex-direction: row;
        gap: 20px;

        article {
          padding: 10px 20px;
          border-radius: 4px;
          border: 1px solid var(--primary-color, #ca3b4c);
          color: var(--primary-color);
        }
      }
      h5 {
        margin: 0;
      }
    }

    &__inner {
      display: flex;
      flex-direction: column;
      gap: 40px;
      &__header {
        display: flex;
        flex-direction: column;
        gap: 10px;
        h5 {
          margin: 0;
        }
        span {
          cursor: pointer;
          color: var(--primary-color);
        }
      }
      &__data {
        display: flex;
        flex-direction: column;
        gap: 30px;

        article {
          border-radius: 10px;

          > header {
            padding: 23px 20px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            background: rgba(202, 59, 76, 0.1);
            border-radius: 10px;

            section {
              display: flex;
              flex-direction: row;
              align-items: center;
              gap: 20px;
            }

            article {
              display: flex;
              flex-direction: row;
              align-items: center;
              gap: 10px;
              span {
                display: flex;
                flex-direction: row;
                align-items: center;
                gap: 10px;
              }
            }
          }
          &.active {
            header {
              svg {
                transform: rotate(180deg);
              }
            }
            border: 1px solid var(--text-grey, #858585);
          }

          svg {
            transition: transform 0.2s ease-in-out;
          }

          > section {
            padding: 30px 20px 20px 20px;
          }
        }
      }
      button {
        width: fit-content;
        padding: 14.5px 60px;
        border-radius: 10px;
        background: var(--primary-color, #ca3b4c);
        border: none;
        color: var(--white);
      }
    }
  }
}
</style>
