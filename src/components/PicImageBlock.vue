<script setup>
import { ref, onMounted, watch } from 'vue';
import { usePicStore } from '@/stores/pic.js';

const props = defineProps({
    text: {
        type: String
    }
});

const picStore = usePicStore();
const picImages = ref([]);

async function loadPicImages() {
    let picImage = await picStore.loadPicImage(props.text);
    if (picImage.constiWords) {
        let constiPics = [];
        for (let word of picImage.constiWords.split('-')) {
            constiPics.push(await picStore.loadPicImage(word));
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
            <polyline
                v-if="picImage"
                v-for="shape of picImage.shapes"
                :points="shape.flatPoints"
                fill="none"
                stroke="blue"
                stroke-width="5"
            />
        </svg>
    </div>
</template>
