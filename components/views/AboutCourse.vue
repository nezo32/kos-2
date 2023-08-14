<script setup lang="ts">
import DotIcon from "@/assets/svg/dot.svg?component";

defineProps<{
  modules: {
    name: string;
    lectures?: number;
    practices?: number;
    hours: number;
    description: string;
    open?: boolean;
  }[];
  courseCover: string;
  creators: { image?: string; name: string; who: string; desc: string }[];
  crumbs: string[];
  courseName: string;
  courseDescription: string;
}>();
</script>

<template>
  <div class="about__course">
    <img :src="courseCover" alt="courseImage" ref="cover" />
    <div class="about__course__creators">
      <article v-for="(v, i) of creators" :key="i">
        <img :src="v.image ?? '/images/placeholder.png'" alt="creatorPfp" />
        <section>
          <h5 class="typography__title__6">{{ `${v.who}: ${v.name}` }}</h5>
          <span class="typography__text__1">{{ v.desc }}</span>
        </section>
      </article>
    </div>
    <div class="about__course__description">
      <div class="about__course__description__crumbs">
        <article v-for="(v, i) of crumbs" :key="i" class="typography__text__2">{{ v }}</article>
      </div>
      <h5 class="typography__title__6">{{ courseName }}</h5>
      <span
        class="typography__text__2"
        v-html="courseDescription.replaceAll('\n', '<br /><br />')"
      />
    </div>
    <div class="about__course__inner">
      <div class="about__course__inner__header">
        <h5 class="typography__title__6">Содержание программы</h5>
        <span class="typography__text__1">Скачать программу</span>
      </div>
      <div class="about__course__inner__data">
        <article v-for="(v, i) of modules" :key="i" :class="{ active: v.open }">
          <header>
            <section>
              <IconsModuleArrowIcon @click="modules[i].open = !v.open" />
              <span class="typography__text__2">{{ `Модуль ${i + 1}: ${v.name}` }}</span>
            </section>
            <article class="typography__text__2">
              <span v-if="v.lectures">{{ `${v.lectures} лекций` }}<DotIcon /></span>
              <span v-if="v.practices">{{ `${v.practices} практик` }}<DotIcon /></span>
              <span>{{ `${v.hours} часов` }}</span>
            </article>
          </header>
          <section v-if="v.open" class="typography__text__2">
            {{ v.description }}
          </section>
        </article>
      </div>
      <button class="typography__text__2-1">Все модули</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.about__course {
  color: var(--text-color);

  display: flex;
  flex-direction: column;
  gap: 50px;
  > img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    object-position: 25% 25%;
    border-radius: 10px;
  }

  &__creators {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 30px;

    > * {
      width: calc((100% - 30px) / 2);
    }

    article {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 20px;
      img {
        width: 100px;
        height: 100px;
        border-radius: 100%;
      }

      section {
        display: flex;
        flex-direction: column;
        gap: 4px;

        h5 {
          margin: 0;
        }
      }
    }
  }

  &__description {
    display: flex;
    flex-direction: column;
    gap: 20px;
    &__crumbs {
      display: flex;
      flex-direction: row;
      gap: 20px;

      article {
        padding: 10px 20px;
        border-radius: 4px;
        border: 1px solid var(--primary-color, #ca3b4c);
        color: var(--primary-color);
      }
    }
    h5 {
      margin: 0;
    }
  }

  &__inner {
    display: flex;
    flex-direction: column;
    gap: 40px;
    &__header {
      display: flex;
      flex-direction: column;
      gap: 10px;
      h5 {
        margin: 0;
      }
      span {
        cursor: pointer;
        color: var(--primary-color);
      }
    }
    &__data {
      display: flex;
      flex-direction: column;
      gap: 30px;

      article {
        border-radius: 10px;

        > header {
          padding: 23px 20px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          background: rgba(202, 59, 76, 0.1);
          border-radius: 10px;

          section {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 20px;
          }

          article {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 10px;
            span {
              display: flex;
              flex-direction: row;
              align-items: center;
              gap: 10px;
            }
          }
        }
        &.active {
          header {
            svg {
              transform: rotate(180deg);
            }
          }
          border: 1px solid var(--text-grey, #858585);
        }

        svg {
          transition: transform 0.2s ease-in-out;
        }

        > section {
          padding: 30px 20px 20px 20px;
        }
      }
    }
    button {
      width: fit-content;
      padding: 14.5px 60px;
      border-radius: 10px;
      background: var(--primary-color, #ca3b4c);
      border: none;
      color: var(--white);
    }
  }
}
</style>
