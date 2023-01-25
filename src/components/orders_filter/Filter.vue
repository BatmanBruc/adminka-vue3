<template>
    <div :style="{ margin: '0px 0px 30px 0px' }">
        <a-row justify="start">
            <a-col class="gutter-row">
                <DateInterval @update="update_range_type"/>
            </a-col>
            <a-col class="gutter-row">
                <SelectCustomer @update="update_customer"/>
            </a-col>
            <a-col class="gutter-row">
                <SelectExecutors @update="update_executor"/>
            </a-col>
            <a-col class="gutter-row">
                <SelectPrograms @update="update_program"/>
            </a-col>
            <a-col class="gutter-row">
                <SelectStatus @update="update_status"/>
            </a-col>
        </a-row>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import type { Dayjs } from 'dayjs'

import { OrdersMutationTypes } from '@/store/orders/mutation-types'
import { OrdersActionTypes } from '@/store/orders/action-types';
import type { StatusId } from '@/services/Status';
import type { Customer } from '@/store/customers/types';
import type { Executor } from '@/store/executors/types';
import type { Program } from '@/store/programs/types';

import DateInterval from './DateInterval.vue';
import SelectPrograms from '../forms/SelectPrograms.vue'
import SelectCustomer from '../forms/SelectCustomer.vue'
import SelectExecutors from '../forms/SelectExecutor.vue'
import SelectStatus from '../forms/SelectStatus.vue'


const store = useStore()

const update_customer = (value: Customer)=>{
    store.commit(OrdersMutationTypes.CHANGE_ORDERS_FILTERS_CUSTOMER_ID, value.id)
    store.dispatch(OrdersActionTypes.GET_ORDERS)
}
const update_executor = (value: Executor)=>{
    store.commit(OrdersMutationTypes.CHANGE_ORDERS_FILTERS_EXECUTOR_ID, value.id)
    store.dispatch(OrdersActionTypes.GET_ORDERS)
}
const update_program = (value: Program)=>{
    store.commit(OrdersMutationTypes.CHANGE_ORDERS_FILTERS_PROGRAM_ID, value.id)
    store.dispatch(OrdersActionTypes.GET_ORDERS)
}
const update_status = (value: StatusId[])=>{
    store.commit(OrdersMutationTypes.CHANGE_ORDERS_FILTERS_STATUS, value)
    store.dispatch(OrdersActionTypes.GET_ORDERS)
}
const update_range_type = (value: [Dayjs, Dayjs])=>{
    if(value[0])
        store.commit(OrdersMutationTypes.CHANGE_ORDERS_FILTERS_DATE_FROM, value[0])
    if(value[1])
        store.commit(OrdersMutationTypes.CHANGE_ORDERS_FILTERS_DATE_FROM, value[1])
    store.dispatch(OrdersActionTypes.GET_ORDERS)
}
</script>

<style>
.gutter-row{
    margin-bottom: 10px;
    margin-right: 10px;
}

</style>