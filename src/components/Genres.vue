<script setup>
import {useBooks} from "@/store/books.js";

const genres = useBooks()
const emit = defineEmits(['active_genres'])
let active_genres = []

function clickOnGenre(event, genre) {
  event.classList.toggle('active-genre')
  active_genres.indexOf(genre) === -1
      ? active_genres.push(genre)
      : active_genres = active_genres.filter(item => genre !== item)
  emit('active_genres', active_genres)
}
</script>

<template>
  <div class="wrapper-genres">
    <div
        @click="clickOnGenre($event.target, genre)"
        class="wrapper-genres__genre"
        v-for="genre in genres.popular_genres"
    >
      {{ genre }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper-genres {
  display: flex;
  flex-wrap: wrap;
  row-gap: 20px;
  column-gap: 25px;

  &__genre {
    background-color: white;
    padding: 17px 27px;
    border-radius: 20px;
    color: #939393;
    font-size: 26px;
    cursor: pointer;
    user-select: none;
  }
}

.active-genre {
  background-color: #a15208;
  color: white;
}
</style>