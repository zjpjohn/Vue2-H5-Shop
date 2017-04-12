import {combineReducers} from "redux";
import { reducer_versionManager } from "./versionManagerReducer";
import { reducer_versionadd } from "./versionAddReducer";

export default combineReducers({
    versionManager:reducer_versionManager,
    versionAdd:reducer_versionadd,
})