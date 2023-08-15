<script setup lang="ts">
import AddDocument from "@/assets/svg/addDocument.svg?component";

type InputType = {
  type: "input";
  placeholder: string;
  content: string;
};
type CheckboxType = {
  type: "checkbox";
  from: string[];
  content: number;
};

type Display = (InputType | CheckboxType | { type: "inner"; data: Display })[];

const edu = ref<Omit<InputType, "type"> & { data: string[] }>({
  content: "",
  data: ["a", "b"],
  placeholder: "Уровень образования"
});

const eduInner = computed<Display>(() => {
  let data: Display = [];

  data = [
    {
      type: "input",
      content: "",
      placeholder: "Серия документа"
    },
    {
      type: "input",
      content: "",
      placeholder: "Номер документа"
    }
  ];

  return data;
});

const reason = ref<InputType>({
  type: "input",
  content: "",
  placeholder: "Причина изменения"
});

const nameChanged = ref(false);

const work = ref<Display>([
  {
    type: "input",
    content: "",
    placeholder: "Полное наименование организации"
  },
  {
    type: "input",
    content: "",
    placeholder: "Занимаемая должность"
  }
]);
</script>

<template>
  <div class="edu-work">
    <div class="edu-work__inner">
      <h6 class="typography__title__8">Образование</h6>
      <section>
        <InputsDropdownInput
          :data="edu.data"
          :placeholder="edu.placeholder"
          v-model="edu.content"
        />
        <article>
          <template v-for="v of eduInner">
            <InputsInput
              v-if="v.type == 'input'"
              :placeholder="v.placeholder"
              v-model="v.content"
            />
          </template>
        </article>
        <fieldset>
          <AddDocument />
          <span class="typography__text__3">
            Загрузите скан диплома об образовании с приложением (одним PDF-файлом)
          </span>
        </fieldset>
      </section>
    </div>
    <div class="edu-work__inner">
      <h6 class="typography__title__8">Свидетельство о перемене имени / свидетельство о браке</h6>
      <section>
        <section @click="nameChanged = !nameChanged">
          <IconsCheckboxBoxedIcon :active="nameChanged" />
          <span class="typography__text__3"> Изменилось ФИО после получения диплома? </span>
        </section>
        <InputsInput
          :placeholder="reason.placeholder"
          v-model="reason.content"
          :disabled="!nameChanged"
        />
        <fieldset :class="{ disabled: !nameChanged }">
          <AddDocument />
          <span class="typography__text__3"> Загрузите подтверждающий документ (PDF, JPG) </span>
        </fieldset>
      </section>
    </div>
    <div class="edu-work__inner">
      <h6 class="typography__title__8">Место работы</h6>
      <section>
        <template v-for="v of work">
          <InputsInput v-if="v.type == 'input'" :placeholder="v.placeholder" v-model="v.content" />
        </template>
      </section>
    </div>
    <button class="typography__text__2-1">Сохранить</button>
  </div>
</template>

<style scoped lang="scss">
.edu-work {
  display: flex;
  flex-direction: column;
  gap: 50px;

  padding: 30px;
  border-radius: 10px;
  background: var(--white);
  box-shadow: 0px 8px 20px 0px rgba(202, 59, 76, 0.1);

  &__inner {
    display: flex;
    flex-direction: column;
    gap: 30px;

    section {
      display: flex;
      flex-direction: column;
      gap: 20px;

      fieldset {
        &.disabled {
          opacity: 0.5;
          pointer-events: none;
        }

        cursor: pointer;
        svg {
          flex-shrink: 0;
          padding: 20px;
          border-radius: 14.286px;
          background: var(--accent-background, #fbfaf8);
        }

        span {
          max-width: 325px;
          box-sizing: border-box;
        }

        display: flex;
        flex-direction: row;
        gap: 20px;
        align-items: center;
        border: none;
        padding: 0;
      }

      section {
        cursor: pointer;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 20px;
        color: var(--primary-color);

        span {
          color: var(--text-color);
        }
      }

      article {
        display: flex;
        flex-direction: row;
        gap: 20px;
        flex-wrap: wrap;

        > * {
          width: calc((100% - 20px) / 2);
        }
      }
    }
  }

  > button {
    cursor: pointer;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    padding: 14.5px;
    width: 220px;
    border: none;
    background: var(--primary-color);
    color: var(--white);
  }

  h6 {
    margin: 0;
  }
}
</style>
