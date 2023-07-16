<script setup>
import { ref } from 'vue'

const props = defineProps({
    text: {
        type: String
    },
    readOnly: {
        type: Boolean,
        default: true
    }
})

const emit = defineEmits(['update:text'])
const rootPath = import.meta.env.VITE_IMAGE_ROOT

const inputElem = ref()

defineExpose({
    inputElem
})

</script>

<template>
    <div class="picblock">
        <div class="icons-container">
            <div
                v-for="(textPart, partI) of text.trim().split('-')"
                v-bind:key="partI"
                class="icon"
            >
                <img :src="rootPath + textPart + '.svg'" :alt="textPart" />
            </div>
        </div>
        <div
            class="texts-container"
            autofocus="!readOnly? true : null"
            :contentEditable="readOnly ? 'false' : 'true'"
            ref="inputElem"
            @keypress="(event) => $emit('onKeyPress', event)"
            @input="$emit('update:text', $event.target.innerText)"
        >
            {{ text }}
        </div>
    </div>
</template>

<style scoped>
.picblock {
    display: inline;
}

.picblock [contenteditable] {
    outline: 0px solid transparent;
}

.picblock .icons-container {
    display: inline-flex;
    height: 2em;
}

.picblock .texts-container {
}

.picblock .icons-container .icon {
    width: 2em;
    height: 100%;
    display: inline;
    margin: 0px;
    padding: 0px;
}

.picblock .icons-container .icon img {
    width: 100%;
    height: 100%;
}
</style>
