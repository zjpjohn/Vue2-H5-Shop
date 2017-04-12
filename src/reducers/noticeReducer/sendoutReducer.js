

export function reducer_sendout(state={
    spinning:false,
    content:"",
    createdAt:"",
    id:"",
    sendTo:"",
},action){
    switch (action.type){
        case "NOTICE_SENDOUT_SPINNING": 
            return Object.assign({},state,{
                spinning:action.payload
            });
        case "NOTICE_SENDOUT_GETNOTICE": 
        console.log(action.payload);
            return Object.assign({},state,{
                content:action.payload.content,
                id:action.payload.id,
                createdAt:action.payload.createdAt,
                sendTo:action.payload.sendTo
            });
        case "NOTICE_SENDOUT_EMPTY":
            return Object.assign({},state,{
                content:'已保存的文本'
            });
        default:
            return state;
    }
}
