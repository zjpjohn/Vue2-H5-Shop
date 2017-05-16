import {getAppUserList, exportAppUserLists, disableAppUser, enableAppUser, cancelVip} from '../apis/UserApi';
import {showFetchError, showOperationSuccess, showOperationError} from '../utils/Toster';

export const AT_APP_USER_RESET_PARAMS = 'AT_APP_USER_RESET_PARAMS';
export const AT_APP_USER_UPDATE_LIST_DATA = 'AT_APP_USER_UPDATE_LIST_DATA';
export const AT_APP_USER_UPDATE_SEARCH_PARAMS = 'AT_APP_USER_UPDATE_SEARCH_PARAMS'
export const AT_APP_USER_UPDATE_FILTER_PARAMS = 'AT_APP_USER_UPDATE_FILTER_PARAMS';
export const AT_APP_USER_UPDATE_LOADING = 'AT_APP_USER_UPDATE_LOADING';
export const AT_APP_USER_UPDATE_SELECT_ROWS = 'AT_APP_USER_UPDATE_SELECT_ROWS';

export function requestResetQueryParams() {
    return dispatch => {
        dispatch({
            type: AT_APP_USER_RESET_PARAMS
        })

        dispatch(requestList());
    };
}

export function requestList() {
    return (dispatch, getState) => {
        const listData = getState().user.appUsers;
        const params = Object.assign({}, listData.pager, listData.sorter, listData.filters, listData.search);

        dispatch(updateLoading(true));

        getAppUserList(params).then(res => dispatch({
            type: AT_APP_USER_UPDATE_LIST_DATA,
            payload: res
        }), err => {
            showFetchError(err);
            dispatch(updateLoading(false));
        })
    }
}

export function requestExportList(page, pageSize, titles) {
    return (dispatch, getState) => {
        const listData = getState().user.appUsers;
        const params = Object.assign({}, listData.pager, listData.sorter, listData.filters, listData.search, {
            current: page,
            pageSize,
        });

        exportAppUserLists(params, titles).catch(err => {
            showOperationError(err);
        });
    }
}

export function updateSearchParams(params) {
    return {
        type: AT_APP_USER_UPDATE_SEARCH_PARAMS,
        payload: params
    }
}

export function updateFilterParams(params) {
    return {
        type: AT_APP_USER_UPDATE_FILTER_PARAMS,
        payload: params
    }
}

export function updateSelectRows(selectRowKeys) {
    return {
        type: AT_APP_USER_UPDATE_SELECT_ROWS,
        payload: selectRowKeys
    }
}

function updateLoading(loading) {
    return {
        type: AT_APP_USER_UPDATE_LOADING,
        payload: loading
    }
}


export function requestEnableUser(id) {
    return (dispatch, getState) => {
        const listData = getState().user.appUsers;

        enableAppUser(id).then(res => {
            showOperationSuccess();
            dispatch(requestList());
        }, err => showOperationError(err));
    }
}

export function requestDisableUser(id) {
    return (dispatch, getState) => {
        const listData = getState().user.appUsers;

        disableAppUser(id).then(res => {
            showOperationSuccess();
            dispatch(requestList());
        }, err => showOperationError(err));
    }
}

export function requestCancelVip(id) {
    return (dispatch, getState) => {
        const listData = getState().user.appUsers;

        cancelVip(id).then(res => {
            showOperationSuccess();
            dispatch(requestList());
        }, err => showOperationError(err));
    }
}