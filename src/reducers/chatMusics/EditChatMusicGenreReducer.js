import * as ChatMusicGenreAction from '../../actions/ChatMusicGenreAction';

const defaultState = {
    editDialogIsOpen: false,
    isSubmiting: false,
    submitErrorMessage: null,
    fieldValues: {},
    editKey: null
}

export default function (state = defaultState, action) {
    switch (action.type) {
        case ChatMusicGenreAction.AT_CHAT_MUSIC_GENRE_UPDATE_EDIT_DIALOG_OPEN:
            return Object.assign({}, state, {
                editDialogIsOpen: action.payload
            });

        case ChatMusicGenreAction.AT_CHAT_MUSIC_GENRE_UPDATE_EDIT_FORM_DATA:
            return Object.assign({}, state, {
                fieldValues: action.payload
            });

        case ChatMusicGenreAction.AT_CHAT_MUSIC_GENRE_UPDATE_EDIT_FORM_ERROR_MESSAGE:
            return Object.assign({}, state, {
                submitErrorMessage: action.payload
            });

        case ChatMusicGenreAction.AT_CHAT_MUSIC_GENRE_UPDATE_EDIT_FORM_SUBMITING:
            return Object.assign({}, state, {
                isSubmiting: action.payload
            });

        case ChatMusicGenreAction.AT_CHAT_MUSIC_GENRE_UPDATE_EDIT_ITEM_KEY:
            return Object.assign({}, state, {
                editKey: action.payload
            });

        default:
            return state;
    }
}