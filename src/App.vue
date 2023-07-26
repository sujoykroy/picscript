<script setup>
import { onMounted, ref } from 'vue'

import { usePicStore } from '@/stores/pic.js'

const picStore = usePicStore()
const activeTab = ref('writer')

onMounted(async () => {
    const opfsRoot = await navigator.storage.getDirectory()
    await picStore.init()
})
</script>

<template>
    <main>
        <div style="display: flex" class="top-menu">
            <router-link :to="{ name: 'picSeqEditor' }">Writer</router-link>
            <router-link :to="{ name: 'picImageEditor' }">Drawer</router-link>
        </div>
        <div>
            <router-view></router-view>
        </div>
    </main>
</template>

<style scoped>
.top-menu a {
    padding-left: 1em;
    padding-right: 1em;
    border: 1px solid var(--color-border);
    flex-grow: 1;
}

.top-menu .router-link-active {
    color: var(--vt-c-link-text-hover);
    background-color: var(--vt-c-link-bg-hover);
}
</style>
