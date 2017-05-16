import {getJson, postJson, postForm, postJsonForDownload} from '../utils/FetchUtil';

export function getAppUserList(params) {
    return getJson('appUsers', params);
}

export function exportAppUserLists(params, titles) {
    return postJsonForDownload('appUsers/export', {params, titles}, 'AppUser List.xlsx');
}

export function disableAppUser(id) {
    const fieldValues = {userId: id, userStatus: 0};
    return postForm('appUsers/editUserStatus', fieldValues);
}

export function enableAppUser(id) {
    const fieldValues = {userId: id, userStatus: 1};
    return postForm('appUsers/editUserStatus', fieldValues);
}

export function cancelVip(id) {
    return postForm('appUsers/cancelVip', {userId: id});
}

export function getPubUserList(params) {
    return getJson('pubUser', params);
}

export function addPubUser(fieldValues) {
    return postForm('pubUser', fieldValues);
}

export function modifyPubUser(id, fieldValues) {
    return postForm('pubUser/editSelect/{id}', fieldValues, {id});
}

export function deletePubUserBatch(ids) {
    return postJson('pubUser/deleteBatch', ids);
}

export function getPubUserByKey(key) {
    return getJson('pubUser', {id: key}).then(res => {
        return res.data[0]
    });
}