<script setup>
import {useStore} from "@/store/store.js";

const store = useStore()
const changeTheme = () => {
  store.changeTheme()
}
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
  <div class="header-mobile">header mobile</div>
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