import * as AppAction from '../actions/AppAction';

const defaultState = {
    showLogin: false,
    loginErrorMessage: null,
    isLogining: false,
    timestamp: null
}

export default function appReducer(state = defaultState, action) {
    switch (action.type) {
        case AppAction.AT_UPDATE_SHOW_LOGIN:
            let modifies = {
                showLogin: action.payload
            }

            if (!action.payload) {
                modifies.loginErrorMessage = null;
                modifies.isLogining = false
            }

            return Object.assign({}, state, modifies);

        case AppAction.AT_UPDATE_LOGIN_ERROR_MESSAGE:
            return Object.assign({}, state, {
                loginErrorMessage: action.payload
            });

        case AppAction.AT_UPDATE_LOGING:
            return Object.assign({}, state, {
                isLogining: action.payload
            });

        case AppAction.AT_UPDATE_LOGIN_UPDAET_TIMESTAMP:
            return Object.assign({}, state, {
                timestamp: action.payload
            });

        default:
            return state;
    }
}