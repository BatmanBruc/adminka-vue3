import type { Address, Customer } from './../customers/types';
import type { Dayjs } from 'dayjs';
import type { StatusId } from '../../services/Status';
import type { Pagination } from '../types';
import type { Program } from '../programs/types';

export interface OrderCustomer {
    id: number
    name: string
    surname: string
    phone: string
    email: string
    program: Program
    balance: number
    bonus: number
    is_devices_to_order: boolean
}
export interface OrderExecutor {
    id: number
    name: string
    surname: string
    phone: string
}
export interface OrderProgram {
    id: number
    name: string
}

export interface Order {
    id: number,
    status: StatusId,
    creation_date: Date,
    due_date: string,
    due_time: string,
    price: number,
    refund: number,
    bonus: number,
    description: string,
    admin_comment: string,
    customer: OrderCustomer,
    executor: OrderExecutor | null,
    ration: OrderProgram,
    address: Address
}
export interface OrdersFilters {
    status: StatusId[],
    executor_id: number | null,
    customer_id: number | null,
    program_id: number | null,
    date_from: Date | null,
    date_to: Date | null
}

export interface OrderForm {
    id?: number,
    dates?: [],
    description?: string,
    admin_comment?: string,
    customer?: Customer,
    program?: Program,
    address?: Address,
    is_admin_order?: boolean
}

export interface OrdersState {
    list: Array<Order>,
    item: OrderForm,
    filters: OrdersFilters,
    count: number,
    loading: boolean,
    pagination: Pagination,
    order_by: string
}