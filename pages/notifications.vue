<script setup lang="ts">
import type { RouteLocationNormalized } from "vue-router";

definePageMeta({
  pageName: async (r: RouteLocationNormalized) => "Мои уведомления"
});

const data = ref<{ title: string; text: string; pictureUrl?: string; ago: string }[]>([
  {
    title: "Менеджмент организации. Специализация байер",
    text: "Ваше задание было успешно проверено! Можете продолжать изучение курса. Ваше задание было успешно проверено! Можете продолжать изучение курса.Ваше задание было успешно проверено! Можете продолжать изучение курса.Ваше задание было успешно проверено! Можете продолжать изучение курса.Ваше задание было успешно проверено! Можете продолжать изучение курса.Ваше задание было успешно проверено! Можете продолжать изучение курса",
    ago: "21 час назад"
  },
  {
    title: "Менеджмент организации. Специализация байер",
    text: "Ваше задание было успешно проверено! Можете продолжать изучение курса",
    ago: "21 час назад"
  },
  {
    title: "Менеджмент организации. Специализация байер",
    text: "Ваше задание было успешно проверено! Можете продолжать изучение курса",
    ago: "21 час назад"
  }
]);
</script>

<template>
  <div class="notifications">
    <section v-for="(v, i) of data" :key="i">
      <img :src="v.pictureUrl ?? '/images/ph.png'" alt="notificationImage" />
      <article>
        <header>
          <h5 class="typography__title__7-3">{{ v.title }}</h5>
          <span class="typography__text__2" :title="v.text">{{ v.text }}</span>
        </header>
        <span class="typography__text__3-2">{{ v.ago }}</span>
      </article>
    </section>
  </div>
</template>

<style scoped lang="scss">
.notifications {
  color: var(--text-color);
  display: flex;
  flex-direction: column;
  gap: 30px;
  section {
    box-sizing: border-box;
    border-radius: 10px;
    background: var(--white);
    box-shadow: 0px 8px 20px 0px rgba(202, 59, 76, 0.1);

    padding: 20px 30px 20px 20px;
    display: flex;
    flex-direction: row;
    gap: 32px;
    align-content: center;

    img {
      flex-shrink: 0;

      @media screen and (max-width: 1280px) {
        width: 80px;
        height: 80px;
      }

      object-fit: cover;
      object-position: 25% 25%;
      border-radius: 10px;
      width: 140px;
      height: 140px;
    }

    article {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 10px;

      header {
        overflow: hidden;

        display: flex;
        flex-direction: column;
        gap: 20px;
        h5,
        span {
          flex-shrink: 0;
          margin: 0;
        }
      }

      > span {
        flex-shrink: 0;
        color: var(--text-grey);
      }
    }
  }
}
</style>
