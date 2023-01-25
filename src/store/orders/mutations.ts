import type { MutationTree } from "vuex";
import type { OrdersState, Order, OrderForm } from "./types";
import { OrdersMutationTypes } from "./mutation-types";

export const mutations: MutationTree<OrdersState> = {
    [OrdersMutationTypes.SET_ORDERS](state, payload: Array<Order>){
        state.list = payload;
    },
    [OrdersMutationTypes.SET_ORDERS_COUNT](state, payload: number){
        state.count = payload;
    },
    [OrdersMutationTypes.CHANGE_ORDERS_PAGE](state, page: number){
        state.pagination.page = page;
        state.pagination.offset = state.pagination.limit * ( page - 1 );
    },
    [OrdersMutationTypes.CHANGE_ORDERS_LOADING](state){
        state.loading = !state.loading;
    },
    [OrdersMutationTypes.SET_ORDER](state, payload: OrderForm){
        state.item = payload;
    },
    [OrdersMutationTypes.CLEAR_ORDER](state){
        state.item = {
            id: undefined,
            dates: [],
            description: '',
            admin_comment: '',
            customer: undefined,
            program: undefined,
            address: undefined,
            is_admin_order: false
        };
    },
    [OrdersMutationTypes.CHANGE_ORDERS_SORT](state, payload: string){
        state.order_by = payload;
    },

    [OrdersMutationTypes.CHANGE_ORDERS_FILTERS_CUSTOMER_ID](state, payload){
        state.filters.customer_id = payload;
    },
    [OrdersMutationTypes.CHANGE_ORDERS_FILTERS_EXECUTOR_ID](state, payload){
        state.filters.executor_id = payload;
    },
    [OrdersMutationTypes.CHANGE_ORDERS_FILTERS_PROGRAM_ID](state, payload){
        state.filters.program_id = payload;
    },
    [OrdersMutationTypes.CHANGE_ORDERS_FILTERS_STATUS](state, payload){
        state.filters.status = payload;
    },
    [OrdersMutationTypes.CHANGE_ORDERS_FILTERS_DATE_FROM](state, payload){
        state.filters.date_from = payload;
    },
    [OrdersMutationTypes.CHANGE_ORDERS_FILTERS_DATE_TO](state, payload){
        state.filters.date_to = payload;
    },
}