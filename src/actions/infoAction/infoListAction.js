import {getJson,postJson,postJsonForDownload} from "../../utils/FetchUtil";
import {message} from "antd";

//请求  list
//getJson('baseStats/actives', params)
export function action_info_list() {
    return (dispatch, getState) => {
        const listData = getState().info.infolist;
        const params = Object.assign({}, listData.pager, listData.sorter, listData.filters, listData.search);

        dispatch(action_info_loading(true));

        if(params.toUserPhone){
            params.toUserPhone=params.toUserPhone.replace(/\+/,'%2b');
            console.log("params为",params);
        }


        getJson('/message', params).then(res => {
            dispatch({
                type: "INFO_GETLIST",
                payload: res
            }) 
        }).catch(err => {
            message.error(err.message);
            dispatch(action_info_loading(false));
        })
    }
}
//table 的 loading 
function action_info_loading(bol){
    return {
        type:"INFO_LOADING",
        payload:bol
    }
}

//排序 分页 过滤时  先触发 修改 state ， 然后再 请求 list
export function action_info_updateparams(pagination, filters, sorter){
    return dispatch => {
        dispatch({
            type:"INFO_UPDATEPARAMS",
            payload:{
               pagination,
               filters,
               sorter
            }
        })
        dispatch(action_info_list());
    }
}

//table 里的选择 因为 选择 是不 跟 排序 分页 过滤 一起的
export function action_info_onSelect(index,rows){
    return {
        type:"INFO_ONSELECT",
        payload:{
            index,
            rows
        }
    }
}

//search 按钮 触发的 action
export function action_info_search(searchItem){
    return dispatch => {
        dispatch({
            type:"INFO_SEARCH",
            payload:searchItem
        })
        dispatch(action_info_list());
    }
}



 