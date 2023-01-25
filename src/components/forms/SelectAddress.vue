<template>
    <div>
        <a-select
            placeholder="Адрес"
            ref="select"
            label-in-value
            :style="{ width: props.width ? props.width : '200px' }"
            :options="options"
            :disabled="!options.length"
            @change="handleChange"
        />
    </div>
</template>

<script lang="ts" setup>
import { toRef, ref, watch } from 'vue';
import type { Address } from '@/store/customers/types'

const emit = defineEmits(['update', 'update:value'])
const props = defineProps<{
    value?: Address | null,
    items: Address[] | [],
    width?: string
}>()

const options = ref<{
    value: number,
    label: string,
    object: Address
}[] | []>([])
const items = toRef(props, 'items')
watch(items, ()=>{
    options.value = items.value.map((item: Address)=>{
        return {
            value: item.id,
            label: item.name,
            object: item
        }
    })
})
const handleChange = (value: any )=>{
    emit('update', value.option.object)
    emit('update:value', value.option.object)
}
</script>

<style>


</style>