<template>
    <a-popover >
        <template #content>
            <div :style="{ maxWidth: '300px' }">
                <div><span :style="{ color: '#838383', fontSize: '11px' }">Имя:</span> {{ name }}</div>
                <div><span :style="{ color: '#838383', fontSize: '11px' }">Цена:</span> {{ price }}</div>
                <div><span :style="{ color: '#838383', fontSize: '11px' }">Описание:</span> {{ description }}</div>
            </div>
        </template>
        <router-link :to="'/executor/' + id">{{ name }}</router-link>
    </a-popover>
</template>
<script setup lang="ts">
import type { Program } from '@/store/programs/types';

type Props =  {
    data: Program
}
const props = defineProps<Props>()

const id = props.data.id
const name = props.data.name
const description = props.data.description
const price = props.data.price
</script>
<style>
</style>