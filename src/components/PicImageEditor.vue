<script setup>
import { ref } from 'vue'
const mousePressed = ref(false)

class Shape {
    constructor() {
        this.points = []
    }

    addPoint(x, y) {
        console.log('g', x, y)
        this.points.push({ x: x, y: y })
    }

    get flatPoints() {
        let points = []
        for (let point of this.points) {
            points.push(point.x)
            points.push(point.y)
        }
        return points.join(',')
    }
}

const shapes = ref([])

function onMouseUp(event) {
    mousePressed.value = false
}

function onMouseDown(event) {
    shapes.value.push(new Shape())
    shapes.value.at(-1).addPoint(event.offsetX, event.offsetY)
    mousePressed.value = true
}

function onMouseMove(event) {
    if (!mousePressed.value) return
    shapes.value.at(-1).addPoint(event.offsetX, event.offsetY)
}
</script>

<template>
    <div
        @mousedown="onMouseDown"
        @mouseup="onMouseUp"
        @mousemove="onMouseMove"
        style="border: 1px solid gray; height: 100%; width: 100%"
    >
        <svg version="1.1" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <polyline
                v-for="shape of shapes"
                :points="shape.flatPoints"
                fill="none"
                stroke="blue"
            />
        </svg>
    </div>
</template>
