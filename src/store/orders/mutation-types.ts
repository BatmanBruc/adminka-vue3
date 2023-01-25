export enum OrdersMutationTypes {
    SET_ORDERS = 'SET_ORDERS',
    SET_ORDER = 'SET_ORDER',
    CLEAR_ORDER = 'CLEAR_ORDER',
    SET_ORDERS_ERROR = 'SET_ORDERS_ERROR',
    SET_ORDERS_COUNT = 'SET_ORDERS_COUNT',
    CHANGE_ORDERS_PAGE = 'CHANGE_ORDERS_PAGE',
    CHANGE_ORDERS_LOADING = 'CHANGE_ORDERS_LOADING',
    CHANGE_ORDERS_SORT = 'CHANGE_ORDERS_SORT',

    CHANGE_ORDERS_FILTERS_CUSTOMER_ID = 'CHANGE_ORDERS_FILTERS_CUSTOMER_ID',
    CHANGE_ORDERS_FILTERS_EXECUTOR_ID = 'CHANGE_ORDERS_FILTERS_EXECUTOR_ID',
    CHANGE_ORDERS_FILTERS_PROGRAM_ID = 'CHANGE_ORDERS_FILTERS_PROGRAM_ID',
    CHANGE_ORDERS_FILTERS_STATUS = 'CHANGE_ORDERS_FILTERS_STATUS',
    CHANGE_ORDERS_FILTERS_DATE_FROM = 'CHANGE_ORDERS_FILTERS_DATE_FROM',
    CHANGE_ORDERS_FILTERS_DATE_TO = 'CHANGE_ORDERS_FILTERS_DATE_TO',
}