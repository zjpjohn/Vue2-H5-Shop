import { push } from 'react-router-redux'
import {login, logout} from '../apis/UserLoginApi';
import {showLoginToast, showLogoutToast} from '../utils/Toster';
import * as RouterUtil from '../utils/RouterUtil'

export const AT_PROJECT_SELECT = 'AT_PROJECT_SELECT';
export const AT_LOCATION_UPDATE = 'AT_LOCATION_UPDATE';
export const AT_UPDATE_SHOW_LOGIN = 'AT_UPDATE_SHOW_LOGIN';
export const AT_UPDATE_LOGING = 'AT_UPDATE_LOGING';
export const AT_UPDATE_LOGIN_ERROR_MESSAGE = 'AT_UPDATE_LOGIN_ERROR_MESSAGE';
export const AT_UPDATE_LOGIN_UPDAET_TIMESTAMP = 'AT_UPDATE_LOGIN_UPDAET_TIMESTAMP';

//切换app种类，实现页面刷新，route切换
export function selectProject(project) {
    //改变存储值，以此来改变menu的值
    window.localStorage.setItem('selectProjectName', project);
    return dispatch => {
        project=='Cchat'?dispatch(pushHistoryState('data/new')):dispatch(pushHistoryState('/'));
        window.location.reload();
    }
}

export function updateLocation(path) {
    //将当前路径名传递给reducer
    return {
        type: AT_LOCATION_UPDATE,
        payload: path
    }
}

export function updateShowLogin(showLogin) {
    return dispatch => {
        dispatch({
            type: AT_UPDATE_SHOW_LOGIN,
            payload: showLogin
        })

        if (showLogin) {
            dispatch(updateTimestamp(Date.now()));
        }
    }
}

export function updateLoginErrorMessage(message) {
    return {
        type: AT_UPDATE_LOGIN_ERROR_MESSAGE,
        payload: message
    }
}

export function requestLogin(username, password, captcha) {
    return dispatch => {
        dispatch(updateLogining(true));

        login(username, password, captcha).then(res => {
            showLoginToast();
            dispatch(updateShowLogin(false));

            window.location.reload();
        }, err => {
            dispatch(updateTimestamp(Date.now()));
            dispatch(updateLogining(false));
            dispatch(updateLoginErrorMessage(err.message));
        });
    }
}

export function requestLogout() {
    return dispatch => {
        logout().then(res => {
            showLogoutToast();
            window.localStorage.removeItem('_TOKEN_');
            dispatch(updateShowLogin(true));
        }, err => {
            console.error(err);
            window.localStorage.removeItem('_TOKEN_');
            dispatch(updateShowLogin(true));
        })
    }
}

export function updateTimestamp(timestamp) {
    return {
        type: AT_UPDATE_LOGIN_UPDAET_TIMESTAMP,
        payload: timestamp
    }
}

function updateLogining(logining) {
    return {
        type: AT_UPDATE_LOGING,
        payload: logining
    }
}

export function pushHistoryState(path) {
    return push(path);
}
