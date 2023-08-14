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

type Display = (InputType | CheckboxType)[];

const pictureUrl = ref<string>();
const name = ref("Анастасия Кариновна");
const mail = ref("karinatop@stepanova.mark");

const main = ref<Display>([
  {
    type: "input",
    content: "",
    placeholder: "Имя"
  },
  {
    type: "input",
    content: "",
    placeholder: "Фамилия"
  },
  {
    type: "input",
    content: "",
    placeholder: "Отчество"
  },
  {
    type: "input",
    content: "",
    placeholder: "Дата рождения"
  },
  {
    type: "input",
    content: "",
    placeholder: "Город проживания"
  },
  {
    type: "checkbox",
    from: ["Мужской", "Женский"],
    content: 0
  }
]);
const contacts = ref<Display>([
  {
    type: "input",
    content: "",
    placeholder: "Телефон"
  },
  {
    type: "input",
    content: "",
    placeholder: "Почта"
  }
]);
const additional = ref<Display>([
  {
    type: "input",
    content: "",
    placeholder: "Ссылка на личную страницу во ВКонтакте"
  },
  {
    type: "input",
    content: "",
    placeholder: "Ссылка на аккаунт в Телеграме"
  },
  {
    type: "input",
    content: "",
    placeholder: "Ссылка на личную страницу в Одноклассниках"
  }
]);
</script>

<template>
  <div class="overall">
    <div class="overall__header">
      <img :src="pictureUrl ?? '/images/ph.png'" alt="pfp" />
      <section>
        <h6 class="typography__title__8">{{ name }}</h6>
        <span class="typography__text__2">{{ mail }}</span>
      </section>
    </div>
    <div class="overall__inner">
      <div class="overall__inner__main">
        <h6 class="typography__title__8">Основная информация</h6>
        <section>
          <template v-for="(v, i) of main">
            <InputsInput
              v-if="v.type == 'input'"
              v-model="v.content"
              :placeholder="v.placeholder"
            />
          </template>
        </section>
        <template v-for="(v, i) of main">
          <InputsCheckboxes v-if="v.type == 'checkbox'" v-model="v.content" :data="v.from" />
        </template>
      </div>
      <div class="overall__inner__contacts">
        <h6 class="typography__title__8">Контакты</h6>
        <section>
          <template v-for="(v, i) of contacts">
            <InputsInput
              v-if="v.type == 'input'"
              v-model="v.content"
              :placeholder="v.placeholder"
            />
          </template>
          <template v-for="(v, i) of contacts">
            <template v-if="v.type == 'input'">
              <span class="typography__text__3" v-if="v.placeholder == 'Телефон'">
                Подтвердить телефон
              </span>
              <span class="typography__text__3" v-if="v.placeholder == 'Почта'"
                >Подтвердить почту</span
              >
            </template>
          </template>
        </section>
      </div>
      <div class="overall__inner__additional">
        <h6 class="typography__title__8">Дополнительная информация</h6>
        <section>
          <template v-for="(v, i) of additional">
            <InputsInput
              v-if="v.type == 'input'"
              v-model="v.content"
              :placeholder="v.placeholder"
            />
          </template>
        </section>
      </div>
      <button class="typography__text__2-1">Сохранить</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.overall {
  display: flex;
  flex-direction: column;
  gap: 30px;

  padding: 30px;
  border-radius: 10px;
  background: var(--white);
  box-shadow: 0px 8px 20px 0px rgba(202, 59, 76, 0.1);

  &__header {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    section {
      display: flex;
      flex-direction: column;
      gap: 10px;
      span {
        color: var(--text-grey);
      }
    }
  }
  &__inner {
    display: flex;
    flex-direction: column;
    gap: 50px;

    > * {
      display: flex;
      flex-direction: column;
      gap: 30px;
    }

    &__main {
      section {
        display: flex;
        flex-direction: row;
        gap: 20px;
        flex-wrap: wrap;

        > * {
          width: calc(50% - 10px);
        }
      }
    }

    &__contacts {
      section {
        display: flex;
        flex-direction: row;
        gap: 20px;
        flex-wrap: wrap;

        > * {
          width: calc(50% - 10px);
        }

        > span {
          color: var(--primary-color);
          cursor: pointer;
        }
      }
    }

    &__additional {
      section {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
    }

    > button {
      border-radius: 10px;
      display: flex;
      align-items: center;
      padding: 14.5px;
      width: 220px;
      border: none;
      background: var(--primary-color);
      color: var(--white);
    }
  }

  img {
    width: 100px;
    height: 100px;
    border-radius: 100%;
    object-fit: cover;
    object-position: 25% 25%;
  }

  h6 {
    margin: 0;
  }
}
</style>
