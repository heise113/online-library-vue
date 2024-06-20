import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useBooks = defineStore('books', () => {
    const about_book = reactive({
        data: {}
    })

    const books = reactive({
        data: null
    })

    const books_filters = reactive({
        genres: -1,
        filter: "new"
    })

    const past_genres = ref("")

    const books_from_search = reactive({
        data: null
    })

    return {about_book, books, books_filters, past_genres, books_from_search}
})