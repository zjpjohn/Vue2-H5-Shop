import React from "react";
import {connect} from "react-redux";
import { 
  Form, 
  Input, Button, Icon, 
  Select, DatePicker, 
  Table, Tooltip,
  Badge, 

} from 'antd';

import "../../less/tableBug.less";

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const Option = Select.Option;

import {
  action_data_register_list,
  action_data_register_onSelect,
  action_data_register_updateparams,
  action_data_register_search,
  action_data_register_channel,
  action_data_register_androidVersion,
  action_data_register_version,
  action_data_register_export,
    requestResetQueryParams

} from "../../actions/dataAction/registerAction";
import { renderDatetime, renderDateTime } from "../../utils/RenderUtil";


class Register extends React.Component{
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
      this.props.updateparams(pagination, filters, sorter)
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
      //value.createdAtStart = moment(value.CreateTime[0]).format("YYYY-MM-DD HH:mm:ss");
      //value.createdAtEnd = moment(value.CreateTime[1]).format("YYYY-MM-DD HH:mm:ss");
      value.createdAtStart = value.CreateTime[0];
      value.createdAtEnd = value.CreateTime[1];
    }
    //console.log("searchForm 里的 取值为：",value);
    onSearch(value);
  }

  /**
   * 获取导出标题栏
   * @param rowIndex
   * @return {*}
   */
  getExportTitles() {
    //this.getColumns()
    const titles = this.getColumns().filter(item => item.title != null && item.dataIndex != null).map(item => {
        return {
            title: item.title,
            index: item.dataIndex,
            filters: item.filters,
            type: item.type
        }
    });
    return titles;
  }


    /**
     * 导出数据
     */
    handleExport(page, pageSize) {
        const titles = this.getExportTitles();
        //const {requestExportList, onSearch} = this.props;
        const {requestExportList, } = this.props;
        //const {getFieldsValue,} = this.props.form;
        //this.searchForm();
        //const values = this.inputHelper.getValues();

        //onSearch(values);

        if (requestExportList != null) {
            requestExportList(titles);
        }
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
        key:'id',
        render: (value, record, index) => this.getRowSort(index),
        //width: '40px'
    },{
        title: '用户ID',
        key:'userId',
        dataIndex: 'userId',
    }, {
        title: '渠道',
        key:'channelId',
        dataIndex: 'channelId',
    },{
        title: '版本号',
        key:'appVersion',
        dataIndex: 'appVersion',
    },{
        title: '安卓版本号',
        key:'androidVersion',
        dataIndex: 'androidVersion',
    },{
        title: '设备名',
        key:'deviceName',
        dataIndex: 'deviceName',
    },{
        title: '国家代码',
        key:'cn',
        dataIndex: 'cn',
    },{
        title: '重复数',
        key:'repeatCount',
        dataIndex: 'repeatCount',
        sorter: true,
        sortField:"repeatCount",
        sortOrder:(sorter.sortField === 'repeatCount' ? sorter.sortOrder : null),
    },{
        title: '注册时间',
        dataIndex: 'createdAt',
        key:"created_at",
        type: 'datetime',
        render: (value,record,index) => renderDateTime(value),
        sorter: true,
        //sortField: 'created_at', //sorter.sortField
        sortField:'created_at',
        sortOrder:(sorter.sortField === 'created_at' ? sorter.sortOrder : null),
    }];
  }

  componentDidMount(){
    console.log("进入到 register 页面！",this.props);
    this.props.getList();
    this.props.getChannel();
    this.props.getAndroidVersion();
    this.props.getVersion();
    this.props.getQuery();
  }
  render(){
    const {listData,onSelect} = this.props;
    const {getFieldDecorator,resetFields, } = this.props.form;

    const formItemLayout = {
      style:{width:"30%"}
    };
    return (
      <Form  style={{padding:"0 15px 0 15px"}} >
        <div >
          <div style={{display:"flex", justifyContent:"space-between",}}>
            <FormItem label="用户ID" {...formItemLayout} >
              {getFieldDecorator('userId', {
                rules: [{ required: false, message: 'Required' }],
              })(
                <Input placeholder="用户ID"  />
              )}
            </FormItem>
            
            <FormItem label="设备名" {...formItemLayout} >
              {getFieldDecorator('deviceName', {
                rules: [{ required: false, message: 'Required' }],
              })(
                <Input placeholder="设备名 "  />
              )}
            </FormItem>
            <FormItem label="注册时间" {...formItemLayout} >
              {getFieldDecorator('CreateTime', {
                rules: [{ required: false, message: 'Required' }],
              })(
                <RangePicker 
                  //showTime
                  allowClear
                  //format="YYYY-MM-DD HH:mm:ss"
                  format="YYYY-MM-DD"
                />
              )}
            </FormItem>                       
          </div>
          <div style={{display:"flex", justifyContent:"space-between"}}>

            <FormItem label="渠道" {...formItemLayout} >
              {getFieldDecorator('channelId', {
                rules: [{ required: false, message: 'Required' }],
              })(
                <Select allowClear placeholder="渠道" >
                  {
                    listData.channel.map((item,index) => {
                     return <Option key={index} value={item}>{item}</Option>
                    })
                  }
                </Select>
              )}
            </FormItem>      
            <FormItem label="安卓版本号" {...formItemLayout} >
              {getFieldDecorator('androidVersion', {
                rules: [{ required: false, message: 'Required' }],
              })(
                <Select allowClear placeholder="安卓版本号" >
                  {
                    listData.androidVersion.map((item,index) => {
                      return <Option key={index} value={item}>{item}</Option>
                    })
                  }
                </Select>
              )}
            </FormItem>
            <FormItem label="版本号" {...formItemLayout} >
              {getFieldDecorator('appVersion', {
                rules: [{ required: false, message: 'Required' }],
              })(
                <Select allowClear placeholder="版本号" >
                  {
                    listData.version.map((item,index) => {
                      return <Option key={index} value={item}>{item}</Option>
                    })                    
                  }
                </Select>
              )}
            </FormItem>

          </div>
        </div>

          <div style={{display:"flex",}} >  
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
              <Button 
                icon="download"
                onClick={this.handleExport.bind(this)}
              > 导出  </Button>
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

Register = Form.create()(Register);

const mapStateToProps = state => {
  return {
    listData:state.data.register
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // pubUser:(...args) => dispatch(action_content_pubUser(...args)),
    //
    getQuery:(...args) => dispatch(requestResetQueryParams(...args)),
    getList:(...args) => dispatch(action_data_register_list(...args)),
    onSelect:(...args) => dispatch(action_data_register_onSelect(...args)),
    updateparams:(...args) => dispatch(action_data_register_updateparams(...args)),
    onSearch:(...args) => dispatch(action_data_register_search(...args)),
    getChannel:(...args) => dispatch(action_data_register_channel(...args)),
    getAndroidVersion:(...args) => dispatch(action_data_register_androidVersion(...args)),
    getVersion:(...args) => dispatch(action_data_register_version(...args)),
    requestExportList:(...args) => dispatch(action_data_register_export(...args)),


  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
