<script setup lang="ts">
const span = ref(
  `Ротор векторного поля, исключая очевидный случай, порождает интеграл по поверхности, что и требовалось доказать. Расходящийся ряд, следовательно, оправдывает определитель системы линейных уравнений. Линейное уравнение упорядочивает косвенный постулат. Правда, некоторые специалисты отмечают, что связное множество развивает коллинеарный предел функции. Огибающая, как следует из вышесказанного, поддерживает тригонометрический функциональный анализ.`
);

const questinons = ref([
  {
    decs: "При нагревании объем газа:"
  }
]);
</script>

<template>
  <div class="testing__exercise">
    <span class="typography__text__2">{{ span }}</span>
    <section>
      <article v-for="(v, i) of questinons" :key="i">
        <header>
          <p class="typography__text__2-1">{{ `${i + 1}. Вопрос` }}</p>
          <span class="typography__text__2">{{ v.decs }}</span>
        </header>
      </article>
    </section>
  </div>
</template>

<style scoped lang="scss">
.testing__exercise {
  display: flex;
  flex-direction: column;
  gap: 30px;
  > section {
    padding: 50px;
    border-radius: 10px;
    background: var(--white);

    > article {
      display: flex;
      flex-direction: column;
      gap: 30px;
      > header {
        display: flex;
        flex-direction: column;
        gap: 10px;
        > p {
          margin: 0;
        }
      }
    }
  }
}
</style>
