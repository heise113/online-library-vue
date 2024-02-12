import { ref } from "vue"

export default function() {
    const width = ref(0)
    const onResize = () => (width.value = window.innerWidth)
    window.addEventListener("resize", onResize)
    onResize()
    return width
}