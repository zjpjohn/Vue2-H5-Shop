import { getJson } from '../utils/FetchUtil';

/**
 * 批量获取图片url
 * @param imgNames
 * @return {Promise}
 */
export function getImageUrls(imgNames) {
    return getJson('images/urls', {imgNames});
}