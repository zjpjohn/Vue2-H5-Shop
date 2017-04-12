

export function reducer_notice_history(state={
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
    }
},action){
    switch (action.type){
        case "NOTICE_HISTORY_GETLIST":
            return Object.assign({},state,{
                data: action.payload.data,
                total: action.payload.total,
                pager: {
                    current: 1,
                    pageSize: 10,
                },
                loading:false
            }); 
        case "NOTICE_HISTORY_LOADING":       
            return Object.assign({},state,{
                loading:action.payload
            });
        case "NOTICE_HISTORY_UPDATEPARAMS":
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
        case "NOTICE_HISTORY_ONSELECT":
            return Object.assign({},state,{
                onSelect:{
                    selectedRowKeys:action.payload.index,
                    rows:action.payload.rows
                }
            }) 
        default:
            return state;
    }
}
