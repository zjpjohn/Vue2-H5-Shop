import { getJson,postJson,postJsonForDownload } from "../../utils/FetchUtil";
import { message } from "antd";

export function requestResetQueryParams() {
    return dispatch => {
        dispatch({
            type: "DATA_STATS_RESET_PARAMS"
        })

        dispatch(action_data_register_list());
    };
}
//请求  list
export function action_data_register_list() {
    return (dispatch, getState) => {
        const listData = getState().data.register;
        const params = Object.assign({}, listData.pager, listData.sorter, listData.filters, listData.search);

        dispatch(action_data_register_loading(true));

        console.log("params为",params);

        getJson('baseStats/regists', params).then(res => {
            dispatch({
                type: "DATA_REGISTER_GETLIST",
                payload: res
            }) 
        }).catch(err => {
            message.error(err.message);
            dispatch(action_data_register_loading(false));
        })
    }
}
//table 的 loading 
function action_data_register_loading(bol){
    return {
        type:"DATA_REGISTER_LOADING",
        payload:bol
    }
}

//排序 分页 过滤时  先触发 修改 state ， 然后再 请求 list
export function action_data_register_updateparams(pagination, filters, sorter){
    return dispatch => {
        dispatch({
            type:"DATA_REGISTER_UPDATEPARAMS",
            payload:{
               pagination,
               filters,
               sorter
            }
        })
        dispatch(action_data_register_list());
    }
}

//table 里的选择 因为 选择 是不 跟 排序 分页 过滤 一起的
export function action_data_register_onSelect(index,rows){
    return {
        type:"DATA_REGISTER_ONSELECT",
        payload:{
            index,
            rows
        }
    }
}

//search 按钮 触发的 action
export function action_data_register_search(searchItem){
    return dispatch => {
        dispatch({
            type:"DATA_REGISTER_SEARCH",
            payload:searchItem
        })
        dispatch(action_data_register_list());
    }
}

//获取 渠道 select
export function action_data_register_channel(){
    return (dispatch, getState) => {
        getJson('/baseStats/channel').then(res =>{
            dispatch({
                type:"DATA_REGISTER_CHANNEL",
                payload:res
            })
        }).catch(err => {
            message.error(err.message);
        });
    }

}

//获取 安卓 版本号
export function action_data_register_androidVersion(){
    return (dispatch, getState) => {
        getJson('/baseStats/androidVersion').then(res =>{
            dispatch({
                type:"DATA_REGISTER_ANDROIDVERSION",
                payload:res
            })
        }).catch(err => {
            message.error(err.message);
        });
    }

}

//获取  版本号
export function action_data_register_version(){
    return (dispatch, getState) => {
        getJson('baseStats/appVersion').then(res =>{
            dispatch({
                type:"DATA_REGISTER_VERSION",
                payload:res
            })
        }).catch(err => {
            message.error(err.message);
        });
    }

}

//postJsonForDownload('essaies/export/xlsx', {params, titles}, 'Essay List.xlsx');
/**
 * 导出列表到excel
 * @param page
 * @param pageSize
 * @param titles
 */
export function action_data_register_export(titles) {
    return (dispatch, getState) => {
        const listData = getState().data.register;
        const params = Object.assign({}, listData.pager, listData.sorter, listData.filters, listData.search);
        console.log("title为：",titles);

        postJsonForDownload('baseStats/regists/export', {params, titles}, '数据-注册.xlsx').catch(err => {
            message.error(err.message);
        });
    }

}