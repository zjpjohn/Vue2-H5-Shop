import * as PiegraphAction from '../../actions/PiegraphAction';
const defaultState={
    data: [],
    forceFit: true,
    width: 500,
    height: 450,
    ageData:[],
    classify:'',
    loading:true,
}
export function PiegraphReducer(state=defaultState,action){
     switch (action.type){
         case PiegraphAction.AT_NEW_STATS_RESET_PARAMS:
             return defaultState;
         case PiegraphAction.AT_NEW_STATS_GET_GENDER:
             return Object.assign({},state,{
                 data:action.payload,
             })
         case PiegraphAction.AT_NEW_STATS_GET_AGE:
             return Object.assign({},state,{
                 ageData:action.payload,
                 loading:false,
             })
         case PiegraphAction.UPDATE_NEW_CLASSIFY:
             return Object.assign({},state,{
                 classify:action.payload
             })
         case PiegraphAction.UPDATE_LOADING:
             return Object.assign({},state,{
                 loading:action.payload
             })
         default:
             return state;
     }
}
