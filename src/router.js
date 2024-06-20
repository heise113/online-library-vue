import { createRouter, createWebHashHistory } from "vue-router";
import MyBook from "@/screens/MyBook.vue";
import Home from "@/screens/Home.vue"
import AboutBook from "@/screens/AboutBook.vue";
import Reader from "@/screens/Reader.vue";
import Profile from "@/screens/Profile.vue";
import Search from "@/screens/Search.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/my-book", component: MyBook },
  { path: "/about-book/:book_name", component: AboutBook },
  { path: "/reader/:book_name", component: Reader },
  { path: "/profile", component: Profile },
  { path: "/search", component: Search }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
