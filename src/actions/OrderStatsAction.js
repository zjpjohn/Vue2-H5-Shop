import {getOrders, exportOrders} from '../apis/DataApi';
import {showFetchError} from '../utils/Toster';

export const AT_ORDER_STATS_RESET_PARAMS = 'AT_ORDER_STATS_RESET_PARAMS';
export const AT_ORDER_STATS_UPDATE_LIST_DATA = 'AT_ORDER_STATS_UPDATE_LIST_DATA';
export const AT_ORDER_STATS_UPDATE_SEARCH_PARAMS = 'AT_ORDER_STATS_UPDATE_SEARCH_PARAMS'
export const AT_ORDER_STATS_UPDATE_FILTER_PARAMS = 'AT_ORDER_STATS_UPDATE_FILTER_PARAMS';
export const AT_ORDER_STATS_UPDATE_LOADING = 'AT_ORDER_STATS_UPDATE_LOADING';
export const AT_ORDER_STATS_UPDATE_SELECT_ROWS = 'AT_ORDER_STATS_UPDATE_SELECT_ROWS';

export function requestResetQueryParams() {
    return dispatch => {
        dispatch({
            type: AT_ORDER_STATS_RESET_PARAMS
        })

        dispatch(requestList());
    };
}

export function requestList() {
    return (dispatch, getState) => {
        const listData = getState().data.orderStats;
        const params = Object.assign({}, listData.pager, listData.sorter, listData.filters, listData.search);

        dispatch(updateLoading(true));

        getOrders(params).then(res => dispatch({
            type: AT_ORDER_STATS_UPDATE_LIST_DATA,
            payload: res
        }), err => {
            showFetchError(err);
            dispatch(updateLoading(false));
        })
    }
}

export function requestExportList(page, pageSize, titles) {
    return (dispatch, getState) => {
        const listData = getState().data.orderStats;
        const params = Object.assign({}, listData.pager, listData.sorter, listData.filters, listData.search, {
            current: page,
            pageSize,
        });

        exportOrders(params, titles).catch(err => {
            showOperationError(err);
        });
    }
}

export function updateSearchParams(params) {
    return {
        type: AT_ORDER_STATS_UPDATE_SEARCH_PARAMS,
        payload: params
    }
}

export function updateFilterParams(params) {
    return {
        type: AT_ORDER_STATS_UPDATE_FILTER_PARAMS,
        payload: params
    }
}

export function updateSelectRows(selectRowKeys) {
    return {
        type: AT_ORDER_STATS_UPDATE_SELECT_ROWS,
        payload: selectRowKeys
    }
}

function updateLoading(loading) {
    return {
        type: AT_ORDER_STATS_UPDATE_LOADING,
        payload: loading
    }
}



