<template>
    <a-table :dataSource="executors" :columns="columns">
    </a-table>  
</template>
<script lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

import { ExecutorsActionTypes } from '../../store/executors/action-types'
export default {
    name: "Executors",
    setup(){
        const store = useStore()

        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
            },
            {
                title: 'Дата выполнения',
                dataIndex: 'due_date',
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
                title: 'Статус',
                dataIndex: 'status',
            },
        ];

        store.dispatch(ExecutorsActionTypes.GET_EXECUTORS)
        const executors = computed(()=>{
            return store.state.executors.list
        })

        return {
            columns,
            executors
        }
    }
}
</script>
<style scoped>
</style>
   