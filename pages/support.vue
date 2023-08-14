<script setup lang="ts">
import type { RouteLocationNormalized } from "vue-router";
import AdressIcon from "@/assets/svg/adress.svg?component";
import ClockIcon from "@/assets/svg/clock.svg?component";
import HomeIcon from "@/assets/svg/home.svg?component";
import MailIcon from "@/assets/svg/mail.svg?component";
import PhoneIcon from "@/assets/svg/phone.svg?component";
import SmallPhoneIcon from "@/assets/svg/phoneSmall.svg?component";
import SendIcon from "@/assets/svg/send.svg?component";
import AttachIcon from "@/assets/svg/attach.svg?component";
import AddPhotoIcon from "@/assets/svg/addPhoto.svg?component";
import EmojiIcon from "@/assets/svg/emoji.svg?component";

definePageMeta({
  pageName: async (r: RouteLocationNormalized) => "Поддержка"
});

const chat = shallowReactive<{
  name: string;
  phone: string;
  image?: string;
  data: { time: string; client: boolean; data: string; image?: string }[];
}>({
  data: [
    {
      client: false,
      data: "Добрый день! Подскажите пожалуйста как мне сдать домашнее задание?",
      time: "12:31"
    },
    {
      client: true,
      data: "Добрый день! Подскажите пожалуйста как мне сдать домашнее задание?",
      time: "12:31"
    },
    {
      client: false,
      data: "Добрый день! Подскажите пожалуйста как мне сдать домашнее задание?",
      time: "12:31"
    },
    {
      client: true,
      data: "Добрый день! Подскажите пожалуйста как мне сдать домашнее задание?",
      time: "12:31"
    },
    {
      client: false,
      data: "Добрый день! Подскажите пожалуйста как мне сдать домашнее задание?",
      time: "12:31"
    },
    {
      client: true,
      data: "Добрый день! Подскажите пожалуйста как мне сдать домашнее задание?",
      time: "12:31"
    }
  ],
  name: "Степанова Анастасия Владимировна",
  phone: "+7 (800) 555-35-35"
});

const inputElem = ref<HTMLInputElement>();

function clickOnWrapper(ev: MouseEvent) {
  if ((ev.target as HTMLElement).tagName == "svg") return;
  if (!inputElem.value) return;
  inputElem.value.focus();
}

function attach() {}
function addPhoto() {}
function emoji() {}
</script>

<template>
  <div class="support">
    <div class="support__chat">
      <aside>
        <div class="support__chat__header">
          <article>
            <img :src="chat.image ?? '/images/ph.png'" alt="pfp" />
            <section>
              <h6 class="typography__text__2-1">{{ chat.name }}</h6>
              <span class="typography__text__4">{{ chat.phone }}</span>
            </section>
          </article>
          <SmallPhoneIcon />
        </div>
        <div class="support__chat__content">
          <div
            class="support__chat__content__data"
            v-for="(v, i) of chat.data"
            :key="i"
            :class="{ right: v.client }"
          >
            <img :src="v.image ?? '/images/ph.png'" alt="ph" />
          </div>
        </div>
      </aside>
      <div class="support__chat__input">
        <div class="support__chat__input__inner" @click="clickOnWrapper">
          <input
            class="typography__text__3"
            type="text"
            placeholder="Напишите сообщение..."
            ref="inputElem"
          />
          <AttachIcon @click="attach" />
          <AddPhotoIcon @click="addPhoto" />
          <EmojiIcon @click="emoji" />
        </div>
        <SendIcon />
      </div>
    </div>
    <div class="support__info">
      <div class="support__info__inner">
        <section>
          <header>
            <HomeIcon />
            <h6 class="typography__title__8">Полное наименование организации</h6>
          </header>
          <span class="typography__text__3">
            Институт открытого образования и развития компетенций федерального государственного
            бюджетного образовательного учреждения высшего образования «Российский государственный
            университет им. А.Н. Косыгина (Технологии. Дизайн. Искусство)».
          </span>
        </section>
        <article>
          <section>
            <header>
              <MailIcon />
              <h6 class="typography__title__8">Электронная почта</h6>
            </header>
            <span class="typography__text__3"> do@rguk.ru <span>ipk-design@yandex.ru</span> </span>
          </section>
          <section>
            <header>
              <AdressIcon />
              <h6 class="typography__title__8">Наш адрес</h6>
            </header>
            <span class="typography__text__3">
              119071, г. Москва, ул. Малая Калужская, д. 1, 1-й корпус, 4-й этаж, оф. 1445
            </span>
          </section>
        </article>
      </div>
      <div class="support__info__inner">
        <section>
          <header>
            <PhoneIcon />
            <h6 class="typography__title__8">Телефоны</h6>
          </header>
          <span class="typography__text__3">
            +7 495 991-00-07
            <span>+7 495 811-01-01 (доб. 1234, 1526, 1527)</span>
          </span>
        </section>
        <section>
          <header>
            <ClockIcon />
            <h6 class="typography__title__8">Режим работы</h6>
          </header>
          <span class="typography__text__3">
            По будням с 10:00 до 17:00
            <span>Суббота, воскресенье выходной</span>
          </span>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.support {
  display: flex;
  flex-direction: row;
  gap: 32px;
  color: var(--text-color);
  &__info {
    display: flex;
    flex-direction: column;
    gap: 30px;
    section {
      svg {
        flex-shrink: 0;
      }

      box-sizing: border-box;
      padding: 20px 30px 30px 30px;
      border-radius: 10px;
      background: var(--white, #fff);
      box-shadow: 0px 8px 20px 0px rgba(202, 59, 76, 0.1);

      display: flex;
      flex-direction: column;
      gap: 20px;

      header {
        display: flex;
        flex-direction: row;
        gap: 20px;
        align-items: center;

        h6 {
          margin: 0;
        }
      }

      span {
        display: flex;
        flex-direction: column;
        gap: 10px;
        color: var(--text-grey);
      }
    }

    &__inner {
      > * {
        width: calc((100% - 30px) / 2);
      }
      display: flex;
      flex-direction: row;
      gap: 30px;
    }

    article {
      section {
        width: unset;
      }
      display: flex;
      flex-direction: column;
      gap: 30px;
    }
  }
  &__chat {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-shrink: 0;
    box-sizing: border-box;
    width: 660px;
    height: calc(80vh);
    border-radius: 20px;
    background: var(--white, #fff);
    box-shadow: 0px 8px 20px 0px rgba(202, 59, 76, 0.1);

    aside {
      > * {
        padding-left: 30px;
        padding-right: 30px;
      }
    }

    &__header {
      border-bottom: 1px solid var(--separator-color, #a3aed0);

      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      article {
        display: flex;
        flex-direction: row;
        gap: 16px;
        align-items: center;

        section {
          display: flex;
          flex-direction: column;
          gap: 8px;

          h6 {
            margin: 0;
          }
        }
      }

      svg {
        cursor: pointer;
        flex-shrink: 0;
      }

      img {
        width: 50px;
        height: 50px;
        object-fit: cover;
        object-position: 25% 25%;
        flex-shrink: 0;
        border-radius: 100%;
      }

      padding-top: 25px;
      padding-bottom: 25px;
    }
    &__content {
      max-height: 736px;
      padding-top: 40px;
      padding-bottom: 40px;

      &__data {
        img {
          width: 40px;
          height: 40px;
          border-radius: 100%;
        }
      }
    }
    &__input {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      gap: 20px;

      svg {
        cursor: pointer;
        flex-shrink: 0;
      }

      padding-left: 30px;
      padding-right: 30px;
      padding-bottom: 20px;
      &__inner {
        cursor: pointer;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;

        width: 100%;

        padding: 0px 20px;
        height: 60px;
        border-radius: 10px;
        background: var(--accent-background, #fbfaf8);

        input {
          color: var(--text-color);

          &::placeholder {
            color: var(--text-grey);
          }

          padding: 0;
          height: 22px;
          width: 100%;
          border: none;
          outline: none;
          background: none;
        }
      }
    }
  }
}
</style>
