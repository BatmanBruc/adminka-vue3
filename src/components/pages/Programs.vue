<template>
    <a-table :dataSource="customers" :columns="columns">
    </a-table>  
</template>
<script lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import type { TableColumnType } from 'ant-design-vue';

import ActionTypes from '../../store/programs/action-types'
import type { Program } from '../../store/programs/types'
export default {
    name: "Programs",
    setup(){
        const store = useStore()
        type Columns = ({ dataIndex: keyof Program, title: string } & TableColumnType) []
        const columns: Columns = [
            {
                title: 'ID',
                dataIndex: 'id',
            },
            {
                title: 'Название',
                dataIndex: 'name',
            },
            {
                title: 'Цена',
                dataIndex: 'price',
            },
            {
                title: 'Описание',
                dataIndex: 'description',
            },
            {
                title: 'Категория',
                dataIndex: 'category',
            },
            {
                title: 'Активно',
                dataIndex: 'is_active',
            },
        ];

        store.dispatch(ActionTypes.GET_PROGRAMS)
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
   