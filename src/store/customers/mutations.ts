import type { MutationTree } from "vuex";
import type { CustomersState, Customer, TableCustomer } from "./types";
import { CustomersMutationTypes } from "./mutation-types";

export const mutations: MutationTree<CustomersState> = {
    [CustomersMutationTypes.SET_CUSTOMERS](state, payload: Array<TableCustomer>){
        state.list = payload;
    },
    [CustomersMutationTypes.SET_CUSTOMERS_COUNT](state, payload: number){
        state.count = payload;
    },
    [CustomersMutationTypes.CHANGE_CUSTOMERS_PAGE](state, payload: number){
        state.pagination.page = payload;
    },
    [CustomersMutationTypes.CHANGE_CUSTOMERS_LOADING](state){
        state.loading = !state.loading;
    },
    [CustomersMutationTypes.SET_CUSTOMER](state, payload: Customer){
        state.item = payload;
    },
    [CustomersMutationTypes.SET_CUSTOMERS_SEARCH_STRING](state, payload: string){
        state.filter.search_string = payload;
    }
}