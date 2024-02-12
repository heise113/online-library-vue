import { defineStore } from "pinia";
import http from "@/utils/http.js";

export const useBooks = defineStore('books', () => {
    const books = http.getBooks()
    const popular_genres = http.getPopularGenres()
    return {books, popular_genres}
})