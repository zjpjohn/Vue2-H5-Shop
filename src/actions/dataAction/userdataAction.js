import { getJson,postJson,postJsonForDownload } from "../../utils/FetchUtil";
import { message } from "antd";

export function requestResetQueryParams() {
    return dispatch => {
        dispatch({
            type: "DATA_STATS_RESET_PARAMS"
        })

        dispatch(action_data_userdata_list());
    };
}

//请求  list
export function action_data_userdata_list() {
    return (dispatch, getState) => {
        const listData = getState().data.userdata;
        const params = Object.assign({}, listData.pager, listData.sorter, listData.filters, listData.search);

        dispatch(action_data_activation_loading(true));

        console.log("params为",params);


        if(params.phone!=null){
            params.phone=params.phone.replace(/\+/, "%2b")
            console.log("params为",params.phone);
        }



        getJson('baseStats/regists', params).then(res => {
            dispatch({
                type: "DATA_USERDATA_GETLIST",
                payload: res
            })
        }).catch(err => {
            message.error(err.message);
            dispatch(action_data_activation_loading(false));
        })
    }
}
//table 的 loading
function action_data_activation_loading(bol){
    return {
        type:"DATA_USERDATA_LOADING",
        payload:bol
    }
}
//search 按钮 触发的 action
export function action_data_userdata_search(searchItem){
    return dispatch => {
        dispatch({
            type:"DATA_USERDATA_SEARCH",
            payload:searchItem
        })
        dispatch(action_data_userdata_list());
    }
}
/**
 * 导出列表到excel
 * @param page
 * @param pageSize
 * @param titles
 */
export function action_data_userdata_export(titles) {
    return (dispatch, getState) => {
        const listData = getState().data.userdata;
        const params = Object.assign({}, listData.pager, listData.sorter, listData.filters, listData.search);
        console.log("title为：",titles);
        console.log('params is ',params);
        postJsonForDownload('baseStats/regists/export', {params, titles}, '数据-用户.xlsx').catch(err => {
            message.error(err.message);
        });
    }

}
//排序 分页 过滤时  先触发 修改 state ， 然后再 请求 list
export function action_data_userdata_updateparams(pagination, filters, sorter){
    return dispatch => {
        dispatch({
            type:"DATA_USERDATA_UPDATEPARAMS",
            payload:{
                pagination,
                filters,
                sorter
            }
        })
        dispatch(action_data_userdata_list());
    }
}