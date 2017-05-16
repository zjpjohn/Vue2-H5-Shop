import React from 'react';
import {connect} from 'react-redux';

import {Dialog} from '@blueprintjs/core';
import BaseComponent from './base/BaseComponent';
import EditForm from'./form/EditForm';
import {InputHelper, EditText} from './form/FormItem';
import * as AppAction from '../actions/AppAction';
import * as RenderUtil from '../utils/RenderUtil';
import {applyBasePath} from '../utils/FetchUtil';

//验证码
const captchaImgUrl = applyBasePath('sysUser/login/captcha');

class Login extends BaseComponent {
    static mapStateToProps(state) {
        return {
            isOpen: state.login.showLogin,
            errorMessage: state.login.loginErrorMessage,
            isLogining: state.login.isLogining,
            timestamp: state.login.timestamp
        }
    }

    static getMapDispatchToProps(dispatch) {
        return {
            updateShowLogin: AppAction.updateShowLogin,
            updateLoginErrorMessage: AppAction.updateLoginErrorMessage,
            requestLogin: AppAction.requestLogin,
            updateTimestamp: AppAction.updateTimestamp
        }
    }

    constructor(props) {
        super(props);
        this.inputHelper = new InputHelper();
    }
    /*
    canOutsideClickClose
    */
    render() {
        const {isOpen, errorMessage, isLogining, timestamp, updateTimestamp} = this.props;
        const captchaImgUrlWithTimestamp = captchaImgUrl + '?timestamp=' + timestamp;

        return (
            <Dialog className="editDialog"
                canOutsideClickClose={false}
                isOpen={isOpen}
                onClose={() => this.handleClose()}
                title="Login">

                <EditForm onSubmit={() => this.handleSubmit()} submiting={isLogining} errorMessage={errorMessage}>
                    <EditText {...this.inputHelper.bind('username')} label="Username" />
                    <EditText type="password" {...this.inputHelper.bind('password')} label="Password" />
                    <div className="inputCaptchaGroup">
                        <EditText {...this.inputHelper.bind('captcha')} label="Captcha" />
                        <img src={captchaImgUrlWithTimestamp} onClick={e => updateTimestamp(Date.now())} />
                    </div>
                </EditForm>
            </Dialog>
        )
    }

    getRequiredProps() {
        return [
            { key: 'username', name: 'Username'},
            { key: 'password', name: 'Password'},
            { key: 'captcha', name: 'Captcha'}
        ]
    }

    handleSubmit() {
        const {requestLogin, updateShowLogin, updateLoginErrorMessage} = this.props;
        const loginValues = this.inputHelper.getValues();

        this.inputHelper.checkRequiredProps(this.getRequiredProps(), () => {
            requestLogin(loginValues.username, loginValues.password, loginValues.captcha);
        }, missedProps => {
            updateLoginErrorMessage(RenderUtil.renderMissedPropertyError(missedProps));
        });
    }

    handleClose() {
        const {updateShowLogin} = this.props;
        updateShowLogin(false);
    }

}

export default connect(
    Login.mapStateToProps,
    Login.wrapActionMap(Login.getMapDispatchToProps)
)(Login);

