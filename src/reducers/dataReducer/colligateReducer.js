const defaultState = {
 data: [],
 total: 0,
 loading: false,
 pager: {
 current: 1,
 pageSize: 10,
 },
 sorter:{
 sortField: "stats_date",//'create_time', created_at createdAt
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
export function reducer_colligate(state=defaultState,action){
    switch (action.type){
       case "DATA_STATS_RESET_PARAMS":
            return defaultState;
        case "DATA_COLLIGATE_GETLIST":
            return Object.assign({},state,{
                data: action.payload.data,
                total: action.payload.total,
                // pager: {
                //     current: 1,
                //     pageSize: 10,
                // },
                loading:false
            }); 
        case "DATA_COLLIGATE_LOADING":       
            return Object.assign({},state,{
                loading:action.payload
            });
        case "DATA_COLLIGATE_UPDATEPARAMS":
            //console.log("reducer 的 排序、选页、过滤 的 payload",action.payload);
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
        case "DATA_COLLIGATE_ONSELECT":
            return Object.assign({},state,{
                onSelect:{
                    selectedRowKeys:action.payload.index,
                    rows:action.payload.rows
                }
            });
        case "DATA_COLLIGATE_SEARCH":
            return Object.assign({},state,{
                search:{
                    createdAtStart:action.payload.createdAtStart,
                    createdAtEnd:action.payload.createdAtEnd
                },
                pager: {
                    pageSize: action.payload.pageSize
                }
            }); 
        default:
            return state;
    }
}
