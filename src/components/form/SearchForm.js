import React from 'react';
import { Button, Intent, Dialog, Position } from '@blueprintjs/core';

import BaseComponent from '../base/BaseComponent';
import {InputHelper, EditText} from '../form/FormItem';
import EditForm from '../form/EditForm';
import * as RenderUtil from '../../utils/RenderUtil';

export default class SearchForm extends BaseComponent {
    render() {
        return (
            <div className="searchForm">
                {this.props.children}
                <div className="searchButtonGroup">
                    <Button iconName = 'search' intent={Intent.PRIMARY} onClick={e => this.handleSearchClick(e)}>Search</Button>
                </div>
            </div>
        )
    }

    handleSearchClick(e) {
        const { onSubmit } = this.props;

        if (typeof onSubmit === 'function') {
            onSubmit(e);
        }
    }

}

export class ToolBar extends BaseComponent {
    createInitialState(props) {
        return {
            exportDialogVisible: false,
            errorMessage: null
        };
    }

    constructor(props) {
        super(props);

        this.inputHelper = new InputHelper();
    }

    render() {
        const {showExport, selectItemCount} = this.props;

        return (
            <div className="toolBar">
                <div className="optButtonGroup">
                    {this.props.children}
                </div>

                {
                    selectItemCount != null && selectItemCount > 0 ?
                    <span>{`Selected ${selectItemCount} ${selectItemCount > 1 ? 'items' : 'item'}`}</span>
                    : null
                }

                <div className="flex-space"></div>
                <div className="searchButtonGroup">
                    <Button iconName = 'search' onClick={e => this.handleSearchClick(e)}>Search</Button>
                    <Button iconName='refresh' onClick={e => this.handleClearClick(e)}>Clear</Button>
                    {
                        showExport ? <Button iconName = 'download' onClick={e => this.handleExportClick(e)}>Export</Button> : null
                    }
                </div>

                <Dialog className="editDialog"
                    canOutsideClickClose={true}
                    isOpen={this.state.exportDialogVisible}
                    onClose={() => this.handleClose()}
                    title="Export">
                    <EditForm onSubmit={() => this.handleSubmit()} errorMessage={this.state.errorMessage}>
                        <EditText {...this.inputHelper.bind('current')} label="Page" />
                        <EditText {...this.inputHelper.bind('pageSize')} label="Page Size" />
                    </EditForm>
                </Dialog>
            </div>
        )
    }

    handleClose() {
        this.setState({
            exportDialogVisible: false
        });
    }

    getRequiredProps() {
        return [
            {key: 'current', name: 'Page'},
            {key: 'pageSize', name: 'Page Size'},
        ]
    }

    handleSubmit() {
        this.inputHelper.checkRequiredProps(this.getRequiredProps(), () => {
            const values = this.inputHelper.getValues();

            const {onExport} = this.props;
            if (typeof onExport === 'function') {
                onExport(values.current, values.pageSize);
            }

            this.handleClose();
        }, missedPropertyNames => {
            this.setState({
                errorMessage: RenderUtil.renderMissedPropertyError(missedPropertyNames)
            })
        })
    }

    handleSearchClick(e) {
        const {onSearch} = this.props;
        if (typeof onSearch === 'function') {
            onSearch();
        }
    }

    handleClearClick(e) {
        const {onClear} = this.props;
        if (typeof onClear === 'function') {
            onClear();
        }
    }

    handleExportClick(e) {
        this.setState({
            errorMessage: null,
            exportDialogVisible: true
        })

        setTimeout(() => {
            this.inputHelper.setValues({
                current: 1,
                pageSize: 50
            })
        }, 0);
    }
}
