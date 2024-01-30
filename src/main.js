import { createApp } from 'vue'
import App from './App.vue'
import "@/assets/global.scss"
import router from "@/router.js"
import { createPinia } from "pinia";

createApp(App)
    .use(router)
    .use(createPinia())
    .mount("#app")