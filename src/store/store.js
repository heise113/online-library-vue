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
    return {sidebar_status, theme, changeTheme}
})