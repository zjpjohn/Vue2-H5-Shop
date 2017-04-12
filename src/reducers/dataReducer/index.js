import {combineReducers} from "redux";
import { reducer_activation } from "./activationReducer";
import { reducer_colligate } from "./colligateReducer";
import { reducer_register } from "./registerReducer";
import { reducer_userdata } from "./userdataReducer";
export default combineReducers({
    colligate:reducer_colligate,
    activation:reducer_activation,
    register:reducer_register,
    userdata:reducer_userdata
})