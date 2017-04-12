

export function reducer_versionManager(state={
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
        previewVisible:false,
        previewImage:''
    }
},action){
    switch (action.type){
        case "VERSION_VERSIONMANAGER_GETLIST":
            return Object.assign({},state,{
                data: action.payload.data,
                total: action.payload.total,
                pager: {
                    current: 1,
                    pageSize: 10,
                },
                onSelect:{
                    selectedRowKeys:[],
                    rows:{}
                },
                loading:false
            }); 
        case "VERSION_VERSIONMANAGER_LOADING":       
            return Object.assign({},state,{
                loading:action.payload
            });
        case "VERSION_VERSIONMANAGER_UPDATEPARAMS":
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
        case "VERSION_VERSIONMANAGER_ONSELECT":
            return Object.assign({},state,{
                onSelect:{
                    selectedRowKeys:action.payload.index,
                    rows:action.payload.rows
                }
            });
        case "VERSION_VERSIONMANAGER_SEARCH":
            return Object.assign({},state,{
                search:{
                    createdAtStart:action.payload.createdAtStart,
                    createdAtEnd:action.payload.createdAtEnd,
                    versionCode:action.payload.versionCode,
                    versionName:action.payload.versionName,

                }
            });
        default:
            return state;
    }
}
