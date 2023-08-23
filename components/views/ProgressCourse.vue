<script setup lang="ts">
import DotIcon from "@/assets/svg/dotBig.svg?component";
const data = ref<{ name: string; status: string; result?: string }[]>([
  {
    name: "Лекция: Визуальная коммуникация и графический дизайн",
    status: "Закрыто",
    result: "Проверено"
  },
  {
    name: "Лекция: Визуальная коммуникация и графический дизайн",
    status: "Доступно до 19.01.2023",
    result: "Отклонено"
  },
  {
    name: "Лекция: Визуальная коммуникация и графический дизайн",
    status: "Доступно до 25.01.2023",
    result: "Ожидает проверки"
  },
  {
    name: "Лекция: Визуальная коммуникация и графический дизайн",
    status: "Доступно после 25.02.2023"
  }
]);

const openData = ref(data.value.map(() => false));

const { width } = useWindowSize();

const cmptd = computed(() => {
  if (width.value < 768) {
    return 100;
  }
  if (width.value < 1280) {
    return 160;
  }
  return 200;
});
const cmptdInner = computed(() => {
  if (width.value < 768) {
    return 70;
  }
  if (width.value < 1280) {
    return 110;
  }
  return 140;
});

const show = computed(() => width.value > 768);

function enter(element: Element) {
  const width = getComputedStyle(element).width;

  const el = element as HTMLElement;
  el.style.width = width;
  el.style.position = "absolute";
  el.style.visibility = "hidden";
  el.style.height = "auto";

  const height = getComputedStyle(element).height;
  console.log(height);

  el.style.width = "";
  el.style.position = "";
  el.style.visibility = "";
  el.style.height = "0";

  getComputedStyle(element).height;

  requestAnimationFrame(() => {
    el.style.height = height;
  });
}

function afterEnter(element: Element) {
  const el = element as HTMLElement;
  el.style.height = "auto";
}

function leave(element: Element) {
  const el = element as HTMLElement;
  const height = getComputedStyle(element).height;

  el.style.height = height;

  getComputedStyle(element).height;

  requestAnimationFrame(() => {
    el.style.height = "0";
  });
}
</script>

<template>
  <div class="progress__course">
    <div class="progress__course__header">
      <div class="progress__course__header__gauge">
        <CoursesCircularProcess
          :current="50"
          :max="100"
          show-percents
          :size="cmptd"
          :inner-size="cmptdInner"
        >
          <template #default="{ data }">
            <h4 class="typography__title__4" style="margin: 0; color: var(--primary-color)">
              {{ `${data}%` }}
            </h4>
          </template>
        </CoursesCircularProcess>
        <section>
          <h5 class="typography__title__6">Прогресс курса</h5>
          <span class="typography__text__2">
            Этот дашборд поможет вам отслеживать ваш прогресс в прохождении курса. Вы сможете
            увидеть, сколько занятий вы прошли и сколько домашних заданий вы сдали, а также какие
            оценки вы получили. Это поможет вам понять, на каких темах вы еще должны поработать и
            как лучше подготовиться к экзамену.
          </span>
        </section>
      </div>
      <div class="progress__course__header__certificate">
        <h5 class="typography__title__6">Удостоверение</h5>
        <span class="typography__text__2">
          Вы получите удостоверение в случае успешного прохождения курса и освоение материла с выше
          85%. Не забудьте заполнить информацию о себе в личном кабинете.
        </span>
      </div>
    </div>
    <div class="progress__course__table" v-if="show">
      <table class="typography__text__2">
        <thead>
          <tr>
            <th style="width: 200px">Занятие</th>
            <th>Название</th>
            <th>Статус</th>
            <th>Результат</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(v, i) of data" :key="i">
            <td style="width: 200px">{{ `${i + 1} занятие` }}</td>
            <td>{{ v.name }}</td>
            <td
              :class="{
                green: v.status.includes('Доступно до'),
                lightgrey: v.status.includes('Закрыто'),
                grey: v.status.includes('Доступно после')
              }"
            >
              {{ v.status }}
            </td>
            <td :class="{ green: v.result == 'Проверено', red: v.result == 'Отклонено' }">
              <template v-if="v.result">{{ v.result }}</template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="progress__course__list" v-if="!show">
      <h5 class="typography__title__6">Статус занятий</h5>
      <section v-for="(v, i) of data" :class="{ active: openData[i] }">
        <header @click="openData[i] = !openData[i]">
          <aside>
            <IconsModuleArrowIcon :class="{ up: !openData[i] }" />
            {{ `${i + 1} занятие` }}
          </aside>
          <DotIcon :class="{ green: v.result == 'Проверено', red: v.result == 'Отклонено' }" />
        </header>
        <Transition name="expand" @enter="enter" @leave="leave" @after-enter="afterEnter">
          <article class="typography__text__3" v-if="openData[i]">
            <div>
              <p>Название:</p>
              <span>{{ v.name }}</span>
            </div>
            <div>
              <p>Статус:</p>
              <span
                :class="{
                  green: v.status.includes('Доступно до'),
                  lightgrey: v.status.includes('Закрыто'),
                  grey: v.status.includes('Доступно после')
                }"
                >{{ v.status }}</span
              >
            </div>
            <div v-if="v.result">
              <p>Результат:</p>
              <span :class="{ green: v.result == 'Проверено', red: v.result == 'Отклонено' }">{{
                v.result
              }}</span>
            </div>
          </article>
        </Transition>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
.expand-enter-active,
.expand-leave-active {
  transition: height 0.2s ease-in-out;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  height: 0px;
}

.progress__course {
  .green {
    color: var(--accent-green);
  }
  .grey {
    color: var(--text-grey);
  }
  .lightgrey {
    color: var(--text-meta-color);
  }
  .red {
    color: var(--primary-color);
  }

  display: flex;
  flex-direction: column;
  gap: 30px;

  color: var(--text-color);
  h5 {
    margin: 0;
  }

  &__header {
    display: flex;
    flex-direction: row;
    gap: 30px;
    justify-content: space-between;

    @media screen and (max-width: 1280px) {
      flex-direction: column;
    }

    > * {
      padding: 30px;
      border-radius: 10px;
      background: var(--white);
    }

    &__gauge {
      display: flex;
      flex-direction: row;
      gap: 30px;
      section {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      @media screen and (max-width: 768px) {
        flex-direction: column;
        justify-content: flex-start;

        > * {
          &:nth-child(1) {
            width: fit-content;
          }
        }
      }
    }
    &__certificate {
      @media screen and (max-width: 1280px) {
        width: 500px;
      }
      @media screen and (max-width: 768px) {
        width: 100%;
      }

      display: flex;
      flex-direction: column;
      gap: 10px;

      width: 350px;
      box-sizing: border-box;
      flex-shrink: 0;
    }
  }

  &__table {
    padding: 30px;
    border-radius: 10px;
    background: var(--white);

    table {
      width: 100%;
      border-collapse: collapse;

      thead {
        background: var(--background, #fbfaf8);
      }

      td,
      th {
        font-weight: 400 !important;
        line-height: 140% !important;
        border: 1px solid var(--text-meta-color, #ddd);

        text-align: center;
        padding: 20px;
        box-sizing: border-box;
      }
      td {
        &:nth-child(2) {
          text-align: left;
        }
      }
    }
  }

  &__list {
    color: var(--text-color);
    display: flex;
    flex-direction: column;
    gap: 20px;

    > section {
      &.active {
        border: 1px solid var(--primary-color);
      }

      border-radius: 10px;
      background: var(--white, #fff);
      border: 1px solid var(--white);
      padding: 20px;

      display: flex;
      flex-direction: column;
      gap: 20px;

      > header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        > aside {
          display: flex;
          flex-direction: row;
          gap: 20px;
          align-items: center;
        }

        svg {
          cursor: pointer;
          color: var(--text-grey);

          &.up {
            transform: rotate(180deg);
          }
        }
      }

      > article {
        will-change: height;
        backface-visibility: hidden;
        perspective: 1000px;
        overflow: hidden;

        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        gap: 20px;
        > div {
          display: flex;
          flex-direction: column;
          gap: 4px;
          p {
            color: var(--text-meta-color);
            margin: 0;
          }
        }
      }
    }
  }
}
</style>
