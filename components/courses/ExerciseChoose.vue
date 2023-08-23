<script setup lang="ts">
type ViewType = "description" | "progress" | "schedule" | `exercise${number}` | undefined;

const props = defineProps<{
  count: number;
  reply?: boolean;
  width: number;
  modelValue: ViewType;
}>();
const emit = defineEmits(["update:reply", "update:modelValue"]);

const cmptd = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  }
});

const current = ref(0);

const router = useRouter();
const pagesContainer = ref<HTMLDivElement>();

const mousePress = ref(false);
const position = ref({
  left: 0,
  x: 0
});

const { width } = useWindowSize();

const formatted = computed(() => props.width + "px");

const innerSpanSize = computed(() => {
  if (width.value <= 480) {
    return 80;
  } else if (width.value <= 580) {
    return 90;
  } else if (width.value <= 740) {
    return 100;
  } else {
    return 120;
  }
});

function left() {
  if (!pagesContainer.value) return;
  if (current.value > 1) {
    current.value = current.value - 1;
    router.push(`${router.currentRoute.value.params.id}?view=exercise${current.value}`);
    pagesContainer.value.scrollLeft = (current.value - 3) * innerSpanSize.value;
    return;
  }
  pagesContainer.value.scrollLeft = 0;
}
function right() {
  if (!pagesContainer.value) return;
  if (current.value < props.count) {
    current.value = current.value + 1;
    router.push(`${router.currentRoute.value.params.id}?view=exercise${current.value}`);
    pagesContainer.value.scrollLeft = (current.value - 1) * innerSpanSize.value;
    return;
  }
  pagesContainer.value.scrollLeft = current.value * innerSpanSize.value;
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
}

function dblclck(v: number) {
  emit("update:reply", false);
  router.push(`${router.currentRoute.value.params.id}?view=exercise${v}`);
}

function set() {
  if (cmptd.value?.includes("exercise")) {
    current.value = Number(cmptd.value.replace("exercise", ""));
  } else {
    current.value = 0;
  }
}

onMounted(() => {
  set();
});
onBeforeUpdate(() => {
  set();
});
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

  @media screen and (max-width: 768px) {
    gap: 20px;
  }

  @media screen and (max-width: 1280px) {
    justify-content: space-between;
  }

  &__inner {
    width: v-bind(formatted);

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

      @media screen and (max-width: 768px) {
        padding: 5px 0px;
      }
      &.active {
        background: var(--primary-color);
        color: var(--white);
        border-radius: 6px;

        @media screen and (max-width: 768px) {
          padding: 4px 0px;

          background: none;
          color: var(--primary-color);
          border-bottom: 1px solid var(--primary-color);
          border-radius: 0px;
        }
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
