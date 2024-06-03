import { defineStore } from "pinia";
import { reactive } from "vue";

export const useBooks = defineStore('books', () => {
    const about_book = reactive({
        data: {}
    })

    const books = reactive({
        data: null
    })
    return {about_book, books}
})