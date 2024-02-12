import { createRouter, createWebHashHistory } from "vue-router";
import MyBook from "@/screens/Mybook.vue";
import Home from "@/screens/Home.vue"
import AboutBook from "@/screens/AboutBook.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/my-book", component: MyBook },
  { path: "/about-book/:book_name", component: AboutBook}
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
