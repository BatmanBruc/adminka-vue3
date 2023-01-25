import type { ActionTree } from 'vuex';
import { Api } from '../../services/Api'
import type { OrdersState, Order, OrdersFilters } from './types';
import type { RootState } from '../types';
import { OrdersMutationTypes } from './mutation-types';
import { OrdersActionTypes } from './action-types';
import { get_orders, deserialized_order, create_order } from '../../services/Orders';

const api = new Api('http://localhost', '/api', '3000')



export const actions: ActionTree<OrdersState, RootState> = {
    [OrdersActionTypes.GET_ORDERS]({ commit, state }): any {
        commit(OrdersMutationTypes.CHANGE_ORDERS_LOADING);
        get_orders(state.filters, state.pagination, state.order_by).then((response)=>{
            const list: Order[] = response.data.list.map(deserialized_order);
            const count: Order[] = response.data.count;
            commit(OrdersMutationTypes.SET_ORDERS, list);
            commit(OrdersMutationTypes.SET_ORDERS_COUNT, count);
            commit(OrdersMutationTypes.CHANGE_ORDERS_LOADING);
        }, (error)=>{
            Api.showEror(error)
            commit(OrdersMutationTypes.CHANGE_ORDERS_LOADING);
        })
    },
    [OrdersActionTypes.CREATE_ORDER]({ commit, state }): any {
        commit(OrdersMutationTypes.CHANGE_ORDERS_LOADING);
        create_order(state.item).then((response)=>{
            const list: Order[] = response.data.list.map(deserialized_order);
            commit(OrdersMutationTypes.CLEAR_ORDER);
        }, (error)=>{
            Api.showEror(error)
            commit(OrdersMutationTypes.CHANGE_ORDERS_LOADING);
        })
    }
};