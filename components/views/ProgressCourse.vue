<script setup lang="ts">
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
</script>

<template>
  <div class="progress__course">
    <div class="progress__course__header">
      <div class="progress__course__header__gauge">
        <CoursesCircularProcess
          :current="50"
          :max="100"
          show-percents
          :size="200"
          :inner-size="140"
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
    <div class="progress__course__table">
      <table class="typography__text__2">
        <thead>
          <tr>
            <th>Занятие</th>
            <th>Название</th>
            <th>Статус</th>
            <th>Результат</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(v, i) of data" :key="i">
            <td>{{ `${i + 1} занятие` }}</td>
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
  </div>
</template>

<style scoped lang="scss">
.progress__course {
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
    }
    &__certificate {
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
      }

      td {
        &.green {
          color: var(--accent-green);
        }
        &.grey {
          color: var(--text-grey);
        }
        &.lightgrey {
          color: var(--text-meta-color);
        }
        &.red {
          color: var(--primary-color);
        }
      }
    }
  }
}
</style>
