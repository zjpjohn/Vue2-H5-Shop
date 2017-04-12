import {combineReducers} from "redux";
import { reducer_edit } from "./editReducer";
import { reducer_notice_history } from "./noticehistoryReducer";
import { reducer_sendout } from "./sendoutReducer";
export default combineReducers({
    edit:reducer_edit,
    sendout:reducer_sendout,
    noticehistory:reducer_notice_history,
    
})