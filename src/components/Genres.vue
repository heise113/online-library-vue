<script setup>
import {useBooks} from "@/store/books.js";
import {useStore} from "@/store/store.js";
import http from "@/utils/http";
import {reactive} from "vue";

const genres = reactive({
  data: []
})
http.getPopularGenres()
  .then((resp) => {
    genres.data = resp.data
  })
  .catch(error => console.log(error.message))

const store = useStore()
const books_store = useBooks()

const emit = defineEmits(['active_genres'])

let active_genre
books_store.books_filters.genres === -1 ? active_genre = -1 : active_genre = books_store.books_filters.genres.id
let current_genre = -1
let past_genres_event = {}

function clickOnGenre(event, genre) {
  store.theme === 'dark' ? event.classList.toggle('active-genre-dark') : event.classList.toggle('active-genre')
  
  current_genre = genre.id

  if (books_store.past_genres !== "" && books_store.past_genres !== genre.genre) {
    store.theme === 'dark' ? past_genres_event.classList.remove('active-genre-dark') : past_genres_event.classList.remove('active-genre')
    active_genre = current_genre
  }
  else if (books_store.past_genres !== "" && books_store.past_genres === genre.genre){
    active_genre = -1
    books_store.past_genres = ""
    past_genres_event = {}
    emit('active_genres', active_genre)
    return
  }
  else {
    active_genre = current_genre
  }
    
  books_store.past_genres = genre.genre
  past_genres_event = event
  emit('active_genres', active_genre)
}
</script>

<template>
  <div class="wrapper-genres">
    <div
        @click="clickOnGenre($event.target, genre)"
        class="wrapper-genres__genre"
        :class="{
          'wrapper-genres__genre-dark': store.theme === 'dark',
          'active-genre': store.theme === 'light' && books_store.books_filters.genres === genre.id,
          'active-genre-dark': store.theme === 'dark' && books_store.books_filters.genres === genre.id,
        }"
        v-for="genre in genres.data"
    >
      {{ genre.genre }}
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
      background-color: #BBBBBB;
      color: #4B0404;
    }
  }
}

.active-genre {
  background-color: #a15208;
  color: white;
}
.active-genre-dark {
  background-color: #4B0404;
  color: white;
}


@media (max-width: 1000px) {
  .wrapper-genres {
    gap: 15px 15px;
  }
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