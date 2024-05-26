import { reactive } from "vue";
import axios from "axios";

export default {
  getBooks() {
    return [
      {
        id: 0,
        name_id: "atomic-heart-predistoriya",
        name: "Atomic Heart. Предыстория",
        author: "Харальд Хорф",
        images: "atomic.png",
      },
      {
        id: 1,
        name_id: "golodnie-igri-kniga-1",
        name: "Голодные игры. Книга 1. Голодные игры",
        author: "Сьюзен Коллинз",
        images: "golodnie-igri.png",
      },
      {
        id: 2,
        name_id: "witcher-poslednee-zhelanie",
        name: "Последнее желание.",
        author: "Анджей Сапковский",
        images: "witcher.png",
      },
      {
        id: 3,
        name_id: "metro-2033",
        name: "Метро 2033",
        author: "Дмитрий Глуховский",
        images: "metro.png",
      },
      {
        id: 4,
        name_id: "vzlomat-smert",
        name: "Взломать смерть",
        author: "Герман Рыльский, Тамара Рыльская ",
        images: "vzlomat.png",
      },
      {
        id: 5,
        name_id: "duna-hroniki-duni-kniga-1",
        name: "Дюна. Хроники Дюны. Книга 1",
        author: "Фрэнк Герберт",
        images: "duna.png",
      },
      {
        id: 6,
        name_id: "blagoslavlenie-nebozhitelei-tom-2",
        name: "Благословение небожителей. Том 2",
        author: "Харальд Хорф",
        images: "blagoslavlenie.png",
      },
    ];
  },
  getAboutBook(name_id) {
    return {
      id: 2,
      name_id: "witcher-poslednee-zhelanie",
      name: "Последнее желание.",
      genres: [
        "Боевое фентези",
        "Художественная литература",
        "Фентези",
        "Эпическое фентези",
      ],
      description:
        "Ведьмак — это мастер меча и мэтр волшебства, ведущий непрерывную войну с кровожадными монстрами, которые угрожают покою сказочной страны. «Ведьмак» — это мир на острие меча, ошеломляющее действие, незабываемые ситуации, великолепные боевые сцены.",
      author: "Анджей Сапковский",
      images: "witcher.png",
    };
  },
  getPopularGenres() {
    return [
      "детективы",
      "фентези",
      "ужасы",
      "приключения",
      "поэзия",
      "фантастика",
      "любовные романы",
      "триллеры",
      "комиксы и манга",
      "проза",
    ];
  },
  getBook() {
    return axios.get("http://localhost:8000/api-free/book-content/poslednee-zhelanie")
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
  }
};
