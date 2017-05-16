import {combineReducers} from 'redux';
import SysUserListReducer from './SysUserListReducer';
import EditSysUserReducer from './EditSysUserReducer';

export default combineReducers({
    sysUsers: SysUserListReducer,
    editSysUser: EditSysUserReducer
})