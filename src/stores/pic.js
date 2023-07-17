import { defineStore } from 'pinia'

export const usePicStore = defineStore('pic', () => {
    async function loadPicPathList() {
        let resp = await fetch(import.meta.env.VITE_PIC_PATHLIST_URL)
        console.log(resp.data)
    }

    return {
        loadPicPathList
    }
})
