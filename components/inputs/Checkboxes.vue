<script setup lang="ts">
defineProps<{
  data: string[];
  modelValue: number;
}>();
const emits = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="checkboxes">
    <section v-for="(v, i) of data" :key="i" @click="emits('update:modelValue', i)">
      <IconsCheckboxRoundedIcon :active="modelValue == i" />
      <span class="typography__text__2">{{ v }}</span>
    </section>
  </div>
</template>

<style scoped lang="scss">
.checkboxes {
  display: flex;
  flex-direction: row;
  gap: 30px;
  align-items: center;

  section {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 15px;
  }
}
</style>
