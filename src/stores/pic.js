import { defineStore } from 'pinia'
import { OpfsDb } from '@/models/opfs_db.js'
import { PicImage } from '@/models/pic_image.js'

export const usePicStore = defineStore('pic', () => {
    const picImageDb = new OpfsDb('picImage')

    async function init() {
        await picImageDb.init()
    }

    async function loadPicImage(name) {
        let picImage = await picImageDb.getContent(name, PicImage)
        return picImage
    }

    return {
        init,
        loadPicImage
    }
})
