<script setup lang="ts">
import { type RouteLocationNormalized } from "vue-router";
import PersonalIcon from "@/assets/svg/personal.svg?component";
import AgreementIcon from "@/assets/svg/agreement.svg?component";

definePageMeta({
  pageName: async (r: RouteLocationNormalized) => "Управление аккаунтом"
});

const currentType = ref(0);

watch(currentType, (n) => {
  console.log(n);
});

const verified = ref(false);

const verificationText = computed(() =>
  verified.value
    ? "Аккаунт верифицирован"
    : "Аккаунт не верифицирован.\nЗаполните недостающую информацию в профиле"
);
const personalText = ref(
  "Для подтверждения регистрации и последующего получения удостоверения о повышении квалификации вам необходимо заполнить персональную информацию о себе и прикрепить сканы документов"
);
const agreementText = ref(
  "Мы очень серьезно относимся к вопросам безопасности и конфиденциальности персональных данных наших пользователей. Мы строго следим за тем, чтобы все данные, которые Вы предоставляете нам, были защищены и не попадали в руки третьих лиц. Поэтому, мы рекомендуем всем нашим пользователям ознакомиться с нашим Пользовательским соглашением и Политикой конфиденциальности. Сохраняя информацию в личном кабинете, вы даете свое согласие на обработку персональных данных. Это поможет Вам лучше понять, как мы обрабатываем и защищаем Ваши данные."
);

agreementText.value = agreementText.value.replace(
  "Пользовательским соглашением",
  `<a style="color: var(--primary-color); text-decoration: none;" href='http://example.com'>Пользовательским соглашением</a>`
);
agreementText.value = agreementText.value.replace(
  "Политикой конфиденциальности",
  `<a style="color: var(--primary-color); text-decoration: none;" href='http://example.com'>Политикой конфиденциальности</a>`
);
agreementText.value = agreementText.value.replace(
  "согласие на обработку персональных данных",
  `<a style="color: var(--primary-color); text-decoration: none;" href="http://example.com">согласие на обработку персональных данных</a>`
);
</script>

<template>
  <div class="account">
    <CoursesSwitcherType
      v-model="currentType"
      :list="['Основная информация', 'Персональные данные', 'Образование и работа', 'Безопасность']"
    />
    <div class="account__inner">
      <ViewsOverallInfoAccount v-if="currentType == 0" />
      <ViewsPersonalDataAccount v-if="currentType == 1" />
      <ViewsEducationWorkAccount v-if="currentType == 2" />
      <ViewsSecurityAccount v-if="currentType == 3" />
      <div class="account__inner__about typography__text__3" v-if="currentType != 3">
        <section>
          <IconsVerifiedIcon :verified="verified" />
          <span v-html="verificationText.replaceAll('\n', '<br />')"></span>
        </section>
        <section>
          <PersonalIcon />
          <span v-html="personalText"></span>
        </section>
        <section>
          <AgreementIcon />
          <span v-html="agreementText"></span>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.account {
  color: var(--text-color);
  display: flex;
  flex-direction: column;
  gap: 30px;
  &__inner {
    margin-bottom: 60px;

    @media screen and (max-width: 1600px) {
      flex-direction: column-reverse;
    }

    display: flex;
    flex-direction: row;
    gap: 30px;
    > * {
      @media screen and (max-width: 1600px) {
        width: 100% !important;
      }
      &:nth-child(1) {
        width: calc(60% - 15px);
      }
      &:nth-child(2) {
        width: calc(40% - 15px);
      }
    }

    &__about {
      display: flex;
      flex-direction: column;
      gap: 20px;
      section {
        padding: 30px;
        border-radius: 10px;
        background: var(--white);
        box-shadow: 0px 8px 20px 0px rgba(202, 59, 76, 0.1);

        display: flex;
        flex-direction: row;
        gap: 20px;

        @media screen and (max-width: 480px) {
          flex-direction: column;
        }

        &:first-child {
          align-items: center;
          @media screen and (max-width: 480px) {
            align-items: unset;
          }
        }

        svg {
          flex-shrink: 0;
        }
      }
    }
  }
}
</style>
