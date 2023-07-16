<script setup>
import { ref } from 'vue'

import PicBlock from '@/components/PicBlock.vue'

const textList = ref(['A', 'B'])
const currentText = ref('')
const lastKey = ref('')
const currentPicBlockElem = ref()

function placeCaretAtEnd(el) {
    el.focus()
    let range = document.createRange()
    range.selectNodeContents(el)
    range.collapse(false)
    var sel = window.getSelection()
    sel.removeAllRanges()
    sel.addRange(range)
}

function onKeyPress(event) {
    lastKey.value = event.key
    placeCaretAtEnd(currentPicBlockElem.value.inputElem)
    if (event.key && event.key.trim().length && event.key != 'Enter') return
    let newText = currentText.value.trim()
    if (newText) {
        textList.value.push(newText)
    }
    currentText.value = ''
}
</script>

<template>
    <div>
        <div class="picblock-container" @click="currentPicBlockElem.inputElem.focus()">
            <PicBlock
                :readOnly="true"
                v-for="(text, textI) of textList"
                v-bind="textI"
                :text="text"
            />
            <PicBlock
                class="active-pickblock"
                ref="currentPicBlockElem"
                @onKeyPress="onKeyPress"
                :readOnly="false"
                v-model:text="currentText"
            />
        </div>
        <div>{{ lastKey.length }}</div>
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
