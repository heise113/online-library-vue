<script setup>
import Sidebar from "@/components/sidebar/Sidebar.vue";
import router from "@/router";
import { useStore } from "@/store/store";
import { useBooks } from "@/store/books";
import changeResize from "@/utils/changeResize.js";
import Header from "@/components/Header.vue";
import Book from "@/components/Book.vue";
import http from "@/utils/http";

const width = changeResize();

const store = useStore();
const books_store = useBooks();

const searchBooks = () => {
  if (store.param_search === "") {
    books_store.books_from_search.data = [];
    return;
  } else {
    http
      .searchBooks(store.param_search)
      .then((resp) => {
        books_store.books_from_search.data = resp.data;
      })
      .catch((error) => console.log(error.message));
  }
};

const clearSearch = () => {
  store.param_search = "";
  books_store.books_from_search.data = [];
};

searchBooks();
</script>

<template>
  <div class="wrapper-search">
    <Sidebar v-if="width > 800" />
    <div class="wrapper-search__content">
      <Header />
      <div class="wrapper-search__content__window">
        <div
          class="wrapper-search__content__window__search"
          :class="{
            'wrapper-search__content__window__search-dark':
              store.theme === 'dark',
          }"
        >
          <input
            @input="searchBooks"
            v-model="store.param_search"
            class="wrapper-search__content__window__search__input"
            placeholder="Поиск"
          />
          <svg
            @click="clearSearch"
            width="75"
            height="75"
            class="wrapper-search__content__window__search__input__icon"
          >
            <use xlink:href="@/assets/images/icons.svg#close"></use>
          </svg>
        </div>
        <div class="wrapper-search__content__window__books">
          <Book
            v-for="book in books_store.books_from_search.data"
            :key="book.id"
            :book="book"
          />
        </div>
        <div
          v-if="books_store.books_from_search.data === null"
          class="wrapper-search__content__window__no-books"
          :class="{
            'wrapper-search__content__window__no-books-dark':
              store.theme === 'dark',
          }"
        >
          Ничего не найдено
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper-search {
  display: flex;

  &__content {
    flex: auto;

    &__window {
      display: flex;
      flex-direction: column;
      align-items: center;

      &__books {
        margin-top: 100px;
        margin-bottom: 100px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        row-gap: 100px;
      }

      &__no-books {
        font-size: 30px;
        &-dark {
          color: white;
        }
      }

      &__search {
        margin-top: 50px;
        justify-content: start;
        align-items: center;
        position: relative;
        width: 425px;
        height: 95px;
        border: 2px solid #a15208;
        background-color: white;
        border-radius: 10px;
        text-align: left;

        &__input {
          margin-left: 10px;
          height: 100%;
          width: 315px;
          outline: none;
          border: none;
          font-size: 30px;

          &__icon {
            cursor: pointer;
            fill: #a15208;
            position: absolute;
            right: 1px;
            bottom: 1px;

            &:hover {
              opacity: 0.7;
            }

            &:active {
              opacity: 0.4;
            }
          }
        }

        &-dark {
          border: 3px solid #5b027b;
          box-shadow: 0 0 10px 5px rgba(#5b027b, 1);
          svg {
            fill: #5b027b;
          }
        }
      }
    }
  }
}
</style>
