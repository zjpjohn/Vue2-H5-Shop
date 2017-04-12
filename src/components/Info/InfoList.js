import React from "react";
import {connect} from "react-redux";

import { 
  Form, Row, Col, Input,
  Button, Icon, Select, Modal,
  DatePicker, Table, Badge,
} from 'antd';
import "../../less/tableBug.less";
import {
  action_info_list,
  action_info_onSelect,
  action_info_updateparams,
  action_info_search,
  action_info_export

} from "../../actions/infoAction/infoListAction";
import { renderDatetime,renderDateTime } from "../../utils/RenderUtil";
import moment from "moment";
const { MonthPicker, RangePicker } = DatePicker;
const FormItem = Form.Item;
const Option = Select.Option;

function modalSuccess(index,content) {
  Modal.success({
    title: `序号 ${index+1} 的完整信息为：`,
    content: content,
  });
}

class InfoList extends React.Component {
  /**
   * 分页、排序、筛选变化时触发
   * @param pagination
   * @param filters
   * @param sorter
   */
  handleTableChange(pagination, filters, sorter) {
      // console.log("pagination",pagination);
      // console.log("filters",filters);
      // console.log("sorter",sorter);
      
      this.props.updateparams(pagination, filters, sorter);
  }
  /**
   * 查询触发action
   */
  searchForm(e){
    const {getFieldsValue,} = this.props.form;
    const {onSearch,} = this.props;
    let value = getFieldsValue();
    value.pageSize=window.localStorage.pageSize;
    if(value.CreateTime && value.CreateTime.length > 0){
      value.createdAtStart = moment(value.CreateTime[0]).format("YYYY-MM-DD");
      value.createdAtEnd = moment(value.CreateTime[1]).format("YYYY-MM-DD");
      //  value.createdAtStart = value.CreateTime[0];
      //  value.createdAtEnd = value.CreateTime[1];
    }
    console.log("searchForm 里的 取值为：",value);
    onSearch(value);
  } 
   //table的列数据
   getColumns() {
        const {sorter} = this.props.listData;

        return [{
            title: '序号',
            render: (value, record, index) => this.getRowSort(index),
            //width: '40px'
        },{
            title: '手机号',
            dataIndex: 'toUserPhone',
            //width: '100px'
        },{
            title: '信息',
            dataIndex: 'message',
            render:(value,records,index) => value.length > 6 ? value.substr(0,6)+"..." : value,
        }, {
            title: '完整信息',
            //dataIndex: "查看",
            render:(value,records,index) => 
              <Button type="primary" onClick={() => {
                modalSuccess(index,records.message)
              }}>查看</Button>,            
        },{
            title: '消息时间',
            dataIndex: 'createdAt',
            key:"created_at",
            type:"date",
            render: value => renderDateTime(value),
            sorter: true,
            //sortField: 'created_at', //sorter.sortField
            sortField:'created_at',
            sortOrder:(sorter.sortField === 'created_at' ? sorter.sortOrder : null),
        }];
    }
  /**
   * 获取行序号
   * @param rowIndex
   * @return {*}
   */
  getRowSort(index) {
    let sort = index + 1;
    const {essaylistData} = this.props;

    if (essaylistData != null) {
        const pager = essaylistData.pager;
        sort += pager.pageSize * (pager.current - 1);
    }

    return sort;
  }  
  //整个表单submit的函数
  handleSubmit(){
    //console.log("submit");
  }
  //selecte组件的函数
  handleChange(e) {
    console.log(e);
    console.log(`selected ${e}`);
  }

  //日期控件
  dateOnChange(date, dateString){
    console.log(date, dateString);
  }
  componentDidMount(){
    console.log("进入 信息 infolist 组件",this.props);
    //this.props.dispatch(action_UserList_initData());
    this.props.getList();
  }
  render(){
    //console.log(this.props);
    const { getFieldDecorator,resetFields, } = this.props.form;
    const {listData,onSelect} = this.props;
    const formItemLayout = {
      style:{width:"30%"}
    };
    //{...formLayout}
    
    return(
      <Form  onSubmit={this.handleSubmit.bind(this)} style={{padding:"0 15px 0 15px"}} >
      <Row type="flex" justify="space-between">
        <FormItem label="手机号" {...formItemLayout} >
          {getFieldDecorator('toUserPhone', {
            rules: [{ required: false, message: 'Required!' }],
          })(
            <Input /*addonBefore={<Icon type="user" />}*/ placeholder="手机号" />
          )}
        </FormItem>

        <FormItem label="日期" {...formItemLayout} >
          {getFieldDecorator('CreateTime', {
            rules: [{ required: false, message: 'Required!' }],
          })(
            <RangePicker onChange={this.onChange} />
          )}
        </FormItem>

        <FormItem  {...formItemLayout}>

        </FormItem>


        </Row>
        <div style={{display:"flex"}} >  
            <div style={{flexGrow:"1",display:"flex",justifyContent:"space-between"}}>
              <Button 
                type="primary" 
                icon="search"
                onClick={this.searchForm.bind(this)}
              > 
                查询 
              </Button>
              <Button 
                icon="delete"
                onClick={e => {
                  resetFields();
                }}
              > 清空查询条件 </Button>
            </div>
            <div style={{flexGrow:"10"}}></div>
        </div>

        <Badge count={listData.onSelect.selectedRowKeys.length} ></Badge>
        <Table
            className="tableBug"
          columns={this.getColumns()}
          dataSource={listData.data}        
          loading={listData.loading}
          pagination={{
            total:listData.total,
            showSizeChanger:true,             
            pageSizeOptions:["10","20","50","100"],
            onShowSizeChange:(current, pageSize)=>{window.localStorage.pageSize=pageSize},
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
InfoList = Form.create()(InfoList);

const mapStateToProps = state => {
  return {
    listData:state.info.infolist
  }
}

const mapDispatchToProps = dispatch => {
  return {
    //pubUser:(...args) => dispatch(action_content_pubUser(...args)),
    //
    getList:(...args) => dispatch(action_info_list(...args)),
    onSelect:(...args) => dispatch(action_info_onSelect(...args)),
    updateparams:(...args) => dispatch(action_info_updateparams(...args)),
    onSearch:(...args) => dispatch(action_info_search(...args)),




  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InfoList);

