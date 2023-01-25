<template>
    <a-popover v-model:visible="popover_visible" trigger="click">
        <template #content>
            <a-steps direction="vertical" v-model:current="status.id" @change="change_status">
                <a-step :style="{color: 'red'}" v-for="(obj, index) in status_list" :disabled="status.id + 1 != index">
                        <template #icon>
                            <FileAddOutlined :style="{ color: obj.color }" v-if="obj.id == 0"/>
                            <DollarCircleOutlined :style="{ color: obj.color }" v-if="obj.id == 1"/>
                            <ClockCircleOutlined :style="{ color: obj.color }" v-if="obj.id == 2"/>
                            <CheckCircleOutlined :style="{ color: obj.color }" v-if="obj.id == 3"/>
                            <DoubleRightOutlined :style="{ color: obj.color }" v-if="obj.id == 4"/>
                            <CarOutlined :style="{ color: obj.color }" v-if="obj.id == 5"/>
                            <SmileOutlined :style="{ color: obj.color }" v-if="obj.id == 6"/>
                            <CloseCircleOutlined :style="{ color: obj.color }" v-if="obj.id == 7"/>
                        </template>
                        <template #title>
                            <div v-if="status.id + 1 == index" :style="{ color: '#03a9f4', textDecoration: 'underline' }">{{ obj.name }}</div>
                            <div v-else>{{ obj.name }}</div>
                        </template>
                </a-step>
            </a-steps>
        </template>
        <a-button type="primary" :style="{ background: status.getColor() + '36', color: status.getColor(), borderColor: status.getColor() }" danger>{{ status.getName() }}</a-button>
    </a-popover>
    <Modal v-model:visible="visible_modal_executor" title="Выберете курьера" @ok="select_executor">
        <SelectExecutor @update="update_executor"/>
    </Modal>
</template>
<script setup lang="ts">
import { FileAddOutlined, ClockCircleOutlined, DollarCircleOutlined, CheckCircleOutlined, CarOutlined, DoubleRightOutlined, SmileOutlined, CloseCircleOutlined } from '@ant-design/icons-vue'
import { Modal, notification } from 'ant-design-vue';
import { defineProps, ref, computed } from 'vue';
import { Api } from '@/services/Api';
import type { StatusId } from '../../services/Status';
import { Status } from '../../services/Status'
import SelectExecutor from '../forms/SelectExecutor.vue'
import type { Order } from '@/store/orders/types';
import type { AxiosError } from 'axios';

const api = new Api('http://localhost', '/api', '3000')

type Props =  {
    id: StatusId
    order: Order
}
const props = defineProps<Props>()

const status = new Status(props.id)
const current = computed(()=>{
    for (let i = 0; i < status_list.length; i++) {
        const element = status_list[i];
    }
})
const status_list = Status.list().filter((item: any)=>{
    return item.id != 5
})
const popover_visible = ref<boolean>(false)
const visible_modal_executor = ref<boolean>(false)
const executor_id = ref<number | null>(null)
const request_change_status = ()=>{
    api.get('api/admin/orders/' + props.order.id + '/change_status', {
        executorId: executor_id.value
    }).then((response)=>{

        notification.success({
            message: 'Статус обновлен'
        })
    }).catch(err=>{
        Api.showEror(err)
    })
}
const request_set_executor = async ()=>{
    try{
        const response = await api.get('api/admin/orders/' + props.order.id + '/hire', {
            executorId: executor_id.value
        })
        notification.success({
            message: 'Курьер назначен'
        })
    }catch(err: any){
        Api.showEror(err)
    }
}
const change_status = async (status_id: any)=>{
    if(status_id == 4 && !props.order.executor){
        visible_modal_executor.value = true
        is_change_status.value = true
    }else{
        request_change_status()
    }
    popover_visible.value = false
}
const update_executor = (value: number)=>{
    executor_id.value = value
}
const is_change_status = ref<boolean>(false)
const select_executor = async ()=>{
    await request_set_executor()
    visible_modal_executor.value = false
    if(is_change_status.value){
        request_change_status()
    }
}
</script>
<style>
</style>