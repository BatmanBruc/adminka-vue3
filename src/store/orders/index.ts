import type {  Module } from 'vuex';
import { actions } from './actions';
import { mutations } from './mutations';
import type { OrdersState } from './types';
import type { RootState } from '../types';

export const state: OrdersState = {
    list: [],
    item: {
        id: undefined,
        dates: [],
        description: '',
        admin_comment: '',
        customer: undefined,
        program: undefined,
        address: undefined,
        is_admin_order: false
    },
    count: 0,
    loading: false,
    order_by: '-due_date',
    filters: {
        status: [],
        executor_id: null,
        customer_id: null,
        program_id: null,
        date_from: null,
        date_to: null,
    },
    pagination: {
        limit: 20,
        offset: 0,
        page: 1
    }
};

export const orders: Module<OrdersState, RootState> = {
    state,
    actions,
    mutations
};