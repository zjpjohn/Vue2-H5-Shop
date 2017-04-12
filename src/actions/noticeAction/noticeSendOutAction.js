import {getJson,postJson} from "../../utils/FetchUtil";
import {message} from "antd";

export function action_notice_sendout_list(content,sendTo){
    return dispatch => {
        console.log(content,sendTo);

        dispatch(action_notice_sendout_spinning(true));

        getJson("/notice/getNotice").then(res => {
            dispatch(action_notice_sendout_spinning(false));
            dispatch({
                type:"NOTICE_SENDOUT_GETNOTICE",
                payload:res
            });
        }).catch(err => {
            message.error(err.message);
            dispatch(action_notice_sendout_spinning(false));
        })
    }
}

export function action_notice_sendout_spinning(bol){
    return {
        type:"NOTICE_SENDOUT_SPINNING",
        payload:bol
    }
}

export function action_notice_sendout_send(number){
    return (dispatch,getState) => {
        // type:"NOTICE_SENDOUT_SEND",
        // payload:bol
        const id = getState().notice.sendout.id;

        //console.log(numble);
        if(number == undefined){
            number="" 
        }
        //console.log(number);
        dispatch(action_notice_sendout_spinning(true));
        postJson(`/notice/sendNotice?id=${id}&sendTo=${number}`).then(res =>{
            dispatch(action_notice_sendout_spinning(false));
            
        }).catch(err => {
            dispatch(action_notice_sendout_spinning(false));
        });
        postJson(`/notice?content=已保存的文本&sendTo=`).then(res => {
            dispatch(action_notice_sendout_spinning(false));
            dispatch({
                type:"NOTICE_SENDOUT_EMPTY"
            });
        })
    }
}

