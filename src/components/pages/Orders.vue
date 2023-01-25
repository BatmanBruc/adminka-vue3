<template>
    <Filter/>
    <a-button :style="{ marginBottom: '20px' }" @click="visible_create = true">Создание</a-button>
    <!--<a-table :loading="loading" :dataSource="orders" :columns="columns" :scroll="{ x: 1000 }" @change="change_table" :pagination="pagination">
        <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'due_date'">
                {{ record.due_time }} /
                {{ record.due_date }}
            </template>
            <template v-if="column.dataIndex === 'status'">
                <Status :id="record.status" :order="record"/>
            </template>
            <template v-if="column.dataIndex === 'customer'">
                <Customer :data="record.customer" />
            </template>
            <template v-if="column.dataIndex === 'executor'">
                <Executor v-if="record.executor" :data="record.executor" />
            </template>
            <template v-if="column.dataIndex === 'ration'">
                {{ record.ration ? record.ration.name : '' }}
            </template>
            <template v-if="column.dataIndex === 'price'">
                <div>{{ new Intl.NumberFormat().format(record.price) }} ₽</div>
            </template>
      </template>
    </a-table>-->
    <a-card v-for="order in orders" :style="{ marginBottom: '20px' }" :key="order.id">
        <template #title>

            <a-row justify="space-between"> 
                <a-col>
                    <a-row>
                        <a-col :lg="{ span: 6 }" :xs="{ span: 24 }">
                            <span :style="{ paddingRight: '15px', marginRight: '15px' }">{{ order.id }}</span>
                        </a-col>
                        <a-col :lg="{ span: 18 }" :xs="{ span: 24 }">
                            <span>{{ order.ration ? order.ration.name : '' }}</span>
                        </a-col>
                    </a-row>
                </a-col>
                <a-col>
                    <Status :id="order.status" :order="order"/>
                </a-col>
            </a-row>
        </template>
        <a-row> 
            <a-col :xs="{ span: 24 }" :sm="{ span: 24 }" :lg="{ span: 6 }">
                <span :style="{ marginRight: '15px' }">
                    <UserOutlined :style="{ marginRight: '10px' }" />
                    <a-button type="link">{{ order.customer.surname + ' ' + order.customer.name }}</a-button>
                </span>
            </a-col>
            <a-col :xs="{ span: 24 }" :sm="{ span: 24 }" :lg="{ span: 6 }">
                <span :style="{ marginRight: '15px' }">
                    <UserSwitchOutlined :style="{ marginRight: '10px' }" />
                    <span v-if="order.executor"><a-button type="link">{{ order.executor.surname + ' ' + order.executor.name }}</a-button></span>
                    <span v-else><a-button type="dashed">Назначить курьера</a-button></span>
                </span>
            </a-col>
            <a-col :xs="{ span: 24 }" :sm="{ span: 24 }" :lg="{ span: 6 }">
                <span :style="{ marginRight: '15px' }">
                    <EnvironmentOutlined :style="{ marginRight: '10px' }" />
                    <a-button type="text">{{ order.address.street + ' ' + order.address.home }}</a-button>
                </span>
            </a-col>
            <a-col :xs="{ span: 24 }" :sm="{ span: 24 }" :lg="{ span: 6 }">
                <span :style="{ marginRight: '15px' }">
                    <ClockCircleOutlined :style="{ marginRight: '10px' }" />
                    <a-button type="text">{{ order.due_time }} {{ order.due_date }}</a-button>
                </span>
            </a-col>
        </a-row>
    </a-card>
    <a-drawer
        v-model:visible="visible_create"
        title="Создание"
        placement="right"
    >
        <CreateOrder/>
  </a-drawer>
</template>
<script setup lang="ts">
import { UserOutlined, UserSwitchOutlined, EnvironmentOutlined, ClockCircleOutlined } from '@ant-design/icons-vue';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import type { TableColumnType, TablePaginationConfig } from 'ant-design-vue';

import { OrdersActionTypes } from '../../store/orders/action-types'
import { OrdersMutationTypes } from '../../store/orders/mutation-types'
import type { Order } from '../../store/orders/types'
import Status from '../orders_table/Status.vue'
import Customer from '../orders_table/Customer.vue'
import Executor from '../orders_table/Executor.vue'
import Filter from '../orders_filter/Filter.vue';
import CreateOrder from '../forms/CreateOrder.vue';
const store = useStore()
type Columns = ({ dataIndex: keyof Order, title: string } & TableColumnType) []

const columns: Columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        width: 80
    },
    {
        title: 'Дата выполнения',
        dataIndex: 'due_date',
        sorter: true
    },
    {
        title: 'Рацион',
        dataIndex: 'ration',
        sorter: true
    },
    {
        title: 'Клиент',
        dataIndex: 'customer',
    },
    {
        title: 'Курьер',
        dataIndex: 'executor',
    },
    {
        title: 'Цена',
        dataIndex: 'price',
        width: 100
    },
    {
        title: 'Описание',
        dataIndex: 'description',
        ellipsis: true,
    },
    {
        title: 'Статус',
        fixed: 'right',
        dataIndex: 'status'
    },
];

const change_table = (pagination: any, filters: any, sorter: any)=>{
    console.log(sorter)
    let sort_string = ''
    if(sorter.order){
        sort_string = sorter.order == 'ascend' ? sorter.field : '-' + sorter.field
        store.commit(OrdersMutationTypes.CHANGE_ORDERS_SORT, sort_string)
    }
    store.commit(OrdersMutationTypes.CHANGE_ORDERS_PAGE, pagination.current)
    store.dispatch(OrdersActionTypes.GET_ORDERS)
}
const pagination = computed<TablePaginationConfig>(()=>{
    return {
        current: ( store.state.orders.pagination.offset / store.state.orders.pagination.limit ) + 1,
        total: store.state.orders.count,
        pageSize: store.state.orders.pagination.limit,
        showSizeChanger: false
    }
})
store.dispatch(OrdersActionTypes.GET_ORDERS)
const loading = computed(()=>{
    return store.state.orders.loading
})
const orders = computed(()=>{
    return store.state.orders.list
})

const visible_create = ref<boolean>(false)
</script>
<style scoped>
</style>
   