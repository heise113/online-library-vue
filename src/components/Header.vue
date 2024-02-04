<script setup>
import {useStore} from "@/store/store.js";
import SidebarMini from "@/components/sidebar/SidebarMini.vue";
import {ref} from "vue";

const store = useStore()
const changeTheme = () => {
  store.changeTheme()
}

const down_header = ref(false)
</script>

<template>
  <div class="header-desktop" :class="store.theme === 'dark' ? 'header-desktop-dark' : null">
    <div class="header-desktop__search">
      <input class="header-desktop__search__input">
      <svg width="50" height="50" class="header-desktop__search__icon">
        <use xlink:href="@/assets/images/icons.svg#search-icon"></use>
      </svg>
    </div>
    <div
        :class="{
          'header-desktop__theme-icon': store.theme === 'light',
          'header-desktop__theme-icon-dark': store.theme === 'dark'
        }"
        @click="changeTheme()"
    >
      <svg width="50" height="50">
        <use xlink:href="@/assets/images/icons.svg#theme-icon"></use>
      </svg>
    </div>
  </div>

  <div class="header-mobile" :class="{'header-mobile-dark': store.theme === 'dark'}">
    <div class="header-mobile__up-header">
      <svg @click="down_header = !down_header" class="header-mobile__up-header__menu-icon" width="40" height="21">
        <use xlink:href="@/assets/images/icons.svg#menu-icon"></use>
      </svg>
      <div class="header-mobile__up-header__title" :class="{'header-mobile__up-header__title-dark': store.theme === 'dark'}">
        <svg width="200" height="50">
          <use xlink:href="@/assets/images/icons.svg#border-title-mobile"></use>
        </svg>
        <div class="header-mobile__up-header__title__text">Онлайн Библиотека</div>
      </div>
      <svg @click="changeTheme()" class="header-mobile__up-header__theme" :class="{'header-mobile__up-header__theme-dark': store.theme === 'dark'}" width="35" height="35">
        <use xlink:href="@/assets/images/icons.svg#theme-icon"></use>
      </svg>
    </div>
    <div v-show="down_header" class="header-mobile__down-header">
      <div class="header-mobile__down-header__home header-mobile__down-header__item">
        <svg width="20" height="20">
          <use xlink:href="@/assets/images/icons.svg#home-icon"></use>
        </svg>
        <span>Home</span>
      </div>
      <div class="header-mobile__down-header__my-book header-mobile__down-header__item">
        <svg width="20" height="20">
          <use xlink:href="@/assets/images/icons.svg#my-book-icon"></use>
        </svg>
        <span>My book</span>
      </div>
      <div class="header-mobile__down-header__search header-mobile__down-header__item">
        <svg width="20" height="20">
          <use xlink:href="@/assets/images/icons.svg#search-icon"></use>
        </svg>
        <span>Search</span>
      </div>
      <div class="header-mobile__down-header__star header-mobile__down-header__item">
        <svg width="20" height="20">
          <use xlink:href="@/assets/images/icons.svg#star-icon"></use>
        </svg>
        <span>Star</span>
      </div>
      <div class="header-mobile__down-header__setting header-mobile__down-header__item">
        <svg width="20" height="20">
          <use xlink:href="@/assets/images/icons.svg#settings-icon"></use>
        </svg>
        <span>Settings</span>
      </div>
      <div class="header-mobile__down-header__profile header-mobile__down-header__item">
        <svg width="20" height="20">
          <use xlink:href="@/assets/images/icons.svg#account-icon"></use>
        </svg>
        <span>Profile</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header-desktop {
  position: sticky;
  top: 0;
  background-color: #f5f5f5;
  padding-top: 40px;
  padding-left: 45px;
  padding-bottom: 40px;
  z-index: 1;

  &-dark {
    background-color: #0C083E;
  }

  &__search {

    justify-content: start;
    align-items: center;
    position: relative;
    width: 283px;
    height: 63px;
    border: 2px solid #A15208;
    background-color: white;
    border-radius: 10px;
    text-align: left;

    &__input {
      margin-left: 10px;
      height: 100%;
      width: 210px;
      outline: none;
      border: none;
      font-size: 30px;
    }

    &__icon {
      cursor: pointer;
      fill: #a15208;
      position: absolute;
      right: 1px;
      bottom: 1px;

      &:hover {
        opacity: 0.7;
      }

      &:active {
        opacity: 0.4;
      }
    }
  }

  &__theme-icon {
    position: absolute;
    top: 30px;
    right: 30px;
    cursor: pointer;
    fill: blue;
  }

  &__theme-icon-dark {
    position: absolute;
    top: 30px;
    right: 30px;
    cursor: pointer;
    fill: yellow;
  }
}

.header-mobile {
  padding: 0 20px;
  background-color: #a15208;

  &-dark {
    background-color: #5b027b;
  }

  &__up-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &__title {
      user-select: none;
      position: relative;
      svg {
        fill: #a15208;
        stroke: white;
        stroke-width: 3;
      }

      &__text {
        position: absolute;
        top: 15px;
        left: 25px;
        color: white;
      }

      &-dark {
        svg {
          fill: #5b027b;
        }
      }
    }

    &__theme {
      fill: blue;
      cursor: pointer;

      &-dark {
        fill: yellow;
      }
    }

    &__menu-icon {
      fill: white;
      cursor: pointer;
    }
  }

  &__down-header {
    display: grid;
    grid-template-columns: auto auto auto;
    gap: 0 10vw;
    justify-content: center;
    height: 100px;

    &__item {
      display: flex;
      align-items: center;
      justify-content: start;
      gap: 0 5px;
      svg {
        fill: white;
        stroke: white;
      }

      span {
        color: white;
      }
    }
  }

}

//.down-header {
//  &-enter-active, &-leave-active {
//    transition-property: all;
//    transition-duration: 0.3s;
//  }
//
//  &-enter-from, &-leave-to {
//    opacity: 0;
//    //transform: translateY(500px);
//  }
//
//}

@media (max-width: 800px) {
  .header-desktop {
    display: none;
  }
}

@media (min-width: 801px) {
  .header-mobile {
    display: none;
  }
}
</style>