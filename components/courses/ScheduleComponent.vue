<script setup lang="ts">
const dateInstance = ref(new Date());

const currentMonth = computed(() => dateInstance.value.toLocaleString("ru-RU", { month: "long" }));
const prevMonth = computed(() => {
  const index = dateInstance.value.getMonth() - 1;
  const tmpDate = new Date(dateInstance.value.getFullYear(), index);
  return { name: tmpDate.toLocaleString("ru-RU", { month: "long" }), index };
});
const nextMonth = computed(() => {
  const index = dateInstance.value.getMonth() + 1;
  const tmpDate = new Date(dateInstance.value.getFullYear(), index);
  return { name: tmpDate.toLocaleString("ru-RU", { month: "long" }), index };
});
const content = shallowRef(setCalendar());

function setCalendar() {
  const data: { content: string; date: number; currentMonth?: boolean; instance: Date }[] = [];

  const currentYearMonth = dateInstance.value;

  const date = new Date(currentYearMonth.getFullYear(), currentYearMonth.getMonth());
  const init = new Date(date);

  const prev: Date[] = [];
  while (date.getDay() != 1) {
    date.setDate(date.getDate() - 1);
    const tmp = new Date(date);
    prev.push(tmp);
  }

  for (let index = prev.length - 1; index >= 0; index--) {
    data.push({
      content: "",
      date: prev[index].getDate(),
      currentMonth: false,
      instance: prev[index]
    });
  }

  const curr = new Date(init);
  while (curr.getMonth() == init.getMonth()) {
    const tmp = new Date(curr);
    data.push({
      content:
        "Семинар: Визуальная коммуникация и графический дизайн и еще чего-то там но это не точно",
      date: tmp.getDate(),
      currentMonth: true,
      instance: tmp
    });
    curr.setDate(curr.getDate() + 1);
  }

  const next: Date[] = [];
  while (curr.getDay() != 1) {
    const tmp = new Date(curr);
    next.push(tmp);
    curr.setDate(curr.getDate() + 1);
  }

  for (let value of next) {
    data.push({
      content: "",
      date: value.getDate(),
      currentMonth: false,
      instance: value
    });
  }

  return data;
}

function changeMonth(monthIndex: number) {
  const tmpDate = new Date(dateInstance.value);
  tmpDate.setMonth(monthIndex);
  dateInstance.value = tmpDate;
}

onUpdated(() => {
  content.value = setCalendar();
});
</script>

<template>
  <div class="schedule">
    <div class="schedule__header">
      <div class="schedule__header__wrapper">
        <section class="typography__text__1" @click="changeMonth(prevMonth.index)">
          <IconsPageSwitchArrow />
          {{ prevMonth.name }}
        </section>
        <article class="typography__title__7">
          {{ `Расписание занятий на ${currentMonth} ${dateInstance.getFullYear()}` }}
        </article>
        <section class="typography__text__1" @click="changeMonth(nextMonth.index)">
          {{ nextMonth.name }}
          <IconsPageSwitchArrow class="right" />
        </section>
      </div>
    </div>
    <div class="schedule__content">
      <header class="typography__text__2">
        <span>Понедельник</span>
        <span>Вторник</span>
        <span>Среда</span>
        <span>Четверг</span>
        <span>Пятница</span>
        <span>Суббота</span>
        <span>Воскресенье</span>
      </header>
      <section>
        <article v-for="(v, i) of content" :key="i" :class="{ unactive: !v.currentMonth }">
          <h5
            class="typography__text__2"
            :class="{
              active:
                v.date == new Date().getDate() && v.instance.getMonth() == new Date().getMonth()
            }"
          >
            <article>
              {{ v.date }}
            </article>
          </h5>
          <div>
            <span class="typography__text__3" :title="v.content">{{ v.content }}</span>
          </div>
        </article>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
.unactive {
  color: var(--text-grey);
}
.schedule {
  padding: 50px 30px 30px 30px;
  border-radius: 10px;
  background: var(--white);
  color: var(--text-color);

  display: flex;
  flex-direction: column;
  gap: 30px;

  &__header {
    display: flex;
    justify-content: center;
    &__wrapper {
      width: 840px;

      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      article {
        min-width: 450px;
      }

      section {
        &:first-child {
          justify-content: flex-start;
        }
        &:nth-child(3) {
          justify-content: flex-end;
        }

        user-select: none;
        cursor: pointer;
        display: flex;
        flex-direction: row;

        gap: 10px;
        align-items: center;
        text-transform: capitalize;
        min-width: 125px;

        color: var(--text-meta-color);

        &:hover {
          color: var(--primary-color);
        }
        svg {
          &.right {
            transform: rotate(180deg);
          }
        }
      }
    }
  }

  &__content {
    border: 0.5px solid var(--schedule-border);
    display: flex;
    flex-direction: column;
    header {
      display: flex;
      align-items: center;
      width: 100%;
      > * {
        border: 0.5px solid var(--schedule-border);
        padding: 37.5px 0px;
        text-align: center;
        width: calc(100% / 7);
      }
    }
    section {
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      > * {
        width: calc(100% / 7);
      }
      article {
        h5 {
          &.active {
            display: flex;
            justify-content: center;
            padding: 5px 0px;

            article {
              display: flex;
              justify-content: center;
              align-items: center;

              color: var(--white);
              width: 35px;
              height: 35px;
              border-radius: 100%;
              background: var(--primary-color, #ca3b4c);
            }
          }

          text-decoration: none;
          background: var(--background);
          padding: 10px 0px;
          border: 0.5px solid var(--schedule-border);
          text-align: center;
          margin: 0;
        }
        div {
          box-sizing: border-box;
          height: 120px;
          border: 0.5px solid var(--schedule-border);
          padding: 20px;
          span {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}
</style>
