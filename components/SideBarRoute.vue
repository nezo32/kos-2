<script setup lang="ts">
defineProps<{
  to: string;
  title: string;
  icon: Component;
  hideText?: boolean;
}>();
</script>

<template>
  <div class="side-bar__route">
    <NuxtLink :to="to">
      <component :is="icon" style="flex-shrink: 0" />
      <span class="typography__text__2" v-if="!hideText">{{ title }}</span>
    </NuxtLink>
  </div>
</template>

<style scoped lang="scss">
.side-bar__route {
  a {
    height: 46px;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 10px 14px;

    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;

    color: var(--white, #fff);
    text-decoration: none;

    &.router-link-active,
    &:hover {
      background: var(--white, #fff);
      color: var(--primary-color, #ca3b4c);
    }

    span {
      overflow: hidden;
    }
  }
}
</style>
