<script setup>
import Sidebar from "@/components/sidebar/Sidebar.vue";
import Header from "@/components/Header.vue";
import AllBooks from "@/components/AllBooks.vue";
import changeResize from "@/utils/changeResize.js";
const width = changeResize()
</script>

<template>
  <div class="wrapper-home">
    <Sidebar v-if="width > 800" />
    <div class="wrapper-home__content">
      <Header/>
      <AllBooks/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper-home {
  display: flex;

  &__content {
    flex: auto;
  }
}
</style>
