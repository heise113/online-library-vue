import { defineStore } from "pinia";
import {reactive, ref} from "vue";

export const useBooks = defineStore('books', () => {
    const popular_genres = reactive(["детективы", "фентези", "ужасы", "приключения", "поэзия", "фантастика", "любовные романы", "триллеры", "комиксы и манга", "проза"])
    const all_genres = reactive([])
    return {popular_genres, all_genres}
})