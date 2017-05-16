import {combineReducers} from 'redux';
import AppVersionListReducer from './AppVersionListReducer';
import EditAppVersionReducer from './EditAppVersionReducer';
import FeedbackListReducer from './FeedbackListReducer';

export default combineReducers({
    appVersions: AppVersionListReducer,
    editAppVersion: EditAppVersionReducer,
    feedbacks: FeedbackListReducer
})