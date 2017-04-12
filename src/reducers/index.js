import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import { reducer_login } from "./loginReducer";
import { reducer_address } from "./menuReducer";
//import {action_changeAddress, action_EssayList_initData} from "../actions";
import  data_comb  from "./dataReducer";
import info_comb from "./infoReducer";
import notice_comb from "./noticeReducer";
import version_comb from "./versionReducer";


export default combineReducers({
    data:data_comb,
    info:info_comb,
    notice:notice_comb,
    version:version_comb,
    login:reducer_login,
    address:reducer_address,
    routing:routerReducer
});