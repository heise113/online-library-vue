<script setup>
import http from "@/utils/http";
import { reactive } from "vue";
import {useStore} from "@/store/store.js";

const store = useStore()

const user_data = reactive({
    username: "",
    password: ""
})

const signIn = () => {
    http.signIn(user_data)
        .then(resp => {
            let token = resp.data.token
            store.setJwtToken(token)
        })
        .catch(error => console.log(error.message))
}
</script>

<template>
    <div class="wrapper-auth">
        <div class="wrapper-auth__title">Авторизация</div>
        <div class="wrapper-auth__text-login">Логин</div>
        <input v-model="user_data.username" placeholder="Введите логин" type="text" class="wrapper-auth__input-login">
        <div class="wrapper-auth__text-password">Пароль</div>
        <input v-model="user_data.password" placeholder="Введите пароль" class="wrapper-auth__input-password">
        <button @click="signIn" class="wrapper-auth__btn-log-in">Войти</button>
        <button @click="$emit('changeAuthActive')" class="wrapper-auth__btn-register">Регистрация</button>
    </div>
</template>

<style scoped lang="scss">
.wrapper-auth {
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 50px 50px;
    border-radius: 20px;

    &__title {
        font-size: 30px;
        margin-bottom: 20px;
        text-align: center;
    }

    &__text-login, &__text-password {
        font-size: 20px;
        margin-bottom: 5px;
    }

    &__input-login, &__input-password {
        padding: 5px 10px;
        font-size: 22px;
        margin-bottom: 10px;
    }

    &__btn-log-in {
        margin-top: 10px;
        margin-bottom: 10px;
        padding: 10px 0;
        background-color: brown;
        color: white;
    }

    &__btn-register {
        &:hover {
            text-decoration: underline;
        }
    }
}
</style>