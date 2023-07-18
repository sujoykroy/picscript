<script setup>
import { ref, onMounted } from 'vue'

import PicBlock from '@/components/PicBlock.vue'

const textList = ref([])
const currentText = ref('')
const lastKey = ref('')
const currentPicBlockElem = ref()
const fileToRead = ref()
const showText = ref(true)
let fileHandle

function placeCaretAtEnd(el) {
    el.focus()
    let range = document.createRange()
    range.selectNodeContents(el)
    range.collapse(false)
    var sel = window.getSelection()
    sel.removeAllRanges()
    sel.addRange(range)
}

async function onKeyPress(event) {
    lastKey.value = event.key
    placeCaretAtEnd(currentPicBlockElem.value.inputElem)
    if (event.key && event.key.trim().length && event.key != 'Enter') return
    let newText = currentText.value.trim()
    if (newText) {
        textList.value.push(newText)
    }
    currentText.value = ''
    const writable = await fileHandle.createWritable()
    // Write the contents of the file to the stream.
    await writable.write(textList.value.join(' '))
    // Close the stream, which persists the contents.
    await writable.close()
}

function loadFile() {
    if (!fileToRead.value.files.length) return
    let reader = new FileReader()
    reader.onload = () => {
        textList.value = reader.result
            .trim()
            .split(' ')
            .filter((word) => word.trim().length)
    }
    reader.readAsText(fileToRead.value.files[0])
}

function download(data, filename, type) {
    var file = new Blob([data], { type: type })
    if (window.navigator.msSaveOrOpenBlob)
        // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename)
    else {
        // Others
        var a = document.createElement('a'),
            url = URL.createObjectURL(file)
        a.href = url
        a.download = filename
        document.body.appendChild(a)
        a.click()
        setTimeout(function () {
            document.body.removeChild(a)
            window.URL.revokeObjectURL(url)
        }, 0)
    }
}

onMounted(async () => {
    const opfsRoot = await navigator.storage.getDirectory()
    fileHandle = await opfsRoot.getFileHandle('my first file', { create: true })
    const file = await fileHandle.getFile()
    textList.value = (await file.text())
        .trim()
        .split(' ')
        .filter((word) => word.trim().length)
})
</script>

<template>
    <div>
        <div>
            <label>
                Show Text:
                <input type="checkbox" v-model="showText" />
            </label>
        </div>
        <div>
            <label>
                Upload File:
                <input type="file" ref="fileToRead" />
            </label>
            <button @click="loadFile">Load</button>
        </div>
        <div class="picblock-container" @click="currentPicBlockElem.inputElem.focus()">
            <PicBlock
                :readOnly="true"
                v-for="(text, textI) of textList"
                v-bind="textI"
                :text="text"
                :showText="showText"
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
        <button @click="download(textList.join(' '), 'picscript.txt', 'text/plain')">
            Download
        </button>
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