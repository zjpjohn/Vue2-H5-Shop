import React from "react";
import {connect} from "react-redux";
import { Link } from "react-router"
import { 
  Form, Row, Col, message,
  Input, Button, Icon, notification,
  Select, DatePicker, Upload,
  Table, Tooltip, Popconfirm,
  Badge, Modal, InputNumber,

} from 'antd';

import { renderDateTime } from "../../utils/RenderUtil";
import "../../less/tableBug.less";
import moment from 'moment';

//import {isNumber,} from "../../utils/ValidUtil";
// import enUS from 'antd/lib/date-picker/locale/en_US';
const { MonthPicker, RangePicker } = DatePicker;
const FormItem = Form.Item;
const Option = Select.Option;
const Dragger = Upload.Dragger;

import {
  action_version_versionManager_list,
  action_version_versionManager_onSelect,
  action_version_versionManager_updateparams,
  action_version_versionManager_search,
  action_version_versionManager_addVersion,
  action_version_versionManager_delete,


} from "../../actions/versionAction/versionManagerAction";

class VersionManager extends React.Component {
  
  /**
   * 分页、排序、筛选变化时触发
   * @param pagination
   * @param filters
   * @param sorter
   */
  handleTableChange(pagination, filters, sorter) {
      //console.log("pagination",pagination);
      //console.log("filters",filters);
      //console.log("sorter",sorter);
      this.props.updateparams(pagination, filters, sorter);
  }
  /**
   * 查询触发action
   */
  searchForm(e){
    const {getFieldsValue,} = this.props.form;
    const {onSearch,} = this.props;
    let value = getFieldsValue();
    if(value.CreateTime && value.CreateTime.length > 0){
      value.createdAtStart = moment(value.CreateTime[0]).format("YYYY-MM-DD");//YYYY-MM-DD HH:mm:ss
      value.createdAtEnd = moment(value.CreateTime[1]).format("YYYY-MM-DD");
      //value.createdAtStart = value.CreateTime[0];
      //value.createdAtEnd = value.CreateTime[1];
    }
    console.log("searchForm 里的 取值为：",value);
    onSearch(value);
  }

  handlePreviewClick(id){
    console.log(id);
  }


  /**
   * 获取行序号
   * @param rowIndex
   * @return {*}
   */
  getRowSort(index) {
    let sort = index + 1;
    const {listData} = this.props;

    if (listData != null) {
        const pager = listData.pager;
        sort += pager.pageSize * (pager.current - 1);
    }

    return sort;
  }
  /**
   * 获取表结构
   */
  getColumns() {
        const {sorter} = this.props.listData;
        return [{
            title: '序号',
            render: (value, record, index) => this.getRowSort(index),
            //width: '40px'
        },{
            title: '版本代码',
            dataIndex: 'versionCode',
        }, {
            title: '版本号',
            dataIndex: 'versionName',
        },{
            title: '强制版本',
            dataIndex: 'forceVersion',
        },{
            title: '更新内容',
            dataIndex: 'updateDescription',
        },{
            title: '上传文件',
            dataIndex: 'fileName',
        },{
            title: '创建时间',
            dataIndex: 'createdAt',
            key:"created_at",
            sorter: true,
            render: value => renderDateTime(value),
            //sortField: 'created_at', //sorter.sortField
            sortField:'created_at',
            sortOrder:(sorter.sortField === 'created_at' ? sorter.sortOrder : null),
        }];
    }
  componentDidMount(){
    console.log("进入到 版本 VersionManager 组件",this.props);
    this.props.getList();
  }
  render(){
    const {getFieldDecorator} = this.props.form;
    const {listData,onSelect,onDelete,modalVisible} = this.props;
    const formItemLayout = {
      style:{width:"30%"}
    };

    return(
    <Form  style={{padding:"0 15px 0 15px"}} >
        <div style={{display:"flex",justifyContent:"space-between"}} >
          <FormItem label="版本代码" {...formItemLayout} >
            {getFieldDecorator('versionCode', {
              rules: [{ required: false, message: 'Required' }],
            })(
              <Input 
                placeholder="版本代码"
              />
            )}
          </FormItem>
          <FormItem label="版本号" {...formItemLayout} >
            {getFieldDecorator('versionName', {
              rules: [{ required: false, message: 'Required' }],
            })(
              <Input
                placeholder="版本号"
              />
            )}
          </FormItem>
          <FormItem label="日期" {...formItemLayout} >
            {getFieldDecorator('CreateTime', {
              rules: [{ required: false, message: 'Required' }],
            })(
              <RangePicker 
                //showTime
                format="YYYY-MM-DD"
                //format="YYYY-MM-DD HH:mm:ss"
              />
            )}
          </FormItem>          
        </div>
        <div style={{display:"flex"}} >  
          <div style={{flexGrow:"1",display:"flex",justifyContent:"space-between"}}>
          <Button 
            type="primary" 
            icon="search"
            onClick={this.searchForm.bind(this)}
          > 
            查询 
          </Button>

          <Popconfirm title="确定狠心删除吗?" 
            onConfirm={e => {
              //console.log("确定了")
              onDelete()
            }}
            okText="Yes" 
            cancelText="No"
          >
            <Button 
              type="danger" 
              icon="delete"
              disabled={listData.onSelect.selectedRowKeys.length > 0 ? false : true}
            > 删除 </Button>

          </Popconfirm>
          </div>
          <div style={{flexGrow:"10"}}></div>
        </div>
        <Badge count={listData.onSelect.selectedRowKeys.length} ></Badge>
        <Table className="tableBug"
          columns={this.getColumns()}
          dataSource={listData.data}        
          loading={listData.loading}
          pagination={{
            total:listData.total,
            showSizeChanger:true,             
            pageSizeOptions:["10","20","50","100"],
            showQuickJumper:true,
            showTotal:(total,range) => {
              return `Total: ${total} items`
            },
          }}

          onChange={this.handleTableChange.bind(this)}

          rowSelection={{
            selectedRowKeys:listData.onSelect.selectedRowKeys,
            onChange:(selectedRowKeys, selectedRows) => {
              onSelect(selectedRowKeys, selectedRows);
            }
          }}  
        />
    </Form>)
  }
}



//把antd的Form绑定到redux中，仅限于这张页面
VersionManager = Form.create()(VersionManager);

const mapStateToProps = state => {
  return {
    listData:state.version.versionManager
  }
}

const mapDispatchToProps = dispatch => {
  return {
    //gallerylist:(...args) => dispatch(action_content_gallery_list(...args)),
    //     
    getList:(...args) => dispatch(action_version_versionManager_list(...args)),
    onSelect:(...args) => dispatch(action_version_versionManager_onSelect(...args)),
    updateparams:(...args) => dispatch(action_version_versionManager_updateparams(...args)),
    onSearch:(...args) => dispatch(action_version_versionManager_search(...args)),
    modalVisible:(...args) => dispatch(action_version_versionManager_addVersion(...args)),
    onDelete:(...args) => dispatch(action_version_versionManager_delete(...args)),



  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VersionManager);

