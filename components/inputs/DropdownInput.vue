<script setup lang="ts">
import { useDetectOutsideElementClick } from "@/utils";
import ArrowDropdown from "@/assets/svg/arrowDropdown.svg?component";

const props = defineProps<{
  data: string[];
  modelValue: string;
  placeholder?: string;
}>();
const emits = defineEmits(["update:modelValue"]);

const cmptd = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits("update:modelValue", value);
  }
});

const searched = computed(() => {
  const data: string[] = [];

  props.data.forEach((e) => {
    if (e.toLowerCase().includes(input.value.toLowerCase())) data.push(e);
  });

  return data;
});

const inputContainer = ref<HTMLInputElement>();
const allContainer = ref<HTMLElement>();
const input = ref("");
const dropdownActive = ref(false);

const top = computed(() => {
  if (!allContainer.value) return "0px";
  return allContainer.value.offsetHeight + 10 + "px";
});
const witdh = computed(() => {
  if (!allContainer.value) return "0px";
  return allContainer.value.clientWidth + "px";
});

function clickHandler() {
  if (!inputContainer.value) return;

  dropdownActive.value = true;
}
function select(v: string) {
  input.value = v;
  emits("update:modelValue", v);
  dropdownActive.value = false;
}

useDetectOutsideElementClick(allContainer, () => {
  dropdownActive.value = false;
});
</script>

<template>
  <div class="dropdown" ref="allContainer">
    <div class="dropdown-input" @click="clickHandler()">
      <input
        type="text"
        :placeholder="placeholder"
        v-model="input"
        class="typography__text__2"
        ref="inputContainer"
      />
      <ArrowDropdown :class="{ down: dropdownActive }" />
    </div>
    <div class="dropdown-inner" v-if="dropdownActive && searched.length">
      <span v-for="(v, i) of searched" :key="i" class="typography__text__2" @click="select(v)">
        {{ v }}
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dropdown {
  position: relative;

  &-input {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    box-sizing: border-box;
    padding: 13px 20px;
    border-radius: 10px;
    border: 1px solid var(--text-grey, #858585);
    background: var(--white, #fff);
    input {
      padding: 0;
      width: 100%;
      outline: none;
      background: none;
      border: none;
      color: var(--text-color);
      &::placeholder {
        color: var(--unnamed, #cfcfcf);
      }
    }

    svg {
      transition: transform 0.2s ease-in-out;
      &.down {
        transform: rotate(90deg);
      }
    }
  }
  &-inner {
    color: var(--text-color);

    box-sizing: border-box;
    top: v-bind(top);
    width: v-bind(witdh);

    padding: 20px;
    background: var(--white);
    border-radius: 10px;
    box-shadow: 0px 8px 20px 0px rgba(202, 59, 76, 0.1);

    z-index: 1000;
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 5px;

    span {
      cursor: pointer;
      padding: 5px 7px;

      &:hover {
        border-radius: 10px;
        background: var(--schedule-border);
      }
    }
  }
}
</style>
