import {getSysUserList, modifySysUser} from '../apis/SysUserApi';
import {showFetchError, showOperationError, showOperationSuccess} from '../utils/Toster';

export const AT_SYS_USER_RESET_PARAMS = 'AT_SYS_USER_RESET_PARAMS';
export const AT_SYS_USER_UPDATE_LIST_DATA = 'AT_SYS_USER_UPDATE_LIST_DATA';
export const AT_SYS_USER_UPDATE_SEARCH_PARAMS = 'AT_SYS_USER_UPDATE_SEARCH_PARAMS'
export const AT_SYS_USER_UPDATE_FILTER_PARAMS = 'AT_SYS_USER_UPDATE_FILTER_PARAMS';
export const AT_SYS_USER_UPDATE_LOADING = 'AT_SYS_USER_UPDATE_LOADING';
export const AT_SYS_USER_UPDATE_SELECT_ROWS = 'AT_SYS_USER_UPDATE_SELECT_ROWS';

export const AT_SYS_USER_UPDATE_EDIT_DIALOG_OPEN = 'AT_SYS_USER_UPDATE_EDIT_DIALOG_OPEN';
export const AT_SYS_USER_UPDATE_EDIT_FORM_DATA = 'AT_SYS_USER_UPDATE_EDIT_FORM_DATA';
export const AT_SYS_USER_UPDATE_EDIT_FORM_ERROR_MESSAGE = 'AT_SYS_USER_UPDATE_EDIT_FORM_ERROR_MESSAGE';
export const AT_SYS_USER_UPDATE_EDIT_FORM_SUBMITING = 'AT_SYS_USER_UPDATE_EDIT_FORM_SUBMITING';
export const AT_SYS_USER_UPDATE_EDIT_ITEM_KEY = 'AT_SYS_USER_UPDATE_EDIT_ITEM_KEY';

export function requestResetQueryParams() {
    return dispatch => {
        dispatch({
            type: AT_SYS_USER_RESET_PARAMS
        })

        dispatch(requestList());
    };
}

export function requestList() {
    return (dispatch, getState) => {
        const listData = getState().system.sysUsers;
        const params = Object.assign({}, listData.pager, listData.sorter, listData.filters, listData.search);

        dispatch(updateLoading(true));

        getSysUserList(params).then(res => dispatch({
            type: AT_SYS_USER_UPDATE_LIST_DATA,
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
        type: AT_SYS_USER_UPDATE_SEARCH_PARAMS,
        payload: params
    }
}

export function updateFilterParams(params) {
    return {
        type: AT_SYS_USER_UPDATE_FILTER_PARAMS,
        payload: params
    }
}

export function updateSelectRows(selectRowKeys) {
    return {
        type: AT_SYS_USER_UPDATE_SELECT_ROWS,
        payload: selectRowKeys
    }
}

function updateLoading(loading) {
    return {
        type: AT_SYS_USER_UPDATE_LOADING,
        payload: loading
    }
}

export function requestDeleteBatch() {
    return (dispatch, getState) => {
        const listData = getState().system.sysUsers;
        const selectedRowKeys = listData.selectedRowKeys;

        deleteBatch(selectedRowKeys).then(res => {
            showOperationSuccess();
            dispatch(requestList());
        }, err => showOperationError(err));
    }
}

// 以下为编辑用action

export function updateEditDialogOpen(inputHelper, isOpen) {
    return {
        type: AT_SYS_USER_UPDATE_EDIT_DIALOG_OPEN,
        payload: isOpen
    }
}

export function updateEditFormData(inputHelper, fieldValues) {
    inputHelper.setValues(fieldValues);
    return {
        type: AT_SYS_USER_UPDATE_EDIT_FORM_DATA,
        payload: fieldValues
    }
}

export function updateEditFormErrorMessage(errorMessage) {
    return {
        type: AT_SYS_USER_UPDATE_EDIT_FORM_ERROR_MESSAGE,
        payload: errorMessage
    }
}

export function requestEditFormSubmit(inputHelper) {
    return (dispatch, getState) => {
        const editItem = getState().system.editSysUser;
        const fieldValues = editItem.fieldValues;
        const editKey = editItem.editKey;

        dispatch(updateEditFormSubmiting(true));

        if (editKey == null) {
            
        } else {
            modifySysUser(editKey, fieldValues).then(res => {
                showOperationSuccess();
                dispatch(requestEditItem(inputHelper));
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
        type: AT_SYS_USER_UPDATE_EDIT_FORM_SUBMITING,
        payload: isSubmiting
    }
}

export function updateEditItemKey(key) {
    return {
        type: AT_SYS_USER_UPDATE_EDIT_ITEM_KEY,
        payload: key
    }
}

export function requestEditItem(inputHelper) {
    return (dispatch, getState) => {
        const editItem = getState().system.editSysUser;
        const editKey = editItem.editKey;

        dispatch(updateEditFormErrorMessage(null));
        setTimeout(() => {
            dispatch(updateEditFormData(inputHelper, {}));
        }, 10);
        dispatch(updateEditFormSubmiting(false));
    }
}