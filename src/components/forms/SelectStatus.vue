<template>
    <div>
        <a-select
        mode="multiple"
        style="width: 100%"
        placeholder="Статус"
        option-label-prop="children"
        :options="status_list"
        :style="{ minWidth: '200px' }"
        @change="handleChange"
        >
            <template #option="{ value, label, color }">
                <span :style="{ color: color }">{{ label }}</span>
            </template>
            <template #tagRender="{ value: val, label, closable, onClose, option, color }">
                <a-tag v-if="option" :closable="closable" :style="{ marginRight: '3px', color: option.color, fontSize: '14px' }" @close="onClose">
                    {{ option ? option.label : '' }}&nbsp;&nbsp;
                </a-tag>
            </template>
        </a-select>
    </div>
</template>

<script setup lang="ts">
    import { ref, watch } from 'vue';
    import { Status } from '../../services/Status'

    const emit = defineEmits(['update', 'update:value'])

    const status_list = Status.list().map((item, i)=>{
        return {
            label: item.name,
            value: i,
            color: item.color
        }
    })

    const handleChange = (value: any )=>{
        emit('update', value)
        emit('update:value', value)
    }
</script>

<style>


</style>