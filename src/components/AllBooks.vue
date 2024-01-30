<script setup>
import Genres from "@/components/Genres.vue";
import {computed, reactive, ref} from "vue";
import Book from "@/components/Book.vue";

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
])

const getBooksByGenre = (active_genres) => {
  console.log(active_genres)
}

const show_filters = ref(false)
const filter_status = reactive({
  new: true,
  rating: false,
  popular: false
})
const changeFilterStatus = (filter) => {
  for (let key in filter_status) {
    filter_status[key] = false
  }
  filter_status[filter] = true
  show_filters.value = !show_filters.value
}
</script>

<template>
  <div class="all-books-wrapper">
    <Genres @active_genres="getBooksByGenre"/>
    <div class="all-books-wrapper__filters">
      <div class="all-books-wrapper__filters__text">
        Все книги:
      </div>
      <div @click="show_filters = !show_filters" class="all-books-wrapper__filters__button">
        <svg width="24" height="26">
          <use xlink:href="@/assets/images/icons.svg#filters-icon"></use>
        </svg>
        <div v-if="filter_status.new">по новизне</div>
        <div v-else-if="filter_status.rating">по рейтингу</div>
        <div v-else-if="filter_status.popular">по популярности</div>
        <Transition name="filters-animation">
          <div @click.stop v-show="show_filters" class="all-books-wrapper__filters__button-active">
            <div @click="changeFilterStatus('new')" class="all-books-wrapper__filters__button-active__text">новые</div>
            <div @click="changeFilterStatus('popular')" class="all-books-wrapper__filters__button-active__text">популярные</div>
            <div @click="changeFilterStatus('rating')" class="all-books-wrapper__filters__button-active__text">рейтинг</div>
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
  margin-top: 35px;
  margin-left: 45px;

  &__filters {
    display: inline-flex;
    justify-content: center;
    column-gap: 35px;
    margin-top: 55px;

    &__text {
      color: #a15208;
      font-size: 30px;
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
  &-enter-active,
  &-leave-active {
    transition-duration: 0.2s;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: scale(0.1);
  }
}
</style>