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
import * as ChatMusicDetailAction from '../../actions/ChatMusicDetailAction';
import * as AppAction from '../../actions/AppAction';
import * as RenderUtil from '../../utils/RenderUtil';
import * as RouterUtil from '../../utils/RouterUtil';

const statusFilter = [
    {value: 1, text: 'Disabled'},
    {value: 0, text: 'Enabled'},
]

class ChatMusicDetailList extends ListEditCompoment {
    static mapStateToProps(state) {
        return {
            listData: state.chatMusic.details,
            editItem: state.chatMusic.editDetail
        }
    }

    static getMapDispatchToProps(dispatch) {
        return {
            requestResetQueryParams: ChatMusicDetailAction.requestResetQueryParams,
            requestList: ChatMusicDetailAction.requestList,
            requestExportList: ChatMusicDetailAction.requestExportList,
            updateSearchParams: ChatMusicDetailAction.updateSearchParams,
            updateFilterParams: ChatMusicDetailAction.updateFilterParams,
            updateSelectRows: ChatMusicDetailAction.updateSelectRows,
            requestDeleteBatch: ChatMusicDetailAction.requestDeleteBatch,

            updateEditDialogOpen: ChatMusicDetailAction.updateEditDialogOpen,
            updateEditFormData: ChatMusicDetailAction.updateEditFormData,
            updateEditFormErrorMessage: ChatMusicDetailAction.updateEditFormErrorMessage,
            requestEditFormSubmit: ChatMusicDetailAction.requestEditFormSubmit,
            pushHistoryState: AppAction.pushHistoryState,
            updateEditItemKey: ChatMusicDetailAction.updateEditItemKey,
            requestEditItem: ChatMusicDetailAction.requestEditItem
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
            width: '80px'
        }, {
            title: 'Genre',
            dataIndex: 'genreName',
            width: '100px'
        }, {
            title: 'Title',
            dataIndex: 'title'
        }, {
            title: 'Object Key',
            dataIndex: 'objectKey',
        }, {
            title: 'Url',
            dataIndex: 'url',
            render: value => (<a target="_blank" href={value}>Listen</a>),
            width: '80px'
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
                    <Select label="Genre" {...this.inputHelper.bind('genreId')} options={listData.genres} />
                    <EditText label="Music Title" {...this.inputHelper.bind('title')}/>
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
                    title="Edit Music Detail">

                    <EditForm onSubmit={() => this.handleEditFormSubmit()} submiting={editItem.isSubmiting} errorMessage={editItem.submitErrorMessage}>
                        <Select label="Genre" {...this.editInputHelper.bind('genreId')} options={listData.genres} />
                        <FileUploader label="Music" {...this.editInputHelper.bind('music')} multiple accept="audio/*" />
                    </EditForm>
                </Dialog>
            </div>
        )
    }

    getRequiredProps() {
        return [
            { key: 'genreId', name: 'Genre'},
            { key: 'music', name: 'Music'},
        ]
    }

    handleDialogClose() {
        const {pushHistoryState} = this.props;
        pushHistoryState('chatMusic/musicManage/details');
    }

}

export default connect(
    ChatMusicDetailList.mapStateToProps,
    ChatMusicDetailList.wrapActionMap(ChatMusicDetailList.getMapDispatchToProps)
)(ChatMusicDetailList)
