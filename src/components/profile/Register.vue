<script setup>
import http from "@/utils/http";
import { reactive } from "vue";

const emit = defineEmits(['changeAuthActive'])

const registerUser = () => {
    http.createUser(user_data)
        .then((resp) => {
            emit('changeAuthActive')
        })
        .catch(error => console.log(error.message))
}

const user_data = reactive({
    name: "",
    username: "",
    password: ""
})
    

</script>

<template>
    <div class="wrapper-register">
        <div class="wrapper-register__title">Регистрация</div>
        <div class="wrapper-register__text-name">Имя</div>
        <input placeholder="Введите имя" v-model="user_data.name" type="text" class="wrapper-register__input-name">
        <div class="wrapper-register__text-login">Логин</div>
        <input placeholder="Введите логин" v-model="user_data.username" type="text" class="wrapper-register__input-login">
        <div class="wrapper-register__text-password">Пароль</div>
        <input placeholder="Введите пароль" v-model="user_data.password" type="text" class="wrapper-register__input-password">
        <button @click="registerUser" class="wrapper-register__btn-sign-up">Зарегистрироваться</button>
        <button @click="$emit('changeAuthActive')" class="wrapper-register__btn-auth">Авторизация</button>
    </div>
</template>

<style scoped lang="scss">
.wrapper-register {
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

    &__text-name, &__text-login, &__text-password {
        font-size: 20px;
        margin-bottom: 5px;
    }

    &__input-name, &__input-login, &__input-password {
        padding: 5px 10px;
        font-size: 22px;
        margin-bottom: 10px;
    }

    &__btn-sign-up {
        margin-top: 10px;
        margin-bottom: 10px;
        padding: 10px 0;
        background-color: brown;
        color: white;
    }

    &__btn-auth {
        &:hover {
            text-decoration: underline;
        }
    }
}
</style>