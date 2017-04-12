
const defaultState = {
    data: [],
    total: 0,
    loading: false,
    pager: {
        current: 1,
        pageSize: 10,
    },
    sorter:{
        sortField: "created_at",//'create_time', created_at createdA
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
export function reducer_activation(state=defaultState,action){
    switch (action.type){
        case "DATA_STATS_RESET_PARAMS":
            return defaultState;
        case "DATA_ACTIVATION_GETLIST":
            return Object.assign({},state,{
                data: action.payload.data,
                total: action.payload.total,
                pager: {
                    current: 1,
                    pageSize: 10,
                },
                loading:false
            }); 
        case "DATA_ACTIVATION_LOADING":       
            return Object.assign({},state,{
                loading:action.payload
            });
        case "DATA_ACTIVATION_UPDATEPARAMS":
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
        case "DATA_ACTIVATION_ONSELECT":
            return Object.assign({},state,{
                onSelect:{
                    selectedRowKeys:action.payload.index,
                    rows:action.payload.rows
                }
            });
        case "DATA_ACTIVATION_SEARCH":
            return Object.assign({},state,{
                search:{
                    createdAtStart:action.payload.createdAtStart,
                    createdAtEnd:action.payload.createdAtEnd,
                    androidVersion:action.payload.androidVersion,
                    appVersion:action.payload.appVersion,
                    channelId:action.payload.channelId,
                    deviceName:action.payload.deviceName,
                    id:action.payload.id
                },
                pager: {
                    pageSize: action.payload.pageSize
                }
            });
        case "DATA_ACTIVATION_CHANNEL":
            return Object.assign({},state,{
                channel:action.payload
            }); 
        case "DATA_ACTIVATION_ANDROIDVERSION":
            return Object.assign({},state,{
                androidVersion:action.payload
            });
        case "DATA_ACTIVATION_VERSION":
            console.log("版本号:",action.payload)
            return Object.assign({},state,{
                version:action.payload
            });
        default:
            return state;
    }
}
