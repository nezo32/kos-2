<script setup lang="ts">
const props = defineProps<{
  current: number;
  max: number;

  size?: number;
  innerSize?: number;
  showPercents?: boolean;
}>();

const angle = computed(() => `${(360 * ((props.current * 100) / props.max)) / 100}deg`);
const percents = computed(() => `${(props.current * 100) / props.max}`);
const wh = computed(() => `${props.size ?? 30}px`);
const innerwh = computed(() => `${props.innerSize ?? 20}px`);
</script>

<template>
  <div class="circular__process">
    <div class="circular__process__bar">
      <div class="circular__process__bar__percents" v-if="showPercents">
        <slot :data="percents" />
      </div>
    </div>
    <div class="circular__process__data typography__text__6" v-if="!showPercents">
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
    width: v-bind(wh);
    height: v-bind(wh);
    border-radius: 50%;
    background: conic-gradient(var(--primary-color), v-bind(angle), var(--text-meta-color) 0deg);
    display: flex;
    align-items: center;
    justify-content: center;

    &::before {
      content: "";
      position: absolute;
      border-radius: 50%;
      width: v-bind(innerwh);
      height: v-bind(innerwh);
      background-color: var(--white);
    }

    &__percents {
      position: absolute;
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
