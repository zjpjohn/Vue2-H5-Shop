import {getDistance} from '../apis/DataApi';
import {getJson, postJsonForDownload} from '../utils/FetchUtil';
import { message,Modal } from "antd";
import G2,{ Frame } from 'g2';

export const AT_NEW_STATS_RESET_PARAMS = 'AT_NEW_STATS_RESET_PARAMS';
export const AT_NEW_STATS_GET_DISTANCE ='AT_NEW_STATS_GET_DISTANCE';
export const UPDATE_NEW_CLASSIFY = "UPDATE_NEW_CLASSIFY";
export const AT_NEW_STATS_GET_TIME='AT_NEW_STATS_GET_TIME';
export const UPDATE_NEW_TIME_CLASSIFY='UPDATE_NEW_TIME_CLASSIFY';
export const UPDATE_LOADING='UPDATE_LOADING';
export const UPDATE_TIME_LOADING='UPDATE_TIME_LOADING';
export const UPDATE_NEW_DISTANCE_LIST='UPDATE_NEW_DISTANCE_LIST';
export const UPDATE_NEW_TIME_LIST='UPDATE_NEW_TIME_LIST';

export function requestResetQueryParams() {
    return dispatch => {
        dispatch({
            type: AT_NEW_STATS_RESET_PARAMS,
        })
        dispatch(requestDistanceData());
        dispatch(requestTimeData());
    };
}
export function requestDistanceData(dateCount) {
    return (dispatch, getState) => {
        const listData = getState().graph.bargraph;
        const params = Object.assign({},listData.search);
        //console.log(params);
        dispatch(updateLoading(true));
        getJson('runData/daily/byDistance',params).then(res =>{
            let bol=true;
            let newRes=dateProcess(res,params.dateStart,params.dateEnd,params.dateCount,bol);
            //console.log(newRes.result,newRes.date);
            let data=getDistanceList(newRes.result,listData.classify);
            let date=newRes.result.map((item,index)=>{
                return formatDate(new Date(item.dateValue))
            })
            var Frame = G2.Frame;
            var frame = new Frame(dataProcess(data,date));
            //console.log(frame);
            frame = Frame.combinColumns(frame,date,'数量','日期','name');
            //console.log(frame)
            dispatch({
                type:AT_NEW_STATS_GET_DISTANCE,
                payload:frame
            })
        }).catch(err => {
            message.error(err.message);
            dispatch(updateLoading(false));
        });
    };
}
export function requestTimeData(){
    return (dispatch, getState) => {
        const listData = getState().graph.bargraph;
        const params = Object.assign({},listData.filter);
        dispatch(updateTimeLoading(true));
        getJson('runData/daily/byTime',params).then(res => {
            let bol=false;
            let newRes=dateProcess(res,params.dateStart,params.dateEnd,params.dateCount,bol);
            let data=getTimeList(newRes.result,listData.timeClassify);
            let date=newRes.result.map((item,index)=>{
                return formatDate(new Date(item.dateValue))
            })
            var Frame = G2.Frame;
            var frame = new Frame(dataProcess(data, date));
            frame = Frame.combinColumns(frame, date, '数量', '日期', 'name');
            dispatch({
                type: AT_NEW_STATS_GET_TIME,
                payload: frame
            })
        }).catch(err => {
            message.error(err.message);
            dispatch(updateTimeLoading(false));
        });
    };
}
export function updateClassify(value){
    return dispatch => {
        dispatch({
            type: UPDATE_NEW_CLASSIFY,
            payload: value
        })

        dispatch(requestDistanceData());
    };

}
export function updateTimeClassify(value){
    return dispatch => {
        dispatch({
            type: UPDATE_NEW_TIME_CLASSIFY,
            payload: value
        })

        dispatch(requestTimeData());
    };
}
export function getDistanceList(res,sex){
        let distance = ['0-2km', '2-4km', '4-8km', '8-10km', '10km以上'];
        let count1 = res.map((item, index) => {
            return sex == '' ? item.distanceRangeCount1 : (sex == 'male' ? item.distanceRangeMaleCount1 : item.distanceRangeFemaleCount1)
        })
        let count2 = res.map((item, index) => {
            return sex == '' ? item.distanceRangeCount2 : (sex == 'male' ? item.distanceRangeMaleCount2 : item.distanceRangeFemaleCount2)
        })
        let count3 = res.map((item, index) => {
            return sex == '' ? item.distanceRangeCount3 : (sex == 'male' ? item.distanceRangeMaleCount3 : item.distanceRangeFemaleCount3)
        })
        let count4 = res.map((item, index) => {
            return sex == '' ? item.distanceRangeCount4 : (sex == 'male' ? item.distanceRangeMaleCount4 : item.distanceRangeFemaleCount4)
        })
        let count5 = res.map((item, index) => {
            return sex == '' ? item.distanceRangeCount5 : (sex == 'male' ? item.distanceRangeMaleCount5 : item.distanceRangeFemaleCount5)
        })
    let value=distance.map((item,index)=>{
        return {
            name:item,
            data:index+1==1?count1:(index+1==2?count2:(index+1==3?count3:(index+1==4?count4:(index+1==5?count5:item))))
        }
    })
    console.log(value)
    return value;
}
export function getTimeList(res,sex){
    let distance = ['00:00-06:00', '06:00-12:00', '12:00-18:00', '18:00-24:00'];
    let count1 = res.map((item, index) => {
        return sex == '' ? item.timeRangeCount1 : (sex == 'male' ? item.timeRangeMaleCount1 : item.timeRangeFemaleCount1)
    })
    let count2 = res.map((item, index) => {
        return sex == '' ? item.timeRangeCount2 : (sex == 'male' ? item.timeRangeMaleCount2 : item.timeRangeFemaleCount2)
    })
    let count3 = res.map((item, index) => {
        return sex == '' ? item.timeRangeCount3 : (sex == 'male' ? item.timeRangeMaleCount3 : item.timeRangeFemaleCount3)
    })
    let count4 = res.map((item, index) => {
        return sex == '' ? item.timeRangeCount4 : (sex == 'male' ? item.timeRangeMaleCount4 : item.timeRangeFemaleCount4)
    })
    let value=distance.map((item,index)=>{
        return {
            name:item,
            data:index+1==1?count1:(index+1==2?count2:(index+1==3?count3:(index+1==4?count4:(index+1==5?count5:item))))
        }
    })
    return value;
}
export function dateDistanceSelect(dateStart,dateEnd,dateCount){
    console.log(dateStart,dateEnd,dateCount)
    return dispatch => {
        dispatch({
            type: UPDATE_NEW_DISTANCE_LIST,
            payload:{
                dateStart:dateStart,
                dateEnd:dateEnd,
                dateCount:dateCount,
            }
        })

        dispatch(requestDistanceData());
    };
}
export function dateTimeSelect(dateStart,dateEnd,dateCount){
    console.log(dateStart,dateEnd,dateCount)
    return dispatch => {
        dispatch({
            type: UPDATE_NEW_TIME_LIST,
            payload:{
                dateStart:dateStart,
                dateEnd:dateEnd,
                dateCount:dateCount,
            }
        })

        dispatch(requestTimeData());
    };
}
/*function dateTimeProcess(res,dateStart,dateEnd,dateCount){
    let date=[];
    let noDate=[];
    let haveDate=[];
    let totalDate=[];
    let exist=[];
    for(var i=0;i<dateCount;i++){
        date.push(getNewDay(dateStart,i))
    }
    //console.log(date);
    if(res.total==dateCount){
        return {
            result:res.data,
            date:date,
        }
    }else if(res.total<dateCount){
        if(res.data.length==0){
            for(var i=0;i<dateCount;i++){
                date.push(getNewDay(dateStart,i))
            }
            noDate=date;
            message.success('您选择的时间段内没有数据！');
        }else{
            console.log('total is'+res.total);
            for(var i=0;i<res.data.length;i++){
                totalDate.push(res.data[i].date);
            }
            for(var i=0;i<date.length;i++){
                if(totalDate.indexOf(date[i])==-1){
                    noDate.push(date[i]);
                }else{
                    haveDate.push(date[i])
                }
            }
        }
        for(var i=0;i<res.data.length;i++){
            for(var j=0;j<haveDate.length;j++){
                exist.push(res.data[i]);
            }
        }
        let result=noDate.map((item,index)=>{
            return {
                date:item,
                dateValue:new Date(Date.parse(item.replace(/-/g, "/"))).getTime(),
                timeRangeCount1:0,
                timeRangeCount2:0,
                timeRangeCount3:0,
                timeRangeCount4:0,
                timeRangeCount5:0,
                timeRangeFemaleCount1: 0,
                timeRangeFemaleCount2: 0,
                timeRangeFemaleCount3: 0,
                timeRangeFemaleCount4: 0,
                timeRangeFemaleCount5: 0,
                timeRangeFemaleRatio1: 0,
                timeRangeFemaleRatio2: 0,
                timeRangeFemaleRatio3: 0,
                timeRangeFemaleRatio4: 0,
                timeRangeFemaleRatio5: 0,
                timeRangeMaleCount1: 0,
                timeRangeMaleCount2: 0,
                timeRangeMaleCount3: 0,
                timeRangeMaleCount4: 0,
                timeRangeMaleCount5: 0,
                timeRangeMaleRatio1: 0,
                timeRangeMaleRatio2: 0,
                timeRangeMaleRatio3: 0,
                timeRangeMaleRatio4: 0,
                timeRangeMaleRatio5: 0,
                timeRangeRatio1: 0,
                timeRangeRatio2: 0,
                timeRangeRatio3: 0,
                timeRangeRatio4: 0,
                timeRangeRatio5: 0,
                sum: 0,
            }
        })
        result=exist.concat(result);
        result=result.sort(function (a, b) {
            return parseInt(a.date.replace(/-/g, ''), 10) - parseInt(b.date.replace(/-/g, ''), 10);//升序
            //return parseInt(b.date.replace(/-/g, ''), 10) - parseInt(a.date.replace(/-/g, ''), 10);//降序
        });
        //console.log(result);
        return {
            result:result,
            date:date,
        };
    }
}*/
function dateProcess(res,dateStart,dateEnd,dateCount,bol){
    let date=[];
    let noDate=[];
    let haveDate=[];
    let totalDate=[];
    let exist=[];
    for(var i=0;i<dateCount;i++){
        date.push(getNewDay(dateStart,i))
    }
    //console.log(date);
    if(res.total==dateCount){
        return {
            result:res.data,
            date:date,
        }
    }else if(res.total<dateCount){
        if(res.data.length==0){
            for(var i=0;i<dateCount;i++){
                date.push(getNewDay(dateStart,i))
            }
            noDate=date;
            message.success('您选择的时间段内没有数据！');
        }else{
            console.log('total is'+res.total);
            for(var i=0;i<res.data.length;i++){
                totalDate.push(res.data[i].date);
            }
            for(var i=0;i<date.length;i++){
                if(totalDate.indexOf(date[i])==-1){
                    noDate.push(date[i]);
                }else{
                    haveDate.push(date[i])
                }
            }
        }
        for(var i=0;i<res.data.length;i++){
            for(var j=0;j<haveDate.length;j++){
                exist.push(res.data[i]);
            }
        }
        let result=bol?noDate.map((item,index)=>{
            return {
                date:item,
                dateValue:new Date(Date.parse(item.replace(/-/g, "/"))).getTime(),
                distanceRangeCount1:0,
                distanceRangeCount2:0,
                distanceRangeCount3:0,
                distanceRangeCount4:0,
                distanceRangeCount5:0,
                distanceRangeFemaleCount1: 0,
                distanceRangeFemaleCount2: 0,
                distanceRangeFemaleCount3: 0,
                distanceRangeFemaleCount4: 0,
                distanceRangeFemaleCount5: 0,
                distanceRangeFemaleRatio1: 0,
                distanceRangeFemaleRatio2: 0,
                distanceRangeFemaleRatio3: 0,
                distanceRangeFemaleRatio4: 0,
                distanceRangeFemaleRatio5: 0,
                distanceRangeMaleCount1: 0,
                distanceRangeMaleCount2: 0,
                distanceRangeMaleCount3: 0,
                distanceRangeMaleCount4: 0,
                distanceRangeMaleCount5: 0,
                distanceRangeMaleRatio1: 0,
                distanceRangeMaleRatio2: 0,
                distanceRangeMaleRatio3: 0,
                distanceRangeMaleRatio4: 0,
                distanceRangeMaleRatio5: 0,
                distanceRangeRatio1: 0,
                distanceRangeRatio2: 0,
                distanceRangeRatio3: 0,
                distanceRangeRatio4: 0,
                distanceRangeRatio5: 0,
                sum: 0,
            }
        }):noDate.map((item,index)=>{
            return {
                date:item,
                dateValue:new Date(Date.parse(item.replace(/-/g, "/"))).getTime(),
                timeRangeCount1:0,
                timeRangeCount2:0,
                timeRangeCount3:0,
                timeRangeCount4:0,
                timeRangeCount5:0,
                timeRangeFemaleCount1: 0,
                timeRangeFemaleCount2: 0,
                timeRangeFemaleCount3: 0,
                timeRangeFemaleCount4: 0,
                timeRangeFemaleCount5: 0,
                timeRangeFemaleRatio1: 0,
                timeRangeFemaleRatio2: 0,
                timeRangeFemaleRatio3: 0,
                timeRangeFemaleRatio4: 0,
                timeRangeFemaleRatio5: 0,
                timeRangeMaleCount1: 0,
                timeRangeMaleCount2: 0,
                timeRangeMaleCount3: 0,
                timeRangeMaleCount4: 0,
                timeRangeMaleCount5: 0,
                timeRangeMaleRatio1: 0,
                timeRangeMaleRatio2: 0,
                timeRangeMaleRatio3: 0,
                timeRangeMaleRatio4: 0,
                timeRangeMaleRatio5: 0,
                timeRangeRatio1: 0,
                timeRangeRatio2: 0,
                timeRangeRatio3: 0,
                timeRangeRatio4: 0,
                timeRangeRatio5: 0,
                sum: 0,
            }
        })
        result=exist.concat(result);
        result=result.sort(function (a, b) {
            return parseInt(a.date.replace(/-/g, ''), 10) - parseInt(b.date.replace(/-/g, ''), 10);//升序
            //return parseInt(b.date.replace(/-/g, ''), 10) - parseInt(a.date.replace(/-/g, ''), 10);//降序
        });
        //console.log(result);
        return {
            result:result,
            date:date,
        };
    }
 }
function updateLoading(loading) {
    return {
        type: UPDATE_LOADING,
        payload: loading
    }
}
function updateTimeLoading(loading) {
    return {
        type: UPDATE_TIME_LOADING,
        payload: loading
    }
}
//日期加上天数得到新的日期
//dateTemp 需要参加计算的日期，days要添加的天数，返回新的日期，日期格式：YYYY-MM-DD
function getNewDay(dateTemp, days) {
    var dateTemp = dateTemp.split("-");
    var nDate = new Date(dateTemp[1] + '-' + dateTemp[2] + '-' + dateTemp[0]); //转换为MM-DD-YYYY格式
    var millSeconds = Math.abs(nDate) + (days * 24 * 60 * 60 * 1000);
    var rDate = new Date(millSeconds);
    var year = rDate.getFullYear();
    var month = rDate.getMonth() + 1;
    if (month < 10) month = "0" + month;
    var date = rDate.getDate();
    if (date < 10) date = "0" + date;
    return (year + "-" + month + "-" + date);
}
//时间戳转换成yy-mm-dd
function   formatDate(now)   {
    var   year=now.getFullYear();
    var   month=now.getMonth()+1;
    var   date=now.getDate();
    if(date<10){
        date='0'+date;
    }
    return   year+"-"+month+"-"+date+"   "
}
function dataProcess(data,date){
    let newData=[];
    for(var i=0; i < data.length; i++) {
        var item = data[i];
        var datas = item.data;
        var months =date;
        for(var j=0; j < datas.length; j++) {
            item[months[j]] = datas[j];
        }
        newData.push(item);
    }
    return newData;
}
