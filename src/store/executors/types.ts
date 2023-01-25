import type { Dayjs } from 'dayjs';
import { StatusId } from '../../services/Status';
import type { Program } from '../programs/types';
import type { Pagination } from '../types';

export interface Executor {
    id: number
    name: string
    surname: string
    sex: boolean //true - мужчина, false - женщина
    phone: string
    email: string
    about: string
    admin_comment: string
    birth_date: Date
    city: string
    city_full_title: string
    city_title: string
    complite_orders: number
    creation_date: Date
    total_amount: number
    total_count: number
    is_banned: boolean
    is_verified: boolean
    last_activity: Date
}

export interface TableExecutor {
    id: number
    name: string
    surname: string
    phone: string
    last_activity: Date
}

export interface ExecutorsFilter {
    search_string: string
}

export interface ExecutorsState {
    list: Array<TableExecutor>,
    item: Executor | null,
    filter: ExecutorsFilter,
    count: number,
    loading: boolean,
    pagination: Pagination
}