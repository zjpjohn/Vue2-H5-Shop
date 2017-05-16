
import {getNewActivesStats, exportCactiveStats} from '../apis/DataApi';
import {showFetchError, showOperationError} from '../utils/Toster';
import {getJson, postJsonForDownload} from '../utils/FetchUtil';

export const AT_NEW_STATS_RESET_PARAMS = 'AT_NEW_STATS_RESET_PARAMS';
export const AT_NEW_STATS_UPDATE_LIST_DATA = 'AT_NEW_STATS_UPDATE_LIST_DATA';
export const AT_NEW_STATS_UPDATE_SEARCH_PARAMS = 'AT_NEW_STATS_UPDATE_SEARCH_PARAMS'
export const AT_NEW_STATS_UPDATE_FILTER_PARAMS = 'AT_NEW_STATS_UPDATE_FILTER_PARAMS';
export const AT_NEW_STATS_UPDATE_LOADING = 'AT_NEW_STATS_UPDATE_LOADING';
export const AT_NEW_STATS_UPDATE_SELECT_ROWS = 'AT_NEW_STATS_UPDATE_SELECT_ROWS';
export const AT_NEW_STATS_GET_VERSION ='AT_NEW_STATS_GET_VERSION';

export function requestResetQueryParams() {
    return dispatch => {
        dispatch({
            type: AT_NEW_STATS_RESET_PARAMS
        })
        //获取渠道号
        getJson('data/channels').then(res =>{
            dispatch({
                type:AT_NEW_STATS_GET_VERSION,
                payload:res
            })
        }).catch(err => {
            message.error(err.message);
        });
        dispatch(requestList());
    };
}

export function requestList() {
    return (dispatch, getState) => {
        const listData = getState().data.CactiveStats;
        const params = Object.assign({}, listData.pager, listData.sorter, listData.filters, listData.search);

        dispatch(updateLoading(true));

        //return res.json()
        getNewActivesStats(params).then(data => dispatch({
            type: AT_NEW_STATS_UPDATE_LIST_DATA,
            payload: data
        }), err => {
            showFetchError(err);
            dispatch(updateLoading(false));
        })
    }
}
export function updateSelectRows(selectRowKeys) {
    return {
        type: AT_NEW_STATS_UPDATE_SELECT_ROWS,
        payload: selectRowKeys
    }
}
export function requestExportList(page, pageSize, titles) {
    return (dispatch, getState) => {
        const listData = getState().data.CactiveStats;
        const params = Object.assign({}, listData.pager, listData.sorter, listData.filters, listData.search, {
            current: page,
            pageSize,
        });
        exportCactiveStats(params, titles).catch(err => {
            showOperationError(err);
        });
    }
}
export function updateSearchParams(params) {
    return {
        type: AT_NEW_STATS_UPDATE_SEARCH_PARAMS,
        payload: params
    }
}
/*export function getChannelId(){
 return (dispatch, getState) => {
 getJson('data/channels').then(res =>{
 dispatch({
 type:AT_NEW_STATS_GET_VERSION,
 payload:res
 })
 }).catch(err => {
 message.error(err.message);
 });
 }
 }*/
export function updateFilterParams(params) {
    return {
        type: AT_NEW_STATS_UPDATE_FILTER_PARAMS,
        payload: params
    }
}
function updateLoading(loading) {
    return {
        type: AT_NEW_STATS_UPDATE_LOADING,
        payload: loading
    }
}
