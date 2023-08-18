<script setup lang="ts">
defineProps<{
  index: number;
}>();

const header = ref({
  name: "Лекция: Визуальная коммуникация и графический дизайн",
  date: "01 мая 2023",
  status: "ожидает проверки"
});
const teacher = ref<{ name: string; desc: string; who: string; img?: string }>({
  who: "Преподаватель",
  name: "Османов Заур Нурбиевич",
  desc: "Доктор экономических наук, профессор кафедры Художественного моделирования, конструирования и технологии изделий из кожи РГУ им. А.Н. Косыгина."
});
const desc =
  ref(`Ротор векторного поля, исключая очевидный случай, порождает интеграл по поверхности, что и требовалось доказать. Расходящийся ряд, следовательно, оправдывает определитель системы линейных уравнений. Линейное уравнение упорядочивает косвенный постулат. Правда, некоторые специалисты отмечают, что связное множество развивает коллинеарный предел функции. Огибающая, как следует из вышесказанного, поддерживает тригонометрический функциональный анализ.
Интеграл Дирихле категорически трансформирует абсолютно сходящийся ряд. Разрыв функции решительно продуцирует интеграл Гамильтона. Полином, в первом приближении, нормально распределен. Двойной интеграл, общеизвестно, в принципе ускоряет абстрактный натуральный логарифм, явно демонстрируя всю чушь вышесказанного. Аффинное преобразование, следовательно, поддерживает невероятный абсолютно сходящийся ряд. Дивергенция векторного поля изоморфна.
Лемма транслирует математический анализ, что несомненно приведет нас к истине. Теорема Гаусса - Остроградского раскручивает двойной интеграл. Интеграл от функции, обращающейся в бесконечность вдоль линии, исключая очевидный случай, последовательно синхронизирует ряд Тейлора. Первообразная функция по-прежнему востребована. Критерий сходимости Коши иррационален. Наибольшее и наименьшее значения функции, следовательно, продуцирует равновероятный функциональный анализ.`);
const structure = ref([
  "Введение в тему визуальной коммуникации и графического дизайна.",
  "Основные принципы дизайна: композиция, цвет, шрифты, текстуры, пропорции и баланс.",
  "Роль визуальной коммуникации в маркетинге и брендинге.",
  "История развития графического дизайна: от искусства до современных технологий.",
  "Техники создания дизайна: от ручной работы до компьютерных программ.",
  "Примеры успешных графических решений: логотипы, упаковка, реклама, интерфейсы и прочее."
]);
const files = ref([
  {
    name: "Основы графического дизайна.pdf",
    url: "https://filesamples.com/samples/document/doc/sample2.doc"
  },
  {
    name: "История развития графического дизайна.docx",
    url: "https://filesamples.com/samples/document/doc/sample2.doc"
  },
  {
    name: "Примеры успешных графических решений.pptx",
    url: "https://filesamples.com/samples/document/doc/sample2.doc"
  },
  {
    name: "Домашнее задание.zip",
    url: "https://filesamples.com/samples/document/doc/sample2.doc"
  }
]);

const iframe = ref();
const { width } = useElementSize(iframe);

const height = computed(() => width.value / 1.78 + "px");
</script>

<template>
  <div class="exersise__course">
    <div class="exersise__course__header">
      <section>
        <article>
          <h5 class="typography__title__7-2">{{ header.name }}</h5>
          <span class="typography__text__2">{{ `Занятие доступно до ${header.date}` }}</span>
        </article>
        <span class="typography__text__1">
          <span>статус: </span>
          <span>{{ header.status }}</span>
        </span>
      </section>
      <div class="exersise__course__header__teacher">
        <img :src="teacher.img ?? '/images/ph.png'" alt="teacherPfp" />
        <section>
          <p class="typography__text__2">{{ teacher.who }}</p>
          <h5 class="typography__title__7-3">{{ teacher.name }}</h5>
          <span class="typography__text__2">{{ teacher.desc }}</span>
        </section>
      </div>
      <div class="exersise__course__header__about">
        <h6 class="typography__title__8">Описание занятия</h6>
        <span class="typography__text__2" v-html="desc.replaceAll('\n', '<br /><br />')"></span>
      </div>
    </div>
    <div class="exersise__course__structure">
      <iframe
        ref="iframe"
        width="890"
        height="500"
        src="https://www.youtube.com/embed/Q7nMll_BSwI"
        title="Хайлайты Талалы за Октябрь 2022 | talala twitch highlights | OWC 2022"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      />
      <section>
        <h6 class="typography__title__8">Структура занятия</h6>
        <span v-for="(v, i) of structure" :key="i">
          <p class="typography__title__8">{{ i + 1 }}</p>
          <span class="typography__text__2">{{ v }}</span>
        </span>
      </section>
    </div>
    <div class="exersise__course__additional-files">
      <h6 class="typography__title__8">Дополнительные файлы</h6>
      <section>
        <a v-for="(v, i) of files" :key="i" :href="v.url">
          <IconsDocDownloadIcon />
          <span>{{ v.name }}</span>
        </a>
      </section>
    </div>
    <div class="exersise__course__testing">
      <h6 class="typography__title__8">Тестирование</h6>
      <CoursesTestingExercise />
    </div>
  </div>
</template>

<style scoped lang="scss">
.exersise__course {
  display: flex;
  flex-direction: column;
  gap: 50px;

  color: var(--text-color);

  iframe {
    @media screen and (max-width: 1600px) {
      height: v-bind(height);
    }
  }

  &__header {
    display: flex;
    flex-direction: column;
    gap: 30px;
    > section {
      @media screen and (max-width: 1600px) {
        flex-direction: column-reverse;
      }
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
      h5 {
        margin: 0;
      }

      article {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      > span {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;

        > span {
          &:nth-child(2) {
            color: var(--primary-color);
          }
        }
      }
    }
    &__teacher {
      display: flex;
      flex-direction: row;
      gap: 20px;
      width: 50%;
      @media screen and (max-width: 1600px) {
        width: 70%;
      }
      @media screen and (max-width: 1000px) {
        width: 100%;
      }
      @media screen and (max-width: 768px) {
        flex-direction: column;
      }
      > img {
        flex-shrink: 0;
        width: 150px;
        height: 150px;
        object-fit: cover;
        object-position: 25% 25%;
        border-radius: 10px;
      }
      > section {
        display: flex;
        flex-direction: column;
        gap: 5px;

        > h5,
        p {
          margin: 0;
        }

        > p {
          color: var(--text-meta-color);
        }

        > span {
          margin-top: 5px;
        }
      }
    }
    &__about {
      display: flex;
      flex-direction: column;
      gap: 20px;
      > h6 {
        margin: 0;
      }
    }
  }

  &__structure {
    @media screen and (max-width: 1600px) {
      flex-direction: column-reverse;
      iframe {
        width: 100%;
      }
    }

    display: flex;
    flex-direction: row;
    gap: 30px;

    section {
      display: flex;
      flex-direction: column;
      gap: 20px;

      > span {
        display: flex;
        flex-direction: row;
        gap: 20px;

        > p {
          display: flex;
          align-items: center;
          justify-content: center;

          flex-shrink: 0;
          color: var(--white);
          background: var(--primary-color);
          height: fit-content;
          width: 30px;
          height: 30px;
          border-radius: 100%;
        }
      }
    }
    iframe {
      border-radius: 10px;
    }
    h6,
    p {
      margin: 0;
    }
  }
  &__additional-files {
    display: flex;
    flex-direction: column;
    gap: 30px;
    > h6 {
      margin: 0;
    }

    > section {
      display: flex;
      flex-direction: column;
      gap: 18px;

      > a {
        &:hover {
          span {
            color: var(--primary-color);
          }
        }

        text-decoration: none;
        color: var(--primary-color);
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 20px;

        span {
          color: var(--text-color);
        }
      }
    }
  }
  &__testing {
    display: flex;
    flex-direction: column;
    gap: 10px;
    > h6 {
      margin: 0;
    }
  }
}
</style>
