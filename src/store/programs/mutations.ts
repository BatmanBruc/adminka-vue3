import type { MutationTree } from "vuex";
import type { ProgramsState, Program } from "./types";
import {ProgramsMutationTypes} from "./mutations-type";

export const mutations: MutationTree<ProgramsState> = {
    [ProgramsMutationTypes.SET_PROGRAMS](state, payload: Array<Program>){
        state.list = payload;
    },
    [ProgramsMutationTypes.SET_PROGRAMS_COUNT](state, payload: number){
        state.count = payload;
    },
    [ProgramsMutationTypes.CHANGE_PROGRAMS_PAGE](state, payload: number){
        state.pagination.page = payload;
    },
    [ProgramsMutationTypes.CHANGE_PROGRAMS_LOADING](state){
        state.loading = !state.loading;
    },
    [ProgramsMutationTypes.SET_PROGRAM](state, payload: Program){
        state.item = payload;
    }
}