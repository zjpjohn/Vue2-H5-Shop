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
import * as AppVersionAction from '../../actions/AppVersionAction';
import * as AppAction from '../../actions/AppAction';
import * as RenderUtil from '../../utils/RenderUtil';
import * as RouterUtil from '../../utils/RouterUtil';

class AppVersionList extends ListEditCompoment {
    static mapStateToProps(state) {
        return {
            listData: state.app.appVersions,
            editItem: state.app.editAppVersion
        }
    }

    static getMapDispatchToProps(dispatch) {
        return {
            requestResetQueryParams: AppVersionAction.requestResetQueryParams,
            requestList: AppVersionAction.requestList,
            requestExportList: AppVersionAction.requestExportList,
            updateSearchParams: AppVersionAction.updateSearchParams,
            updateFilterParams: AppVersionAction.updateFilterParams,
            updateSelectRows: AppVersionAction.updateSelectRows,
            requestDeleteBatch: AppVersionAction.requestDeleteBatch,

            updateEditDialogOpen: AppVersionAction.updateEditDialogOpen,
            updateEditFormData: AppVersionAction.updateEditFormData,
            updateEditFormErrorMessage: AppVersionAction.updateEditFormErrorMessage,
            requestEditFormSubmit: AppVersionAction.requestEditFormSubmit,
            pushHistoryState: AppAction.pushHistoryState,
            updateEditItemKey: AppVersionAction.updateEditItemKey,
            requestEditItem: AppVersionAction.requestEditItem
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
            render: value => <a href={RouterUtil.createHref(`appManage/versions/eidt/${value}`)}>{value}</a>
        }, {
            title: 'Version Code',
            dataIndex: 'versionCode'
        }, {
            title: 'Version Name',
            dataIndex: 'versionName',
        }, {
            title: 'Force Version',
            dataIndex: 'forceVersion'
        }, {
            title: 'Update Notes',
            dataIndex: 'updateDesc'
        }, {
            title: 'Comment',
            dataIndex: 'updateDescription'
        }, {
            title: 'Create Time',
            dataIndex: 'createdAt',
            render: value => RenderUtil.renderDatetime(value),
            sorter: true,
            sortField: 'created_at',
            sortOrder: this.getColumnSortOrder(sorter, 'created_at')
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
                        <Confirm onConfirm={() => requestDeleteBatch()}>
                            <Button disabled={listData.selectedRowKeys.length === 0} intent={Intent.WARNING}>Delete</Button>
                        </Confirm>
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
                    title="Edit App Version">

                    <EditForm onSubmit={() => this.handleEditFormSubmit()} submiting={editItem.isSubmiting} errorMessage={editItem.submitErrorMessage}>
                        <EditText label="Version Code" {...this.editInputHelper.bind('versionCode')} />
                        <EditText label="Version Name" {...this.editInputHelper.bind('versionName')} />
                        <EditText label="Force Version" {...this.editInputHelper.bind('forceVersion')}/>
                        <EditText label="Update Notes" {...this.editInputHelper.bind('updateDesc')} type="textarea" />
                        <EditText label="Comment" {...this.editInputHelper.bind('updateDescription')} />
                        <FileUploader label="APK" {...this.editInputHelper.bind('apk')} accept=".apk" />
                    </EditForm>
                </Dialog>
            </div>
        )
    }

    getRequiredProps() {
        return [
            { key: 'versionCode', name: 'Version Code'},
            { key: 'versionName', name: 'PrVersion Nameice'},
            { key: 'forceVersion', name: 'Force Version'},
            { key: 'updateDesc', name: 'Update Notes'},
            { key: 'apk', name: 'APK'},
        ]
    }

    getEditRequiredProps() {
        return [
            { key: 'versionCode', name: 'Version Code'},
            { key: 'versionName', name: 'PrVersion Nameice'},
            { key: 'forceVersion', name: 'Force Version'},
            { key: 'updateDesc', name: 'Update Notes'},
        ]
    }

    handleDialogClose() {
        const {pushHistoryState} = this.props;
        pushHistoryState('appManage/versions');
    }

}

export default connect(
    AppVersionList.mapStateToProps,
    AppVersionList.wrapActionMap(AppVersionList.getMapDispatchToProps)
)(AppVersionList)
