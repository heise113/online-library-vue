<script setup>
import {useStore} from "@/store/store.js";
import {watch} from "vue";
const store = useStore()
watch(store, () => {
  store.theme === 'dark' ? document.body.style.backgroundColor = '#0C083E' : document.body.style.backgroundColor = '#f5f5f5'
})
</script>

<template>
  <div class="wrapper-app" :class="store.theme === 'dark' ? 'wrapper-app-dark' : null">
    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped>

</style>
