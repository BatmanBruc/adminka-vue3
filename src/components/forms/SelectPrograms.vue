<template>
    <div>
        <a-select
            placeholder="Программа"
            ref="select"
            label-in-value
            :style="{ width: '200px' }"
            :options="options"
            @change="handleChange"
        />
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

import { ProgramsActionTypes } from '@/store/programs/action-types'
import type { Program } from '@/store/programs/types';

const store = useStore()
const emit = defineEmits(['update', 'update:value'])
const props = defineProps<{
    value?: Program | null
}>()

store.dispatch(ProgramsActionTypes.GET_PROGRAMS)
const options = computed<Program[]>(()=>store.state.programs.list.map((item: Program)=>{
    return {
        value: item.id,
        label: item.name,
        object: item
    }
}))
const handleChange = (value: any )=>{
    emit('update', value.option.object)
    emit('update:value', value.option.object)
}
</script>

<style>


</style>