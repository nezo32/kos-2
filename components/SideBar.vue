<script setup lang="ts">
import type { PropsType } from "@/types";
import SideBarRoute from "@/components/SideBarRoute.vue";
import AccountIcon from "@/components/icons/AccountIcon.vue";
import ExitIcon from "@/components/icons/ExitIcon.vue";
import NotifyBellIcon from "@/components/icons/NotifyBellIcon.vue";
import PlayIcon from "@/components/icons/PlayIcon.vue";
import SupportChatIcon from "@/components/icons/SupportChatIcon.vue";
import CrossIcon from "@/assets/svg/cross.svg?component";

const emit = defineEmits(["closeMenu"]);

const router = useRouter();

const hide = ref(false);
const hideText = ref(false);

const links = shallowRef<PropsType<typeof SideBarRoute>[]>([
  {
    to: "/",
    title: "Курсы",
    icon: PlayIcon
  },
  {
    to: "/notifications",
    title: "Уведомления",
    icon: NotifyBellIcon
  },
  {
    to: "/support",
    title: "Поддержка",
    icon: SupportChatIcon
  },
  {
    to: "/account",
    title: "Аккаунт",
    icon: AccountIcon
  },
  {
    to: "/exit",
    title: "Выход",
    icon: ExitIcon
  }
]);

function arrowClickHandler() {
  hide.value = !hide.value;
  if (hideText.value) {
    hideText.value = false;
    return;
  }
  setTimeout(() => (hideText.value = true), 200);
}

const { width } = useWindowSize();
const sidebar = ref();

const sideBarSize = useElementSize(sidebar);
const aboba = computed(() => sideBarSize.width.value + "px");

const wideMonitor = ref(false);
const justHideArrow = ref(false);

onClickOutside(sidebar, () => {
  if (width.value >= 1000) return;
  emit("closeMenu");
});

function set() {
  if (width.value > 1920 || width.value < 1000) {
    hide.value = false;
    hideText.value = false;
  }
  wideMonitor.value = width.value > 1920;
  justHideArrow.value = width.value < 1000;
}

watch(width, () => {
  set();
});
onUpdated(() => {
  set();
});
onMounted(() => {
  set();
});
</script>

<template>
  <div
    class="side-bar"
    :class="{ hide, wideMonitor, justHideArrow, width: !wideMonitor && !justHideArrow }"
    ref="sidebar"
  >
    <article v-if="!wideMonitor && !justHideArrow" ref="articleBar">
      <div class="side-bar__content">
        <div class="side-bar__content__header">
          <IconsLogoIcon
            v-if="!hideText"
            class="side-bar__content__header__logo"
            @click="router.push('/')"
          />
          <IconsCircleArrowIcon
            v-if="!justHideArrow && !wideMonitor"
            style="padding: 10px 14px"
            @click="arrowClickHandler"
            class="side-bar__content__header__arrow"
            :class="{ right: hide }"
          />
          <CrossIcon style="padding: 10px 14px" v-if="width < 1000" @click="emit('closeMenu')" />
        </div>
        <div class="side-bar__content__routes">
          <SideBarRoute
            @click-route="emit('closeMenu')"
            v-for="(v, i) of links"
            :key="i"
            :to="v.to"
            :title="v.title"
            :icon="v.icon"
            :hide-text="hideText"
          />
        </div>
      </div>
      <div class="side-bar__copyright" v-if="!hideText">
        <span class="typography__text__4">
          © 2023 ФГБОУ ВО<br />
          «РГУ им. А.Н. Косыгина»
        </span>
      </div>
    </article>
    <div class="side-bar__content" v-if="wideMonitor || justHideArrow">
      <div class="side-bar__content__header">
        <IconsLogoIcon
          v-if="!hideText"
          class="side-bar__content__header__logo"
          @click="router.push('/')"
        />
        <IconsCircleArrowIcon
          v-if="!justHideArrow && !wideMonitor"
          style="padding: 10px 14px"
          @click="arrowClickHandler"
          class="side-bar__content__header__arrow"
          :class="{ right: hide }"
        />
        <CrossIcon style="padding: 10px 14px" v-if="width < 1000" @click="emit('closeMenu')" />
      </div>
      <div class="side-bar__content__routes">
        <SideBarRoute
          @click-route="emit('closeMenu')"
          v-for="(v, i) of links"
          :key="i"
          :to="v.to"
          :title="v.title"
          :icon="v.icon"
          :hide-text="hideText"
        />
      </div>
    </div>
    <div class="side-bar__copyright" v-if="!hideText && (wideMonitor || justHideArrow)">
      <span class="typography__text__4">
        © 2023 ФГБОУ ВО<br />
        «РГУ им. А.Н. Косыгина»
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wideMonitor {
  display: flex;
  flex-direction: column;
  border-radius: 0px 0px 10px 10px;
  justify-content: space-between;

  position: fixed;
}
.side-bar {
  flex-shrink: 0;
  transition: max-width 0.3s ease-in-out;
  &.hide {
    max-width: 52px;
  }

  article {
    position: fixed;
    height: 95vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    width: v-bind(aboba);
  }

  &.justHideArrow {
    width: 184px !important;
  }

  width: 100%;

  overflow: hidden;
  max-width: 184px;

  padding: 40px 30px 30px 30px;
  background: var(--primary-color, #ca3b4c);

  @media screen and (max-width: 768px) {
    padding: 40px 20px 30px 20px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 74px;
    &__header {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      color: var(--white, white);

      &__logo {
        margin-left: 14px;
        width: 49px;
        height: 30px;
      }

      svg {
        cursor: pointer;
      }

      &__arrow {
        flex-shrink: 0;
        transition: transform 0.3s ease-in-out;
        &.right {
          transform: rotate(180deg);
        }
      }
    }
    &__routes {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  }

  &__copyright {
    white-space: nowrap;
    color: var(--white, #fff);
  }
}
</style>
