<script setup>
import { onMounted } from "vue";
import SidebarBig from "@/components/sidebar/SidebarBig.vue";
import SidebarMini from "@/components/sidebar/SidebarMini.vue";
import { useStore } from "@/store/store.js";
const store = useStore()

onMounted(() => {
  store.sidebar_status === null ? onResize() : null
})
const onResize = () => {
  window.innerWidth > 1500 ? store.sidebar_status = true : store.sidebar_status = false
}
window.addEventListener("resize", onResize);

</script>

<template>

  <Transition name="change-sidebar" mode="out-in">
    <SidebarBig v-if="store.sidebar_status" @changeSidebar="store.sidebar_status = !store.sidebar_status"/>
    <SidebarMini v-else @changeSidebar="store.sidebar_status = !store.sidebar_status"/>
  </Transition>

</template>


<style lang="scss" scoped>
.change-sidebar {
  &-enter-active,
  &-leave-active {
    transition: all 0.3s ease;
  }

  &-enter-from,
  &-leave-to {
    transform: translateX(-500px);
  }
}
</style>