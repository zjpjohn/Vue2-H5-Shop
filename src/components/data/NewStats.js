import React from 'react';
import {connect} from 'react-redux';
import ListComponent from '../base/ListComponent';
import { Table,Form,Input } from 'antd';
import SearchForm, {ToolBar} from '../form/SearchForm';
import { InputHelper, EditText, EditDatePicker, Select } from '../form/FormItem';
import * as NewStatsAction from '../../actions/NewStatsAction';
import * as RenderUtil from '../../utils/RenderUtil';
import { Popover, PopoverInteractionKind, Position } from '@blueprintjs/core';

class NewStats extends ListComponent {
    static mapStateToProps(state) {
        return {
            listData: state.data.newStats
        }
    }
    // a:(...arg)=>dispatch(sth)
    static getMapDispatchToProps(dispatch) {
        return {
            requestResetQueryParams: NewStatsAction.requestResetQueryParams,
            updateSelectRows: NewStatsAction.updateSelectRows,
            getChannelId:NewStatsAction.getChannelId,
            updateFilterParams:NewStatsAction.updateFilterParams,
            requestList: NewStatsAction.requestList,
            updateSearchParams:NewStatsAction.updateSearchParams,
            requestExportList: NewStatsAction.requestExportList,
        }
    }
    componentDidMount(){
        console.log("进入到 New 页面！",this.props);
        this.props.requestResetQueryParams();
    }
    getColumns() {
        /*const {sorter} = this.props.listData;*/
        return [{
            title: 'No',
            key:'No',
            render: (value, record, index) => this.getRowSort.call(this, index),
            width: '60px'
        }, {
            title: 'ID',
            key:'ID',
            dataIndex: 'id'
        }, {
            title: 'Sex',
            key:'Sex',
            dataIndex: 'sex'
        }, {
            title: 'Country',
            key:'Country',
            dataIndex: 'country',
        }, {
            title: 'City',
            key:'City',
            dataIndex: 'city'
        },{
            title: 'IMEI',
            key:'IMEI',
            dataIndex: 'imei'
        },{
            title: 'DeviceName',
            key:'DeviceName',
            dataIndex: 'deviceName'
        },{
            title: 'AppVersion',
            key:'AppVersion',
            dataIndex: 'appVersion'
        },{
            title: 'ChannelId',
            key:'ChannelId',
            dataIndex: 'channelId'
        },{
            title: 'CreatedAt',
            key:'CreatedAt',
            dataIndex: 'createdAt',
            render: value => RenderUtil.renderDatetime(value),
            sorter: true,
            sortField: 'created_at',
            /*sortOrder: this.getColumnSortOrder(sorter, 'created_at'),*/
            type: 'datetime'
        }]
    }
    render(){
       const {listData} = this.props;
       return(
           <div className="listPage">
               <SearchForm onSubmit={() => this.handleSearchFormSubmit()}>
                   <EditDatePicker label="Time Start" {...this.inputHelper.bind('createdAtStart')}/>
                   <EditDatePicker label="Time End" {...this.inputHelper.bind('createdAtEnd')}/>
                   <EditText label="IMEI" {...this.inputHelper.bind('imei')}/>
                   <Select label="ChannelId" {...this.inputHelper.bind('channelId')} options={listData.channel} />
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
                          dataSource={listData.data}
                          rowKey={record => this.getRowKey(record)}
                          loading={listData.loading}
                          pagination={this.getPagination(listData.total, listData.pager.current)}
                          onChange={this.handleTableChange.bind(this)}
                   />
               </div>

           </div>
       )
    }
}

export default connect(
    NewStats.mapStateToProps,
    NewStats.wrapActionMap(NewStats.getMapDispatchToProps)
)(NewStats)
