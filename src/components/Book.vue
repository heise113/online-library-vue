<script setup>
import {useStore} from "@/store/store.js";

defineProps({
  book: Object
})

const store = useStore()
function getImageUrl(name) {
  return new URL(`../assets/images/${name}`, import.meta.url).href
}
</script>

<template>
  <div class="book-wrapper">
    <div class="book-wrapper__image" :style="`background-image: url(${getImageUrl(book.images)});`"></div>
    <div class="book-wrapper__author" :class="store.theme === 'dark' ? 'book-wrapper__author-dark' : null">{{ book.name }}</div>
    <div class="book-wrapper__name" :class="store.theme === 'dark' ? 'book-wrapper__name-dark' : null">{{ book.author }}</div>
  </div>
</template>

<style scoped lang="scss">
.book-wrapper {
  cursor: pointer;
  width: 158px;
  &__image {
    width: 100%;
    height: 247px;
  }

  &__author {
    margin-top: 10px;
    color: #483325;
    font-size: 15px;
    font-weight: 300;

    &-dark {
      color: white;
    }
  }

  &__name {
    margin-top: 1px;
    color: #483325;
    font-size: 15px;
    font-weight: 500;

    &-dark {
      color: white;
    }
  }
}

@media (max-width: 800px) {
  .book-wrapper {
    width: 100px;

    &__author {
      margin-top: 2px;
      font-size: 12px;
    }

    &__name {
      font-size: 12px;
    }

    &__image {
      height: 157px;
      background-size: contain;
      background-repeat: no-repeat;
    }
  }
}
</style>