import type {  Module } from 'vuex';
import { actions } from './actions';
import { mutations } from './mutations';
import type { ProgramsState } from './types';
import type { RootState } from '../types';

export const state: ProgramsState = {
    list: [],
    item: null,
    count: 0,
    loading: false,
    pagination: {
        limit: 20,
        offset: 0,
        page: 1
    }
};

export const programs: Module<ProgramsState, RootState> = {
    state,
    actions,
    mutations
};