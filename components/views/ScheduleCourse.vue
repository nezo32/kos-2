<script setup lang="ts">
type DataType = {
  month: string;
  date: number;
  crumbs: string;
  header: string;
  adress: string;
  content: string;
  time: string;
};

const data = ref<DataType[]>([
  {
    adress: "г. Москва, ул. Малая Калужская, д. 1, ауд. 1444",
    content:
      "Ротор векторного поля, исключая очевидный случай, порождает интеграл по поверхности, что и требовалось доказать. Расходящийся ряд, следовательно, оправдывает определитель системы линейных уравнений. Линейное уравнение упорядочивает косвенный постулат. Правда, некоторые специалисты отмечают, что связное множество развивает коллинеарный предел функции. Огибающая, как следует из вышесказанного, поддерживает тригонометрический функциональный анализ.",
    crumbs: "10.05.2023",
    time: "18:00 - 19:30",
    date: 10,
    month: "май",
    header: "Лекция: Визуальная коммуникация и графический дизайн"
  },
  {
    adress: "г. Москва, ул. Малая Калужская, д. 1, ауд. 1444",
    content:
      "Ротор векторного поля, исключая очевидный случай, порождает интеграл по поверхности, что и требовалось доказать. Расходящийся ряд, следовательно, оправдывает определитель системы линейных уравнений. Линейное уравнение упорядочивает косвенный постулат. Правда, некоторые специалисты отмечают, что связное множество развивает коллинеарный предел функции. Огибающая, как следует из вышесказанного, поддерживает тригонометрический функциональный анализ. Ротор векторного поля, исключая очевидный случай, порождает интеграл по поверхности, что и требовалось доказать. Расходящийся ряд, следовательно, оправдывает определитель системы линейных уравнений. Линейное уравнение упорядочивает косвенный постулат. Правда, некоторые специалисты отмечают, что связное множество развивает коллинеарный предел функции. Огибающая, как следует из вышесказанного, поддерживает тригонометрический функциональный анализ.",
    crumbs: "10.05.2023",
    time: "18:00 - 19:30",
    date: 10,
    month: "май",
    header: "Лекция: Визуальная коммуникация и графический дизайн"
  }
]);

const { width } = useWindowSize();
const show = computed(() => width.value > 1280);
</script>

<template>
  <div class="schedule__course">
    <CoursesScheduleComponent v-if="show" />
    <div class="schedule__course__content">
      <section v-for="(v, i) of data" :key="i">
        <h5 style="color: black">
          <span class="typography__text__1">{{ v.month }}</span>
          <span class="typography__title__4-2">{{ v.date }}</span>
        </h5>
        <article>
          <div>
            <span class="typography__text__2"
              >{{ v.crumbs }} <span style="color: var(--primary-color)">{{ v.time }}</span></span
            >
            <h5 class="typography__title__7-2">{{ v.header }}</h5>
            <span class="typography__text__2">{{ v.adress }}</span>
          </div>
          <span class="typography__text__2" :title="v.content">
            {{ v.content }}
          </span>
        </article>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
.schedule__course {
  display: flex;
  flex-direction: column;
  gap: 50px;

  &__content {
    color: var(--text-color);

    display: flex;
    flex-direction: column;
    gap: 50px;

    section {
      display: flex;
      flex-direction: row;
      gap: 80px;

      @media screen and (max-width: 1000px) {
        gap: 35px;
      }
      @media screen and (max-width: 768px) {
        flex-direction: column;
      }

      h5 {
        span {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-transform: uppercase;
          gap: 4px;
        }
      }

      article {
        display: flex;
        flex-direction: column;
        gap: 20px;

        div {
          display: flex;
          flex-direction: column;
          gap: 10px;
          h5 {
            margin: 0;
          }
        }
      }
    }
  }
}
</style>
