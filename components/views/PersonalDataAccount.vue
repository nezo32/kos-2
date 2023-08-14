<script setup lang="ts">
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

const type = ref<{
  placeholder: string;
  data: string[];
  content: string;
}>({
  content: "",
  data: ["Zlupa", "bebra"],
  placeholder: "Тип документа"
});

const pass = computed<Display>(() => {
  let data: Display = [];

  data = [
    {
      type: "input",
      placeholder: "Паспорт выдан",
      content: ""
    },
    {
      type: "inner",
      data: [
        {
          type: "input",
          placeholder: "Дата выдачи",
          content: ""
        },
        {
          type: "input",
          placeholder: "Код подразделения",
          content: ""
        },
        {
          type: "input",
          placeholder: "Серия",
          content: ""
        },
        {
          type: "input",
          placeholder: "Номер",
          content: ""
        }
      ]
    },
    {
      type: "input",
      placeholder: "Место рождения в соответствии с паспортом",
      content: ""
    },
    {
      type: "input",
      placeholder: "Прописка  по паспорту",
      content: ""
    }
  ];

  return data;
});
const fact = ref<Display>([
  {
    type: "input",
    placeholder: "Адрес фактического проживания (куда будет выслан сертификат)",
    content: ""
  },
  {
    type: "input",
    placeholder: "Индекс",
    content: ""
  }
]);
const additional = ref<Display>([
  {
    type: "input",
    placeholder: "СНИЛС",
    content: ""
  },
  {
    type: "input",
    placeholder: "ИНН",
    content: ""
  }
]);

const factSame = ref(false);
</script>

<template>
  <div class="personal-data">
    <div class="personal-data__inner">
      <h6 class="typography__title__8">Основная информация</h6>
      <section>
        <InputsDropdownInput
          :data="type.data"
          v-model="type.content"
          :placeholder="type.placeholder"
        />
        <template v-for="(v, i) of pass">
          <InputsInput v-if="v.type == 'input'" :placeholder="v.placeholder" v-model="v.content" />
          <template v-if="v.type == 'inner'">
            <article>
              <template v-for="(val, ind) of v.data">
                <InputsInput
                  v-if="val.type == 'input'"
                  :placeholder="val.placeholder"
                  v-model="val.content"
                />
              </template>
            </article>
          </template>
        </template>
      </section>
    </div>
    <div class="personal-data__inner">
      <h6 class="typography__title__8">Фактическое проживание</h6>
      <section>
        <section @click="factSame = !factSame">
          <IconsCheckboxBoxedIcon :active="factSame" />
          <span class="typography__text__3">
            Адрес фактического проживания совпадает с адресом прописки
          </span>
        </section>
        <template v-for="(v, i) of fact">
          <InputsInput
            v-if="v.type == 'input'"
            :placeholder="v.placeholder"
            v-model="v.content"
            :disabled="factSame"
          />
        </template>
      </section>
    </div>
    <div class="personal-data__inner">
      <h6 class="typography__title__8">Дополнительные документы</h6>
      <section>
        <template v-for="(v, i) of additional">
          <InputsInput v-if="v.type == 'input'" :placeholder="v.placeholder" v-model="v.content" />
        </template>
      </section>
    </div>
    <div class="personal-data__inner">
      <h6 class="typography__title__8">Сканы документов подтверждающих личность</h6>
      <section></section>
    </div>
  </div>
</template>

<style scoped lang="scss">
.personal-data {
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

  h6 {
    margin: 0;
  }
}
</style>
