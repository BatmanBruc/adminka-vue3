import type {  Module } from 'vuex';
import { actions } from './actions';
import { mutations } from './mutations';
import type { ExecutorsState } from './types';
import type { RootState } from '../types';

export const state: ExecutorsState = {
    list: [],
    item: null,
    count: 0,
    loading: false,
    filter: {
        search_string: ''
    },
    pagination: {
        limit: 20,
        offset: 0,
        page: 1
    }
};

export const executors: Module<ExecutorsState, RootState> = {
    state,
    actions,
    mutations
};