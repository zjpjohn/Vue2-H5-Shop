

export function reducer_versionadd(state={
    fileList:[],
    spinning:false,
},action){
    switch (action.type){
        case "VERSION_ADD_SPINNING":
            return Object.assign({},state,{
                spinning:action.payload
            });
        case "VERSION_FILELIST":
            console.log(action.payload);
            let arr = [].concat(action.payload);
            return Object.assign({},state,{
                fileList:arr
            });
        default:
            return state;
    }
}

// {
//         uid: -1,
//         name: '111.apk',
//         //status: 'done',
//         //url: 'http://www.baidu.com/111.apk',
//       }