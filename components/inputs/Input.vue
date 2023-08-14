<script setup lang="ts">
const props = defineProps<{ modelValue: string; placeholder?: string; disabled?: boolean }>();
const emits = defineEmits(["update:modelValue"]);
const data = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits("update:modelValue", value);
  }
});
</script>

<template>
  <div class="custom__input" :class="{ disabled }">
    <input
      :disabled="disabled"
      type="text"
      v-model="data"
      :placeholder="placeholder"
      class="typography__text__2"
    />
  </div>
</template>

<style scoped lang="scss">
.custom__input {
  &.disabled {
    border: 1px solid var(--text-meta-color);
    background: var(--text-meta-color);
  }

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
}
</style>
