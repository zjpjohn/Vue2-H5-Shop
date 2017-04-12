import {getJson,postJson,postForm} from "../../utils/FetchUtil";
import {message} from "antd";

export function action_notice_edit_save(content,sendTo){
    return dispatch => {
        console.log(content,sendTo);

        dispatch(action_notice_edit_spinning(true));

        postJson(`/notice?content=${content}&sendTo=${sendTo}`).then(res => {
            dispatch(action_notice_edit_spinning(false));
        }).catch(err => {
            message.error(err.message);
            dispatch(action_notice_edit_spinning(false));
        })
    }
}

export function action_notice_edit_spinning(bol){
    return {
        type:"NOTICE_EDIT_SPINNING",
        payload:bol
    }
}