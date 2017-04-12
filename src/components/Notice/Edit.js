import React from "react";
import {connect} from "react-redux";


import { 
  Form, Row, Col, Input,
  Button, Icon, Select, Spin,
  DatePicker, Table, Badge,
} from 'antd';
import {
  action_notice_edit_save,

} from "../../actions/noticeAction/noticeEditAction";
const { MonthPicker, RangePicker } = DatePicker;
const FormItem = Form.Item;
const Option = Select.Option;

class Edit extends React.Component {
  handleToSubmit(){
    const { saveContent } = this.props;
    const {validateFields,getFieldsValue,resetFields} = this.props.form;
    validateFields((err,values) => {
      console.log(values);
      if(!err){
        saveContent(values.content,values.sendTo);
        resetFields();
      }
    })
  }
  componentDidMount(){
    console.log("进入到 通知 Edit 组件",this.props);
    //this.props.dispatch(action_UserList_initData());
  }
  render(){
    //console.log(this.props);
    const { getFieldDecorator,resetFields } = this.props.form;
    const {listData} = this.props;
    const formItemLayout = {
      style:{width:"30%"}
    };
    
    return(
      <Form  style={{padding:"0 15px 0 15px"}} >
      <Spin spinning={listData.spinning} tip='保存中...' >
      <Row type="flex" justify="space-between">
        <FormItem label="选择国家" {...formItemLayout} >
          {getFieldDecorator('sendTo', {
            initialValue:"",
            rules: [{ required: false, message: 'Please input your username!' }],
          })(
            <Select 
              placeholder="国家" 
            >
              <Option value="">全部</Option>
              <Option value="1">美国</Option>
              <Option value="86">中国</Option>
              <Option value="62">印度尼西亚</Option>
              <Option value="966">沙特阿拉伯</Option>
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} ></FormItem>
        <FormItem  {...formItemLayout}></FormItem>
        </Row>
          <div style={{display:"flex",marginBottom:"24px"}} >  
              <div style={{flexGrow:"1",display:"flex",justifyContent:"space-between"}}>
                <Button 
                  type="primary" 
                  icon="save"
                  onClick={
                    this.handleToSubmit.bind(this)
                  }
                > 保存编辑内容 </Button>
                <Button 
                  icon="delete"
                  onClick={e =>{
                    resetFields();
                  }}
                > 清空编辑内容 </Button>
              </div>
              <div style={{flexGrow:"10"}}></div>
          </div>
        <FormItem
          hasFeedback
        >
          {getFieldDecorator('content', {
            rules: [{ required: true, message: 'Required!' }],
          })(
            <Input
              type="textarea"
              placeholder="输入编辑内容"
              style={{width:"100%",height:"400px",resize:"none",fontSize:"24px"}}
            />
          )}
        </FormItem> 
        </Spin>         
    </Form>)
  }
}
Edit = Form.create()(Edit);

const mapStateToProps = state => {
  return{
    listData:state.notice.edit
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveContent:(...args) => dispatch(action_notice_edit_save(...args)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Edit);
