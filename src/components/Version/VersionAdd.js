import React from "react";
import {connect} from "react-redux";
import { 
  Form, Row, Col, message, Spin,
  Input, Button, Icon, Upload,
} from 'antd';

import { renderDateTime } from "../../utils/RenderUtil";
import "../../less/tableBug.less";
import moment from 'moment';

//import {isNumber,} from "../../utils/ValidUtil";
// import enUS from 'antd/lib/date-picker/locale/en_US';
const FormItem = Form.Item;
const Dragger = Upload.Dragger;

import {
  action_version_fileList,
  action_version_submit,


} from "../../actions/versionAction/versionAddAction";

class VersionAdd extends React.Component {
  //整个表单submit的函数
  handleToSubmit(){
    const {getFieldsValue,validateFields,resetFields} = this.props.form;
    validateFields((err,values) => {
      console.log("err",err);
      console.log("values",values);
      if(!err){
        this.props.onSubmit(values);
        resetFields();
        this.props.onUploadAPK([]);
      }
    })
  }
  //上传前的控制
  beforeUpload(file){

    //console.log("beforeUpload",file);

    const {onUploadAPK} = this.props;

    //const isJPG = file.type === 'image/jpeg' || "image/png" || "image/jpg";
    const isAPK = file.type === "apk" || "APK";
    //控制图片格式
    if (!isAPK) {
      message.error('You can only upload APK file!',3);
    }

    //控制大小
    // const isLt2M = file.size / 1024 / 1024 < 2;
    // if (!isLt2M) {
    //   message.error('Image must smaller than 2MB!',3);
    // }

    //这一步好屌，利用ES6的函数

    //file.url = URL.createObjectURL(file);

    //要给一个fileName

    file.fileName = file.name;

    //dispatch(action_EssayEdit_FileList_Before(file));
    //console.log(file);
    //console.log(file);

    
    if(file.fileName.toLocaleLowerCase().indexOf("apk") == -1){
      message.error("请传入apk文件");
      return;
    }


    onUploadAPK(file);

    this.forceUpdate();

    return false 

  }
  handleUploadChange(info){
    console.log("handleUploadChange函数 Info",info);
    //这步好屌 
    this.forceUpdate();

    this.props.onUploadAPK(info.fileList);
  }


  handlePreviewClick(id){
    console.log(id);
  }
  componentDidMount(){
    console.log("进入到 版本 VersionManager 组件",this.props);
    //this.props.getList();
  }
  render(){
    const {getFieldDecorator,resetFields} = this.props.form;
    const {listData,onUploadAPK} = this.props;
    // const formItemLayout = {
    //   style:{width:"30%"}
    // };
    const modalItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
      style:{
        width:"50%"
      }
    };
     const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return(
      <Spin spinning={listData.spinning} >
          <Form style={{display:"flex",justifyContent:"space-between",flexDirection:"column",alignItems:"center",paddingTop:"50px"}}>
            <div style={{marginBottom:"24px"}}>

              <Button 
                size="large"
                type="primary"
                style={{marginRight:"15px"}}
                onClick={this.handleToSubmit.bind(this)} 
              >添加新版本</Button>

              <Button 
                size="large"
                onClick={e => {
                  resetFields();
                  onUploadAPK([]);
                }}
              >清空</Button>

            </div>
            
            <FormItem 
              hasFeedback
              // validateStatus="success"
              label="版本代码"
              {...modalItemLayout}
            >
              {getFieldDecorator('versionCode', {
                rules: [{ required: true, message: 'Required！' }],
              })(
                  <Input size="large" />
              )}
            </FormItem>
            <FormItem 
              hasFeedback
              // validateStatus="success"
              label="版本号"
              {...modalItemLayout}
            >           
              {getFieldDecorator('versionName', {
                rules: [{ required: true, message: 'Required！' }],
                //initialValue: 0
              })(            
                <Input size="large" />
              )}
          </FormItem>
          <FormItem 
            hasFeedback
            // validateStatus="success"
            label="强制版本"
            {...modalItemLayout}
          >           
            {getFieldDecorator('forceVersion', {
              rules: [{ required: true, message: 'Required！' }],
              //initialValue: 0
            })(            
              <Input size="large" />
            )}
          </FormItem>
          <FormItem 
            hasFeedback
            // validateStatus="success"
            label="更新内容"
            {...modalItemLayout}
          >           
            {getFieldDecorator('updateDescription', {
              rules: [{ required: true, message: 'Required！' }],
              //initialValue: 0
            })(            
              <Input
                type="textarea"
                placeholder="输入内容"
                style={{width:"100%",height:"100px",resize:"none",fontSize:"15px"}}
              />
            )}
          </FormItem>         
          <FormItem 
            hasFeedback
            validateStatus = {listData.fileList.length > 0 ? "success" : "error"}
            label="安装包"
            {...modalItemLayout}
          >
            {getFieldDecorator('apk', {
              rules: [{ required: true, message: 'Required!' }],
            })(
            <div className="clearfix">         
              <Upload
                //name="file"
                //action="/action.do"//必选参数，上传的地址 qy-uriel-manage-indo
                fileList={listData.fileList}//已经上传的图片的列表
                //上传前触发 
                beforeUpload={
                  this.beforeUpload.bind(this)
                }
                
                onChange={
                  this.handleUploadChange.bind(this)
                }
              > 
                {/*当到达 XX 张照片的时候 隐藏上传空间 */}
                {listData.fileList.length >= 1 ? null : uploadButton}
              </Upload>
            </div>
            )}
          </FormItem>
          
        </Form>
        
      </Spin>)
  }
}



//把antd的Form绑定到redux中，仅限于这张页面
VersionAdd = Form.create()(VersionAdd);

const mapStateToProps = state => {
  return {
    listData:state.version.versionAdd
  }
}

const mapDispatchToProps = dispatch => {
  return {
    //gallerylist:(...args) => dispatch(action_content_gallery_list(...args)),
    // 
    onUploadAPK:(...args) => dispatch(action_version_fileList(...args)),
    onSubmit:(...args) => dispatch(action_version_submit(...args)),
    
    
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VersionAdd);

