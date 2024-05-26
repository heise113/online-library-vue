import { defineStore } from "pinia";
import { ref } from "vue";

export const useStore = defineStore('store', () => {
    const sidebar_status = ref(null)

    const theme = ref('')
    localStorage.getItem('theme') !== null
        ? theme.value = localStorage.getItem('theme')
        : theme.value = 'light'

    const changeTheme = () => {
        theme.value === 'light' ? theme.value = 'dark' : theme.value = 'light'
        localStorage.setItem('theme', theme.value)
    }

    let jwt_token = ref("")
    localStorage.getItem('jwt_token') !== null
        ? jwt_token.value = localStorage.getItem('jwt_token')
        : jwt_token.value = ''

    const setJwtToken = (token) => {
        jwt_token.value = token
        localStorage.setItem('jwt_token', jwt_token.value)
    }
    return {sidebar_status, theme, jwt_token, changeTheme, setJwtToken}
})