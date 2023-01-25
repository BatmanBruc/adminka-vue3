import type { ActionTree } from 'vuex';
import { Api } from '../../services/Api'
import type { CustomersState, Customer, CustomersFilter } from './types';
import type { RootState } from '../types';
import { CustomersMutationTypes } from './mutation-types';
import { CustomersActionTypes } from './action-types';

const api = new Api('http://localhost', '/api', '3000')
const serializedFilter = (filter: CustomersFilter)=>{
    return {
        searchString: filter.search_string,
        programId: filter.program_id
    }
}
export const actions: ActionTree<CustomersState, RootState> = {
    [CustomersActionTypes.GET_CUSTOMERS]({ commit, state }): any {
        commit(CustomersMutationTypes.CHANGE_CUSTOMERS_LOADING);
        api.abort()
        console.log(api.post('/api/admin/customers', { ...serializedFilter(state.filter) }, true).then((response)=>{
            const list: Customer[] = response.data.list;
            const count: Customer[] = response.data.count;
            commit(CustomersMutationTypes.SET_CUSTOMERS, list);
            commit(CustomersMutationTypes.SET_CUSTOMERS_COUNT, count);
            commit(CustomersMutationTypes.CHANGE_CUSTOMERS_LOADING);
        }, (error)=>{
            Api.showEror(error)
            commit(CustomersMutationTypes.CHANGE_CUSTOMERS_LOADING);
        }))
    }
};