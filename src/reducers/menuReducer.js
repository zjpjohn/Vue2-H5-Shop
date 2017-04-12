

//URL导航的Reducer
export function reducer_address(state={
    head:"",
    side:"",
    pagePV:[
        {name: 'Content', uv: 4000, pv: -2400, amt: 2400},
        {name: 'User', uv: 3000, pv: 1398, amt: 2210},
        {name: 'Statistics', uv: 2000, pv: 9800, amt: 2290},
        {name: 'Feedback', uv: 2780, pv: 3908, amt: 2000},
        {name: 'Application', uv: 1890, pv: 4800, amt: 2181},
        {name: 'System', uv: 2390, pv: 3800, amt: 2500}
    ]
},action){
    switch (action.type){
        case "CHANGE_ADDRESS":
            //console.log(action.payload.split("/")[1]);
            return Object.assign({},state,{
                head:action.payload.split("/")[1],
                side:action.payload.split("/")[2]
            });
        default:
            return state;  
    }
}
