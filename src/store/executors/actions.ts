import type { ActionTree } from 'vuex';
import { Api } from '../../services/Api'
import type { ExecutorsState, Executor } from './types';
import type { RootState } from '../types';
import { ExecutorsMutationTypes } from './mutation-types';
import { ExecutorsActionTypes } from './action-types';

const api = new Api('http://localhost', '/api', '3000')

export const actions: ActionTree<ExecutorsState, RootState> = {
    [ExecutorsActionTypes.GET_EXECUTORS]({ commit, state }): any {
        commit(ExecutorsMutationTypes.CHANGE_EXECUTORS_LOADING);
        api.get('/api/admin/executors', ).then((response)=>{
            const list: Executor[] = response.data.list;
            const count: Executor[] = response.data.count;
            commit(ExecutorsMutationTypes.SET_EXECUTORS, list);
            commit(ExecutorsMutationTypes.SET_EXECUTORS_COUNT, count);
            commit(ExecutorsMutationTypes.CHANGE_EXECUTORS_LOADING);
        }, (error)=>{
            Api.showEror(error)
            commit(ExecutorsMutationTypes.CHANGE_EXECUTORS_LOADING);
        })
    }
};