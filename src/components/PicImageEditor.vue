<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const mousePressed = ref(false)
const svgContainer = ref()
const toolboxContainer = ref()
const toolboxRect = ref()

class Shape {
    constructor() {
        this.points = []
    }

    addPoint(x, y) {
        if (x == null || y == null) return
        this.points.push({ x: x, y: y })
    }

    addPointFromEvent(event, targetElem) {
        let x, y
        if (event.touches && event.touches.length) {
            x = event.touches[0].clientX
            y = event.touches[0].clientY
        } else {
            x = event.clientX
            y = event.clientY
        }
        let targetRect = targetElem.getBoundingClientRect()
        x -= targetRect.left
        y -= targetRect.top
        this.addPoint((100 * x) / targetRect.width, (100 * y) / targetRect.height)
    }

    get flatPoints() {
        let points = []
        for (let point of this.points) {
            points.push(`${point.x}, ${point.y}`)
        }
        return points.join(' ')
    }
}

const shapes = ref([])

function onMouseUp(event) {
    document.body.style.overflow = ''
    mousePressed.value = false
}

function onMouseDown(event) {
    document.body.style.overflow = 'hidden'
    shapes.value.push(new Shape())
    shapes.value.at(-1).addPointFromEvent(event, svgContainer.value)
    mousePressed.value = true
}

function onMouseMove(event) {
    if (!mousePressed.value) return
    shapes.value.at(-1).addPointFromEvent(event, svgContainer.value)
}

function adjustSvgContainer() {
    toolboxRect.value = toolboxContainer.value.getBoundingClientRect()
    let remainingHeight = window.innerHeight - parseFloat(toolboxRect.value.bottom)
    let heightWidth = Math.min(parseFloat(toolboxRect.value.width), remainingHeight)
    svgContainer.value.style.width = heightWidth
    svgContainer.value.style.height = heightWidth

    svgContainer.value.style.left = (window.innerWidth - heightWidth) / 2
    svgContainer.value.style.top = toolboxRect.value.bottom + (remainingHeight - heightWidth) / 4
}

onMounted(() => {
    window.addEventListener('resize', adjustSvgContainer)
    adjustSvgContainer()
})

onUnmounted(() => {
    window.removeEventListener('resize', adjustSvgContainer)
})
</script>

<template>
    <div>
        <div ref="toolboxContainer">
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
                        v-for="shape of shapes"
                        :points="shape.flatPoints"
                        fill="none"
                        stroke="blue"
                        stroke-width="5"
                    />
                </svg>
            </div>
            <button @click="shapes = []">Clear</button>
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
                    v-for="shape of shapes"
                    :points="shape.flatPoints"
                    fill="none"
                    stroke="blue"
                />
            </svg>
        </div>
    </div>
</template>
