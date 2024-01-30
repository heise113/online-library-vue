import { createRouter, createWebHashHistory } from "vue-router";
import MyBook from "@/screens/Mybook.vue";
import Home from "@/screens/Home.vue"

const routes = [
  { path: "/", component: Home },
  { path: "/my-book", component: MyBook }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
