<script setup>
import Sidebar from "@/components/sidebar/Sidebar.vue";
import changeResize from "@/utils/changeResize.js";
import {useRoute} from "vue-router";
import http from "@/utils/http.js";
import Header from "@/components/Header.vue";
import AboutBookCard from "@/components/AboutBookCard.vue";
const width = changeResize()

const book = http.getAboutBook(useRoute().params)
</script>

<template>
  <div class="wrapper-about-book">
    <Sidebar v-if="width > 800" />
    <div class="wrapper-about-book__inner">
      <Header class="wrapper-about-book__inner__header"/>
      <AboutBookCard :book="book"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper-about-book {
  display: flex;

  &__inner {
    flex: auto;
    &__header {

    }
  }
}
</style>
