import React from "react";
import {bindActionCreators} from "redux";
import {connect, } from "react-redux";

import {
    action_login_modal_visible,
    action_login_timestamp,
    action_login_requestLogin,

} from "../actions/loginAction";
import { 
    Modal,Form, Row, Col,
    Input, Spin, 

 } from "antd";
const FormItem = Form.Item;
 
import {applyBasePath} from '../utils/FetchUtil';
const captchaImgUrl = applyBasePath('sysUser/login/captcha');

class Login extends React.Component{
    componentDidMount(){
        console.log("调用登录界面了",this.props);
        //this.props.form.validateFields();
    }
    render(){
        
        const {login,visible,updatetimestamp,requestlogin} = this.props;
        const {getFieldDecorator,validateFields} = this.props.form;

        const captchaImgUrlWithTimestamp = captchaImgUrl + '?timestamp=' + login.timestamp;
       
        return (
         
            <Modal 
                title="Login"
                closable={false}
                maskClosable={false}
                visible={ login.modal_visible } 
                confirmLoading={ login.confirmloading }   
                onOk={e => {
                    //visible(true)
                    validateFields((err,value) => {
                        console.log(err,value)
                        if(!err){
                            requestlogin(
                                value.username,
                                value.password,
                                value.captcha
                            )
                        } 
                    })
                }} 
                onCancel={e => {
                    visible(false)
                }}
            >
            <Spin spinning={login.confirmloading}>
                <Form>
                    <FormItem 
                        hasFeedback
                        label="Username"
                        validateStatus={ login.validateStatus_user_pas }
                    >           
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Required' }],
                        })(            
                            <Input
                                placeholder="Username" 
                            />
                        )}
                    </FormItem>
                    <FormItem 
                        hasFeedback
                        label="Password"
                        validateStatus={ login.validateStatus_user_pas }
                    >           
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Required' }],
                        })(            
                            <Input 
                                placeholder="Password" 
                                type="password"
                            />
                        )}
                    </FormItem>
                    <FormItem 
                        hasFeedback
                        label="Captcha"
                        validateStatus={ login.validateStatus_cap }
                    >           
                        {getFieldDecorator('captcha', {
                            rules: [{ required: true, message: 'Required' }],
                            //initialValue: 100
                        })(            
                            
                                <Input  
                                    placeholder="Captcha" 
                                />
                        )}
                    </FormItem>
                    <img src={captchaImgUrlWithTimestamp} onClick={e => updatetimestamp(Date.now())} />                    
                </Form>
            </Spin>
            </Modal>
        
        )
    }
}

//把antd的Form绑定到redux中，仅限于这张页面
Login = Form.create()(Login);

const mapStateToProps = state => {
    return {
        login : state.login
    }
}

// Modal_Visible_Export:(...args) => dispatch(action_EssayList_initData(...args)),
const mapDispatchToProps = dispatch =>{
    return {
        visible:(...args) => dispatch(action_login_modal_visible(...args)),
        updatetimestamp:(...args) => dispatch(action_login_timestamp(...args)),
        requestlogin:(...args) => dispatch(action_login_requestLogin(...args)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)