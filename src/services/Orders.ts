import Dayjs from 'dayjs';
import type { Order, OrdersFilters, OrderForm } from './../store/orders/types';
import type { Pagination } from '../store/types';
import { Api } from "./Api"
import { domain } from '../config'

const api = new Api(domain, '/api')

export const deserialized_order = (data)=>{
    const item: Order = {
        id: data.id,
        status: data.status,
        creation_date: data.creationDate,
        due_date: Dayjs(data.dueDate).format('DD-MM-YYYY'),
        due_time: Dayjs(data.dueDate).format('HH:mm'),
        price: data.price,
        refund: data.refund,
        bonus: data.bonus,
        description: data.description,
        admin_comment: data.adminComment,
        customer: {
            id: data.customerInfo.id,
            name: data.customerInfo.name,
            surname: data.customerInfo.surname,
            phone: data.customerInfo.phone,
            email: data.customerInfo.email,
            program: data.program,
            balance: data.customerInfo.balance,
            bonus: data.customerInfo.bonus,
            is_devices_to_order: data.customerInfo.isDevicesToOrder,
        },
        executor: data.executorInfo,
        ration: data.ration,
        address: data.address
    }
    return item
}

const serialized_orders_filters = (filters: OrdersFilters)=>{
    const item = {
        status: filters.status,
        executorId: filters.executor_id,
        customerId: filters.customer_id,
        programId: filters.program_id,
        dateFrom: filters.date_from,
        dateTo: filters.date_to,
    }
    return item
}

const weed_out_empty_filters = (filters: object)=>{
    let obj = new Object()
    for(let key in filters){
        if(filters[key] && filters[key] != 0)
            obj[key] = filters[key]
    }
    return obj
}

export const get_orders = (filters: OrdersFilters, pagination: Pagination, order_by: string): Promise<any>=>{
    return api.post('/api/admin/orders', {
        ...weed_out_empty_filters(serialized_orders_filters(filters)),
        ...pagination,
        orderBy: order_by ? order_by : undefined
    })
}

const serialized_orders_data = (data: OrderForm)=>{
    const item = {
        dates: data.dates,
        address: data.address,
        customer: data.customer,
        description: data.description,
        adminComment: data.admin_comment,
        isAdminOrder: data.is_admin_order
    }
    return item
}

export const create_order = async (data: OrderForm)=>{
    let result
    try{
        result = await api.post('/api/admin/order', serialized_orders_data(data))
    }catch(err){
        Api.showEror(err)
    }
    return result
}