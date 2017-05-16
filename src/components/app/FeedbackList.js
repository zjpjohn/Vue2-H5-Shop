import React from 'react';
import {connect} from 'react-redux';
import ListComponent from '../base/ListComponent';
import { Table } from 'antd';
import SearchForm, {ToolBar} from '../form/SearchForm';
import { InputHelper, EditText, EditDatePicker } from '../form/FormItem';
import * as FeedbackAction from '../../actions/FeedbackAction';
import * as RenderUtil from '../../utils/RenderUtil';

class FeedbackList extends ListComponent {
    static mapStateToProps(state) {
        return {
            listData: state.app.feedbacks
        }
    }

    static getMapDispatchToProps(dispatch) {
        return {
            requestResetQueryParams: FeedbackAction.requestResetQueryParams,
            requestList: FeedbackAction.requestList,
            requestExportList: FeedbackAction.requestExportList,
            updateSearchParams: FeedbackAction.updateSearchParams,
            updateFilterParams: FeedbackAction.updateFilterParams,
            updateSelectRows: FeedbackAction.updateSelectRows,
        }
    }

    getColumns() {
        const {sorter} = this.props.listData;

        return [{
            title: 'No',
            render: (value, record, index) => this.getRowSort.call(this, index),
            width: '60px'
        }, {
            title: 'ID',
            dataIndex: 'id'
        }, {
            title: 'User ID',
            dataIndex: 'userId'
        }, {
            title: 'Nickname',
            dataIndex: 'nickname',
        }, {
            title: 'Content',
            dataIndex: 'content',
            width: '500px'
        }, {
            title: 'IsHandled',
            dataIndex: 'handleStatus',
            render: value => <span>{'' + value}</span>
        }, {
            title: 'Time',
            dataIndex: 'createdAt',
            render: value => RenderUtil.renderDatetime(value),
            sorter: true,
            sortField: 'created_at',
            sortOrder: this.getColumnSortOrder(sorter, 'created_at'),
            type: 'datetime'
        }]
    }

    render() {
        const {listData} = this.props;

        return (
            <div className="listPage">
                <SearchForm onSubmit={() => this.handleSearchFormSubmit()}>
                    <EditDatePicker label="Time Start" {...this.inputHelper.bind('createdAtStart')}/>
                    <EditDatePicker label="Time End" {...this.inputHelper.bind('createdAtEnd')}/>
                </SearchForm>

                <div className="dataTable">
                    <ToolBar 
                        showExport
                        selectItemCount={listData.selectedRowKeys.length}
                        onSearch={() => this.handleSearchFormSubmit()}
                        onClear={() => this.handleSearchFormClear()}
                        onExport={this.handleExport.bind(this)}>
                    </ToolBar>

                    <Table columns={this.getColumns()}
                           rowKey={record => this.getRowKey(record)}
                           rowSelection={this.getRowSelection()}
                           dataSource={listData.data}
                           pagination={this.getPagination(listData.total, listData.pager.current)}
                           loading={listData.loading}
                           onChange={this.handleTableChange.bind(this)}
                    />
                </div>
            </div>
        )
    }

}

export default connect(
    FeedbackList.mapStateToProps,
    FeedbackList.wrapActionMap(FeedbackList.getMapDispatchToProps)
)(FeedbackList)