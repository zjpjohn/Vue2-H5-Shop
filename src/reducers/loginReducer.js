
//EssayList初始化数据的Reducer
export function reducer_login(state={
    modal_visible:false,
    timestamp:null,
    confirmloading:false,
    validateStatus_user_pas:null,
    validateStatus_cap:null,
},action){
    switch (action.type){
        case "LOGIN_MODAL_VISIBLE":
            return Object.assign({},state,{
                modal_visible:action.payload
            });
        case "LOGIN_TIMESTAMP":
            return Object.assign({},state,{
                timestamp: action.payload
            });
        case "LOGIN_MODAL_CONFIRMLOADING":
            return Object.assign({},state,{
                confirmloading:action.payload
            });
        case "LOGIN_MODAL_VALIDATESTATUS_US_PAS":
            return Object.assign({},state,{
                validateStatus_user_pas:action.payload
            });
        case "LOGIN_MODAL_VALIDATESTATUS_CAP":
            return Object.assign({},state,{
                validateStatus_cap:action.payload
            });   
        default:
            return state;
    }
}