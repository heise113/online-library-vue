import { defineStore } from "pinia";
import { reactive, ref } from "vue";

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
    const setJwtToken = (token) => {
        jwt_token.value = token
        sessionStorage.setItem('jwt_token', jwt_token.value)
    }
    const getJwtToken = () => {
        sessionStorage.getItem('jwt_token') !== null
        ? jwt_token.value = sessionStorage.getItem('jwt_token')
        : jwt_token.value = ""
        return jwt_token
    }

    const profile_data = reactive({
        data: {}
    })

    const setProfileData = (data) => {
        profile_data.data = data
        sessionStorage.setItem('profile_data', JSON.stringify(profile_data.data))
    }

    const getProfileData = () => {
        if (getJwtToken().value !== "") {
            if (profile_data.data === null) {
                profile_data.data = JSON.parse(sessionStorage.getItem('profile_data'))
                return profile_data.data
            }
            else {
                return profile_data.data
            }
        }
        else {
            return {}
        }
    }

    return {sidebar_status, theme, jwt_token, profile_data, changeTheme, setJwtToken, getJwtToken, setProfileData, getProfileData}
})