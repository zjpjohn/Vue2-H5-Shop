import {postJson, postForLogin} from '../utils/FetchUtil';

export function login(username, password, captcha) {
    return postForLogin('sysUser/login', username, password, captcha);
}

export function logout() {
    return postJson('sysUser/logout', null, null, false);
}