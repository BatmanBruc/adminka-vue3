import type { Dayjs } from 'dayjs';
import { StatusId } from '../../services/Status';
import type { Pagination } from '../types';

export interface Category {
    id: number
    name: string
    description: string
    is_active: boolean
    sort: number
}

export interface Program {
    id: number
    name: string
    price: number
    description: string
    category: Category
    is_active: boolean
}

export interface ProgramsState {
    list: Array<Program>,
    item: Program | null,
    count: number,
    loading: boolean,
    pagination: Pagination
}