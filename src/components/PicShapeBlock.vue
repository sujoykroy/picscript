<script setup>
const props = defineProps({
    picShape: {
        type: Object
    }
});
</script>

<template>
    <polyline :points="picShape.flatPoints" fill="none" stroke="blue" stroke-width="5" />
</template>
