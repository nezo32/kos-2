<script setup lang="ts">
defineProps<{ active?: boolean }>();
</script>

<template>
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    v-if="active"
  >
    <g
      id="&#208;&#167;&#208;&#181;&#208;&#186;&#208;&#177;&#208;&#190;&#208;&#186;&#209;&#129;=&#208;&#151;&#208;&#176;&#208;&#191;&#208;&#190;&#208;&#187;&#208;&#189;&#208;&#181;&#208;&#189;"
      clip-path="url(#clip0_321_14319)"
    >
      <rect
        id="Rectangle 359"
        x="1"
        y="1"
        width="22"
        height="22"
        rx="3"
        stroke="currentColor"
        stroke-width="2"
      />
      <rect id="Rectangle 1493" x="4" y="4" width="16" height="16" rx="2" fill="currentColor" />
    </g>
    <defs>
      <clipPath id="clip0_321_14319">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    v-if="!active"
  >
    <g
      id="&#208;&#167;&#208;&#181;&#208;&#186;&#208;&#177;&#208;&#190;&#208;&#186;&#209;&#129;=&#208;&#157;&#208;&#181; &#208;&#183;&#208;&#176;&#208;&#191;&#208;&#190;&#208;&#187;&#208;&#189;&#208;&#181;&#208;&#189;"
      clip-path="url(#clip0_321_14318)"
    >
      <rect
        id="Rectangle 1494"
        x="1"
        y="1"
        width="22"
        height="22"
        rx="3"
        stroke="currentColor"
        stroke-width="2"
      />
    </g>
    <defs>
      <clipPath id="clip0_321_14318">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
</template>

<style scoped lang="scss"></style>
