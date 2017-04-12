import { getJson,postJson,postJsonForDownload } from "../../utils/FetchUtil";
import { message } from "antd";
export function requestResetQueryParams() {
    return dispatch => {
        dispatch({
            type: "DATA_STATS_RESET_PARAMS"
        })

        dispatch(UserFeedback_list());
    };
}
//请求  list
//getJson('baseStats/actives', params)
export function UserFeedback_list() {
    return (dispatch, getState) => {
        const listData = getState().info.UserFeedback;
        const params = Object.assign({}, listData.pager, listData.sorter, listData.filters, listData.search);

        dispatch(UserFeedback_loading(true));

        console.log("params为",params);

        getJson('/feedbacks', params).then(res => {
            dispatch({
                type: "USERFEEDBACK_GETLIST",
                payload: res
            })
        }).catch(err => {
            message.error(err.message);
            dispatch(UserFeedback_loading(false));
        })
    }
}
function UserFeedback_loading(bol){
    return {
        type:"USERFEEDBACK_LOADING",
        payload:bol
    }
}
export function UserFeedback_search(searchItem){
    return dispatch => {
        dispatch({
            type:"USERFEEDBACK_SEARCH",
            payload:searchItem
        })
        dispatch(UserFeedback_list());
    }
}
/**
 * 导出列表到excel
 * @param page
 * @param pageSize
 * @param titles
 */
export function UserFeedback_export(titles) {
    return (dispatch, getState) => {
        const listData = getState().info.UserFeedback;
        const params = Object.assign({}, listData.pager, listData.sorter, listData.filters, listData.search);
        console.log("title为：",titles);
        console.log('params is ',params);
        postJsonForDownload('feedbacks/export', {params, titles}, '数据-用户反馈.xlsx').catch(err => {
            message.error(err.message);
        });
    }

}
//排序 分页 过滤时  先触发 修改 state ， 然后再 请求 list
export function UserFeedback_updateparams(pagination, filters, sorter){
    return dispatch => {
        dispatch({
            type:"UserFeedback_UPDATEPARAMS",
            payload:{
                pagination,
                filters,
                sorter
            }
        })
        dispatch(UserFeedback_list());
    }
}