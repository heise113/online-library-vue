<script setup>
import Sidebar from "@/components/sidebar/Sidebar.vue";
import router from "@/router";
import { useStore } from "@/store/store";
import changeResize from "@/utils/changeResize.js";
import Header from "@/components/Header.vue";
import Book from "@/components/Book.vue";
import http from "@/utils/http";


const width = changeResize();

const store = useStore()
store.getJwtToken().value === "" ? router.push("/profile") : null;

http.getProfileData(store.getJwtToken().value)
  .then((resp) => {
    store.setProfileData(resp.data)
  })
  .catch(error => console.log(error.message))



</script>

<template>
  <div class="wrapper-my-book">
    <Sidebar v-if="width > 800" />
    <div class="wrapper-my-book__content">
      <Header/>
      <div class="wrapper-my-book__content__my-books">
        <div 
          class="wrapper-my-book__content__my-books__title"
          :class="{
            'wrapper-my-book__content__my-books__title-dark':
              store.theme === 'dark',
          }"
        >
          Мои книги:
        </div>
        <div class="wrapper-my-book__content__my-books__books" v-if="store.getProfileData() !== null">
          <Book
            v-for="book in store.getProfileData().my_books"
            :key="book.id"
            :book="book"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper-my-book {
  display: flex;

  &__content {
    flex: auto;

    &__my-books {
      margin: 35px 45px 35px 45px;

      &__title {
        color: #a15208;
        font-size: 30px;
        white-space: nowrap;
        user-select: none;

        &-dark {
          color: white;
        }
      }

      &__books {
        display: grid;
        grid-template-columns: repeat(auto-fit, 158px);
        justify-content: start;
        column-gap: 30px;
        row-gap: 30px;
        margin-top: 60px;
      }
    }
  }
}
</style>
