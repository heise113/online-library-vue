<script setup>
import {useStore} from "@/store/store.js";
import {onMounted, watch} from "vue";
const store = useStore()
onMounted(() => {
  store.theme === 'dark' ? document.body.style.backgroundColor = '#0C083E' : document.body.style.backgroundColor = '#f5f5f5'
})
watch(store, () => {
  store.theme === 'dark' ? document.body.style.backgroundColor = '#0C083E' : document.body.style.backgroundColor = '#f5f5f5'
})
</script>

<template>
  <div class="wrapper-app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped>
// .wrapper-app {
//   background-color: #f5f5f5;
//   &-dark {
//     background-color: #0C083E;
//   }
// }
</style>
