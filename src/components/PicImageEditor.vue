<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { OpfsDb } from '@/models/opfs_db.js'
import { PicImage } from '@/models/pic_image.js'

const DEFAULT_PIC_IMAGE_NAME = '__scratch__'

const mousePressed = ref(false)
const svgContainer = ref()
const toolboxContainer = ref()
const toolboxRect = ref()

const picImageName = ref('')

const picImageDb = new OpfsDb('picImage')
const picImage = ref(new PicImage({ name: DEFAULT_PIC_IMAGE_NAME, shapes: [] }))

function onMouseUp(event) {
    document.body.style.overflow = ''
    mousePressed.value = false
}

function onMouseDown(event) {
    document.body.style.overflow = 'hidden'
    picImage.value.addNewShape()
    picImage.value.shapes.at(-1).addPointFromEvent(event, svgContainer.value)
    mousePressed.value = true
}

function onMouseMove(event) {
    if (!mousePressed.value) return
    picImage.value.shapes.at(-1).addPointFromEvent(event, svgContainer.value)
}

function createBlankPicImage() {
    picImage.value = new PicImage({ name: DEFAULT_PIC_IMAGE_NAME, shapes: [] })
}

function adjustSvgContainer() {
    if (!toolboxContainer.value) return
    toolboxRect.value = toolboxContainer.value.getBoundingClientRect()
    let remainingHeight = window.innerHeight - parseFloat(toolboxRect.value.bottom)
    let heightWidth = Math.min(parseFloat(toolboxRect.value.width), remainingHeight)
    svgContainer.value.style.width = heightWidth
    svgContainer.value.style.height = heightWidth

    svgContainer.value.style.left = (window.innerWidth - heightWidth) / 2
    svgContainer.value.style.top = toolboxRect.value.bottom + (remainingHeight - heightWidth) / 4
}

watch(
    () => picImage.value,
    () => {
        picImageName.value = picImage.value.name
    }
)

async function savePicImage() {
    if (!picImageName.value.trim()) return

    if (picImageName.value != picImage.value.name) {
        let existedPicImage = await picImageDb.getContent(picImageName.value, PicImage)
        if (existedPicImage) {
            let text =
                'There is already an item with name ' + picImageName.value + '! Aborting save.'
            alert(text)
            return
        }
    }
    picImage.value.name = picImageName.value
    await picImageDb.saveContent(picImage.value.name, picImage.value)
    alert('Item is saved')
}

async function loadPicImage() {
    if (!picImageName.value.trim()) return
    let existedPicImage = await picImageDb.getContent(picImageName.value, PicImage)
    if (existedPicImage) {
        picImage.value = existedPicImage
    }
}

onMounted(async () => {
    await picImageDb.init()
    let existedPicImage = await picImageDb.getContent(picImage.value.name, PicImage)
    if (existedPicImage) {
        picImage.value = existedPicImage
    }
    adjustSvgContainer()
    window.addEventListener('resize', adjustSvgContainer)
})

onUnmounted(async () => {
    await picImageDb.saveContent(picImage.value.name, picImage.value)
    window.removeEventListener('resize', adjustSvgContainer)
})
</script>

<template>
    <div>
        <div ref="toolboxContainer">
            <div class="tool">
                <label>
                    Name:
                    <input type="text" v-model="picImageName" />
                </label>
                <button @click="savePicImage">Save</button>
                <button @click="loadPicImage" v-if="picImageName != picImage.name">Load</button>
                <button @click="createBlankPicImage">Clear</button>
            </div>
            <div style="width: 2em; height: 2em">
                <svg
                    version="1.1"
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                >
                    <polyline
                        v-for="shape of picImage.shapes"
                        :points="shape.flatPoints"
                        fill="none"
                        stroke="blue"
                        stroke-width="5"
                    />
                </svg>
            </div>
        </div>
        <div
            @mousedown="onMouseDown"
            @mouseup="onMouseUp"
            @touchstart="onMouseDown"
            @touchend="onMouseUp"
            @mousemove="onMouseMove"
            @touchmove="onMouseMove"
        >
            <svg
                version="1.1"
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                ref="svgContainer"
                style="border: 1px solid gray; position: absolute; bottom: 0px"
            >
                <polyline
                    v-for="shape of picImage.shapes"
                    :points="shape.flatPoints"
                    fill="none"
                    stroke="blue"
                />
            </svg>
        </div>
    </div>
</template>
