import * as AppVersionAction from '../../actions/AppVersionAction';

const defaultState = {
    editDialogIsOpen: false,
    isSubmiting: false,
    submitErrorMessage: null,
    fieldValues: {},
    editKey: null
}

export default function (state = defaultState, action) {
    switch (action.type) {
        case AppVersionAction.AT_APP_VERSION_UPDATE_EDIT_DIALOG_OPEN:
            return Object.assign({}, state, {
                editDialogIsOpen: action.payload
            });

        case AppVersionAction.AT_APP_VERSION_UPDATE_EDIT_FORM_DATA:
            return Object.assign({}, state, {
                fieldValues: action.payload
            });

        case AppVersionAction.AT_APP_VERSION_UPDATE_EDIT_FORM_ERROR_MESSAGE:
            return Object.assign({}, state, {
                submitErrorMessage: action.payload
            });

        case AppVersionAction.AT_APP_VERSION_UPDATE_EDIT_FORM_SUBMITING:
            return Object.assign({}, state, {
                isSubmiting: action.payload
            });

        case AppVersionAction.AT_APP_VERSION_UPDATE_EDIT_ITEM_KEY:
            return Object.assign({}, state, {
                editKey: action.payload
            });

        default:
            return state;
    }
}