import React from 'react';
import {connect} from 'react-redux';
import ListEditCompoment from '../base/ListEditCompoment';
import { Table } from 'antd';
import { Button, Intent, Dialog } from '@blueprintjs/core';
import SearchForm, {ToolBar} from '../form/SearchForm';
import Confirm from '../form/Confirm';
import EditForm from '../form/EditForm';
import { InputHelper, EditText, Select, EditDatePicker } from '../form/FormItem';
import FileUploader from '../form/FileUploader';
import Image from '../form/Image';
import * as SysUserAction from '../../actions/SysUserAction';
import * as AppAction from '../../actions/AppAction';
import * as RenderUtil from '../../utils/RenderUtil';
import * as RouterUtil from '../../utils/RouterUtil';

const lockFilter = [
    {value: '1', text: 'Normal'},
    {value: '0', text: 'Locked'}
]

const statusFilter = [
    {value: '1', text: 'Normal'},
    {value: '0', text: 'Disabled'},
]

class SysUserList extends ListEditCompoment {
    static mapStateToProps(state) {
        return {
            listData: state.system.sysUsers,
            editItem: state.system.editSysUser
        }
    }

    static getMapDispatchToProps(dispatch) {
        return {
            requestResetQueryParams: SysUserAction.requestResetQueryParams,
            requestList: SysUserAction.requestList,
            requestExportList: SysUserAction.requestExportList,
            updateSearchParams: SysUserAction.updateSearchParams,
            updateFilterParams: SysUserAction.updateFilterParams,
            updateSelectRows: SysUserAction.updateSelectRows,
            requestDeleteBatch: SysUserAction.requestDeleteBatch,

            updateEditDialogOpen: SysUserAction.updateEditDialogOpen,
            updateEditFormData: SysUserAction.updateEditFormData,
            updateEditFormErrorMessage: SysUserAction.updateEditFormErrorMessage,
            requestEditFormSubmit: SysUserAction.requestEditFormSubmit,
            pushHistoryState: AppAction.pushHistoryState,
            updateEditItemKey: SysUserAction.updateEditItemKey,
            requestEditItem: SysUserAction.requestEditItem
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
            dataIndex: 'id',
            render: value => <a href={RouterUtil.createHref(`sysManage/sysUsers/edit/${value}`)}>{value}</a>
        }, {
            title: 'Name',
            dataIndex: 'name'
        }, {
            title: 'Descripton',
            dataIndex: 'description',
        }, {
            title: 'IsEnabled',
            dataIndex: 'isEnabled',
            render: value => RenderUtil.coverOptions(statusFilter, value),
        }]
    }

    render() {
        const {listData, editItem, requestDeleteBatch} = this.props;

        return (
            <div className="listPage">
                <SearchForm onSubmit={() => this.handleSearchFormSubmit()}>
                    <EditDatePicker label="Time Start" {...this.inputHelper.bind('createdAtStart')}/>
                    <EditDatePicker label="Time End" {...this.inputHelper.bind('createdAtEnd')}/>
                </SearchForm>

                <div className="dataTable">
                    <ToolBar
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

                <Dialog className="editDialog"
                    canOutsideClickClose={false}
                    isOpen={editItem.editDialogIsOpen}
                    onClose={() => this.handleDialogClose()}
                    title="Edit SysUser">

                    <EditForm onSubmit={() => this.handleEditFormSubmit()} submiting={editItem.isSubmiting} errorMessage={editItem.submitErrorMessage}>
                        <EditText label="Old Password" {...this.editInputHelper.bind('oldPassword')} type="password" />
                        <EditText label="New Password" {...this.editInputHelper.bind('newPassword')} type="password" />
                    </EditForm>
                </Dialog>
            </div>
        )
    }

    getEditRequiredProps() {
        return [
            {key: 'oldPassword', name: 'Old Password'},
            {key: 'newPassword', name: 'New Password'},
        ]
    }

    handleDialogClose() {
        const {pushHistoryState} = this.props;
        pushHistoryState('sysManage/sysUsers');
    }

}

export default connect(
    SysUserList.mapStateToProps,
    SysUserList.wrapActionMap(SysUserList.getMapDispatchToProps)
)(SysUserList)