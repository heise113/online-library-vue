<script setup>
import {useBooks} from "@/store/books.js";
import {useStore} from "@/store/store.js";
import {reactive} from "vue";

const store = useStore()
const genres = useBooks()
const emit = defineEmits(['active_genres'])
let active_genres = []

function clickOnGenre(event, genre) {
  store.theme === 'dark' ? event.classList.toggle('active-genre-dark') : event.classList.toggle('active-genre')
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
        :class="{
          'wrapper-genres__genre-dark': store.theme === 'dark',
          'active-genre': store.theme === 'light' && active_genres.indexOf(genre) !== -1,
          'active-genre-dark': store.theme === 'dark' && active_genres.indexOf(genre) !== -1,
        }"
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

    &-dark {
      background-color: #4B0404;
      color: white;
    }
  }
}

.active-genre {
  background-color: #a15208;
  color: white;
}
.active-genre-dark {
  background-color: #BBBBBB;
  color: #4B0404;
}


@media (max-width: 1000px) {
  .wrapper-genres__genre {
    padding: 10px 17px;
    font-size: 18px;
    border-radius: 12px;
  }
}

@media (max-width: 800px) {
  .wrapper-genres {
    gap: 15px 15px;
  }

  .wrapper-genres__genre {
    padding: 8px 14px;
    font-size: 16px;
    border-radius: 10px;
  }
}
</style>