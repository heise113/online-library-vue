import { reactive } from "vue";
import axios from "axios";

export default {
  getBooks() {
    return axios.get("http://localhost:8000/api-free/all-books")
  },
  getAboutBook(name_id) {
    return axios.get(`http://localhost:8000/api-free/about-book/${name_id}`)
  },
  getPopularGenres() {
    return axios.get(`http://localhost:8000/api-free/popular-genres`)
  },
  getBook(name_id) {
    return axios.get(`http://localhost:8000/api-free/book-content/${name_id}`)
  },
  createUser(user_data) {
    return axios.post("http://localhost:8000/auth/sign-up", {
      "name": user_data.name,
      "username": user_data.username,
      "password": user_data.password
    })
  },
  signIn(user_data) {
    return axios.post("http://localhost:8000/auth/sign-in", {
      "username": user_data.username,
      "password": user_data.password
    })
  },
  getProfileData(token) {
    return axios.post("http://localhost:8000/api/profile-data", {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  },
  addBook(token, id_book) {
    return axios.post("http://localhost:8000/api/add-book", id_book, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  },
  deleteBook(token, id_book) {
    return axios.post("http://localhost:8000/api/delete-book", id_book, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }
};
