import {getAlbums, getAlbumByKey, deleteAlbumsBatch, getAllPubUser, getAlbumPictures} from '../apis/GalleryApi';
import {showFetchError, showOperationError, showOperationSuccess} from '../utils/Toster';

export const AT_GALLERY_RESET_PARAMS = 'AT_GALLERY_RESET_PARAMS';
export const AT_GALLERY_UPDATE_LIST_DATA = 'AT_GALLERY_UPDATE_LIST_DATA';
export const AT_GALLERY_UPDATE_SEARCH_PARAMS = 'AT_GALLERY_UPDATE_SEARCH_PARAMS'
export const AT_GALLERY_UPDATE_FILTER_PARAMS = 'AT_GALLERY_UPDATE_FILTER_PARAMS';
export const AT_GALLERY_UPDATE_LOADING = 'AT_GALLERY_UPDATE_LOADING';
export const AT_GALLERY_UPDATE_SELECT_ROWS = 'AT_GALLERY_UPDATE_SELECT_ROWS';

export const AT_GALLERY_UPDATE_EDIT_DIALOG_OPEN = 'AT_GALLERY_UPDATE_EDIT_DIALOG_OPEN';
export const AT_GALLERY_UPDATE_EDIT_FORM_DATA = 'AT_GALLERY_UPDATE_EDIT_FORM_DATA';
export const AT_GALLERY_UPDATE_EDIT_FORM_SUBMITING = 'AT_GALLERY_UPDATE_EDIT_FORM_SUBMITING';
export const AT_GALLERY_UPDATE_EDIT_ITEM_KEY = 'AT_GALLERY_UPDATE_EDIT_ITEM_KEY';
export const AT_GALLERY_UPDATE_PUB_USER_LIST = 'AT_GALLERY_UPDATE_PUB_USER_LIST';

export function requestResetQueryParams() {
    return dispatch => {
        dispatch({
            type: AT_GALLERY_RESET_PARAMS
        })

        dispatch(requestList());
    };
}

export function requestList() {
    return (dispatch, getState) => {
        const listData = getState().content.albums;
        const params = Object.assign({}, listData.pager, listData.sorter, listData.filters, listData.search);

        dispatch(updateLoading(true));

        getAlbums(params).then(res => dispatch({
            type: AT_GALLERY_UPDATE_LIST_DATA,
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
        type: AT_GALLERY_UPDATE_SEARCH_PARAMS,
        payload: params
    }
}

export function updateFilterParams(params) {
    return {
        type: AT_GALLERY_UPDATE_FILTER_PARAMS,
        payload: params
    }
}

export function updateSelectRows(selectRowKeys) {
    return {
        type: AT_GALLERY_UPDATE_SELECT_ROWS,
        payload: selectRowKeys
    }
}

function updateLoading(loading) {
    return {
        type: AT_GALLERY_UPDATE_LOADING,
        payload: loading
    }
}

export function requestDeleteBatch() {
    return (dispatch, getState) => {
        const listData = getState().content.albums;
        const selectedRowKeys = listData.selectedRowKeys;

        deleteAlbumsBatch(selectedRowKeys).then(res => {
            showOperationSuccess();
            dispatch(requestList());
        }, err => showOperationError(err));
    }
}

// 以下为编辑用action

export function updateEditDialogOpen(inputHelper, isOpen) {
    return {
        type: AT_GALLERY_UPDATE_EDIT_DIALOG_OPEN,
        payload: isOpen
    }
}

export function updateEditFormData(inputHelper, fieldValues) {
    inputHelper.setValues(fieldValues);
    return {
        type: AT_GALLERY_UPDATE_EDIT_FORM_DATA,
        payload: fieldValues
    }
}


function updateEditFormSubmiting(isSubmiting) {
    return {
        type: AT_GALLERY_UPDATE_EDIT_FORM_SUBMITING,
        payload: isSubmiting
    }
}

export function updateEditItemKey(key) {
    return {
        type: AT_GALLERY_UPDATE_EDIT_ITEM_KEY,
        payload: key
    }
}

export function requestEditItem(inputHelper) {
    return (dispatch, getState) => {
        const editItem = getState().content.editGalleryAlbum;
        const editKey = editItem.editKey;

        dispatch(updateEditFormSubmiting(true));

        Promise.all([getAlbumByKey(editKey), getAlbumPictures(editKey), getAllPubUser()]).then(res => {
            const modifyImages = res[1].sort((a, b) => a.sequence - b.sequence).map(item => item.imageUrl);

            const modifyFieldValues = {
                pubUserId: res[0].pubUser.id,
                cover: res[0].cover,
                images: modifyImages
            };

            dispatch({
                type: AT_GALLERY_UPDATE_PUB_USER_LIST,
                payload: res[2]
            })

            dispatch(updateEditFormData(inputHelper, modifyFieldValues));
            dispatch(updateEditFormSubmiting(false));
        }, err => showFetchError(err));

    }
}