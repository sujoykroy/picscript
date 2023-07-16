<script setup>
import { ref } from 'vue'

import PicBlock from '@/components/PicBlock.vue'

const textList = ref(['A', 'B'])
const currentText = ref('')
const currentPicBlockElem = ref()

function onKeyPress(event) {
    if (event.key.trim().length && event.key != 'Enter') return
    let newText = currentText.value.trim()
    if (newText) {
        textList.value.push(newText)
    }
    console.log(newText)
    currentText.value = ''
}
</script>

<template>
    <div class="picblock-container" @click="currentPicBlockElem.inputElem.focus()">
        <PicBlock
            contenteditable="false"
            v-for="(text, textI) of textList"
            v-bind="textI"
            :text="text"
        />
        <PicBlock
            class="active-pickblock"
            ref="currentPicBlockElem"
            autofocus
            @onKeyPress="onKeyPress"
            contenteditable="true"
            v-model:text="currentText"
        />
    </div>
</template>

<style scoped>
.picblock-container {
    display: inline-flex;
    background-color: var(--color-background-soft);
    padding: 0.5em;
}

.debug .picblock {
    border: 1px solid gray;
    margin-right: 0.1em;
}

.picblock {
    margin-right: 0.5em;
}

.active-pickblock {
    margin-left: 1em;
}
</style>
