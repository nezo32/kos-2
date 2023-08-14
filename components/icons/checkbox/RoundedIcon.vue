<script setup lang="ts">
defineProps<{ active?: boolean }>();
</script>

<template>
  <svg
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    v-if="active"
  >
    <g clip-path="url(#clip0_495_44659)">
      <circle cx="12.5" cy="12.5" r="11" stroke="#CA3B4C" stroke-width="2" />
      <circle cx="12.5" cy="12.5" r="8" fill="#CA3B4C" />
    </g>
    <defs>
      <clipPath id="clip0_495_44659">
        <rect width="25" height="25" fill="white" transform="translate(0 0.5)" />
      </clipPath>
    </defs>
  </svg>
  <svg
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    v-if="!active"
  >
    <g id="Frame 8995" clip-path="url(#clip0_495_44662)">
      <circle id="Ellipse 233" cx="12.5" cy="12.5" r="11" stroke="#CA3B4C" stroke-width="2" />
    </g>
    <defs>
      <clipPath id="clip0_495_44662">
        <rect width="25" height="25" fill="white" />
      </clipPath>
    </defs>
  </svg>
</template>

<style scoped lang="scss"></style>
