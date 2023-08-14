<script setup lang="ts">
const props = defineProps<{
  list: string[];
  modelValue?: number;
}>();
const emit = defineEmits(["update:modelValue"]);

const activeList = ref(props.list.map((el) => false));
activeList.value[0] = true;

function clickHandler(i: number) {
  activeList.value.forEach((_, i) => (activeList.value[i] = false));
  activeList.value[i] = true;
  emit("update:modelValue", i);
}
</script>

<template>
  <div class="switcher">
    <button
      class="typography__text__3"
      v-for="(v, i) of list"
      :key="i"
      :class="{ active: activeList[i] }"
      @click="clickHandler(i)"
    >
      {{ v }}
    </button>
  </div>
</template>

<style scoped lang="scss">
.switcher {
  display: flex;
  flex-direction: row;
  gap: 20px;
  button {
    cursor: pointer;
    padding: 13px 25px;
    border-radius: 6px;
    color: var(--text-color);
    background: none;
    border: none;
    &:hover {
      color: var(--primary-color);
    }
    &.active {
      color: var(--white);
      background: var(--primary-color);
    }
  }
}
</style>
