import {getMusicDetailList, addMusicDetail, deleteMusicDetailBatch, getAllMusicGenres} from '../apis/ChatMusicApi';
import {showFetchError, showOperationError, showOperationSuccess} from '../utils/Toster';

export const AT_CHAT_MUSIC_DETAIL_RESET_PARAMS = 'AT_CHAT_MUSIC_DETAIL_RESET_PARAMS';
export const AT_CHAT_MUSIC_DETAIL_UPDATE_LIST_DATA = 'AT_CHAT_MUSIC_DETAIL_UPDATE_LIST_DATA';
export const AT_CHAT_MUSIC_DETAIL_UPDATE_SEARCH_PARAMS = 'AT_CHAT_MUSIC_DETAIL_UPDATE_SEARCH_PARAMS'
export const AT_CHAT_MUSIC_DETAIL_UPDATE_FILTER_PARAMS = 'AT_CHAT_MUSIC_DETAIL_UPDATE_FILTER_PARAMS';
export const AT_CHAT_MUSIC_DETAIL_UPDATE_LOADING = 'AT_CHAT_MUSIC_DETAIL_UPDATE_LOADING';
export const AT_CHAT_MUSIC_DETAIL_UPDATE_SELECT_ROWS = 'AT_CHAT_MUSIC_DETAIL_UPDATE_SELECT_ROWS';

export const AT_CHAT_MUSIC_DETAIL_UPDATE_EDIT_DIALOG_OPEN = 'AT_CHAT_MUSIC_DETAIL_UPDATE_EDIT_DIALOG_OPEN';
export const AT_CHAT_MUSIC_DETAIL_UPDATE_EDIT_FORM_DATA = 'AT_CHAT_MUSIC_DETAIL_UPDATE_EDIT_FORM_DATA';
export const AT_CHAT_MUSIC_DETAIL_UPDATE_EDIT_FORM_ERROR_MESSAGE = 'AT_CHAT_MUSIC_DETAIL_UPDATE_EDIT_FORM_ERROR_MESSAGE';
export const AT_CHAT_MUSIC_DETAIL_UPDATE_EDIT_FORM_SUBMITING = 'AT_CHAT_MUSIC_DETAIL_UPDATE_EDIT_FORM_SUBMITING';
export const AT_CHAT_MUSIC_DETAIL_UPDATE_EDIT_ITEM_KEY = 'AT_CHAT_MUSIC_DETAIL_UPDATE_EDIT_ITEM_KEY';
export const AT_CHAT_MUSIC_DETAIL_UPDATE_AVAIABLE_GENRES = 'AT_CHAT_MUSIC_DETAIL_UPDATE_AVAIABLE_GENRES';

export function requestResetQueryParams() {
    return dispatch => {
        dispatch({
            type: AT_CHAT_MUSIC_DETAIL_RESET_PARAMS
        })

        getAllMusicGenres().then(res => {
            dispatch({
                type: AT_CHAT_MUSIC_DETAIL_UPDATE_AVAIABLE_GENRES,
                payload: res
            })
        }, err => showFetchError(err));

        dispatch(requestList());
    };
}

export function requestList() {
    return (dispatch, getState) => {
        const listData = getState().chatMusic.details;
        const params = Object.assign({}, listData.pager, listData.sorter, listData.filters, listData.search);

        dispatch(updateLoading(true));

        getMusicDetailList(params).then(res => dispatch({
            type: AT_CHAT_MUSIC_DETAIL_UPDATE_LIST_DATA,
            payload: res
        }), err => {
            showFetchError(err);
            dispatch(updateLoading(false));
        })
    }
}

export function requestExportList(page, pageSize, titles) {
    ///TODO 导出功能
}

export function updateSearchParams(params) {
    return {
        type: AT_CHAT_MUSIC_DETAIL_UPDATE_SEARCH_PARAMS,
        payload: params
    }
}

export function updateFilterParams(params) {
    return {
        type: AT_CHAT_MUSIC_DETAIL_UPDATE_FILTER_PARAMS,
        payload: params
    }
}

export function updateSelectRows(selectRowKeys) {
    return {
        type: AT_CHAT_MUSIC_DETAIL_UPDATE_SELECT_ROWS,
        payload: selectRowKeys
    }
}

function updateLoading(loading) {
    return {
        type: AT_CHAT_MUSIC_DETAIL_UPDATE_LOADING,
        payload: loading
    }
}

export function requestDeleteBatch() {
    return (dispatch, getState) => {
        const listData = getState().chatMusic.details;
        const selectedRowKeys = listData.selectedRowKeys;

        deleteMusicDetailBatch(selectedRowKeys).then(res => {
            showOperationSuccess();
            dispatch(requestList());
        }, err => showOperationError(err));
    }
}

// 以下为编辑用action

export function updateEditDialogOpen(inputHelper, isOpen) {
    return {
        type: AT_CHAT_MUSIC_DETAIL_UPDATE_EDIT_DIALOG_OPEN,
        payload: isOpen
    }
}

export function updateEditFormData(inputHelper, fieldValues) {
    inputHelper.setValues(fieldValues);
    return {
        type: AT_CHAT_MUSIC_DETAIL_UPDATE_EDIT_FORM_DATA,
        payload: fieldValues
    }
}

export function updateEditFormErrorMessage(errorMessage) {
    return {
        type: AT_CHAT_MUSIC_DETAIL_UPDATE_EDIT_FORM_ERROR_MESSAGE,
        payload: errorMessage
    }
}

export function requestEditFormSubmit(inputHelper) {
    return (dispatch, getState) => {
        const editItem = getState().chatMusic.editDetail;
        const fieldValues = editItem.fieldValues;
        const editKey = editItem.editKey;

        dispatch(updateEditFormSubmiting(true));

        if (editKey == null) {
            addMusicDetail(fieldValues).then(res => {
                dispatch(updateEditFormData(inputHelper, {}));
                dispatch(updateEditFormSubmiting(false));
                showOperationSuccess();
                dispatch(requestList());
            }, err => {
                dispatch(updateEditFormSubmiting(false));
                showOperationError(err);
            })
        }
    }
}

function updateEditFormSubmiting(isSubmiting) {
    return {
        type: AT_CHAT_MUSIC_DETAIL_UPDATE_EDIT_FORM_SUBMITING,
        payload: isSubmiting
    }
}

export function updateEditItemKey(key) {
    return {
        type: AT_CHAT_MUSIC_DETAIL_UPDATE_EDIT_ITEM_KEY,
        payload: key
    }
}

export function requestEditItem(inputHelper) {
    console.log('aaaaa');
    return (dispatch, getState) => {
    }
}