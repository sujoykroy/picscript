<script setup>
import { ref } from 'vue'

const props = defineProps({
    text: {
        type: String
    }
})

const emit = defineEmits(['update:text'])

const inputElem = ref()

defineExpose({
    inputElem
})
</script>

<template>
    <div
        class="picblock"
        ref="inputElem"
        @keypress="(event) => $emit('onKeyPress', event)"
        @input="$emit('update:text', $event.target.innerText)"
    >
        {{ text }}
    </div>
</template>

<style scoped>
.picblock {
    display: inline;
}

.picblock[contenteditable] {
    outline: 0px solid transparent;
}
</style>
