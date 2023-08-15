<script setup lang="ts"></script>

<template>
  <div class="security">
    <div class="security__inner">
      <h6 class="typography__title__8">Двухфакторная аутентификация</h6>
      <section>
        <span class="typography__text__3">
          Двухфакторная аутентификация — это дополнительный уровень безопасности, который
          гарантирует, что доступ к вашей учетной записи сможете получить только вы, даже если ваш
          пароль стал известен кому-то еще.
        </span>
        <button class="typography__text__2-1">Отключить</button>
      </section>
    </div>
    <div class="security__inner">
      <h6 class="typography__title__8">Изменение пароля</h6>
      <section>
        <span class="typography__text__3">
          Если вы забыли или потеряли пароль, его можно изменить или сбросить.
        </span>
        <button class="typography__text__2-1 another">Изменить пароль</button>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
.security {
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
    gap: 20px;

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

      button {
        cursor: pointer;

        padding: 13px;
        width: 220px;
        box-sizing: border-box;
        border-radius: 10px;
        border: 1px solid var(--primary-color, #ca3b4c);
        background: none;
        color: var(--primary-color);

        &.another {
          background: var(--primary-color);
          color: var(--white);
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
