import type { MutationTree } from "vuex";
import type { ExecutorsState, Executor, TableExecutor } from "./types";
import { ExecutorsMutationTypes } from "./mutation-types";

export const mutations: MutationTree<ExecutorsState> = {
    [ExecutorsMutationTypes.SET_EXECUTORS](state, payload: Array<TableExecutor>){
        state.list = payload;
    },
    [ExecutorsMutationTypes.SET_EXECUTORS_COUNT](state, payload: number){
        state.count = payload;
    },
    [ExecutorsMutationTypes.CHANGE_EXECUTORS_PAGE](state, payload: number){
        state.pagination.page = payload;
    },
    [ExecutorsMutationTypes.CHANGE_EXECUTORS_LOADING](state){
        state.loading = !state.loading;
    },
    [ExecutorsMutationTypes.SET_EXECUTOR](state, payload: Executor){
        state.item = payload;
    }
}