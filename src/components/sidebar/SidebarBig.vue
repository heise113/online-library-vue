<script setup>
import {useStore} from "@/store/store.js";

const store = useStore()
</script>

<template>
  <div class="sidebar-wrapper" :class="{'sidebar-wrapper-dark': store.theme === 'dark'}">
    <div class="sidebar-wrapper__title" :class="{'sidebar-wrapper__title-dark': store.theme === 'dark'}">
      <svg width="364" height="56" class="sidebar-wrapper__title__icon">
        <use xlink:href="@/assets/images/icons.svg#border-title"></use>
      </svg>
      <span class="sidebar-wrapper__title__text">Онлайн Библиотека</span>
    </div>
    <div class="sidebar-wrapper__navigation" :class="{'sidebar-wrapper__navigation-dark': store.theme === 'dark'}">
      <router-link to="/" style="text-decoration: none">
        <div class="sidebar-wrapper__navigation__home" :class="$route.path === '/' ? 'active-button' : null">
          <svg width="65" height="65" class="sidebar-wrapper__navigation__home__icon">
            <use xlink:href="@/assets/images/icons.svg#home-icon"></use>
          </svg>
          <span class="sidebar-wrapper__navigation__home__text">главная</span>
        </div>
      </router-link>
      <router-link to="/my-book" style="text-decoration: none">
        <div class="sidebar-wrapper__navigation__my-book" :class="$route.path === '/my-book' ? 'active-button' : null">
          <svg width="60" height="60" class="sidebar-wrapper__navigation__my-book__icon">
            <use xlink:href="@/assets/images/icons.svg#my-book-icon"></use>
          </svg>
          <span class="sidebar-wrapper__navigation__my-book__text">мои книги</span>
        </div>
      </router-link>
      <div class="sidebar-wrapper__navigation__search">
        <svg width="60" height="60" class="sidebar-wrapper__navigation__search__icon">
          <use xlink:href="@/assets/images/icons.svg#search-icon"></use>
        </svg>
        <span class="sidebar-wrapper__navigation__search__text">поиск</span>
      </div>
      <div class="sidebar-wrapper__navigation__star">
        <svg width="65" height="65" class="sidebar-wrapper__navigation__star__icon">
          <use xlink:href="@/assets/images/icons.svg#star-icon"></use>
        </svg>
        <span class="sidebar-wrapper__navigation__star__text">успехи</span>
      </div>
      <div class="sidebar-wrapper__navigation__settings">
        <svg width="65" height="65" class="sidebar-wrapper__navigation__settings__icon">
          <use xlink:href="@/assets/images/icons.svg#settings-icon"></use>
        </svg>
        <span class="sidebar-wrapper__navigation__settings__text">настройки</span>
      </div>
      <div class="sidebar-wrapper__navigation__account">
        <svg width="60" height="60" class="sidebar-wrapper__navigation__account__icon">
          <use xlink:href="@/assets/images/icons.svg#account-icon"></use>
        </svg>
        <span class="sidebar-wrapper__navigation__account__text">профиль</span>
      </div>
    </div>
    <div @click="$emit('changeSidebar')" class="sidebar-wrapper__hidden-sidebar">
      свернуть
    </div>
  </div>
</template>

<style scoped lang="scss">
.sidebar-wrapper {
  flex: none;
  position: sticky;
  top: 0;
  left: 0;
  height: 100vh;
  width: 450px;
  background-color: #a15208;
  background-image: url(../../assets/images/books_background.png);
  background-position: right;
  background-size: cover;
  border-radius: 0 20px 20px 0;

  &-dark {
    background-color: #1408a3;
  }

  &__title {
    display: inline-block;
    color: white;
    font-size: 30px;
    margin-top: 25px;
    cursor: pointer;
    fill: #A15208;
    stroke: white;

    &-dark {
      fill: #595FDF;
      stroke: #FF00C7;
    }

    &__text {
      font-weight: 300;
      position: absolute;
      top: 34px;
      left: 20px;
    }
  }

  &__navigation {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: grid;
    justify-content: center;
    grid-column-gap: 60px;
    grid-row-gap: 50px;
    grid-template-columns: 120px 120px;

    div {
      position: relative;
      display: flex;
      justify-content: center;
      width: 120px;
      height: 120px;
      background-color: rgba(white, 0.7);
      border-radius: 10px;
      cursor: pointer;

      svg {
        margin-top: 15px;
        stroke: #A15208;
        fill: #A15208;
      }

      span {
        position: absolute;
        bottom: 10px;
      }

      span {
        color: #A15208;
        font-size: 20px;
        font-weight: 400;
      }
    }
    &-dark {
      div {
        background-color: #595FDF;
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

  &__hidden-sidebar {
    display: inline-block;
    position: absolute;
    bottom: 55px;
    right: 0;
    padding: 5px 10px 5px 20px;
    border-radius: 15px 0 0 15px;
    background-color: white;
    opacity: 0.7;
    cursor: pointer;
    color: #510606;
  }
}

.active-button {
  background-color: rgba(#510606, 0.7) !important;
  svg {
    stroke: white !important;
    fill: white !important;
  }
  span {
    color: white !important;
  }
}
</style>
