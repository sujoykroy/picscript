<script setup>
import { ref, onMounted } from 'vue'
import { usePicStore } from '@/stores/pic.js'

const props = defineProps({
    text: {
        type: String
    }
})

const picStore = usePicStore()
const picImage = ref()

onMounted(async () => {
    picImage.value = await picStore.loadPicImage(props.text)
})
</script>

<template>
    <div class="picimageblock">
        <svg
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
