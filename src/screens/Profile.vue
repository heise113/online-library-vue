<script setup>
import Sidebar from "@/components/sidebar/Sidebar.vue";
import changeResize from "@/utils/changeResize.js";
import Auth from "@/components/profile/Auth.vue";
import Register from "@/components/profile/Register.vue";
import MyProfile from "@/components/profile/MyProfile.vue";
import {useStore} from "@/store/store.js";
import { ref } from "vue";
const width = changeResize()

const store = useStore()

const auth_active = ref(true)

const changeAuthActive = () => {
  auth_active.value = !auth_active.value
}
</script>

<template>
  <div class="wrapper-profile">
    <Sidebar v-if="width > 800" />
    <div class="wrapper-profile__profile-content">
        <MyProfile v-if="store.jwt_token !== ''" />
        <Auth @changeAuthActive="changeAuthActive" v-if="store.jwt_token === '' && auth_active === true" />
        <Register @changeAuthActive="changeAuthActive" v-if="store.jwt_token === '' && auth_active === false" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper-profile {
  display: flex;

  &__profile-content {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>