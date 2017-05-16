import {combineReducers} from 'redux';
import ChatMusicGenreListReducer from './ChatMusicGenreListReducer';
import EditChatMusicGenreReducer from './EditChatMusicGenreReducer';
import ChatMusicDetailListReducer from './ChatMusicDetailListReducer';
import EditChatMusicDetailReducer from './EditChatMusicDetailReducer';

export default combineReducers({
    genres: ChatMusicGenreListReducer,
    editGenre: EditChatMusicGenreReducer,
    details: ChatMusicDetailListReducer,
    editDetail: EditChatMusicDetailReducer
})

