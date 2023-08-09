<script setup>
import { PicShapePolyline } from '@/models/pic_shape_polyline.js';
import { PicShapeLine } from '@/models/pic_shape_line.js';
import { PicShapeCircle } from '@/models/pic_shape_circle.js';
import { PicShapeRectangle } from '@/models/pic_shape_rectangle.js';

const props = defineProps({
    picShape: {
        type: Object
    },
    fill: {
        type: String,
        default: 'none'
    },
    stroke: {
        type: String,
        default: 'blue'
    },
    strokeWidth: {
        type: Number,
        default: '5'
    }
});
</script>

<template>
    <rect
        v-if="picShape.shapeType == PicShapeRectangle.shapeType"
        :x="picShape.x"
        :y="picShape.y"
        :width="picShape.width"
        :height="picShape.height"
        :fill="fill"
        :stroke="stroke"
        :stroke-width="strokeWidth"
    />
    <polyline
        v-if="picShape.shapeType == PicShapePolyline.shapeType"
        :points="picShape.flatPoints"
        :fill="fill"
        :stroke="stroke"
        :stroke-width="strokeWidth"
    />
    <polyline
        v-if="picShape.shapeType == PicShapeLine.shapeType"
        :points="picShape.flatPoints"
        :fill="fill"
        :stroke="stroke"
        :stroke-width="strokeWidth"
    />
    <circle
        v-if="picShape.shapeType == PicShapeCircle.shapeType"
        :cx="picShape.cx"
        :cy="picShape.cy"
        :r="picShape.radius"
        :fill="fill"
        :stroke="stroke"
        :stroke-width="strokeWidth"
    />
</template>
