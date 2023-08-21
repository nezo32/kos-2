<script setup lang="ts">
defineProps<{
  picture?: string;
  title: string;
  text: string;

  id: string;

  current: number;
  max: number;
}>();

const router = useRouter();

function wrapperClick(ev: MouseEvent, id: string) {
  if ((ev.target as HTMLElement).tagName == "BUTTON") return;
  console.log((ev.target as HTMLElement).tagName);
  router.push({
    path: "/courses/" + id,
    query: {
      view: "description"
    }
  });
}
</script>

<template>
  <div class="card" @click="(ev) => wrapperClick(ev, id)">
    <img
      :src="picture ?? 'images/placeholder-card.png'"
      alt="card-image"
      width="200"
      height="250"
    />
    <div class="card__content">
      <div class="card__content__header">
        <h4 class="typography__title__5" :title="title">{{ title }}</h4>
        <CoursesCircularProcess :current="current" :max="max" />
      </div>
      <div class="card__content__text-wrapper">
        <span class="typography__text__2" :title="text">{{ text }}</span>
      </div>
      <div class="card__content__buttons">
        <button
          class="typography__text__2"
          @click="
            router.push({
              path: '/courses/' + id,
              query: {
                view: `exercise${id}`
              }
            })
          "
        >
          Пройти курс
        </button>
        <button
          class="typography__text__2"
          @click="
            router.push({
              path: '/courses/' + id,
              query: {
                view: 'description'
              }
            })
          "
        >
          Описание курса
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  cursor: pointer;

  box-sizing: border-box;
  border-radius: 10px;

  background: var(--white, #fff);
  border: 1px solid var(--white, #fff);

  padding: 20px;

  box-shadow: 0px 8px 20px 0px rgba(202, 59, 76, 0.1);

  &:hover {
    border: 1px solid var(--primary-color, #ca3b4c);
  }

  color: var(--text-color);

  display: flex;
  flex-direction: row;
  gap: 30px;

  img {
    border-radius: 10px;
    width: 200px;
    height: 250px;
  }

  &__content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &__header {
      @media screen and (max-width: 768px) {
        margin-bottom: 20px;
      }

      display: flex;
      flex-direction: row;
      justify-content: space-between;
      gap: 20px;
      h4 {
        margin: 0;
        //height: 58px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }

    &__text-wrapper {
      height: 97px;
      span {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }

    &__buttons {
      display: flex;
      flex-direction: row;
      gap: 20px;
      > * {
        cursor: pointer;
        padding: 12.5px;
        width: 100%;
        border-radius: 10px;
        border: 2px solid var(--primary-color, #ca3b4c);
        font-weight: 500;

        &:nth-child(1) {
          background: var(--primary-color, #ca3b4c);
          color: var(--white, #fff);
        }
        &:nth-child(2) {
          background: var(--white, #fff);
          color: var(--primary-color, #ca3b4c);
        }
      }
      @media screen and (max-width: 480px) {
        > * {
          &:nth-child(2) {
            display: none;
          }
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    img {
      display: none;
    }
  }
}
</style>
