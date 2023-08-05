<script setup>
import { ref } from 'vue';
import PicImageBlock from '@/components/PicImageBlock.vue';

const props = defineProps({
    text: {
        type: String
    },
    readOnly: {
        type: Boolean,
        default: true
    },
    showText: {
        type: Boolean,
        default: true
    },
    useCache: {
        type: Boolean,
        default: true
    }
});

const emit = defineEmits(['update:text']);
const rootPath = import.meta.env.VITE_IMAGE_ROOT;

const inputElem = ref();

defineExpose({
    inputElem
});
</script>

<template>
    <div class="picblock">
        <div class="icons-container">
            <div
                v-if="text.trim().length"
                v-for="(textPart, partI) of text.trim().split('-')"
                v-bind:key="partI"
                class="icon"
            >
                <PicImageBlock :text="textPart" :useCache="useCache" />
            </div>
        </div>
        <div v-if="showText && readOnly" @click="readOnly = false">
            {{ text }}
        </div>
        <input
            v-if="showText && !readOnly"
            class="text-input"
            autofocus="true"
            ref="inputElem"
            @keydown="(event) => $emit('onKeyDown', event)"
            @input="$emit('update:text', $event.target.value)"
            :value="text"
            style="display: block; border: none"
            :style="{ width: (text ? text.length * 1.1 : 2) + 'em' }"
        />
    </div>
</template>

<style scoped>
.picblock {
    display: inline;
    text-align: center;
}

.picblock [contenteditable] {
    outline: 0px solid transparent;
}

.picblock .icons-container {
    display: inline-flex;
    height: 2em;
}

.picblock .text-input {
    display: inline;
    border: 0px;
    background: transparent;
}

.picblock .text-input:focus {
    outline: none;
}

.picblock .icons-container .icon {
    height: 100%;
    margin: 0px;
    padding: 0px;
    display: flex;
}

.picblock .icons-container .icon img {
}

.picblock .icons-container .icon .picimageblock {
    width: 1em;
    height: 1em;
}
</style>
