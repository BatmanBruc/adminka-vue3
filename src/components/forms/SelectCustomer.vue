<template>
    <div>
        <a-select
            placeholder="Клиент"
            ref="select"
            label-in-value
            :style="{ width: props.width ? props.width : '200px' }"
            show-search
            :options="options"
            :not-found-content="null"
            :filter-option="false"
            :loading="loading"
            :getPopupContainer="(triggerNode:any) => triggerNode.parentElement"
            :virtual="false"
            @search="handleSearch"
            @change="handleChange"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, defineEmits, defineProps } from 'vue';
import { useStore } from 'vuex';
import { CustomersMutationTypes } from '@/store/customers/mutation-types'
import { CustomersActionTypes } from '@/store/customers/action-types';
import type { Customer } from '@/store/customers/types';
const store = useStore()
const emit = defineEmits(['update', 'update:value'])
const props = defineProps<{
    width?: string,
    value?: Customer | null
}>()

const loading = computed(()=>store.state.customers.loading)
const handleSearch = (str: string)=>{
    store.commit(CustomersMutationTypes.SET_CUSTOMERS_SEARCH_STRING, str)
    store.dispatch(CustomersActionTypes.GET_CUSTOMERS)
}

const options = computed<Customer[]>(()=>store.state.customers.list.map((item: Customer)=>{
    return {
        value: item.id,
        label: item.surname + ' ' + item.name,
        object: item
    }
}))
const handleChange = (value: any)=>{
    emit('update', value.option.object)
    emit('update:value', value.option.object)
}
</script>

<style>


</style>