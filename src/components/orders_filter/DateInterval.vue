<template>
    <div>
        <a-range-picker v-model:value="value" :placeholder="['Начиная', 'Заканчивая']" />
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Dayjs } from 'dayjs'
;
const emit = defineEmits(['update'])

type RangeValue = [Dayjs, Dayjs];
const value = ref<RangeValue>()
watch(value, ()=>{
    emit('update', value)
})
</script>

<style>


</style>