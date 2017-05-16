import * as BargraphAction from '../../actions/BargraphAction';

const defaultState = {
    data: [],
    forceFit: true,
    width: 500,
    height: 350,
    plotCfg: {
        margin: [20,100,60,30]
    },
    classify:'',
    timeClassify:'',
    timeData:[],
    loading:true,
    loadingTime:true,
    search:{
        dateEnd:getBeforeDate(1),
        dateStart:getBeforeDate(7),
        dateCount:DateDiff(getBeforeDate(1),getBeforeDate(7)),
    },
    filter:{
        dateEnd:getBeforeDate(1),
        dateStart:getBeforeDate(7),
        dateCount:DateDiff(getBeforeDate(1),getBeforeDate(7)),
    }
}
export function BargraphReducer(state = defaultState, action) {
    switch(action.type) {
        case BargraphAction.AT_NEW_STATS_RESET_PARAMS:
            return defaultState;
        case BargraphAction.AT_NEW_STATS_GET_DISTANCE:
            return Object.assign({}, state, {
                data:action.payload,
                loading:false
            });
        case BargraphAction.AT_NEW_STATS_GET_TIME:
            return Object.assign({}, state, {
                timeData:action.payload,
                loadingTime:false
            });
        case BargraphAction.UPDATE_NEW_CLASSIFY:
            return Object.assign({}, state, {
                classify:action.payload
            });
        case BargraphAction.UPDATE_NEW_TIME_CLASSIFY:
            return Object.assign({}, state, {
                timeClassify:action.payload
            });
        case BargraphAction.UPDATE_LOADING:
            return Object.assign({}, state, {
                loading:action.payload
            });
        case BargraphAction.UPDATE_TIME_LOADING:
            return Object.assign({}, state, {
                loadingTime:action.payload
            });
        case BargraphAction.UPDATE_NEW_DISTANCE_LIST:
            return Object.assign({}, state, {
                search:{
                    dateStart:action.payload.dateStart,
                    dateEnd:action.payload.dateEnd,
                    dateCount:action.payload.dateCount,
                }
            });
        case BargraphAction.UPDATE_NEW_TIME_LIST:
            return Object.assign({}, state, {
                filter:{
                    dateStart:action.payload.dateStart,
                    dateEnd:action.payload.dateEnd,
                    dateCount:action.payload.dateCount,
                }
            });
        default:
            return state;
    }
}
function DateDiff(sDate1,sDate2){
    var  aDate,oDate1,oDate2,iDays;
    aDate  =  sDate1.split("-")
    oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0]) //转换为12-18-2006格式
    aDate  =  sDate2.split("-")
    oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])
    iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24) //把相差的毫秒数转换为天数
    return  iDays+1
}
function getBeforeDate(n){
    var n = n;
    var d = new Date();
    var year = d.getFullYear();
    var mon=d.getMonth()+1;
    var day=d.getDate();
    if(day <= n){
        if(mon>1) {
            mon=mon-1;
        }
        else {
            year = year-1;
            mon = 12;
        }
    }
    d.setDate(d.getDate()-n);
    year = d.getFullYear();
    mon=d.getMonth()+1;
    day=d.getDate();
    var s = year+"-"+(mon<10?('0'+mon):mon)+"-"+(day<10?('0'+day):day);
    return s;
}
