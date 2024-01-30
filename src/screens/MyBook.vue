<script setup>
import { ref } from "vue";
import Sidebar from "@/components/sidebar/Sidebar.vue";
const width = ref(0);
const onResize = () => (width.value = window.innerWidth);
onResize();
window.addEventListener("resize", onResize);
</script>

<template>
  <div class="wrapper-my-book">
    <Sidebar v-if="width > 800" />
  </div>
</template>

<style scoped lang="scss">
.wrapper-my-book {
  display: flex;
}
</style>