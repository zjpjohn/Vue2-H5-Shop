import React from 'react';
import {connect} from 'react-redux';
import ListComponent from '../base/ListComponent';
import { Table } from 'antd';
import SearchForm, {ToolBar} from '../form/SearchForm';
import { InputHelper, EditText, EditDatePicker } from '../form/FormItem';
import * as RegistStatsAction from '../../actions/RegistStatsAction';
import * as RenderUtil from '../../utils/RenderUtil';

class RegistStats extends ListComponent {
    static mapStateToProps(state) {
        return {
            listData: state.data.registStats
        }
    }

    static getMapDispatchToProps(dispatch) {
        return {
            requestResetQueryParams: RegistStatsAction.requestResetQueryParams,
            requestList: RegistStatsAction.requestList,
            requestExportList: RegistStatsAction.requestExportList,
            updateSearchParams: RegistStatsAction.updateSearchParams,
            updateFilterParams: RegistStatsAction.updateFilterParams,
            updateSelectRows: RegistStatsAction.updateSelectRows,
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
            title: 'Version',
            dataIndex: 'appVersion'
        }, {
            title: 'Deveice',
            dataIndex: 'deviceName',
        }, {
            title: 'Third Type',
            dataIndex: 'thirdType'
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

    render() {
        const {listData} = this.props;

        return (
            <div className="listPage">
                <SearchForm onSubmit={() => this.handleSearchFormSubmit()}>
                    <EditText label="User ID" {...this.inputHelper.bind('userId')} />
                    <EditDatePicker label="Time Start" {...this.inputHelper.bind('createdAtStart')} />
                    <EditDatePicker label="Time End" {...this.inputHelper.bind('createdAtEnd')} />
                </SearchForm>

                <div className="dataTable">
                    <ToolBar 
                        showExport
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
    RegistStats.mapStateToProps,
    RegistStats.wrapActionMap(RegistStats.getMapDispatchToProps)
)(RegistStats)