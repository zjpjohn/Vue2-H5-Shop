/**
 * Created by guofe on 2016/5/31.
 */

import { Modal } from 'antd';
import store from '../store';
import {updateShowLogin} from '../actions/AppAction';

export default class AuthorizeError {
    constructor(response) {
        this.response = response;

        if (response.url.indexOf('logout') > 0) {
            return;
        }

        if (window.localStorage) {
            window.localStorage.removeItem('_TOKEN_');
        }

        store.dispatch(updateShowLogin(true));
    }
}

AuthorizeError.status = 401;
