<script setup>
defineProps({
  book: Object
})
function getImageUrl(name) {
  return new URL(`../assets/images/${name}`, import.meta.url).href
}
</script>

<template>
  <div class="book-wrapper">
    <div class="book-wrapper__image" :style="`background-image: url(${getImageUrl(book.images)});`"></div>
    <div class="book-wrapper__author">{{ book.name }}</div>
    <div class="book-wrapper__name">{{ book.author }}</div>
  </div>
</template>

<style scoped lang="scss">
.book-wrapper {
  cursor: pointer;
  width: 158px;
  &__image {
    width: 100%;
    height: 247px;
    //background-image: url("@/assets/images/atomic.png");
  }

  &__author {
    margin-top: 10px;
    color: #483325;
    font-size: 15px;
    font-weight: 300;
  }

  &__name {
    margin-top: 1px;
    color: #483325;
    font-size: 15px;
    font-weight: 500;
  }


}
</style>