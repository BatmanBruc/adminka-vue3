<template>
    <a-table :dataSource="customers" :columns="columns">
    </a-table>  
</template>
<script lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import type { TableColumnType } from 'ant-design-vue';

import { CustomersActionTypes } from '../../store/customers/action-types'
import type { Customer } from '../../store/customers/types'
export default {
    name: "Customers",
    setup(){
        const store = useStore()
        type Columns = ({ dataIndex: keyof Customer, title: string } & TableColumnType) []

        const columns: Columns = [
            {
                title: 'ID',
                dataIndex: 'id',
            },
            {
                title: 'Телефон',
                dataIndex: 'phone',
            },
            {
                title: 'Фамилия',
                dataIndex: 'surname',
            },
            {
                title: 'Имя',
                dataIndex: 'name',
            },
            {
                title: 'Программа',
                dataIndex: 'program',
            },
            {
                title: 'Баланс',
                dataIndex: 'balance',
            },
            {
                title: 'Верификация',
                dataIndex: 'is_verified',
            },
        ];

        store.dispatch(CustomersActionTypes.GET_CUSTOMERS)
        const customers = computed(()=>{
            return store.state.customers.list
        })

        return {
            columns,
            customers
        }
    }
}
</script>
<style scoped>
</style>
   