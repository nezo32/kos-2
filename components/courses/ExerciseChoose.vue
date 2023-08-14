<script setup lang="ts">
const props = defineProps<{
  current: number;
  count: number;
}>();
const emit = defineEmits(["update:current"]);

const pagesContainer = ref<HTMLDivElement>();

const mousePress = ref(false);
const position = ref({
  left: 0,
  x: 0
});

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
        @dblclick="emit('update:current', v)"
      >
        {{ `${v} занятие` }}
      </span>
    </div>
    <IconsPageSwitchArrow @click="right" />
  </div>
</template>

<style scoped lang="scss">
.exercise__choose {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 40px;

  &__inner {
    max-width: 930px;
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
    cursor: pointer;
    color: var(--text-meta-color);
    &:hover {
      color: var(--primary-color);
    }
  }
}
</style>
