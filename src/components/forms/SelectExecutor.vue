<template>
    <div>
        <a-select
            placeholder="Курьер"
            ref="select"
            label-in-value
            :style="{ width: '200px' }"
            :options="options"
            :getPopupContainer="(triggerNode:any) => triggerNode.parentElement"
            :virtual="false"
            @change="handleChange"
        />
    </div>
</template>

<script setup lang="ts">
import { computed, defineEmits } from 'vue';
import { useStore } from 'vuex';

import { ExecutorsActionTypes } from '@/store/executors/action-types';
import type { Executor } from '@/store/executors/types';

const store = useStore()
const emit = defineEmits(['update', 'update:value'])
const props = defineProps<{
    value?: Executor | null
}>()


store.dispatch(ExecutorsActionTypes.GET_EXECUTORS)
const options = computed<Executor[]>(()=>store.state.executors.list.map((item: Executor)=>{
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