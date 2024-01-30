import { defineStore } from "pinia";
import { ref } from "vue";

export const useStore = defineStore('store', () => {
    const sidebar_status = ref(null)
    return {sidebar_status}
})