<script setup lang="ts">
defineProps<{
  current: number;
  max: number;
}>();
</script>

<template>
  <div class="circular__process">
    <div class="circular__process__bar"></div>
  </div>
</template>

<style scoped lang="scss"></style>
