<script setup>
import { onMounted, ref } from 'vue';
import { usePicStore } from '@/stores/pic.js';
import PicBlock from '@/components/PicBlock.vue';

const picStore = usePicStore();

const picNames = ref([]);

const props = defineProps({});

onMounted(async () => {
    picNames.value = await picStore.getPicNames();
});
</script>

<template>
    <div>
        <div style="display: flex; flex-wrap: wrap; justify-content: space-evenly">
            <a
                href="javascript:void(0)"
                @click="$emit('picked', text)"
                v-for="(text, textI) of picNames"
                v-bind:key="textI"
                style="
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin: 0.2em;
                    border-bottom: 1px solid var(--color-border);
                    padding: 0.2em;
                "
            >
                <PicBlock style="" :readOnly="true" :text="text" :showText="false" />
                <div>{{ text }}</div>
            </a>
        </div>
    </div>
</template>
