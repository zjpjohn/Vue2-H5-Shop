const defaultState={
    data: [111],
    total: 0,
    loading: false,
    pager: {
        current: 1,
        pageSize: 10,
    },
    sorter:{
        sortField: "created_at",//'create_time', created_at createdAt
        sortOrder: "descend"//'descend' ascend
    },
    filters: {},
    search: {},
    onSelect: {
        selectedRowKeys:[],
        rows:{}
    },
    modal:{
        visible_modify:false,
        visible_export:false,
    }
}

export function reducer_UserFeedback(state=defaultState,action){
   switch (action.type){
       case "DATA_STATS_RESET_PARAMS":
           return defaultState;
       case "USERFEEDBACK_SEARCH":
           return Object.assign({},state,{
               search:{
                   createdAtStart:action.payload.createdAtStart,
                   createdAtEnd:action.payload.createdAtEnd,
                   toUserPhone:action.payload.toUserPhone,
                   userId:action.payload.userId
               },
               pager: {
                   pageSize: action.payload.pageSize
               }
           });
       case "USERFEEDBACK_GETLIST":
           return Object.assign({},state,{
               data: action.payload.data,
               total: action.payload.total,
               pager: {
                   current: 1,
                   pageSize: 10,
               },
               loading:false
           });
       case "UserFeedback_UPDATEPARAMS":
           return Object.assign({},state,{
               pager: {
                   current: action.payload.pagination.current,
                   pageSize: action.payload.pagination.pageSize
               },
               sorter:{
                   sortField: action.payload.sorter.columnKey,//'create_time', created_at createdAt
                   sortOrder: action.payload.sorter.order//'descend' ascend
               },
           });
       case "USERFEEDBACK_LOADING":
           return Object.assign({},state,{
               loading:action.payload
           });
       default:
           return state;
   }
}
