import {getJson, postJson, postForm, postJsonForDownload} from '../utils/FetchUtil';

export function getSysUserList(params) {
    return getJson('sysUsers', params);
}

export function modifySysUser(id, fieldValues) {
    return postForm('sysUsers/modifyPassword/{id}', fieldValues, {id});
}