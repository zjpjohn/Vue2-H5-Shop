import React from "react";
import {connect} from "react-redux";

import {
  action_notice_sendout_list,
  action_notice_sendout_send,

} from "../../actions/noticeAction/noticeSendOutAction";

import { 
  Form, Row, Col, Input,
  Button, Icon, Select, Spin,
  DatePicker, Table, Badge,
} from 'antd';

import { renderDateTime,renderStandardDate } from "../../utils/RenderUtil";
// import {Image} from "../common/Image";
const { MonthPicker, RangePicker } = DatePicker;
const FormItem = Form.Item;
const Option = Select.Option;

class SendOut extends React.Component {
  handleToSubmit(){
    const {getFieldsValue,resetFields} = this.props.form;
    /*let value =  getFieldsValue(["sendTo"]);*/
    let send=getFieldsValue(["sendTo"]).sendTo;
    let value=getFieldsValue(["nationalNumber"]).nationalNumber.replace(/\+/, "%2b");
    if(send==undefined){
        this.props.sendList(value);
    }else{
        this.props.sendList(value+send);
    }
    resetFields(["sendTo"]);
  }
  componentDidMount(){
    console.log("进入到 版本 sendout 组件",this.props);
    this.props.getList();
  }
  render(){
    //console.log(this.props);
    const { getFieldDecorator } = this.props.form;
    const { listData } = this.props;
    const formItemLayout = {
      style:{width:"30%"}
    };
    //{...formLayout}
    
    return(
      <Form  style={{padding:"0 15px 0 15px"}} >
      <Spin spinning={listData.spinning} >
      <Row type="flex" justify="space-between">
        <FormItem label="国家编号" style={{width:'5%'}}>
            {getFieldDecorator('nationalNumber', {
                initialValue:`${listData.sendTo==''?'':'+'+listData.sendTo}`,
                rules: [{ required: false, message: 'Required!' }],
            })(
                <Input

                />
            )}
        </FormItem>
        <FormItem label="定向发送(测试)" {...formItemLayout} >
          {getFieldDecorator('sendTo', {
            //initialValue:"0",
            rules: [{ required: false, message: 'Required!' }],
          })(
            <Input
              placeholder="输入手机号"
             />
          )}
        </FormItem>
        <FormItem {...formItemLayout} ></FormItem>
        <FormItem  {...formItemLayout}></FormItem>
        </Row>
          <div style={{display:"flex",marginBottom:"24px"}} >  
              <div style={{flexGrow:"1",display:"flex",justifyContent:"flex-start"}}>
                <Button 
                  type="primary" 
                  icon="save"
                  onClick={
                      listData.content=='已保存的文本'?'':this.handleToSubmit.bind(this)
                  }
                > 发送 </Button>
                
              </div>
              <div style={{flexGrow:"10"}}></div>
          </div>
        <FormItem >
          {getFieldDecorator('1111', {
            initialValue:`${listData.content}`,
            rules: [{ required: false, message: 'Required!' }],
          })(
            <Input
              type="textarea"
              placeholder="已保存的文本"
              disabled={true}
              style={{width:"100%",height:"400px",resize:"none",fontSize:"24px"}}
            />
          )}
        </FormItem>
        </Spin>          
    </Form>)
  }
}
SendOut = Form.create()(SendOut);

const mapStateToProps = state => {
  return{
    listData:state.notice.sendout
  }
}

const mapDispatchToProps = dispatch => {
  return {
    //pubUser:(...args) => dispatch(action_content_pubUser(...args)),
    getList:(...args) => dispatch(action_notice_sendout_list(...args)),
    //onSearch:(...args) => dispatch(action_info_search(...args)),
    sendList:(...args) => dispatch(action_notice_sendout_send(...args)),


  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SendOut);
