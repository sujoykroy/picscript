import { defineStore } from 'pinia';
import { OpfsDb } from '@/models/opfs_db.js';
import { PicImage } from '@/models/pic_image.js';

export const usePicStore = defineStore('pic', () => {
    const picImageDb = new OpfsDb('picImage');

    async function init() {
        await picImageDb.init();
    }

    const _picImageCache = {};

    async function loadPicImage(name, options) {
        let picImage = _picImageCache[name];
        if (options && options.cache && picImage) return picImage;
        picImage = await picImageDb.getContent(name, PicImage);
        if (options && options.cache) _picImageCache[name] = picImage;
        return picImage;
    }

    async function getPicNames() {
        return await picImageDb.getKeys();
    }

    return {
        init,
        loadPicImage,
        getPicNames
    };
});
