<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { OpfsDb } from '@/models/opfs_db.js';
import { PicImage, getPointFromEvent } from '@/models/pic_image.js';
import PicBlock from '@/components/PicBlock.vue';

const DEFAULT_PIC_IMAGE_NAME = '__scratch__';

const mousePressed = ref(false);
const svgContainer = ref();
const toolboxContainer = ref();
const toolboxRect = ref();

const picImageName = ref(DEFAULT_PIC_IMAGE_NAME);

const picImageDb = new OpfsDb('picImage');
const picImage = ref(new PicImage({ name: '', shapes: [], constiWords: '' }));
const picShape = ref();

function onMouseUp(event) {
    document.body.style.overflow = '';
    mousePressed.value = false;
    if (picShape.value) {
    }
}

function onMouseDown(event) {
    if (!picImage.value) return;
    document.body.style.overflow = 'hidden';
    if (picShape.value) {
        picShape.value._moveLast = getPointFromEvent(event, svgContainer.value);
    } else {
        picImage.value.addNewShape();
        picImage.value.shapes.at(-1).addPointFromEvent(event, svgContainer.value);
    }
    mousePressed.value = true;
}

function onMouseMove(event) {
    if (!mousePressed.value) return;
    if (picShape.value) {
        let moveNow = getPointFromEvent(event, svgContainer.value);
        picShape.value.moveOffset(
            moveNow.x - picShape.value._moveLast.x,
            moveNow.y - picShape.value._moveLast.y
        );
        picShape.value._moveLast = moveNow;
    } else {
        picImage.value.shapes.at(-1).addPointFromEvent(event, svgContainer.value);
    }
}

function createBlankPicImage() {
    picImage.value = new PicImage({ name: DEFAULT_PIC_IMAGE_NAME, shapes: [] });
}

function adjustSvgContainer() {
    if (!toolboxContainer.value || !svgContainer.value) return;
    toolboxRect.value = toolboxContainer.value.getBoundingClientRect();
    let remainingHeight = window.innerHeight - parseFloat(toolboxRect.value.bottom);
    let heightWidth = Math.min(parseFloat(toolboxRect.value.width), remainingHeight);
    svgContainer.value.style.width = heightWidth;
    svgContainer.value.style.height = heightWidth;

    svgContainer.value.style.left = (window.innerWidth - heightWidth) / 2;
    svgContainer.value.style.top = toolboxRect.value.bottom + (remainingHeight - heightWidth) / 4;
}

watch(
    () => picImage.value,
    () => {
        picImageName.value = picImage.value.name;
        picShape.value = 0;
    }
);

async function savePicImage() {
    if (!picImageName.value.trim()) return;

    if (picImageName.value != picImage.value.name) {
        let existedPicImage = await picImageDb.getContent(picImageName.value, PicImage);
        if (existedPicImage) {
            let text =
                'There is already an item with name ' + picImageName.value + '! Aborting save.';
            alert(text);
            return;
        }
    }
    picImage.value.name = picImageName.value;
    await picImageDb.saveContent(picImage.value.name, picImage.value);
    alert('Item is saved');
}

async function loadPicImage() {
    if (!picImageName.value.trim()) return;
    let existedPicImage = await picImageDb.getContent(picImageName.value, PicImage);
    if (existedPicImage) {
        picImage.value = existedPicImage;
    } else {
        picImage.value = new PicImage({ name: picImageName.value, shapes: [] });
    }
}

function deletePicShape() {
    let text = 'Are you sure to delete selected shape?';
    if (!confirm(text)) return;
    picImage.value.deleteShape(picShape.value);
    picShape.value = null;
}

onMounted(async () => {
    await picImageDb.init();
    adjustSvgContainer();
    window.addEventListener('resize', adjustSvgContainer);
});

onUnmounted(async () => {
    // await picImageDb.saveContent(picImage.value.name, picImage.value)
    window.removeEventListener('resize', adjustSvgContainer);
});
</script>

<template>
    <div>
        <div ref="toolboxContainer">
            <div class="tool" style="display: flex; flex-direction: column">
                <div>
                    <label>
                        Name:
                        <input type="text" v-model="picImageName" />
                    </label>
                    <button @click="savePicImage" v-if="picImage.name">Save</button>
                    <button
                        @click="loadPicImage"
                        v-if="!picImage.name || picImageName != picImage.name"
                    >
                        Load
                    </button>
                    <button
                        @click="loadPicImage"
                        v-if="picImage.name && picImageName == picImage.name"
                    >
                        Reload
                    </button>
                    <button @click="createBlankPicImage">Clear</button>
                </div>
                <div>
                    <label>
                        Shapes:
                        <select v-model="picShape">
                            <option :value="null">None</option>
                            <option
                                v-for="(picS, shapeI) of picImage.shapes"
                                v-bind:key="shapeI"
                                :value="picS"
                            >
                                Shape {{ shapeI + 1 }}
                            </option>
                        </select>

                        <button v-if="picShape" @click="deletePicShape">Delete Shape</button>
                        <button v-if="picShape" @click="picShape.moveOffset(-0.3, 0)">
                            Move Left
                        </button>
                        <button v-if="picShape" @click="picShape.moveOffset(0.3, 0)">
                            Move Right
                        </button>
                        <button v-if="picShape" @click="picShape.moveOffset(0, -0.3)">
                            Move Up
                        </button>
                        <button v-if="picShape" @click="picShape.moveOffset(0, 0.3)">
                            Move Down
                        </button>
                        <button v-if="picShape" @click="picShape.scale(1.01, 1.01)">
                            Scale Up
                        </button>
                        <button v-if="picShape" @click="picShape.scale(0.99, 0.99)">
                            Scale Down
                        </button>
                        <button v-if="picShape" @click="picShape.rotate(1)">Rotate</button>
                        <button v-if="picShape" @click="picShape.flip(1, -1)">Flip Vertical</button>
                        <button v-if="picShape" @click="picShape.flip(-1, 1)">
                            Flip Horizontal
                        </button>
                        <button @click="picShape = picImage.addShapeType('line')">Add Line</button>
                        <button @click="picShape = picImage.addShapeType('circle')">
                            Add Circle
                        </button>
                        <button @click="picShape = picImage.addShapeType('box')">Add Box</button>
                    </label>
                </div>
            </div>
            <div style="width: 2em; height: 2em">
                <svg
                    v-if="picImage.name"
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
            <div
                :style="{ visibility: picImage.name ? '' : 'hidden' }"
                style="display: flex; align-items: center"
            >
                <label>
                    Constituent Words:
                    <input type="text" v-model="picImage.constiWords" />
                </label>
                <PicBlock :readOnly="true" :text="picImage.constiWords" :showText="false" />
            </div>
        </div>
        <div
            @mousedown="onMouseDown"
            @mouseup="onMouseUp"
            @touchstart="onMouseDown"
            @touchend="onMouseUp"
            @mousemove="onMouseMove"
            @touchmove="onMouseMove"
            :style="{ visibility: picImage.name ? '' : 'hidden' }"
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
                    v-if="picImage.name"
                    v-for="shape of picImage.shapes"
                    :points="shape.flatPoints"
                    fill="none"
                    :stroke="shape == picShape ? 'red' : 'blue'"
                />
            </svg>
        </div>
    </div>
</template>
