import {getJson,postJson,postForm} from "../../utils/FetchUtil";
import {message} from "antd";

export function action_version_add_spinning(bol){
    return {
        type:"VERSION_ADD_SPINNING",
        payload:bol
    }
}

export function action_version_fileList(fileList){
    return {
        type:"VERSION_FILELIST",
        payload:fileList,
    }
}

export function action_version_submit(values){
    return (dispatch,getState) => {
        // type:"VERSION_FILELIST",
        // payload:fileList,
        dispatch(action_version_add_spinning(true));
        values.apk = getState().version.versionAdd.fileList[0];
        //return
        
        postForm("/appVersions",values).then(res => {
            dispatch(action_version_add_spinning(false));
        }).catch(err => {
            dispatch(action_version_add_spinning(false));
            message.error(err.message);
        });


    }
}
