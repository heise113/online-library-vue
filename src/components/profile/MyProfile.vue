<script setup>
import { useStore } from '@/store/store';
import http from '@/utils/http';
import { reactive } from 'vue';


const store = useStore()

http.getProfileData(store.getJwtToken().value)
    .then((resp) => {
        store.setProfileData(resp.data)
    })
    .catch(error => console.log(error.message))
</script>

<template>
    <div class="wrapper-profile">
        <div class="wrapper-profile__title">Мой профиль</div>
        <div class="wrapper-profile__name">Имя: {{ store.getProfileData().name }}</div>
        <div class="wrapper-profile__login">Логин: {{ store.getProfileData().username }}</div>
        <button @click="store.setJwtToken('')" class="wrapper-profile__exit">Выйти</button>
    </div>
</template>

<style scoped lang="scss">
.wrapper-profile {
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

    &__name {
        font-size: 25px;
    }

    &__login {
        font-size: 25px;
    }

    &__exit {
        margin-top: 30px;
        &:hover {
            text-decoration: underline;
            color: red;
        }
    }
}
</style>