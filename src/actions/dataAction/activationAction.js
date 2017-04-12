import {getJson,postJson,postJsonForDownload} from "../../utils/FetchUtil";
import {message} from "antd";

export function requestResetQueryParams() {
    return dispatch => {
        dispatch({
            type: "DATA_STATS_RESET_PARAMS"
        })

        dispatch(action_data_activation_list());
    };
}
//请求  list
//getJson('baseStats/actives', params)
export function action_data_activation_list() {
    return (dispatch, getState) => {
        const listData = getState().data.activation;
        const params = Object.assign({}, listData.pager, listData.sorter, listData.filters, listData.search);

        dispatch(action_data_activation_loading(true));

        console.log("params为",params);

        getJson('baseStats/actives', params).then(res => {
            dispatch({
                type: "DATA_ACTIVATION_GETLIST",
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
        type:"DATA_ACTIVATION_LOADING",
        payload:bol
    }
}

//排序 分页 过滤时  先触发 修改 state ， 然后再 请求 list
export function action_data_activation_updateparams(pagination, filters, sorter){
    return dispatch => {
        dispatch({
            type:"DATA_ACTIVATION_UPDATEPARAMS",
            payload:{
               pagination,
               filters,
               sorter
            }
        })
        dispatch(action_data_activation_list());
    }
}

//table 里的选择 因为 选择 是不 跟 排序 分页 过滤 一起的
export function action_data_activation_onSelect(index,rows){
    return {
        type:"DATA_ACTIVATION_ONSELECT",
        payload:{
            index,
            rows
        }
    }
}

//search 按钮 触发的 action
export function action_data_activation_search(searchItem){
    return dispatch => {
        dispatch({
            type:"DATA_ACTIVATION_SEARCH",
            payload:searchItem
        })
        dispatch(action_data_activation_list());
    }
}

//获取 渠道 select
export function action_data_activation_channel(){
    return (dispatch, getState) => {
        getJson('/baseStats/channel').then(res =>{
            dispatch({
                type:"DATA_ACTIVATION_CHANNEL",
                payload:res
            })
        }).catch(err => {
            message.error(err.message);
        });
    }

}

//获取 安卓 版本号
export function action_data_activation_androidVersion(){
    return (dispatch, getState) => {
        getJson('/baseStats/androidVersion').then(res =>{
            dispatch({
                type:"DATA_ACTIVATION_ANDROIDVERSION",
                payload:res
            })
        }).catch(err => {
            message.error(err.message);
        });
    }

}

//获取  版本号
export function action_data_activation_version(){
    return (dispatch, getState) => {
        getJson('baseStats/appVersion').then(res =>{
            dispatch({
                type:"DATA_ACTIVATION_VERSION",
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
export function action_data_activation_export(titles) {
    return (dispatch, getState) => {
        const listData = getState().data.activation;
        const params = Object.assign({}, listData.pager, listData.sorter, listData.filters, listData.search);
        console.log("title为：",titles);

        postJsonForDownload('baseStats/actives/export', {params, titles}, '数据-激活.xlsx').catch(err => {
            message.error(err.message);
        });
    }

}