<script setup>
import Genres from "@/components/Genres.vue";
import {computed, reactive, ref} from "vue";
import Book from "@/components/Book.vue";
import {useStore} from "@/store/store.js";

const all_books = reactive([
  {
    id: 0,
    name: 'Atomic Heart. Предыстория',
    author: 'Харальд Хорф',
    images: 'atomic.png'
  },
  {
    id: 1,
    name: 'Голодные игры. Книга 1. Голодные игры',
    author: 'Сьюзен Коллинз',
    images: 'golodnie-igri.png'
  },
  {
    id: 2,
    name: 'Последнее желание. Меч Предназначения. Кровь эльфов',
    author: 'Анджей Сапковский',
    images: 'witcher.png'
  },
  {
    id: 3,
    name: 'Метро 2033',
    author: 'Дмитрий Глуховский',
    images: 'metro.png'
  },
  {
    id: 4,
    name: 'Взломать смерть',
    author: 'Герман Рыльский, Тамара Рыльская ',
    images: 'vzlomat.png'
  },
  {
    id: 5,
    name: 'Дюна. Хроники Дюны. Книга 1',
    author: 'Фрэнк Герберт',
    images: 'duna.png'
  },
  {
    id: 6,
    name: 'Благословение небожителей. Том 2',
    author: 'Харальд Хорф',
    images: 'blagoslavlenie.png'
  },
  {
    id: 7,
    name: 'Atomic Heart. Предыстория',
    author: 'Харальд Хорф',
    images: 'atomic.png'
  },
  {
    id: 8,
    name: 'Голодные игры. Книга 1. Голодные игры',
    author: 'Сьюзен Коллинз',
    images: 'golodnie-igri.png'
  },
  {
    id: 9,
    name: 'Последнее желание. Меч Предназначения. Кровь эльфов',
    author: 'Анджей Сапковский',
    images: 'witcher.png'
  },
  {
    id: 10,
    name: 'Метро 2033',
    author: 'Дмитрий Глуховский',
    images: 'metro.png'
  },
  {
    id: 11,
    name: 'Взломать смерть',
    author: 'Герман Рыльский, Тамара Рыльская ',
    images: 'vzlomat.png'
  },
  {
    id: 12,
    name: 'Дюна. Хроники Дюны. Книга 1',
    author: 'Фрэнк Герберт',
    images: 'duna.png'
  },
  {
    id: 13,
    name: 'Благословение небожителей. Том 2',
    author: 'Харальд Хорф',
    images: 'blagoslavlenie.png'
  },
  {
    id: 14,
    name: 'Atomic Heart. Предыстория',
    author: 'Харальд Хорф',
    images: 'atomic.png'
  },
  {
    id: 15,
    name: 'Голодные игры. Книга 1. Голодные игры',
    author: 'Сьюзен Коллинз',
    images: 'golodnie-igri.png'
  },
  {
    id: 16,
    name: 'Последнее желание. Меч Предназначения. Кровь эльфов',
    author: 'Анджей Сапковский',
    images: 'witcher.png'
  },
  {
    id: 17,
    name: 'Метро 2033',
    author: 'Дмитрий Глуховский',
    images: 'metro.png'
  },
  {
    id: 18,
    name: 'Взломать смерть',
    author: 'Герман Рыльский, Тамара Рыльская ',
    images: 'vzlomat.png'
  },
  {
    id: 19,
    name: 'Дюна. Хроники Дюны. Книга 1',
    author: 'Фрэнк Герберт',
    images: 'duna.png'
  },
  {
    id: 20,
    name: 'Благословение небожителей. Том 2',
    author: 'Харальд Хорф',
    images: 'blagoslavlenie.png'
  },
  {
    id: 21,
    name: 'Atomic Heart. Предыстория',
    author: 'Харальд Хорф',
    images: 'atomic.png'
  },
  {
    id: 22,
    name: 'Голодные игры. Книга 1. Голодные игры',
    author: 'Сьюзен Коллинз',
    images: 'golodnie-igri.png'
  },
  {
    id: 23,
    name: 'Последнее желание. Меч Предназначения. Кровь эльфов',
    author: 'Анджей Сапковский',
    images: 'witcher.png'
  },
  {
    id: 24,
    name: 'Метро 2033',
    author: 'Дмитрий Глуховский',
    images: 'metro.png'
  },
  {
    id: 25,
    name: 'Взломать смерть',
    author: 'Герман Рыльский, Тамара Рыльская ',
    images: 'vzlomat.png'
  },
  {
    id: 26,
    name: 'Дюна. Хроники Дюны. Книга 1',
    author: 'Фрэнк Герберт',
    images: 'duna.png'
  },
  {
    id: 27,
    name: 'Благословение небожителей. Том 2',
    author: 'Харальд Хорф',
    images: 'blagoslavlenie.png'
  },
  {
    id: 28,
    name: 'Atomic Heart. Предыстория',
    author: 'Харальд Хорф',
    images: 'atomic.png'
  },
  {
    id: 29,
    name: 'Голодные игры. Книга 1. Голодные игры',
    author: 'Сьюзен Коллинз',
    images: 'golodnie-igri.png'
  },
  {
    id: 30,
    name: 'Последнее желание. Меч Предназначения. Кровь эльфов',
    author: 'Анджей Сапковский',
    images: 'witcher.png'
  },
  {
    id: 31,
    name: 'Метро 2033',
    author: 'Дмитрий Глуховский',
    images: 'metro.png'
  },
  {
    id: 32,
    name: 'Взломать смерть',
    author: 'Герман Рыльский, Тамара Рыльская ',
    images: 'vzlomat.png'
  },
  {
    id: 33,
    name: 'Дюна. Хроники Дюны. Книга 1',
    author: 'Фрэнк Герберт',
    images: 'duna.png'
  },
  {
    id: 34,
    name: 'Благословение небожителей. Том 2',
    author: 'Харальд Хорф',
    images: 'blagoslavlenie.png'
  },
  {
    id: 35,
    name: 'Atomic Heart. Предыстория',
    author: 'Харальд Хорф',
    images: 'atomic.png'
  },
  {
    id: 36,
    name: 'Голодные игры. Книга 1. Голодные игры',
    author: 'Сьюзен Коллинз',
    images: 'golodnie-igri.png'
  },
  {
    id: 37,
    name: 'Последнее желание. Меч Предназначения. Кровь эльфов',
    author: 'Анджей Сапковский',
    images: 'witcher.png'
  },
  {
    id: 38,
    name: 'Метро 2033',
    author: 'Дмитрий Глуховский',
    images: 'metro.png'
  },
  {
    id: 39,
    name: 'Взломать смерть',
    author: 'Герман Рыльский, Тамара Рыльская ',
    images: 'vzlomat.png'
  },
  {
    id: 40,
    name: 'Дюна. Хроники Дюны. Книга 1',
    author: 'Фрэнк Герберт',
    images: 'duna.png'
  },
  {
    id: 41,
    name: 'Благословение небожителей. Том 2',
    author: 'Харальд Хорф',
    images: 'blagoslavlenie.png'
  },
])
const store = useStore()

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
             :class="store.theme === 'dark' ? 'all-books-wrapper__filters__button__text-dark' : null">по новизне
        </div>
        <div v-else-if="filter_status.rating" class="all-books-wrapper__filters__button__text"
             :class="store.theme === 'dark' ? 'all-books-wrapper__filters__button__text-dark' : null">по рейтингу
        </div>
        <div v-else-if="filter_status.popular" class="all-books-wrapper__filters__button__text"
             :class="store.theme === 'dark' ? 'all-books-wrapper__filters__button__text-dark' : null">по популярности
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
          v-for="book in all_books"
          :key="book.id"
          :book="book"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.all-books-wrapper {
  margin: 35px 10px 35px 45px;

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
    display: flex;
    flex-wrap: wrap;
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
    margin-top: 30px;
    column-gap: 15px;
    row-gap: 15px;
  }

  .all-books-wrapper__filters__text {
    font-size: 25px;
  }

  .all-books-wrapper__filters__button {
    svg {
      width: 20px;
      height: 22px;
    }

    &__text {
      font-size: 20px;
    }
  }
}

@media (max-width: 500px) {
  .all-books-wrapper__filters {
    column-gap: 20px;
  }
  .all-books-wrapper__filters__text {
    font-size: 22px;
  }
  .all-books-wrapper__filters__button {
    &__text {
      font-size: 16px;
    }
  }
}

@media (max-width: 350px) {
  .all-books-wrapper__filters {
    flex-direction: column;
    row-gap: 20px;
  }
}
</style>