import {getAuditingAlbums, getAuditingAlbumByKey, getAlbumPictures, auditAlbumPass, auditAlbumDeny, addAlbum, modifyAlbum, getAllPubUser} from '../apis/GalleryApi';
import {showFetchError, showOperationError, showOperationSuccess} from '../utils/Toster';

export const AT_ALBUM_AUDITING_RESET_PARAMS = 'AT_ALBUM_AUDITING_RESET_PARAMS';
export const AT_ALBUM_AUDITING_UPDATE_LIST_DATA = 'AT_ALBUM_AUDITING_UPDATE_LIST_DATA';
export const AT_ALBUM_AUDITING_UPDATE_SEARCH_PARAMS = 'AT_ALBUM_AUDITING_UPDATE_SEARCH_PARAMS'
export const AT_ALBUM_AUDITING_UPDATE_FILTER_PARAMS = 'AT_ALBUM_AUDITING_UPDATE_FILTER_PARAMS';
export const AT_ALBUM_AUDITING_UPDATE_LOADING = 'AT_ALBUM_AUDITING_UPDATE_LOADING';
export const AT_ALBUM_AUDITING_UPDATE_SELECT_ROWS = 'AT_ALBUM_AUDITING_UPDATE_SELECT_ROWS';

export const AT_ALBUM_AUDITING_UPDATE_EDIT_DIALOG_OPEN = 'AT_ALBUM_AUDITING_UPDATE_EDIT_DIALOG_OPEN';
export const AT_ALBUM_AUDITING_UPDATE_EDIT_FORM_DATA = 'AT_ALBUM_AUDITING_UPDATE_EDIT_FORM_DATA';
export const AT_ALBUM_AUDITING_UPDATE_EDIT_FORM_ERROR_MESSAGE = 'AT_ALBUM_AUDITING_UPDATE_EDIT_FORM_ERROR_MESSAGE';
export const AT_ALBUM_AUDITING_UPDATE_EDIT_FORM_SUBMITING = 'AT_ALBUM_AUDITING_UPDATE_EDIT_FORM_SUBMITING';
export const AT_ALBUM_AUDITING_UPDATE_EDIT_ITEM_KEY = 'AT_ALBUM_AUDITING_UPDATE_EDIT_ITEM_KEY';
export const AT_ALBUM_AUDITING_UPDATE_PUB_USER_LIST = 'AT_ALBUM_AUDITING_UPDATE_PUB_USER_LIST';

export function requestResetQueryParams() {
    return dispatch => {
        dispatch({
            type: AT_ALBUM_AUDITING_RESET_PARAMS
        })

        dispatch(requestList());
    };
}

export function requestList() {
    return (dispatch, getState) => {
        const listData = getState().content.albumAuditing;
        const params = Object.assign({}, listData.pager, listData.sorter, listData.filters, listData.search);

        dispatch(updateLoading(true));

        getAuditingAlbums(params).then(res => dispatch({
            type: AT_ALBUM_AUDITING_UPDATE_LIST_DATA,
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
        type: AT_ALBUM_AUDITING_UPDATE_SEARCH_PARAMS,
        payload: params
    }
}

export function updateFilterParams(params) {
    return {
        type: AT_ALBUM_AUDITING_UPDATE_FILTER_PARAMS,
        payload: params
    }
}

export function updateSelectRows(selectRowKeys) {
    return {
        type: AT_ALBUM_AUDITING_UPDATE_SELECT_ROWS,
        payload: selectRowKeys
    }
}

function updateLoading(loading) {
    return {
        type: AT_ALBUM_AUDITING_UPDATE_LOADING,
        payload: loading
    }
}

export function requestAuditPass() {
    return (dispatch, getState) => {
        const listData = getState().content.albumAuditing;
        const selectedRowKeys = listData.selectedRowKeys;

        auditAlbumPass(selectedRowKeys).then(res => {
            showOperationSuccess();
            dispatch(requestList());
        }, err => showOperationError(err));
    }
}

export function requestAuditDeny() {
    return (dispatch, getState) => {
        const listData = getState().content.albumAuditing;
        const selectedRowKeys = listData.selectedRowKeys;

        auditAlbumDeny(selectedRowKeys).then(res => {
            showOperationSuccess();
            dispatch(requestList());
        }, err => showOperationError(err));
    }
}

// 以下为编辑用action

export function updateEditDialogOpen(inputHelper, isOpen) {
    return dispatch => {
        dispatch({
            type: AT_ALBUM_AUDITING_UPDATE_EDIT_DIALOG_OPEN,
            payload: isOpen
        })

        getAllPubUser().then(res => {
            dispatch({
                type: AT_ALBUM_AUDITING_UPDATE_PUB_USER_LIST,
                payload: res
            })
        })
    }
}

export function updateEditFormData(inputHelper, fieldValues) {
    inputHelper.setValues(fieldValues);
    return {
        type: AT_ALBUM_AUDITING_UPDATE_EDIT_FORM_DATA,
        payload: fieldValues
    }
}

export function updateEditFormErrorMessage(errorMessage) {
    return {
        type: AT_ALBUM_AUDITING_UPDATE_EDIT_FORM_ERROR_MESSAGE,
        payload: errorMessage
    }
}


export function requestEditFormSubmit(inputHelper) {
    return (dispatch, getState) => {
        const editItem = getState().content.editAlbum;
        const fieldValues = editItem.fieldValues;
        const editKey = editItem.editKey;

        dispatch(updateEditFormSubmiting(true));

        if (editKey == null) {
            addAlbum(fieldValues).then(res => {
                dispatch(updateEditFormData(inputHelper, {}));
                dispatch(updateEditFormSubmiting(false));
                showOperationSuccess();
                dispatch(requestList());
            }, err => {
                dispatch(updateEditFormSubmiting(false));
                showOperationError(err);
            })
        } else {
            const editFeldValues = preHandleModifyFieldValues(fieldValues);
            console.log(editFeldValues);
            modifyAlbum(editKey, editFeldValues).then(res => {
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
        type: AT_ALBUM_AUDITING_UPDATE_EDIT_FORM_SUBMITING,
        payload: isSubmiting
    }
}

export function updateEditItemKey(key) {
    return {
        type: AT_ALBUM_AUDITING_UPDATE_EDIT_ITEM_KEY,
        payload: key
    }
}

export function requestEditItem(inputHelper) {
    return (dispatch, getState) => {
        const editItem = getState().content.editAlbum;
        const editKey = editItem.editKey;

        dispatch(updateEditFormErrorMessage(null));
        dispatch(updateEditFormSubmiting(true));

        Promise.all([getAuditingAlbumByKey(editKey), getAlbumPictures(editKey), getAllPubUser()]).then(res => {
            const modifyImages = res[1].sort((a, b) => a.sequence - b.sequence).map(item => item.imageUrl);

            const modifyFieldValues = {
                pubUserId: res[0].pubUser.id,
                cover: res[0].cover,
                images: modifyImages
            };

            dispatch({
                type: AT_ALBUM_AUDITING_UPDATE_PUB_USER_LIST,
                payload: res[2]
            })

            dispatch(updateEditFormData(inputHelper, modifyFieldValues));
            dispatch(updateEditFormSubmiting(false));
        }, err => showFetchError(err));

    }
}

function preHandleModifyFieldValues(fieldValues) {
    console.log(fieldValues);

    const images = [];
    const imageKeys = [];
    const imagesInfo = [];
    const imageKeysInfo = []

    for (let i = 0; i < fieldValues.images.length; i++) {
        const item = fieldValues.images[i];
        if (item instanceof File) {
            images.push(item);
            imagesInfo.push({
                sequence: i
            })
        } else {
            imageKeys.push(item);
            imageKeysInfo.push({
                sequence: i
            })
        }
    }

    const values = Object.assign({}, fieldValues, {
        images,
        imageKeys,
        imagesInfo: JSON.stringify(imagesInfo),
        imageKeysInfo: JSON.stringify(imageKeysInfo)
    })

    return values;
}