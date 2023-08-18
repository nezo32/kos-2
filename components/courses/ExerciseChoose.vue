<script setup lang="ts">
const props = defineProps<{
  current: number;
  count: number;
  reply?: boolean;
}>();
const emit = defineEmits(["update:current", "update:reply"]);

const router = useRouter();
const pagesContainer = ref<HTMLDivElement>();

const mousePress = ref(false);
const position = ref({
  left: 0,
  x: 0
});

const { width } = useWindowSize();

const formatted = computed(() => (width.value - 600) / 2 + "px");

function left() {
  if (!pagesContainer.value) return;
  if (props.current > 1) {
    emit("update:current", props.current - 1);
    pagesContainer.value.scrollLeft = (props.current - 3) * 120;
    return;
  }
  pagesContainer.value.scrollLeft = 0;
}
function right() {
  if (!pagesContainer.value) return;
  if (props.current < props.count) {
    emit("update:current", props.current + 1);
    pagesContainer.value.scrollLeft = (props.current - 1) * 120;
    return;
  }
  pagesContainer.value.scrollLeft = props.current * 120;
}

function mouseMove(ev: MouseEvent) {
  if (!pagesContainer.value) return;
  if (!mousePress.value) return;

  ev.preventDefault();

  const dx = ev.clientX - position.value.x;

  pagesContainer.value.scrollLeft = position.value.left - dx;
}
function mouseDown(ev: MouseEvent) {
  if (!pagesContainer.value) return;
  mousePress.value = true;
  pagesContainer.value.style.scrollBehavior = "auto";
  position.value.left = pagesContainer.value.scrollLeft;
  position.value.x = ev.clientX;
  pagesContainer.value.style.cursor = "grabbing";
}
function mouseUp() {
  if (!pagesContainer.value) return;
  mousePress.value = false;
  pagesContainer.value.style.scrollBehavior = "smooth";
  pagesContainer.value.style.cursor = "grab";
}
function mouseOut() {
  if (!pagesContainer.value) return;
  mousePress.value = false;
  pagesContainer.value.style.scrollBehavior = "smooth";
  pagesContainer.value.style.cursor = "grab";
}

function clck() {
  emit("update:reply", true);
  emit("update:current", 0);
}

function dblclck(v: number) {
  emit("update:current", v);
  emit("update:reply", false);
}
</script>

<template>
  <div class="exercise__choose">
    <IconsPageSwitchArrow @click="left" />
    <div
      class="exercise__choose__inner"
      ref="pagesContainer"
      @mousemove="mouseMove"
      @mousedown="mouseDown"
      @mouseup="mouseUp"
      @mouseout="mouseOut"
    >
      <span
        class="typography__text__3"
        v-for="v in count"
        :class="{ active: v == current }"
        @click="dblclck(v)"
      >
        {{ `${v} занятие` }}
      </span>
    </div>
    <div class="exercise__choose__reply" @click="clck()" v-if="false">
      <span class="typography__text__3" :class="{ active: props.reply }">Отзыв</span>
    </div>
    <IconsPageSwitchArrow @click="right" />
  </div>
</template>

<style scoped lang="scss">
.exercise__choose {
  user-select: none;
  width: 100%;

  justify-content: flex-end;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 40px;

  @media screen and (max-width: 1280px) {
    justify-content: space-between;
  }

  &__inner {
    width: v-bind(formatted);

    @media screen and (max-width: 1280px) {
      width: 550px;
    }
    @media screen and (max-width: 740px) {
      width: 400px;
    }
    @media screen and (max-width: 580px) {
      width: 350px;
    }
    @media screen and (max-width: 525px) {
      width: 300px;
    }
    @media screen and (max-width: 480px) {
      width: 250px;
    }
    @media screen and (max-width: 440px) {
      width: 200px;
    }

    user-select: none;
    overflow: auto;
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;

    display: flex;
    flex-direction: row;
    align-items: center;

    > span {
      @media screen and (max-width: 740px) {
        width: 100px;
      }
      @media screen and (max-width: 580px) {
        width: 90px;
      }
      @media screen and (max-width: 480px) {
        width: 80px;
      }

      padding: 13px 0px;
      flex-shrink: 0;
      text-align: center;
      box-sizing: border-box;
      width: 120px;
      white-space: nowrap;

      cursor: pointer;
      color: var(--text-color);

      &:hover {
        color: var(--primary-color);
      }

      &.active {
        background: var(--primary-color);
        color: var(--white);
        border-radius: 6px;
      }
    }
  }

  &__reply {
    > span {
      display: block;
      padding: 13px 0px;
      flex-shrink: 0;
      text-align: center;
      box-sizing: border-box;
      width: 120px;
      white-space: nowrap;

      cursor: pointer;
      color: var(--text-color);

      &:hover {
        color: var(--primary-color);
      }

      &.active {
        background: var(--primary-color);
        color: var(--white);
        border-radius: 6px;
      }
    }
  }

  > * {
    &:nth-child(3) {
      transform: rotate(180deg);
    }
  }

  svg {
    flex-shrink: 0;
    cursor: pointer;
    color: var(--text-meta-color);
    &:hover {
      color: var(--primary-color);
    }
  }
}
</style>
