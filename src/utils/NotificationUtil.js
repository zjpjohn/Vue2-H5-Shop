import {message,notification,icon} from 'antd';

/**
 * 弹出成功提示
 * @param message
 */
export function showSuccessMessage(message) {
    message.success(message);
}

/**
 * 弹出错误提示
 * @param message
 */
export function showErrorMessage(message, error = null) {
    if (error != null) {
        console.error(error);
    }

    message.error(message);
}

/**
 * 弹出警告提示
 * @param message
 */
export function showWarnMessage(message) {
    message.warning(message);
}

/**
 * 弹出加载错误提示
 * @param error
 */
export function showFetchError(error = null) {
    showErrorMessage("Fetch failed！", error);
}

export function showOperationError(error = null) {
    showErrorMessage("Operation failed！", error);
}

export function showOperationSuccess() {
    showSuccessMessage("Operation success!");
}

export function openNotification(total){
        notification.open({
            message: '数据信息',
            description: '加载到的数据有'+total+'条',
            icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />
        })
}