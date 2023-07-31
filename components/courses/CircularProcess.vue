<script setup lang="ts">
const props = defineProps<{
  current: number;
  max: number;
}>();

const percent = computed(() => `${(360 * ((props.current * 100) / props.max)) / 100}deg`);
</script>

<template>
  <div class="circular__process">
    <div class="circular__process__bar"></div>
    <div class="circular__process__data typography__text__6">
      <p>{{ current }}</p>
      <span>/</span>
      <span>{{ max }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.circular__process {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  &__bar {
    position: relative;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: conic-gradient(var(--primary-color), v-bind(percent), var(--text-meta-color) 0deg);
    display: flex;
    align-items: center;
    justify-content: center;

    &::before {
      content: "";
      position: absolute;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      background-color: var(--white);
    }
  }
  &__data {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 2px;
    p {
      margin: 0;
      color: var(--primary-color);
    }
  }
}
</style>
