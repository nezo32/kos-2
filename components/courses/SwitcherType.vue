<script setup lang="ts">
const props = defineProps<{
  list: string[];
  modelValue?: number;
}>();
const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="switcher">
    <button
      class="typography__menu-upper"
      v-for="(v, i) of list"
      :key="i"
      :class="{ active: i == modelValue }"
      @click="emit('update:modelValue', i)"
    >
      {{ v }}
    </button>
  </div>
</template>

<style scoped lang="scss">
.switcher {
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 1280px) {
    width: 100%;

    > * {
      width: 100%;
    }

    button {
      padding: 13px 0px !important;
    }
  }

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

  @media screen and (max-width: 768px) {
    overflow: auto;

    max-width: calc(100vw - 40px);

    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }

    gap: 20px;
    button {
      white-space: nowrap;
      padding: 0;
      border-radius: 0;
      padding-bottom: 4px !important;
      border-bottom: 1px solid transparent;

      &.active {
        color: var(--primary-color);
        padding-bottom: 4px;
        border-bottom: 1px solid var(--primary-color);

        background: none;
      }
    }
  }
  @media screen and (max-width: 480px) {
    max-width: calc(100vw - 20px);
  }
}
</style>
