<script setup>
import Genres from "@/components/Genres.vue";
import {reactive, ref} from "vue";
import Book from "@/components/Book.vue";
import {useStore} from "@/store/store.js";
import {useBooks} from "@/store/books.js";

const store = useStore()
const books = useBooks()

const params = {
  genres: [],
  filter: 'new'
}
const setGenres = (active_genres) => {
  params.genres = active_genres
  requestForBooks()
}
const setFilter = (filter) => {
  for (let key in filter_status) {
    filter_status[key] = false
  }
  filter_status[filter] = true
  show_filters.value = !show_filters.value
  params.filter = filter
  requestForBooks()
}
const requestForBooks = () => {
  console.log(params)
}
const show_filters = ref(false)
const filter_status = reactive({
  new: true,
  rating: false,
  popular: false
})

</script>

<template>
  <div class="all-books-wrapper">
    <Genres @active_genres="setGenres"/>
    <div class="all-books-wrapper__filters">
      <div class="all-books-wrapper__filters__text"
           :class="store.theme === 'dark' ? 'all-books-wrapper__filters__text-dark' : null">
        Все книги:
      </div>
      <div @click="show_filters = !show_filters" class="all-books-wrapper__filters__button"
           :class="store.theme === 'dark' ? 'all-books-wrapper__filters__button-dark' : null">
        <svg width="24" height="26">
          <use xlink:href="@/assets/images/icons.svg#filters-icon"></use>
        </svg>
        <div v-if="filter_status.new" class="all-books-wrapper__filters__button__text"
             :class="store.theme === 'dark' ? 'all-books-wrapper__filters__button__text-dark' : null"
        >
          новые
        </div>
        <div v-else-if="filter_status.rating" class="all-books-wrapper__filters__button__text"
             :class="store.theme === 'dark' ? 'all-books-wrapper__filters__button__text-dark' : null"
        >
          рейтинг
        </div>
        <div v-else-if="filter_status.popular" class="all-books-wrapper__filters__button__text"
             :class="store.theme === 'dark' ? 'all-books-wrapper__filters__button__text-dark' : null"
        >
          популярные
        </div>
        <Transition name="filters-animation">
          <div @click.stop v-show="show_filters" class="all-books-wrapper__filters__button-active">
            <div @click="setFilter('new')" class="all-books-wrapper__filters__button-active__text">новые</div>
            <div @click="setFilter('popular')" class="all-books-wrapper__filters__button-active__text">популярные</div>
            <div @click="setFilter('rating')" class="all-books-wrapper__filters__button-active__text">рейтинг</div>
          </div>
        </Transition>
      </div>
    </div>
    <div class="all-books-wrapper__books">
      <Book
          v-for="book in books.books"
          :key="book.id"
          :book="book"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.all-books-wrapper {
  margin: 35px 45px 35px 45px;

  &__filters {
    display: inline-flex;
    justify-content: center;
    column-gap: 35px;
    margin-top: 55px;

    &__text {
      color: #a15208;
      font-size: 30px;
      white-space: nowrap;
      user-select: none;

      &-dark {
        color: white;
      }
    }

    &__button {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      column-gap: 15px;
      color: #939393;
      font-size: 26px;
      background-color: white;
      border-radius: 10px;
      padding: 5px 15px;
      cursor: pointer;
      user-select: none;
      white-space: nowrap;

      svg {
        stroke: #939393;
      }

      &__text {
        position: relative;
        bottom: 1px;
      }

      &-dark {
        background-color: #4B0404;

        svg {
          fill: white;
          stroke: white;
        }
      }

      &__text-dark {
        color: white;
      }

    }

    &__button-active {
      position: absolute;
      top: 50px;
      display: flex;
      flex-direction: column;
      align-items: start;
      color: #939393;
      font-size: 26px;
      background-color: white;
      border-radius: 10px;
      padding: 5px 15px;
      cursor: pointer;
      user-select: none;

      &__text {
        width: 100%;
        border-bottom: 1px solid #939393;

        &:last-child {
          border-bottom: none;
        }

        &:hover {
          color: #a15208;
        }
      }
    }
  }

  &__books {
    display: grid;
    grid-template-columns: repeat(auto-fit, 158px);
    justify-content: space-evenly;
    column-gap: 30px;
    row-gap: 30px;
    margin-top: 60px;
  }
}

.filters-animation {
  &-enter-from {
    opacity: 0;
    transform: scale(0.1);
  }

  &-enter-to {
    opacity: 1;
    transform: scale(1);
  }

  &-enter-active {
    transition-duration: 0.2s;
  }
}

@media (max-width: 800px) {
  .all-books-wrapper {
    margin: 20px 10px 0 10px;
  }

  .all-books-wrapper__books {
    margin-top: 20px;
    grid-template-columns: repeat(auto-fit, 100px);
    column-gap: 15px;
    row-gap: 15px;
  }

  .all-books-wrapper__filters {
    margin-top: 25px;
  }

  .all-books-wrapper__filters__text {
    font-size: 25px;
  }

  .all-books-wrapper__filters__button {
    gap: 0 10px;
    svg {
      width: 18px;
      height: 22px;
    }
    &__text {
      font-size: 21px;
    }
  }
}

@media (max-width: 500px) {
  .all-books-wrapper__filters {
    column-gap: 20px;

    svg {
      width: 15px;
      height: 19px;
    }
  }
  .all-books-wrapper__filters__text {
    font-size: 22px;
  }
  .all-books-wrapper__filters__button {
    &__text {
      font-size: 16px;
    }
  }

  .all-books-wrapper__filters__button-active {
    top: 40px;
    font-size: 18px;
    padding: 5px 10px;
  }
}

@media (max-width: 350px) {
  .all-books-wrapper__filters {
    flex-direction: column;
    row-gap: 20px;
  }
}
</style>