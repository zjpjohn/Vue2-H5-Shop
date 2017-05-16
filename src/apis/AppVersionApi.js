import {getJson, postJson, postForm, postJsonForDownload} from '../utils/FetchUtil';

export function getAppVersionList(params) {
    return getJson('appVersions', params);
}

export function getAppVersionByKey(key) {
    return getJson('appVersions', {id: key}).then(res => {
        return res.data[0];
    });
}

export function addAppVersion(fieldValues) {
    return postForm('appVersions', fieldValues);
}

export function modifyAppVersion(id, fieldValues) {
    return postForm('appVersions/editSelect/{id}', fieldValues, {id});
}

export function deleteBatch(ids) {
    return postJson('appVersions/delBatch', ids);
}