<script setup>
import http from "@/utils/http";
import { ref, onMounted, onUpdated } from "vue";
import { useStore } from "@/store/store.js";
import { useRoute } from "vue-router";
import Header from "@/components/Header.vue";
const store = useStore();

window.addEventListener("resize", onResize);

let book_id_name = useRoute().params.book_name;
let book = ref("");
let current_position_px = 0;
let current_position_page = ref(1);
let past_position_percent = ref(0);
let current_count_page = ref(0);

onMounted(() => {
  findCurrentPosition(getPositionPercent());
});

onUpdated(() => {
  findCurrentPosition(getPositionPercent());
});

http
  .getBook(book_id_name)
  .then((resp) => {
    book.value = resp.data.book_content;
  })
  .catch((error) => console.log(error.message));

function findCurrentPosition(percent) {
  let content = document.getElementById("r-content");
  current_position_page.value = Math.round((percent * getCountPage()) / 100);
  if (current_position_page.value <= 0) ++current_position_page.value;
  else if (current_position_page.value > getCountPage())
    --current_position_page.value;
  if (window.innerWidth > 1024) {
    content.style.columnWidth = `${content.clientWidth / 2 - 50}px`;
    current_position_px =
      current_position_page.value * (content.clientWidth + 50) -
      (content.clientWidth + 50);
    content.style.right = `${current_position_px}px`;
  } else {
    content.style.columnWidth = `${content.clientWidth}px`;
    current_position_px =
      current_position_page.value * (content.clientWidth + 50) -
      (content.clientWidth + 50);
    content.style.right = `${current_position_px}px`;
  }
}

function onResize() {
  findCurrentPosition(past_position_percent.value);
  updateProgressLine(getPositionPercent());
}

function getPositionPercent() {
  return (current_position_page.value * 100) / getCountPage();
}

function getCountPage() {
  let content = document.getElementById("r-content");
  let client_width = content.clientWidth;
  let scroll_width = content.scrollWidth;
  let count_page = 0;
  while (scroll_width > 0) {
    count_page++;
    scroll_width -= client_width;
    if (scroll_width <= 0) break;
    scroll_width -= 50;
  }
  current_count_page.value = count_page;
  return count_page;
}

function getDeviceType() {
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile =
    /mobile|iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(
      userAgent
    );

  if (isMobile) {
    return "mobile";
  } else {
    return "desktop";
  }
}

function moveRightContent() {
  let content = document.getElementById("r-content");
  current_position_page.value++;
  current_position_px += content.clientWidth + 50;
  content.style.right = `${current_position_px}px`;
  past_position_percent.value = getPositionPercent();
  updateProgressLine(getPositionPercent());
}

function moveLeftContent() {
  let content = document.getElementById("r-content");
  current_position_page.value--;
  current_position_px -= content.clientWidth + 50;
  content.style.right = `${current_position_px}px`;
  past_position_percent.value = getPositionPercent();
  updateProgressLine(getPositionPercent());
}

function moveNavCircle(event) {
  let nav_line = document.getElementById("nav-line");
  let nav_circle = event.target;
  let nav_line_read = document.getElementById("nav-line-read");
  let shiftX = 0;
  getDeviceType() === "desktop"
    ? (shiftX = event.clientX - nav_circle.getBoundingClientRect().left)
    : (shiftX =
        event.touches[0].pageX - nav_circle.getBoundingClientRect().left);
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
  document.addEventListener("touchmove", onMouseMove);
  document.addEventListener("touchend", onMouseUp);

  function onMouseMove(event) {
    let newLeft = 0;
    getDeviceType() === "desktop"
      ? (newLeft =
          event.clientX - shiftX - nav_line.getBoundingClientRect().left)
      : (newLeft =
          event.touches[0].pageX -
          shiftX -
          nav_line.getBoundingClientRect().left);
    if (newLeft < 0) {
      newLeft = 0;
    }
    let rightEdge = nav_line.offsetWidth - nav_circle.offsetWidth;
    if (newLeft > rightEdge) {
      newLeft = rightEdge;
    }
    nav_circle.style.left = newLeft + "px";
    past_position_percent.value =
      (newLeft * 100) / (nav_line.clientWidth - nav_circle.clientWidth);
    nav_line_read.style.width = `${past_position_percent.value}%`;
    findCurrentPosition(past_position_percent.value);
  }

  function onMouseUp() {
    document.removeEventListener("mouseup", onMouseUp);
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("touchmove", onMouseMove);
    document.removeEventListener("touchend", onMouseUp);
  }
}

function updateProgressLine(percent) {
  let nav_line = document.getElementById("nav-line");
  let nav_circle = document.getElementById("nav-circle");
  let nav_line_read = document.getElementById("nav-line-read");
  if (current_position_page.value === 1) {
    nav_circle.style.left = "0";
    nav_line_read.style.width = `0%`;
  } else if (current_position_page.value === current_count_page.value) {
    nav_circle.style.left = `${
      nav_line.clientWidth - nav_circle.clientWidth
    }px`;
    nav_line_read.style.width = `100%`;
  } else {
    nav_circle.style.left = `${
      ((nav_line.clientWidth - nav_circle.clientWidth) * percent) / 100
    }px`;
    nav_line_read.style.width = `${percent}%`;
  }
}
</script>

<template>
  <div
    class="wrapper-reader"
    :class="{ 'wrapper-reader-dark': store.theme === 'dark' }"
  >
    <div class="wrapper-reader__header">
      <div
        :class="{
          'wrapper-reader__header__theme-icon': store.theme === 'light',
          'wrapper-reader__header__theme-icon-dark': store.theme === 'dark',
        }"
        @click="store.changeTheme()"
      >
        <svg width="50" height="50">
          <use xlink:href="@/assets/images/icons.svg#theme-icon"></use>
        </svg>
      </div>
    </div>
    <button
      :disabled="current_position_page <= 1"
      @click="moveLeftContent"
      class="wrapper-reader__prev-button"
    ></button>
    <div id="r-screen" class="wrapper-reader__screen">
      <div
        v-html="book"
        id="r-content"
        class="wrapper-reader__content"
        :class="{ 'wrapper-reader__content-dark': store.theme === 'dark' }"
      ></div>
    </div>
    <button
      :disabled="current_position_page >= current_count_page"
      @click="moveRightContent($event)"
      class="wrapper-reader__next-button"
    ></button>
    <div class="wrapper-reader__navigation">
      <div
        id="nav-line"
        class="wrapper-reader__nav-line"
        :class="{ 'wrapper-reader__nav-line-dark': store.theme === 'dark' }"
      >
        <div
          class="wrapper-reader__percent"
          :class="{ 'wrapper-reader__percent-dark': store.theme === 'dark' }"
        >
          {{ Math.round(past_position_percent) }}%
        </div>
        <div id="nav-line-read" class="wrapper-reader__nav-line-read"></div>
        <div
          id="nav-circle"
          @touchstart="moveNavCircle($event)"
          @mousedown="moveNavCircle($event)"
          class="wrapper-reader__nav-circle"
        ></div>
      </div>
    </div>
  </div>
</template>

<style>
.b {
  text-indent: 20px;
}

h1 {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 40px;
}

h2 {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
}

h3 {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>

<style scoped lang="scss">
.wrapper-reader {
  &__header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 100px;

    &__theme-icon {
      position: absolute;
      top: 20px;
      right: 20px;
      cursor: pointer;
      fill: #0C083E;

      &-dark {
        position: absolute;
        top: 20px;
        right: 20px;
        cursor: pointer;
        fill: yellow;
      }
    }
  }

  &__screen {
    position: fixed;
    top: 100px;
    bottom: 100px;
    left: 80px;
    right: 80px;
    overflow: hidden;
  }

  &__content {
    position: relative;
    height: 100%;
    width: 100%;
    column-gap: 50px;
    font-size: 18px;
    line-height: 30px;
    touch-action: manipulation;

    &-dark {
      color: white;
    }
  }

  &__prev-button {
    position: fixed;
    top: 100px;
    bottom: 100px;
    left: 0;
    width: 80px;
    user-select: none;
    touch-action: manipulation;
  }

  &__next-button {
    position: fixed;
    top: 100px;
    bottom: 100px;
    right: 0;
    width: 80px;
    user-select: none;
    touch-action: manipulation;
  }

  &__navigation {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 80px;
    padding-left: 80px;
    padding-right: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
  }

  &__percent {
    position: absolute;
    top: 15px;
    right: 10px;

    &-dark {
      color: white;
    }
  }

  &__nav-line {
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 3px;
    width: 100%;
    background-color: rgba(black, 0.2);

    &-dark {
      background-color: rgba(white, 0.5);
    }
  }

  &__nav-line-read {
    position: absolute;
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 3px;
    width: 0;
    background: linear-gradient(to right, red, blue);
  }

  &__nav-circle {
    position: relative;
    cursor: pointer;
    height: 30px;
    width: 10px;
    border-radius: 30px;
    background-color: blue;
  }
}

@media (max-width: 1024px) {
  .wrapper-reader {
    &__prev-button,
    &__next-button {
      width: 20px;
    }

    &__screen {
      top: 60px;
      bottom: 60px;
      left: 20px;
      right: 20px;
    }
  }
}
</style>
