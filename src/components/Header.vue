<script setup>
import {useStore} from "@/store/store.js";
import SidebarMini from "@/components/sidebar/SidebarMini.vue";
import {ref} from "vue";
import router from "@/router";

const store = useStore()
const changeTheme = () => {
  store.changeTheme()
}

const down_header = ref(false)

let param_search = ""

const searchBooks = () => {
  store.param_search = param_search
  router.push("/search")
}
</script>

<template>
  <div class="header-desktop" :class="store.theme === 'dark' ? 'header-desktop-dark' : null">
    <div v-if="$route.path !== '/search' || $route.path !== '/reader/'" class="header-desktop__search" :class="{'header-desktop__search-dark': store.theme === 'dark'}">
      <input v-model="param_search" class="header-desktop__search__input">
      <router-link to="/search" style="text-decoration: none">
        <svg @click="searchBooks" width="50" height="50" class="header-desktop__search__icon">
          <use xlink:href="@/assets/images/icons.svg#search-icon"></use>
        </svg>
      </router-link>
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
      <router-link to="/" style="text-decoration: none">
        <div class="header-mobile__down-header__home header-mobile__down-header__item">
          <svg width="20" height="20">
            <use xlink:href="@/assets/images/icons.svg#home-icon"></use>
          </svg>
          <span>Главная</span>
        </div>
      </router-link>
      <router-link to="/my-book" style="text-decoration: none">
        <div class="header-mobile__down-header__my-book header-mobile__down-header__item">
          <svg width="20" height="20">
            <use xlink:href="@/assets/images/icons.svg#my-book-icon"></use>
          </svg>
          <span>Мои книги</span>
        </div>
      </router-link>
      <router-link to="/" style="text-decoration: none">
        <div class="header-mobile__down-header__search header-mobile__down-header__item">
          <svg width="20" height="20">
            <use xlink:href="@/assets/images/icons.svg#search-icon"></use>
          </svg>
          <span>Поиск</span>
        </div>
      </router-link>
      <router-link to="/profile" style="text-decoration: none">
        <div class="header-mobile__down-header__profile header-mobile__down-header__item">
          <svg width="20" height="20">
            <use xlink:href="@/assets/images/icons.svg#account-icon"></use>
          </svg>
          <span>Профиль</span>
        </div>
      </router-link>
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

    &-dark {
      border: 3px solid #5b027b;
      box-shadow: 0 0 10px 5px rgba(#5b027b, 1);
      svg {
        fill: #5b027b;
      }
    }
  }

  &__theme-icon {
    position: absolute;
    top: 45px;
    right: 45px;
    cursor: pointer;
    fill: #0C083E;
  }

  &__theme-icon-dark {
    position: absolute;
    top: 45px;
    right: 45px;
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
      fill: #0C083E;
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
    grid-template-columns: auto auto;
    gap: 20px 10vw;
    justify-content: center;
    padding-top: 20px;
    padding-bottom: 20px;

    &__item {
      display: flex;
      align-items: center;
      justify-content: start;
      gap: 0 5px;
      cursor: pointer;
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

@media (max-width: 430px) {
  .header-mobile__down-header {
    grid-template-columns: auto auto;
  }
}

@media (max-width: 350px) {
  .header-mobile__up-header {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .header-mobile__up-header__title {
    display: none;
  }
}

@media (max-width: 300px) {
  .header-mobile__down-header {
    grid-template-columns: auto;
  }
}

</style>