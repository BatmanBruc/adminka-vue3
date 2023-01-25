<template>
    <a-popover>
        <template #content>
            <div><span :style="{ color: '#838383', fontSize: '11px' }">Телефон:</span> {{ phone }}</div>
            <br/>
            <a-button type="dashed">Перейти на страницу</a-button>
        </template>
        <span class="pseudo-link">{{ surname + ' ' + name }}</span>
    </a-popover>
</template>
<script setup lang="ts">
import type { OrderExeutor } from '@/store/orders/types';

type Props =  {
    data: OrderExeutor
}
const props = defineProps<Props>()

const id = props.data.id
const name = props.data.name
const surname = props.data.surname
const phone = props.data.phone
</script>
<style>
</style>