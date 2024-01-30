<script setup>

</script>

<template>
<div class="header-desktop">
  <div class="header-desktop__search">
    <input class="header-desktop__search__input">
    <svg width="50" height="50" class="header-desktop__search__icon">
      <use xlink:href="@/assets/images/icons.svg#search-icon"></use>
    </svg>
  </div>
</div>
<div class="header-mobile">header mobile</div>
</template>

<style scoped lang="scss">
.header-desktop {
  position: sticky;
  top: 0;
  background-color: #f5f5f5;
  padding-top: 40px;
  padding-left: 45px;
  padding-bottom: 40px;
  z-index: 1;
  &__search {

    justify-content: start;
    align-items: center;
    position: relative;
    width: 283px;
    height: 63px;
    border: 2px solid #A15208;
    background-color: white;
    border-radius: 10px;
    text-align: left;

    &__input {
      margin-left: 10px;
      height: 100%;
      width: 210px;
      outline: none;
      border: none;
      font-size: 30px;
    }

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
}
@media (max-width: 800px) {
  .header-desktop {
    display: none;
  }
}
@media (min-width: 801px) {
  .header-mobile {
    display: none;
  }
}
</style>