<script setup lang="ts"></script>

<template>
  <article>
    <header @click="modules[i].open = !v.open">
      <section>
        <IconsModuleArrowIcon />
        <span class="typography__text__2">{{ `Модуль ${i + 1}: ${v.name}` }}</span>
      </section>
      <article class="typography__text__2">
        <span v-if="v.lectures">{{ `${v.lectures} лекций` }}<DotIcon /></span>
        <span v-if="v.practices">{{ `${v.practices} практик` }}<DotIcon /></span>
        <span>{{ `${v.hours} часов` }}</span>
      </article>
    </header>
    <Transition name="expand-h">
      <section v-if="v.open" class="typography__text__2">
        <span>{{ v.description }}</span>
      </section>
    </Transition>
  </article>
</template>

<style scoped lang="scss"></style>
