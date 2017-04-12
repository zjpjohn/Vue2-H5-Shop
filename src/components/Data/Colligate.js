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

import {
  action_content_colligate_list,
  action_data_colligate_updateparams,
  action_data_colligate_onSelect,
  action_data_colligate_search,
  action_data_colligate_export,
  requestResetQueryParams

} from "../../actions/dataAction/colligateAction";

import { renderDatetime } from "../../utils/RenderUtil";

import moment from 'moment';

//import {isNumber,} from "../../utils/ValidUtil";
// import enUS from 'antd/lib/date-picker/locale/en_US';
const { MonthPicker, RangePicker } = DatePicker;
const FormItem = Form.Item;
const Option = Select.Option;

class Colligate extends React.Component {
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
    const {getFieldsValue,resetFields,} = this.props.form;
    const {onSearch,} = this.props;
    console.log("searchForm 里的 取值为：",getFieldsValue());
    let value = getFieldsValue();
    value.pageSize=window.localStorage.pageSize;
    if(value.CreateTime && value.CreateTime.length > 0){// 
      value.createdAtStart = moment(value.CreateTime[0]).format("YYYY-MM-DD");
      value.createdAtEnd = moment(value.CreateTime[1]).format("YYYY-MM-DD");
      onSearch(value);
    }else{
      value = {}
      onSearch(value)
    }
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
    const {galleryData} = this.props;

    if (galleryData != null) {
        const pager = galleryData.pager;
        sort += pager.pageSize * (pager.current - 1);
    }

    return sort;
  }
  /**
   * 获取表结构
   */
  getColumns() {
    const { sorter } = this.props.listData;
    
    return [{
        title: '序号',
        key:'id',
        render: (value, record, index) => this.getRowSort(index),
        //width: '40px'
    },{
        title: '累计用户',
        key:'totalUser',
        dataIndex: 'totalUser',
    }, {
        title: '活跃用户',
        key:'activeUser',
        dataIndex: 'activeUser',
    }, {
        title: '消息数',
        key:'messageCount',
        dataIndex: 'messageCount',
    },{
        title: '消息人数',
        key:'messageUserCount',
        dataIndex: 'messageUserCount',
    },{
        title: '账号平均好友数',
        key:'avgUserFriend',
        dataIndex: 'avgUserFriend',
    },{
        title: '日期',
        dataIndex: 'statsDate',
        key:"stats_date",
        type: 'date',//datetime 是时分秒
        render: (value,record,index) => renderDatetime(value),
        sorter: true,
        sortField:"stats_date",
        sortOrder:sorter.sortField === "stats_date" ? sorter.sortOrder : null ,
    }];
  }
  componentDidMount(){
    console.log("进入到 Colligate 组件",this.props);
    this.props.getList();
    this.props.getQuery();
  }
  render(){
    const {getFieldDecorator, resetFields,} = this.props.form;
    const { listData,onSelect } = this.props;

    return(
    <Form style={{padding:"0 15px 0 15px"}} >
        <div style={{display:"flex", flexDirection:"column",width:"30%"}} >
          <FormItem label="日期" >
            {getFieldDecorator('CreateTime', {
              rules: [{ required: false, message: 'Required' }],
            })(
              <RangePicker 
                //showTime
                //format="YYYY-MM-DD HH:mm:ss"
                format="YYYY-MM-DD"
              />
            )}
          </FormItem>
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
            <Button 
              icon="download"
              onClick={this.handleExport.bind(this)}
            > 导出 </Button>
            </div>
            <div style={{flexGrow:"1"}}></div>
          </div>
        </div>
        <Badge count={listData.onSelect.selectedRowKeys.length} ></Badge>
        <Table className="tableBug"
          columns={this.getColumns()}
          dataSource={listData.data}        
          loading={listData.loading}
          pagination={{
            total:listData.total,
            showSizeChanger:true,
            onShowSizeChange:(current, pageSize)=>{window.localStorage.pageSize=pageSize},
            pageSizeOptions:["10","20","50","100"],
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
Colligate = Form.create()(Colligate);

const mapStateToProps = state => {
  return {
    //galleryData:state.content.contentGallery
    listData:state.data.colligate
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getQuery:(...args) => dispatch(requestResetQueryParams(...args)),
    getList:(...args) => dispatch(action_content_colligate_list(...args)),
    // (page, pageSize, titles);
    updateparams:(...args) => dispatch(action_data_colligate_updateparams(...args)),
    onSelect:(...args) => dispatch(action_data_colligate_onSelect(...args)),
    onSearch:(...args) => dispatch(action_data_colligate_search(...args)),
    requestExportList:(...args) => dispatch(action_data_colligate_export(...args)),

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Colligate);

