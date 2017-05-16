import {combineReducers} from 'redux';
import AppUserListReducer from './AppUserListReducer';

export default combineReducers({
    appUsers: AppUserListReducer,
})