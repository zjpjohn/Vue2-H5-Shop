import {getJson, postJsonForDownload} from '../utils/FetchUtil';
import { message,Modal } from "antd";

export const AT_NEW_STATS_RESET_PARAMS = 'AT_NEW_STATS_RESET_PARAMS';
export const AT_NEW_STATS_GET_GENDER='AT_NEW_STATS_GET_GENDER';
export const AT_NEW_STATS_GET_AGE='AT_NEW_STATS_GET_AGE';
export const UPDATE_NEW_CLASSIFY='UPDATE_NEW_CLASSIFY';
export const UPDATE_LOADING='UPDATE_LOADING';
export function requestResetQueryParams() {
    return dispatch => {
        dispatch({
            type: AT_NEW_STATS_RESET_PARAMS,
        })
        dispatch(byGenderList());
        dispatch(byAgeList());
    };
}
export function byGenderList(){
    return (dispatch, getState) => {

        getJson('runData/byGender').then(res=>{
            let data=[
                {name:'男性',value:res.maleCount},
                {name:'女性',value:res.femaleCount},
                {name:'其他',value:res.unknownCount==null?0:res.unknownCount},
            ];
            dispatch({
                type:AT_NEW_STATS_GET_GENDER,
                payload:data
            })
        }).catch(err => {
            message.error(err.message);
        });
    }
}
export function byAgeList(){
    return (dispatch, getState) => {
        dispatch(updateLoading(true));
        const listData = getState().graph.piegraph;
        getJson('runData/byAge').then(res=>{
            let data=getAgeList(res,listData.classify);
            dispatch({
                type:AT_NEW_STATS_GET_AGE,
                payload:data
            })
        }).catch(err => {
            message.error(err.message);
            dispatch(updateLoading(false));
        });
    }
}
function updateLoading(loading) {
    return {
        type: UPDATE_LOADING,
        payload: loading
    }
}
export function updateClassify(value){
    return dispatch => {
        dispatch({
            type: UPDATE_NEW_CLASSIFY,
            payload: value
        })

        dispatch(byAgeList());
    };

}
export function getAgeList(res,sex){
    let distance = ['18岁以下', '18-21岁', '22-26岁', '27-30岁', '30岁以上'];
    let count1=sex==''?res.ageRangeCount1:(sex == 'male' ? res.ageRangeMaleCount1 : res.ageRangeFemaleCount1);
    let count2=sex==''?res.ageRangeCount2:(sex == 'male' ? res.ageRangeMaleCount2 : res.ageRangeFemaleCount2);
    let count3=sex==''?res.ageRangeCount3:(sex == 'male' ? res.ageRangeMaleCount3 : res.ageRangeFemaleCount3);
    let count4=sex==''?res.ageRangeCount4:(sex == 'male' ? res.ageRangeMaleCount4 : res.ageRangeFemaleCount4);
    let count5=sex==''?res.ageRangeCount5:(sex == 'male' ? res.ageRangeMaleCount5 : res.ageRangeFemaleCount5);
    let value=distance.map((item,index)=>{
        return {
            name:item,
            value:index+1==1?count1:(index+1==2?count2:(index+1==3?count3:(index+1==4?count4:(index+1==5?count5:item))))
        }
    })
    return value;
}
