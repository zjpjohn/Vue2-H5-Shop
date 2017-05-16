import {getImageUrls} from '../apis/ImageApi';
import {showFetchError} from '../utils/Toster';

export const AT_IMAGE_UPDATE_IMAGE_CACHE = 'AT_IMAGE_UPDATE_IMAGE_CACHE';

export function requestImageUrl(imgNames) {
    return dispatch => {
        getImageUrls(imgNames).then(res => {
            return dispatch({
                type: AT_IMAGE_UPDATE_IMAGE_CACHE,
                payload: res
            });
        }).catch(err => showFetchError(err));
    }
}