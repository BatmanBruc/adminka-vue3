import type { ActionTree } from 'vuex';
import { Api } from '../../services/Api'
import type { ProgramsState, Program } from './types';
import type { RootState } from '../types';
import {ProgramsMutationTypes} from './mutations-type';
import {ProgramsActionTypes} from './action-types';

const api = new Api('http://localhost', '/api', '3000')

export const actions: ActionTree<ProgramsState, RootState> = {
    [ProgramsActionTypes.GET_PROGRAMS]({ commit, state }): any {
        commit(ProgramsMutationTypes.CHANGE_PROGRAMS_LOADING);
        api.get('/api/admin/program', ).then((response)=>{
            const list: Program[] = response.data;
            const count: Program[] = response.data.count;
            commit(ProgramsMutationTypes.SET_PROGRAMS, list);
            commit(ProgramsMutationTypes.SET_PROGRAMS_COUNT, count);
            commit(ProgramsMutationTypes.CHANGE_PROGRAMS_LOADING);
        }, (error)=>{
            Api.showEror(error)
            commit(ProgramsMutationTypes.CHANGE_PROGRAMS_LOADING);
        })
    }
};