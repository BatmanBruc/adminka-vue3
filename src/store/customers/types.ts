import type { Program } from '../programs/types';
import type { Pagination } from '../types';

export interface Address {
    apartment: string | number
    comment: string
    entrance: string
    floor: number
    home: string | number
    icon: string
    id: number
    is_active: boolean
    latitude: number
    longitude: number
    name: string
    street: string
}

export interface Reminder {
    id: number
    day: number
    day_name: string
}

export interface Customer {
    id: number
    name: string
    surname: string
    sex: boolean //true - мужчина, false - женщина
    phone: string
    email: string
    about: string
    balance: number
    bonus: number
    addresses: Address[]
    admin_comment: string
    birth_date: Date
    city: string
    city_full_title: string
    city_title: string
    orders_count: number
    complite_orders: number
    creation_date: Date
    total_amount: number
    is_banned: boolean
    is_devices_to_order: boolean //столовые приборы
    is_verified: boolean
    last_activity: Date
    height: number
    weight: number
    kkal: number
    reminders: Reminder[]
    program: Program
}

export interface TableCustomer {
    id: number
    name: string
    surname: string
    phone: string
    balance: number
    bonus: number
    program_name: string
    is_verified: boolean
}

export interface CustomersFilter {
    search_string: string
    program_id: number | null
}

export interface CustomersState {
    list: Array<TableCustomer>,
    item: Customer | null,
    filter: CustomersFilter,
    count: number,
    loading: boolean,
    pagination: Pagination
}