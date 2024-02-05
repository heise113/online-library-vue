<script setup>
import { ref } from "vue";
import Sidebar from "@/components/sidebar/Sidebar.vue";
import Header from "@/components/Header.vue";
import AllBooks from "@/components/AllBooks.vue";
const width = ref(0);
const onResize = () => (width.value = window.innerWidth);
onResize();
window.addEventListener("resize", onResize);

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
