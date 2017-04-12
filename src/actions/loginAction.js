import { getJson,postJson,postForLogin } from "../utils/FetchUtil";
import { notification,message } from "antd";

const openNotificationWithIcon = (type,mes) => {
  notification[type]({
    message: mes,
    //description: '',
  });
};
/**
 * login 页面的 modal 的 visible
 */
export function action_login_modal_visible(bol){
    return dispatch => {
        dispatch({
            type:"LOGIN_MODAL_VISIBLE",
            payload:bol
        })
        if(bol){
            dispatch(action_login_timestamp(Date.now()));
        }
    }

}

/**
 * login 页面的 modal 的 确认按钮/输入框 的 loading
 */
export function action_login_modal_confirmloading(bol){
    return dispatch => {
        dispatch({
            type:"LOGIN_MODAL_CONFIRMLOADING",
            payload:bol
        })
        if(bol){
            dispatch(action_login_timestamp(Date.now()));
        }
    }
}

/**
 * login 页面的 输入框 用户和密码 校验状态
 */
export function action_login_modal_validateStatus_us_pas(status){
    return {
        type:"LOGIN_MODAL_VALIDATESTATUS_US_PAS",
        payload:status
    }
}

/**
 * login 页面的 输入框 cap 校验状态
 */
export function action_login_modal_validateStatus_cap(status){
    return {
        type:"LOGIN_MODAL_VALIDATESTATUS_CAP",
        payload:status
    }
}


export function action_login_timestamp(timestamp) {
    return {
        type: "LOGIN_TIMESTAMP",
        payload: timestamp
    }
}

// postForLogin('sysUser/login', username, password, captcha);
export function action_login_requestLogin(username, password, captcha) {
    return dispatch => {

        dispatch(action_login_modal_confirmloading(true));

        postForLogin('sysUser/login', username, password, captcha).then(res => {
            dispatch(action_login_modal_confirmloading(false));
            //dispatch(action_login_modal_validateStatus(null));
            window.location.reload();
        }).catch(err => {
                dispatch(action_login_timestamp(Date.now()));
                dispatch(action_login_modal_confirmloading(false));
                openNotificationWithIcon("error",err.message);  
                if(err.message.indexOf("Captcha") === 0){
                    //console.log("匹配到了Captcha");
                    dispatch(action_login_modal_validateStatus_cap("error"));
                }else{
                    //console.log("匹配到了us pas");
                    dispatch(action_login_modal_validateStatus_us_pas("error"));
                }  
            }
        );
    } 
}