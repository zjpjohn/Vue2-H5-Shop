import React from 'react';
import {connect} from 'react-redux';
import ListComponent from '../base/ListComponent';
import { Table } from 'antd';
import SearchForm, {ToolBar} from '../form/SearchForm';
import { InputHelper, EditText, EditDatePicker } from '../form/FormItem';
import * as ActiveStatsAction from '../../actions/ActiveStatsAction';
import * as RenderUtil from '../../utils/RenderUtil';

class ActiveStats extends ListComponent {
    static mapStateToProps(state) {
        return {
            listData: state.data.activeStats
        }
    }
    // a:(...arg)=>dispatch(sth)
    static getMapDispatchToProps(dispatch) {
        return {
            requestResetQueryParams: ActiveStatsAction.requestResetQueryParams,
            requestList: ActiveStatsAction.requestList,
            requestExportList: ActiveStatsAction.requestExportList,
            updateSearchParams: ActiveStatsAction.updateSearchParams,
            updateFilterParams: ActiveStatsAction.updateFilterParams,
            updateSelectRows: ActiveStatsAction.updateSelectRows,
        }
    }
    //定义表格头部

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
            title: 'Version',
            dataIndex: 'appVersion'
        }, {
            title: 'Deveice',
            dataIndex: 'deviceName',
        }, {
            title: 'Channel',
            dataIndex: 'channelId'
        }, {
            title: 'Repeat',
            dataIndex: 'repeatCount',
            sorter: true,
            sortField: 'repeatCount',
            sortOrder: this.getColumnSortOrder(sorter, 'repeatCount')
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
    /*Table from antd
    *pagination:分页器
    * rowKey：表格行 key 的取值，可以是字符串或一个函数
    *rowSelection：列表项是否可选择
    *dataSource：数据源
    * loading：是否加载中
    * */
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
    ActiveStats.mapStateToProps,
    ActiveStats.wrapActionMap(ActiveStats.getMapDispatchToProps)
)(ActiveStats)
