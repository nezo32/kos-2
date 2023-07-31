<script setup lang="ts">
defineProps<{
  picture?: string;
  title: string;
  text: string;

  passId: string;
  descId: string;

  current: number;
  max: number;
}>();

const route = useRoute();
const router = useRouter();
</script>

<template>
  <div class="card">
    <img
      :src="picture ?? 'images/placeholder-card.png'"
      alt="card-image"
      width="200"
      height="250"
    />
    <div class="card__content">
      <div class="card__content__header">
        <h4 class="typography__title__5">{{ title }}</h4>
      </div>
      <div class="card__content__text-wrapper">
        <span class="typography__text__2">{{ text }}</span>
      </div>
      <div class="card__content__buttons">
        <button class="typography__text__2" @click="router.push('/courses/' + passId)">
          Пройти курс
        </button>
        <button class="typography__text__2" @click="router.push('/courses/' + descId)">
          Описание курса
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  box-sizing: border-box;
  border-radius: 10px;

  background: var(--white, #fff);
  padding: 20px;

  box-shadow: 0px 8px 20px 0px rgba(202, 59, 76, 0.1);

  color: var(--text-color);

  display: flex;
  flex-direction: row;
  gap: 30px;

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &__header {
      h4 {
        margin: 0;
        height: 58px;
      }
    }

    &__text-wrapper {
      width: 472px;
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
        padding: 14.5px;
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
    }
  }
}
</style>
