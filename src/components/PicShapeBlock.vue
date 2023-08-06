<script setup>
import { PicShapePolyline } from '@/models/pic_shape_polyline.js';
import { PicShapeLine } from '@/models/pic_shape_line.js';
import { PicShapeCircle } from '@/models/pic_shape_circle.js';

const props = defineProps({
    picShape: {
        type: Object
    }
});
</script>

<template>
    <polyline
        v-if="picShape.shapeType == PicShapePolyline.shapeType"
        :points="picShape.flatPoints"
    />
    <polyline v-if="picShape.shapeType == PicShapeLine.shapeType" :points="picShape.flatPoints" />
    <circle
        v-if="picShape.shapeType == PicShapeCircle.shapeType"
        :cx="picShape.cx"
        :cy="picShape.cy"
        :radius="picShape.radius"
        fill="none"
        stroke="blue"
        stroke-width="5"
    />
</template>
