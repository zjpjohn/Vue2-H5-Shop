import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import LoginReducer from './LoginReducer';
import ImageReducer from './ImageReducer';
import MenuReducer from './MenuReducer';
import DataReducer from './data';
import UserReducer from './user';
import AppReducer from './app';
import SystemReducer from './system';
import ChatMusicReducer from './chatMusics';
import GraphReducer from './graph';

export default combineReducers({
    routing: routerReducer,
    login: LoginReducer,
    imageCache: ImageReducer,
    menu: MenuReducer,
    data: DataReducer,
    user: UserReducer,
    app: AppReducer,
    system: SystemReducer,
    chatMusic: ChatMusicReducer,
    graph:GraphReducer
})
