

export function reducer_edit(state={
    spinning:false,
},action){
    switch (action.type){
        case "NOTICE_EDIT_SPINNING": 
            return Object.assign({},state,{
                spinning:action.payload
            });   
        default:
            return state;
    }
}
