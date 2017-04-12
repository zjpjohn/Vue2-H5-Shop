import {getJson,postJson,postJsonForDownload} from "../../utils/FetchUtil";
import {message} from "antd";

//请求  list
//getJson('baseStats/actives', params)
export function action_notice_history_list() {
    return (dispatch, getState) => {
        const listData = getState().notice.noticehistory;
        const params = Object.assign({}, listData.pager, listData.sorter, listData.filters, listData.search);

        dispatch(action_notice_history_loading(true));

        console.log("params为",params);

        getJson('/notice', params).then(res => {
            dispatch({
                type: "NOTICE_HISTORY_GETLIST",
                payload: res
            }) 
        }).catch(err => {
            message.error(err.message);
            dispatch(action_notice_history_loading(false));
        })
    }
}
//table 的 loading 
function action_notice_history_loading(bol){
    return {
        type:"NOTICE_HISTORY_LOADING",
        payload:bol
    }
}

//排序 分页 过滤时  先触发 修改 state ， 然后再 请求 list
export function action_notice_history_updateparams(pagination, filters, sorter){
    return dispatch => {
        dispatch({
            type:"NOTICE_HISTORY_UPDATEPARAMS",
            payload:{
               pagination,
               filters,
               sorter
            }
        })
        dispatch(action_notice_history_list());
    }
}

//table 里的选择 因为 选择 是不 跟 排序 分页 过滤 一起的
export function action_notice_history_onSelect(index,rows){
    return {
        type:"NOTICE_HISTORY_ONSELECT",
        payload:{
            index,
            rows
        }
    }
}

// //search 按钮 触发的 action
// export function action_notice_history_search(searchItem){
//     return dispatch => {
//         dispatch({
//             type:"DATA_ACTIVATION_SEARCH",
//             payload:searchItem
//         })
//         dispatch(action_notice_history_list());
//     }
// }



