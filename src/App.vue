<script setup>
import { onMounted } from 'vue'
import PicSeqEditor from '@/components/PicSeqEditor.vue'
import PicImageEditor from '@/components/PicImageEditor.vue'

import { usePicStore } from '@/stores/pic.js'

const picStore = usePicStore()

onMounted(async () => {
    const opfsRoot = await navigator.storage.getDirectory()
    const fileHandle = await opfsRoot.getFileHandle('my first file', { create: true })
    //await picStore.loadPicPathList();
})
</script>

<template>
    <main>
        <div>
            <PicSeqEditor />
        </div>
        <div style="height: 500px">
            <PicImageEditor />
        </div>
    </main>
</template>

<style scoped></style>
