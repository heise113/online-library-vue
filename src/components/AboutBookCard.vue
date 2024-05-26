<script setup>
import {ref} from "vue";
import {useStore} from "@/store/store.js";

const store = useStore()

defineProps({
  book: Object
})
function getImageUrl(name) {
  return new URL(`../assets/images/${name}`, import.meta.url).href
}
</script>

<template>
  <div class="wrapper-about-book-card" :class="{'wrapper-about-book-card-dark': store.theme === 'dark'}">
    <div class="wrapper-about-book-card__content__img" :style="`background-image: url(${getImageUrl(book.images)});`"></div>
    <div class="wrapper-about-book-card__content__information">
      <div class="wrapper-about-book-card__content__information__up">
        <div 
          class="wrapper-about-book-card__content__information__up__name-book"
          :class="{'wrapper-about-book-card__content__information__up__name-book-dark': store.theme === 'dark'}"
        >
          {{book.name}}
        </div>
        <div 
          class="wrapper-about-book-card__content__information__up__author"
          :class="{'wrapper-about-book-card__content__information__up__author-dark': store.theme === 'dark'}"
        >
          {{book.author}}
        </div>
        <div class="wrapper-about-book-card__content__information__up__buttons">
          <RouterLink :to="`/reader/${book.name_id}`">
            <div 
              class="wrapper-about-book-card__content__information__up__buttons__read-book"
              :class="{'wrapper-about-book-card__content__information__up__buttons__read-book-dark': store.theme === 'dark'}"
            >
              Читать
            </div>
          </RouterLink>
          <div class="wrapper-about-book-card__content__information__up__buttons__heart">
            <svg width="30" height="28">
              <use xlink:href="@/assets/images/icons.svg#heart-icon"></use>
            </svg>
          </div>
        </div>
      </div>
      <div class="wrapper-about-book-card__content__information__down">
        <div class="wrapper-about-book-card__content__information__down__description-title"
          :class="{'wrapper-about-book-card__content__information__down__description-title-dark': store.theme === 'dark'}"
        >
          Описание
        </div>
        <div class="wrapper-about-book-card__content__information__down__description"
          :class="{'wrapper-about-book-card__content__information__down__description-dark': store.theme === 'dark'}"
        >
          {{book.description}}
        </div>
        <div class="wrapper-about-book-card__content__information__down__genres-title"
          :class="{'wrapper-about-book-card__content__information__down__genres-title-dark': store.theme === 'dark'}"
        >
          Жанры
        </div>
        <div class="wrapper-about-book-card__content__information__down__genres">
          <div v-for="genre in book.genres" class="wrapper-about-book-card__content__information__down__genres__item"
            :class="{'wrapper-about-book-card__content__information__down__genres__item-dark': store.theme === 'dark'}"
          >
            {{genre}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.b {
  font-size: 30px;
}
.wrapper-about-book-card {
  max-width: 1000px;
  position: relative;
  left: 50%;
  transform: translate(-50%);
  display: inline-flex;
  justify-content: center;
  column-gap: 50px;
  margin: 35px auto;
  padding: 30px;
  background-color: white;
  border-radius: 10px;

  &-dark {
    background-color: #0b3473
  }

  &__content {
    &__img {
      width: 237px;
      height: 370px;
      background-size: cover;
      flex: none;
    }

    &__information {
      &__up {
        height: 370px;
        &__name-book {
          font-size: 50px;

          &-dark {
            color: white;
          }
        }
        &__author {
          font-size: 30px;

          &-dark {
            color: white;
          }
        }

        &__buttons {
          display: flex;
          align-items: center;
          margin-top: 30px;
          column-gap: 30px;
          user-select: none;

          &__read-book {
            display: inline-block;
            padding: 20px 30px;
            color: white;
            background-color: #1408a3;
            border-radius: 5px;
            cursor: pointer;

            &-dark {
              background-color: #4B0404;
            }
          }

          &__heart {
            background-color: lightgray;
            padding: 15px;
            border-radius: 100%;
            cursor: pointer;
          }
        }
      }
      &__down {
        &__description-title {
          font-size: 25px;

          &-dark {
            color: white;
          }
        }
        &__description {
          margin-top: 10px;

          &-dark {
            color: white;
          }
        }
        &__genres-title {
          margin-top: 25px;
          font-size: 25px;

          &-dark {
            color: white;
          }
        }
        &__genres {
          margin-top: 10px;
          display: flex;
          flex-wrap: wrap;
          gap: 10px 10px;

          &__item {
            padding: 5px 10px;
            background-color: #BBBBBB;
            border-radius: 15px;
            color: white;

            &-dark {
              background-color: #4B0404;
            }
          }
        }
      }
    }
  }
}

@media (max-width: 1200px) {
  .wrapper-about-book-card {
    max-width: 500px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .wrapper-about-book-card__content__img {
    width: 118px;
    height: 185px;
    background-size: cover;
    flex: none;
  }

  .wrapper-about-book-card__content__information__up__name-book {
    font-size: 25px;
  }

  .wrapper-about-book-card__content__information__up__author {
    font-size: 15px;
  }

  .wrapper-about-book-card__content__information__up {
    margin-bottom: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: auto;
  }
}
</style>