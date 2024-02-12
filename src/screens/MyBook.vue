<script setup>
import Sidebar from "@/components/sidebar/Sidebar.vue";
import changeResize from "@/utils/changeResize.js";
const width = changeResize()

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