const defaultState = {
    data: [],
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
    },
    channel:[],
    androidVersion:[],
    version:[],
}
export function reducer_userdata(state=defaultState,action){
    switch (action.type){
        case "DATA_STATS_RESET_PARAMS":
            return defaultState;
        case "DATA_USERDATA_GETLIST":
            return Object.assign({},state,{
                data: action.payload.data,
                total: action.payload.total,
                pager: {
                    current: 1,
                    pageSize: 10,
                },
                loading:false
            });
        case "DATA_USERDATA_LOADING":
            return Object.assign({},state,{
                loading:action.payload
            });
        case "DATA_USERDATA_SEARCH" :
            return Object.assign({},state,{
                search:{
                    createdAtStart:action.payload.createdAtStart,
                    createdAtEnd:action.payload.createdAtEnd,
                    cn:action.payload.cn,
                    phone:action.payload.phone,
                    userId:action.payload.userId
                },
                pager: {
                    pageSize: action.payload.pageSize
                }
            });
        case "DATA_USERDATA_UPDATEPARAMS":
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
        default:
            return state;
    }
}