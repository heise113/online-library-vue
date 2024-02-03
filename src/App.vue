<script setup>
import {useStore} from "@/store/store.js";

const store = useStore()
</script>

<template>
  <div class="wrapper-app" :class="store.theme === 'dark' ? 'wrapper-app-dark' : null">
    <router-view></router-view>
  </div>
</template>

<style scoped lang="scss">
  .wrapper-app {
    background-color: #f5f5f5;

    &-dark {
      background-color: #0C083E;
    }
  }
</style>