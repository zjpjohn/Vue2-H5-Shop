import {getJson,postJson} from "../../utils/FetchUtil";
import {message} from "antd";

//请求  list
//getJson('baseStats/actives', params)
export function action_version_versionManager_list() {
    return (dispatch, getState) => {
        const listData = getState().version.versionManager;
        const params = Object.assign({}, listData.pager, listData.sorter, listData.filters, listData.search);

        dispatch(action_version_versionManager_loading(true));

        //console.log("params为",params);

        getJson('/appVersions', params).then(res => {
            dispatch({
                type: "VERSION_VERSIONMANAGER_GETLIST",
                payload: res
            }) 
        }).catch(err => {
            message.error(err.message);
            dispatch(action_version_versionManager_loading(false));
        })
    }
}
//table 的 loading 
function action_version_versionManager_loading(bol){
    return {
        type:"VERSION_VERSIONMANAGER_LOADING",
        payload:bol
    }
}

//排序 分页 过滤时  先触发 修改 state ， 然后再 请求 list
export function action_version_versionManager_updateparams(pagination, filters, sorter){
    return dispatch => {
        dispatch({
            type:"VERSION_VERSIONMANAGER_UPDATEPARAMS",
            payload:{
               pagination,
               filters,
               sorter
            }
        })
        dispatch(action_version_versionManager_list());
    }
}

//table 里的选择 因为 选择 是不 跟 排序 分页 过滤 一起的
export function action_version_versionManager_onSelect(index,rows){
    return {
        type:"VERSION_VERSIONMANAGER_ONSELECT",
        payload:{
            index,
            rows
        }
    }
}

//search 按钮 触发的 action
export function action_version_versionManager_search(searchItem){
    return dispatch => {
        dispatch({
            type:"VERSION_VERSIONMANAGER_SEARCH",
            payload:searchItem
        })
        dispatch(action_version_versionManager_list());
    }
}

//modal 的 visible 
export function action_version_versionManager_addVersion(bol){
    return {
        type:"VERSION_VERSIONMANAGER_ADDVERSION",
        payload:bol
    }
}

//  

export function action_version_versionManager_delete(){
    return (dispatch,getState) => {
        const rows = getState().version.versionManager.onSelect.rows;
        let ids = [];
        rows.map((item,index) => {
            ids.push(item.id);
        });

        postJson("/appVersions/delBatch",ids).then(res => {
            dispatch(action_version_versionManager_list());
        }).catch(err => {
            dispatch(action_version_versionManager_loading(false));
            message.error(err.message);
        })
    }
}