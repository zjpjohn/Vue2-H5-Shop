import React from 'react';
import {connect} from 'react-redux';
import ListComponent from '../base/ListComponent';
import { Table } from 'antd';
import { Button, Intent } from '@blueprintjs/core';
import SearchForm, {ToolBar} from '../form/SearchForm';
import { InputHelper, EditText, EditDatePicker } from '../form/FormItem';
import Confirm from '../form/Confirm';
import Image from '../form/Image';
import * as AppUserAction from '../../actions/AppUserAction';
import * as RenderUtil from '../../utils/RenderUtil';
import * as ValidUtil from '../../utils/ValidUtil';

const statusFilter = [
    {value: 0, text: 'Disabled'},
    {value: 1, text: 'Enabled'}
]

class AppUserList extends ListComponent {
    static mapStateToProps(state) {
        return {
            listData: state.user.appUsers
        }
    }

    static getMapDispatchToProps(dispatch) {
        return {
            requestResetQueryParams: AppUserAction.requestResetQueryParams,
            requestList: AppUserAction.requestList,
            requestExportList: AppUserAction.requestExportList,
            updateSearchParams: AppUserAction.updateSearchParams,
            updateFilterParams: AppUserAction.updateFilterParams,
            updateSelectRows: AppUserAction.updateSelectRows,

            requestEnableUser: AppUserAction.requestEnableUser,
            requestDisableUser: AppUserAction.requestDisableUser,
            requestCancelVip: AppUserAction.requestCancelVip
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
            title: 'Nickname',
            dataIndex: 'name'
        }, {
            title: 'Third Type',
            dataIndex: 'thirdType',
        }, {
            title: 'Portrait',
            dataIndex: 'portraitUrl',
            render: value => (ValidUtil.isNonEmptyString(value) ? <Image uri={value} style={{width: 40}} args={{width: 40}} /> : null)
        }, {
            title: 'IsEnabled',
            dataIndex: 'isEnabled',
            render: value => RenderUtil.coverOptions(statusFilter, value)
        }, {
            title: 'Create Time',
            dataIndex: 'createdAt',
            render: value => RenderUtil.renderDatetime(value),
            sorter: true,
            sortField: 'created_at',
            sortOrder: this.getColumnSortOrder(sorter, 'created_at'),
            type: 'datetime'
        }]
    }

    renderOperation(record) {
        const {requestEnableUser, requestDisableUser, requestCancelVip} = this.props;
        const id = record.id;

        return (
            <div className="pt-button-group">
                {
                    record.status == 0 ?
                    <Confirm onConfirm={() => requestEnableUser(id)} message="enable">
                        <Button className="pt-minimal">enable</Button>
                    </Confirm>
                    : null
                }
                {
                    record.status == 1 ?
                    <Confirm onConfirm={() => requestDisableUser(id)} message="disable">
                        <Button className="pt-minimal">disable</Button>
                    </Confirm>
                    : null
                }
                {
                    record.status == 2 ?
                    <Confirm onConfirm={() => requestCancelVip(id)} message="cancel vip">
                        <Button className="pt-minimal">cancel vip</Button>
                    </Confirm>
                    : null
                }
            </div>
        )
    }

    render() {
        const {listData} = this.props;

        return (
            <div className="listPage">
                <SearchForm onSubmit={() => this.handleSearchFormSubmit()}>
                    <EditText label="ID" {...this.inputHelper.bind('id')} />
                    <EditText label="Nickname" {...this.inputHelper.bind('name')} />
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
    AppUserList.mapStateToProps,
    AppUserList.wrapActionMap(AppUserList.getMapDispatchToProps)
)(AppUserList)