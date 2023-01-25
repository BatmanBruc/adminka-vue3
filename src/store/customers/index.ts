import type {  Module } from 'vuex';
import { actions } from './actions';
import { mutations } from './mutations';
import type { CustomersState } from './types';
import type { RootState } from '../types';

export const state: CustomersState = {
    list: [],
    item: null,
    count: 0,
    loading: false,
    filter: {
        search_string: '',
        program_id: null
    },
    pagination: {
        limit: 20,
        page: 0,
        offset: 0
    }
};

export const customers: Module<CustomersState, RootState> = {
    state,
    actions,
    mutations
};