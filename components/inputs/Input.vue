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
    <textarea
      v-if="placeholder?.length ? placeholder.length > 20 : true"
      :disabled="disabled"
      type="text"
      v-model="data"
      :placeholder="placeholder"
      class="typography__text__2"
    />
    <input
      v-if="!(placeholder?.length ? placeholder.length > 20 : true)"
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

  &.double {
    > * {
      height: 46px;
    }
  }

  box-sizing: border-box;
  padding: 13px 20px 10px 20px;
  border-radius: 10px;
  border: 1px solid var(--text-grey, #858585);
  background: var(--white, #fff);

  > * {
    height: 25px;

    padding: 0;
    width: 100%;
    outline: none;
    background: none;
    border: none;
    color: var(--text-color);
    &::placeholder {
      color: var(--unnamed, #cfcfcf);
    }

    &::-webkit-input-placeholder {
      /* Chrome/Opera/Safari */
      white-space: pre-line;
    }
    &::-moz-input-placeholder {
      /* Firefox 19+ */
      white-space: pre-line;
    }
    &:-ms-input-placeholder {
      /* IE 10+ */
      white-space: pre-line;
    }
    &:-moz-placeholder {
      /* Firefox 18- */
      white-space: pre-line;
    }
  }

  input {
    margin-bottom: 3px;
  }

  textarea {
    resize: none;
  }
}
</style>
