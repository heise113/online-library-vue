<script setup>
defineProps({
  book: Object
})
function getImageUrl(name) {
  return new URL(`../assets/images/${name}`, import.meta.url).href
}
</script>

<template>
  <div class="wrapper-about-book-card">
    <div class="wrapper-about-book-card__content__img" :style="`background-image: url(${getImageUrl(book.images)});`"></div>
    <div class="wrapper-about-book-card__content__information">
      <div class="wrapper-about-book-card__content__information__up">
        <div class="wrapper-about-book-card__content__information__up__name-book">{{book.name}}</div>
        <div class="wrapper-about-book-card__content__information__up__author">{{book.author}}</div>
        <div class="wrapper-about-book-card__content__information__up__buttons">
          <div class="wrapper-about-book-card__content__information__up__buttons__read-book">Читать</div>
          <div class="wrapper-about-book-card__content__information__up__buttons__heart">
            <svg width="30" height="28">
              <use xlink:href="@/assets/images/icons.svg#heart-icon"></use>
            </svg>
          </div>
        </div>
      </div>
      <div class="wrapper-about-book-card__content__information__down">
        <div class="wrapper-about-book-card__content__information__down__description-title">Описание</div>
        <div class="wrapper-about-book-card__content__information__down__description">{{book.description}}</div>
        <div class="wrapper-about-book-card__content__information__down__genres-title">Жанры</div>
        <div class="wrapper-about-book-card__content__information__down__genres">
          <div v-for="genre in book.genres" class="wrapper-about-book-card__content__information__down__genres__item">
            {{genre}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
        }
        &__author {
          font-size: 30px;
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
        }
        &__description {
          margin-top: 10px;
        }
        &__genres-title {
          margin-top: 25px;
          font-size: 25px;
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
          }
        }
      }
    }
  }
}
</style>