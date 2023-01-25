<template>
    <div>
        <a-row justify="space-between" :gutter="[8,8]">
            <a-col :span="12">
                <a-space direction="vertical" :size="10" >
                    <div v-for="date in dateValues">
                        <a-date-picker placeholder="Дата" v-model:value="date.value"/>
                    </div>
                    <a-form-item>
                        <a-button type="dashed"  block @click="add_date" :style="{ color: '#ccc' }">
                            <PlusOutlined />
                        </a-button>
                    </a-form-item>
                </a-space>
            </a-col>
            <a-col :span="12" style>
                <a-select v-model:value="time" placeholder="Время" :options="[
                            { label: '7:00 - 8:00', value: '8' },
                            { label: '8:00 - 9:00', value: '9' },
                            { label: '9:00 - 10:00', value: '10' },
                        ]" :style="{ width: '100%' }">
                    <template #suffixIcon><ClockCircleOutlined class="ant-select-suffix" /></template>
                </a-select>
            </a-col>
        </a-row>
        <a-space :style="{ width: '100%' }" direction="vertical" :size="15">
            <a-textarea v-model:value="description" placeholder="Описание"/>
            <a-textarea v-model:value="admin_comment" placeholder="Комментарий администратора"/>
            <SelectCustomer v-model:value="customer" :width="'100%'"/>
            <SelectAddress v-model:value="address" :items="customer ? customer.addresses : []" :width="'100%'"/>
            <span><a-checkbox v-model:value="is_admin_order" :style="{marginRight: '10px'}"/>Дополнительный заказ</span>
            <a-button type="primary" @click="save">Создать</a-button>
        </a-space>           
    </div>
</template>

<script lang="ts" setup>
    import { ref, computed } from 'vue'
    import Dayjs from 'dayjs';
    import { ClockCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';
    import SelectCustomer from './SelectCustomer.vue';
    import SelectAddress from './SelectAddress.vue';
    import type { Address, Customer } from '@/store/customers/types';
    import { Api } from '@/services/Api';
    import { domain } from '@/config'
    import { useStore } from 'vuex';
    import { OrdersMutationTypes } from '@/store/orders/mutation-types';
    import { OrdersActionTypes } from '@/store/orders/action-types';

    const api = new Api(domain, '/api')
    const store = useStore()

    const dates = computed(()=>dateValues.value.map((item)=>{
        let date = Dayjs(item.value).format('DD-MM-YYYY')
        if(!time.value)
            return new Date(date);
        else
            return new Date(date + ' ' + time.value + ':00');
    }))
    const time = ref(null)
    const description = ref('')
    const admin_comment = ref('')
    const customer = ref<Customer | null>(null)
    const address = ref<Address | null>(null)

    const dateValues = ref([{
        value: ''
    }])
    const add_date = ()=>{
        dateValues.value.push({value: ''})
    }
    const is_admin_order = ref<boolean>(false)
    const save = ()=>{
        store.commit(OrdersMutationTypes.SET_ORDER, {
            dates,
            description,
            admin_comment,
            customer,
            program: customer.value?.program,
            address,
            is_admin_order
        })
        store.dispatch(OrdersActionTypes.CREATE_ORDER)
    }
</script>

<style lang="scss">


</style>