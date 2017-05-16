import {getFeedbackList, exportFeedbackList} from '../apis/FeedbackApi';
import {showFetchError} from '../utils/Toster';

export const AT_FEEDBACK_RESET_PARAMS = 'AT_FEEDBACK_RESET_PARAMS';
export const AT_FEEDBACK_UPDATE_LIST_DATA = 'AT_FEEDBACK_UPDATE_LIST_DATA';
export const AT_FEEDBACK_UPDATE_SEARCH_PARAMS = 'AT_FEEDBACK_UPDATE_SEARCH_PARAMS'
export const AT_FEEDBACK_UPDATE_FILTER_PARAMS = 'AT_FEEDBACK_UPDATE_FILTER_PARAMS';
export const AT_FEEDBACK_UPDATE_LOADING = 'AT_FEEDBACK_UPDATE_LOADING';
export const AT_FEEDBACK_UPDATE_SELECT_ROWS = 'AT_FEEDBACK_UPDATE_SELECT_ROWS';

export function requestResetQueryParams() {
    return dispatch => {
        dispatch({
            type: AT_FEEDBACK_RESET_PARAMS
        })

        dispatch(requestList());
    };
}

export function requestList() {
    return (dispatch, getState) => {
        const listData = getState().app.feedbacks;
        const params = Object.assign({}, listData.pager, listData.sorter, listData.filters, listData.search);

        dispatch(updateLoading(true));

        getFeedbackList(params).then(res => dispatch({
            type: AT_FEEDBACK_UPDATE_LIST_DATA,
            payload: res
        }), err => {
            showFetchError(err);
            dispatch(updateLoading(false));
        })
    }
}

export function requestExportList(page, pageSize, titles) {
    return (dispatch, getState) => {
        const listData = getState().app.feedbacks;
        const params = Object.assign({}, listData.pager, listData.sorter, listData.filters, listData.search, {
            current: page,
            pageSize,
        });

        exportFeedbackList(params, titles).catch(err => {
            showOperationError(err);
        });
    }
}

export function updateSearchParams(params) {
    return {
        type: AT_FEEDBACK_UPDATE_SEARCH_PARAMS,
        payload: params
    }
}

export function updateFilterParams(params) {
    return {
        type: AT_FEEDBACK_UPDATE_FILTER_PARAMS,
        payload: params
    }
}

export function updateSelectRows(selectRowKeys) {
    return {
        type: AT_FEEDBACK_UPDATE_SELECT_ROWS,
        payload: selectRowKeys
    }
}

function updateLoading(loading) {
    return {
        type: AT_FEEDBACK_UPDATE_LOADING,
        payload: loading
    }
}



