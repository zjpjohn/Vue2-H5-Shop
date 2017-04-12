import {getJson,postJson,postJsonForDownload} from "../../utils/FetchUtil";
import {message} from "antd";

export function requestResetQueryParams() {
    return dispatch => {
        dispatch({
            type: "DATA_STATS_RESET_PARAMS"
        })

        dispatch(action_content_colligate_list());
    };
}
//请求  list
//getJson('atlas/getAtlasList', params)
export function action_content_colligate_list() {
    return (dispatch, getState) => {
        const listData = getState().data.colligate;
        const params = Object.assign({}, listData.pager, listData.sorter, listData.filters, listData.search);

        dispatch(action_content_colligate_loading(true));

        console.log("params为",params);

        getJson('/baseStats/statsInfo', params).then(res => {
            dispatch({
                type: "DATA_COLLIGATE_GETLIST",
                payload: res
            }) 
        }).catch(err => {
            message.error(err.message);
            dispatch(action_content_colligate_loading(false));
        })
    }
}
//table 的 loading 
function action_content_colligate_loading(bol){
    return {
        type:"DATA_COLLIGATE_LOADING",
        payload:bol
    }
}

//排序 分页 过滤时  先触发 修改 state ， 然后再 请求 list
export function action_data_colligate_updateparams(pagination, filters, sorter){
    return dispatch => {
        dispatch({
            type:"DATA_COLLIGATE_UPDATEPARAMS",
            payload:{
               pagination,
               filters,
               sorter
            }
        })
        dispatch(action_content_colligate_list());
    }
}

//table 里的选择 因为 选择 是不 跟 排序 分页 过滤 一起的
export function action_data_colligate_onSelect(index,rows){
    return {
        type:"DATA_COLLIGATE_ONSELECT",
        payload:{
            index,
            rows
        }
    }
}

//search 按钮 触发的 action
export function action_data_colligate_search(searchItem){
    return dispatch => {
        dispatch({
            type:"DATA_COLLIGATE_SEARCH",
            payload:searchItem
        })
        dispatch(action_content_colligate_list());
    }
}


//postJsonForDownload('essaies/export/xlsx', {params, titles}, 'Essay List.xlsx');
/**
 * 导出列表到excel
 * @param page
 * @param pageSize
 * @param titles
 */
export function action_data_colligate_export(titles) {
    return (dispatch, getState) => {
        const listData = getState().data.colligate;
        const params = Object.assign({}, listData.pager, listData.sorter, listData.filters, listData.search);
        console.log("title为：",titles);

        postJsonForDownload('/baseStats/statsInfo/export', {params, titles}, '数据-综合.xlsx').catch(err => {
            message.error(err.message);
        });
    }

}
