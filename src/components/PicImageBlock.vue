<script setup>
import { ref, onMounted, watch } from 'vue';
import { usePicStore } from '@/stores/pic.js';
import PicShapeBlock from '@/components/PicShapeBlock.vue';

const props = defineProps({
    text: {
        type: String
    },
    useCache: {
        type: Boolean,
        default: false
    }
});

const picStore = usePicStore();
const picImages = ref([]);

async function loadPicImages() {
    if (!props.text) {
        picImages.value = [];
        return;
    }

    let picImage = await picStore.loadPicImage(props.text, { cache: props.useCache });
    if (!picImage) {
        picImages.value = [];
        return;
    }
    if (picImage.constiWords) {
        let constiPics = [];
        for (let word of picImage.constiWords.split('-')) {
            constiPics.push(await picStore.loadPicImage(word, { cache: props.useCache }));
        }
        picImages.value = constiPics;
    } else {
        picImages.value = [picImage];
    }
}

watch(() => props.text, loadPicImages);

onMounted(async () => {
    await loadPicImages();
});
</script>

<template>
    <div class="picimageblock" v-for="picImage of picImages" v-bind:key="picImage.name">
        <svg
            style="width: 100%; height: 100%"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
        >
            <PicShapeBlock
                v-if="picImage"
                v-for="(shape, shapeI) of picImage.shapes"
                :picShape="shape"
                v-bind:key="shapeI"
            />
        </svg>
    </div>
</template>
