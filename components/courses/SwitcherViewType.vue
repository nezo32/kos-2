<script setup lang="ts">
type ViewType = "description" | "progress" | "schedule" | undefined;

const props = defineProps<{
  modelValue: ViewType;
}>();
const emit = defineEmits<{
  (event: "update:modelValue", value: ViewType): void;
}>();

const cmptd = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  }
});

const router = useRouter();

const list = ref(["О курсе", "Прогресс", "Расписание"]);
const activeList = ref(list.value.map((_) => false));

const compareMap = new Map<string, ViewType>();
compareMap.set("О курсе", "description");
compareMap.set("Прогресс", "progress");
compareMap.set("Расписание", "schedule");
compareMap.set("", undefined);

setFromQuery();

function clickHandler(i: number) {
  const tmp = compareMap.get(list.value[i]);
  if (tmp != undefined) {
    router.push(`${router.currentRoute.value.params.id}?view=${tmp}`);
  } else {
    router.push(`${router.currentRoute.value.params.id}`);
  }
}
function getByValue(map: Map<string, ViewType>, n: ViewType) {
  for (let [key, value] of map.entries()) {
    if (value === n) return key;
  }
}
function setActive(i: number) {
  activeList.value.forEach((_, i) => (activeList.value[i] = false));
  activeList.value[i] = true;
}
function setFromQuery() {
  const value = getByValue(compareMap, cmptd.value);

  if (!value) {
    activeList.value.forEach((_, i) => (activeList.value[i] = false));
    return;
  }
  const found = list.value.findIndex((el) => el == value);
  if (!found) {
    setActive(0);
    return;
  }

  setActive(found);
}

onMounted(() => {
  setFromQuery();
});
onBeforeUpdate(() => {
  setFromQuery();
});
</script>

<template>
  <div class="switcher">
    <button
      class="typography__menu-upper"
      v-for="(v, i) of list"
      :key="i"
      :class="{ active: activeList[i] }"
      @click="clickHandler(i)"
    >
      {{ v }}
    </button>
  </div>
</template>

<style scoped lang="scss">
.switcher {
  width: 400px;
  > * {
    width: 100%;
  }
  display: flex;
  flex-direction: row;
  gap: 20px;

  @media screen and (max-width: 480px) {
    /* flex-direction: column;
    gap: 10px;
    width: 100%;
    flex-shrink: 1 !important; */
    gap: 10px;
  }

  button {
    cursor: pointer;
    padding: 12px 13px;
    border-radius: 6px;
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
    background: none;
    &:hover {
      color: var(--primary-color);
    }
    &.active {
      color: var(--white);
      background: var(--primary-color);
    }
  }
}
</style>
