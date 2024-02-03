<script setup>
import {useStore} from "@/store/store.js";

const store = useStore()
</script>

<template>
  <div class="wrapper-sidebar" :class="{'wrapper-sidebar-dark': store.theme === 'dark'}">
    <div @click="$emit('changeSidebar')" class="wrapper-sidebar__change-sidebar">
      <svg width="65" height="65" class="wrapper-sidebar__change-sidebar__icon">
        <use xlink:href="@/assets/images/icons.svg#change-sidebar-icon"></use>
      </svg>
    </div>
    <div class="wrapper-sidebar__navigation">
      <router-link to="/">
        <div class="wrapper-sidebar__navigation__home" :class="$route.path === '/' ? 'active-button' : null">
          <svg width="65" height="65" class="wrapper-sidebar__navigation__home__icon">
            <use xlink:href="@/assets/images/icons.svg#home-icon"></use>
          </svg>
        </div>
      </router-link>
      <router-link to="/my-book">
        <div class="wrapper-sidebar__navigation__my-books " :class="$route.path === '/my-book' ? 'active-button' : null">
          <svg width="60" height="60" class="wrapper-sidebar__navigation__my-books__icon">
            <use xlink:href="@/assets/images/icons.svg#my-book-icon"></use>
          </svg>
        </div>
      </router-link>
      <div class="wrapper-sidebar__navigation__search">
        <svg width="60" height="60" class="wrapper-sidebar__navigation__search__icon">
          <use xlink:href="@/assets/images/icons.svg#search-icon"></use>
        </svg>
      </div>
      <div class="wrapper-sidebar__navigation__stars">
        <svg width="65" height="65" class="wrapper-sidebar__navigation__stars__icon">
          <use xlink:href="@/assets/images/icons.svg#star-icon"></use>
        </svg>
      </div>
      <div class="wrapper-sidebar__navigation__settings">
        <svg width="65" height="65" class="wrapper-sidebar__navigation__settings__icon">
          <use xlink:href="@/assets/images/icons.svg#settings-icon"></use>
        </svg>
      </div>
      <div class="wrapper-sidebar__navigation__profile">
        <svg width="60" height="60" class="wrapper-sidebar__navigation__profile__icon">
          <use xlink:href="@/assets/images/icons.svg#account-icon"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper-sidebar {
  display: flex;
  flex: none;
  flex-direction: column;
  align-items: center;
  position: sticky;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100px;
  background-color: #A15208;

  &-dark {
    background-color: #510606;
  }

  &__change-sidebar {
    cursor: pointer;
    svg {
      fill: white;
      stroke: white;
      opacity: 0.5;
    }
  }

  &__navigation {
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 40px;

    div {
      opacity: 0.5;
      cursor: pointer;
    }

    svg {
      fill: white;
      stroke: white;
    }
  }
}

.active-button {
  opacity: 1 !important;
}

@media (max-width: 1300px) {
  .wrapper-sidebar__change-sidebar {
    display: none;
  }
}
</style>