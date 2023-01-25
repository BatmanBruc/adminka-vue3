<template>
    <a-popover>
        <template #content>
            <div><span :style="{ color: '#838383', fontSize: '11px' }">Баланс:</span> {{ new Intl.NumberFormat().format(balance) }} ₽</div>
            <div><span :style="{ color: '#838383', fontSize: '11px' }">Бонусы:</span> {{ new Intl.NumberFormat().format(bonus) }}</div>
            <div><span :style="{ color: '#838383', fontSize: '11px' }">Телефон:</span> {{ phone }}</div>
            <div><span :style="{ color: '#838383', fontSize: '11px' }">Программа:</span> <span class="pseudo-link"><Program :data="program"/></span></div>
            <br/>
            <a-button type="dashed">Перейти на страницу</a-button>
        </template>
        <!--<router-link :to="'/customer/' + id">{{ surname + ' ' + name }}</router-link>-->
        <span class="pseudo-link">{{ surname + ' ' + name }}</span>
    </a-popover>
</template>
<script setup lang="ts">
import type { OrderCustomer } from '@/store/orders/types';
import Program from './Program.vue';
type Props =  {
    data: OrderCustomer
}
const props = defineProps<Props>()

const id = props.data.id
const name = props.data.name
const surname = props.data.surname
const balance = props.data.balance
const bonus = props.data.bonus
const phone = props.data.phone
const program = props.data.program
</script>
<style>
</style>