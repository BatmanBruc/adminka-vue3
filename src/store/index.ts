import { createStore } from "vuex";
import type { RootState } from './types'
import { orders } from "./orders";
import { programs } from "./programs";
import { customers } from "./customers";
import { executors } from './executors/index';

const store = createStore<RootState>({
    state:{
        apiDomain: 'localhost'
    },
    modules: {
        orders,
        programs,
        customers,
        executors
    }
})

export default store