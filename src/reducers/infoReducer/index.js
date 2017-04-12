import {combineReducers} from "redux";
import { reducer_infoList } from "./InfoListReducer";
import { reducer_UserFeedback } from "./UserFeedbackReducer";

export default combineReducers({
    infolist:reducer_infoList,
    UserFeedback:reducer_UserFeedback
})