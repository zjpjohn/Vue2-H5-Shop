import React from "react";
import {connect} from "react-redux";

import {
    Form, Row, Col, Input,
    Button, Icon, Select, Modal,
    DatePicker, Table, Badge,
} from 'antd';
import "../../less/tableBug.less";
import {
    requestResetQueryParams,
    UserFeedback_search,
    UserFeedback_list,
    UserFeedback_export,
    UserFeedback_updateparams
} from "../../actions/infoAction/UserFeedbackAction";
import { renderDateTime } from "../../utils/RenderUtil";
import moment from "moment";
const {  RangePicker } = DatePicker;
const FormItem = Form.Item;


class UserFeedback extends React.Component {
     modalSuccess(index,content) {
        Modal.success({
            title: `序号 ${index+1} 的完整信息为：`,
            content: content,
        });
    }
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
     * 导出数据
     */
    handleExport(page, pageSize) {
        const titles = this.getExportTitles();
        const {requestExportList, } = this.props;
        //this.searchForm();
        //onSearch(values);
        if (requestExportList != null) {
            requestExportList(titles);
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
    getColumns() {
        const {sorter} = this.props.listData;

        return [{
            title: '序号',
            key:'id',
            render: (value, record, index) => this.getRowSort(index),
            //width: '40px'
        },{
            title: 'ID',
            key:'userId',
            dataIndex: 'userId',
        }, {
            title: '内容',
            key:'content',
            dataIndex: 'content',
        }, {
            title: '完整内容',
            //dataIndex: "查看",
            key:'fullContent',
            render:(value,record,index) =>
                <Button type="primary" onClick={() =>
                    this.modalSuccess(index,record.content)
                }>查看</Button>,
        },{
            title: '创建时间',
            dataIndex: 'createdAt',
            key:"created_at",
            type: 'datetime',
            render: (value,record,index) => renderDateTime(value),
            sorter: true,
            sortField:'created_at',
            sortOrder:(sorter.sortField === 'created_at' ? sorter.sortOrder : null),
        }];
    }
    componentDidMount(){
        console.log("进入到 UserFeedback 页面！",this.props);
        this.props.getList();
        this.props.getQuery();
    }
    render(){
        const { getFieldDecorator,resetFields, } = this.props.form;
        const {listData,onSelect} = this.props;
        const formItemLayout = {
            style:{width:"30%"}
        };
        return(
            <Form style={{padding:"0 15px 0 15px"}}>
                <div style={{display:"flex", justifyContent:"space-between",}}>
                    <FormItem label="用户ID" {...formItemLayout} >
                        {getFieldDecorator('userId', {
                            rules: [{ required: false, message: 'Required' }],
                        })(
                            <Input placeholder="用户ID..."  />
                        )}
                    </FormItem>
                    <FormItem label="创建时间" {...formItemLayout} >
                        {getFieldDecorator('CreateTime', {
                            rules: [{ required: false, message: 'Required' }],
                        })(
                            <RangePicker
                                allowClear
                                format="YYYY-MM-DD"
                            />
                        )}
                    </FormItem>
                    <FormItem  {...formItemLayout}>

                    </FormItem>
                </div>

                <div style={{display:"flex",margin:'0 0 20px 0'}} >
                    <div style={{flexGrow:"1",display:"flex",justifyContent:"space-between"}}>
                        <Button
                            type="primary"
                            icon="search"
                            onClick={()=>this.searchForm()}
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
                            onClick={()=>this.handleExport()}
                        > 导出  </Button>
                    </div>
                    <div style={{flexGrow:"20"}}></div>
                </div>

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

                       onChange={(...args)=>this.handleTableChange(...args)}
                />
            </Form>
        )
    }
}
UserFeedback = Form.create()(UserFeedback);

const mapStateToProps = state => {

    return {
        listData:state.info.UserFeedback
    }
}

const mapDispatchToProps = dispatch => {
    return {
      getQuery:(...args) => dispatch(requestResetQueryParams(...args)),
        getList:(...args) => dispatch(UserFeedback_list(...args)),
        onSearch:(...args) => dispatch(UserFeedback_search(...args)),
        requestExportList:(...args) => dispatch(UserFeedback_export(...args)),
        updateparams:(...args) => dispatch(UserFeedback_updateparams(...args)),
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserFeedback);