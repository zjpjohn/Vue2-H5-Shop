import React from "react";
import {connect} from "react-redux";

import { 
  Form, Row, Col, Input,
  Button, Icon, Select, Modal, 
  DatePicker, Table, Badge,
} from 'antd';

import "../../less/tableBug.less";
import {
  action_notice_history_list,
  action_notice_history_onSelect,
  action_notice_history_updateparams,

} from "../../actions/noticeAction/noticehistoryAction";
import { renderDatetime,renderDateTime } from "../../utils/RenderUtil";

// import {Image} from "../common/Image";
const { MonthPicker, RangePicker } = DatePicker;
const FormItem = Form.Item;
const Option = Select.Option;

function modalSuccess(index,content) {
  Modal.success({
    title: `序号 ${index+1} 的完整信息为：`,
    content: content,
  });
}

class NoticeHistory extends React.Component {
  handleTableChange(pagination, filters, sorter) {
      this.props.updateparams(pagination, filters, sorter);
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
            dataIndex: 'sendTo',
            //width: '100px'
        },{
            title: '信息',
            dataIndex: 'content',
            render:(value,records,index) => value.length > 6 ? value.substr(0,6)+"..." : value,
        }, {
            title: '完整信息',
            render:(value,records,index) => 
              <Button type="primary" onClick={e => {
                modalSuccess(index,records.content)
              }}>查看</Button>, 
        },{
            title: '消息时间',
            dataIndex: 'createdAt',
            key:"created_at",
            type:"date",
            render: value => renderDateTime(value),
            sorter: true,
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
    const {listData} = this.props;

    if (listData != null) {
        const pager = listData.pager;
        sort += pager.pageSize * (pager.current - 1);
    }

    return sort;
  }  
  //整个表单submit的函数
  handleSubmit(){
    //console.log("submit");
  }
  componentDidMount(){
    console.log("进入到 通知 noticeHistory 组件");
    this.props.getList();
  }
  render(){
    //console.log(this.props);
    const { getFieldDecorator } = this.props.form;
    const { listData,onSelect } = this.props;
    const formItemLayout = {
      style:{width:"30%"}
    };
    //{...formLayout}
    
    return(
      <Row style={{padding:"0 15px 0 15px"}} >
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
      </Row>)
  }
}
NoticeHistory = Form.create()(NoticeHistory);


const mapStateToProps = state => {
  return {
    listData:state.notice.noticehistory
  }
}

const mapDispatchToProps = dispatch => {
  return {
    //pubUser:(...args) => dispatch(action_content_pubUser(...args)),
    getList:(...args) => dispatch(action_notice_history_list(...args)),
    onSelect:(...args) => dispatch(action_notice_history_onSelect(...args)),
    updateparams:(...args) => dispatch(action_notice_history_updateparams(...args)),
    //onSearch:(...args) => dispatch(action_info_search(...args)),


  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoticeHistory);
