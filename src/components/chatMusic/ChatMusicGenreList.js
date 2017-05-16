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
import * as ChatMusicGenreAction from '../../actions/ChatMusicGenreAction';
import * as AppAction from '../../actions/AppAction';
import * as RenderUtil from '../../utils/RenderUtil';
import * as RouterUtil from '../../utils/RouterUtil';

const statusFilter = [
    {value: 1, text: 'Disabled'},
    {value: 0, text: 'Enabled'},
]

class ChatMusicGenreList extends ListEditCompoment {
    static mapStateToProps(state) {
        return {
            listData: state.chatMusic.genres,
            editItem: state.chatMusic.editGenre
        }
    }

    static getMapDispatchToProps(dispatch) {
        return {
            requestResetQueryParams: ChatMusicGenreAction.requestResetQueryParams,
            requestList: ChatMusicGenreAction.requestList,
            requestExportList: ChatMusicGenreAction.requestExportList,
            updateSearchParams: ChatMusicGenreAction.updateSearchParams,
            updateFilterParams: ChatMusicGenreAction.updateFilterParams,
            updateSelectRows: ChatMusicGenreAction.updateSelectRows,
            requestDeleteBatch: ChatMusicGenreAction.requestDeleteBatch,

            updateEditDialogOpen: ChatMusicGenreAction.updateEditDialogOpen,
            updateEditFormData: ChatMusicGenreAction.updateEditFormData,
            updateEditFormErrorMessage: ChatMusicGenreAction.updateEditFormErrorMessage,
            requestEditFormSubmit: ChatMusicGenreAction.requestEditFormSubmit,
            pushHistoryState: AppAction.pushHistoryState,
            updateEditItemKey: ChatMusicGenreAction.updateEditItemKey,
            requestEditItem: ChatMusicGenreAction.requestEditItem
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
            render: value => <a href={RouterUtil.createHref(`chatMusic/musicManage/genres/edit/${value}`)}>{value}</a>
        }, {
            title: 'Show Name',
            dataIndex: 'showName'
        }, {
            title: 'Name',
            dataIndex: 'name',
        }, {
            title: 'Music Count',
            dataIndex: 'musicCount'
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
                    title="Edit Genre">

                    <EditForm onSubmit={() => this.handleEditFormSubmit()} submiting={editItem.isSubmiting} errorMessage={editItem.submitErrorMessage}>
                        <EditText label="Show Name" {...this.editInputHelper.bind('showName')} />
                        <EditText label="Name" {...this.editInputHelper.bind('name')} />
                    </EditForm>
                </Dialog>
            </div>
        )
    }

    getRequiredProps() {
        return [
            { key: 'name', name: 'Name'},
            { key: 'showName', name: 'Show Name'},
        ]
    }

    handleDialogClose() {
        const {pushHistoryState} = this.props;
        pushHistoryState('chatMusic/musicManage/genres');
    }

}

export default connect(
    ChatMusicGenreList.mapStateToProps,
    ChatMusicGenreList.wrapActionMap(ChatMusicGenreList.getMapDispatchToProps)
)(ChatMusicGenreList)
