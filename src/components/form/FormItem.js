import React from 'react';
import { Popover, PopoverInteractionKind, Position } from '@blueprintjs/core';
import { DatePicker } from '@blueprintjs/datetime';
import BaseComponent from '../base/BaseComponent';
import * as RenderUtil from '../../utils/RenderUtil';

export class InputHelper {
    constructor() {
        this.valueGetters = {};
        this.valueSetters = {};
    }

    bind(name) {
        return {
            bindGetter: getValue => {
                this.valueGetters[name] = getValue;
            },
            bindSetter: setValue => {
                this.valueSetters[name] = setValue;
            }
        }
    }

    getValue(name) {
        const getter = this.valueGetters[name];
        if (getter == null) {
            return null;
        }

        return getter();
    }

    getValues() {
        let values = {};
        for (let name in this.valueGetters) {
            values[name] = this.valueGetters[name]();
        }
        return values;
    }

    setValue(name, value) {
        const setter = this.valueSetters[name];
        if (setter === null) {
            throw new Error('Coundn\'t find getter for ' + name);
        }

        setter(value);
    }

    setValues(values) {
        if (values == null) {
            values = {};
        }

        for (let name of Object.keys(this.valueSetters)) {
            this.valueSetters[name](values[name]);
        }
    }

    checkRequiredProps(requiredProperties, successCb, errorCb) {
        const values = this.getValues();

        let missedPropertyNames = [];

        for (let property of requiredProperties) {
            if (values[property.key] == null) {
                missedPropertyNames.push(property.name);
            }
        }

        if (missedPropertyNames.length === 0) {
            successCb();
        } else {
            errorCb(missedPropertyNames);
        }
    }
}

export class EditText extends BaseComponent {
    createInitialState(props) {
        return {
            value: ''
        };
    }

    componentDidMount() {
        const {bindGetter, bindSetter} = this.props;
        if (typeof bindGetter === 'function') {
            bindGetter(this.getValue.bind(this));
        }
        if (typeof bindSetter === 'function') {
            bindSetter(this.setValue.bind(this));
        }
    }

    render() {
        const {label, bindGetter, bindSetter, type, ...rest} = this.props;
        let inputType = 'text';
        switch (type) {
            case 'textarea':
                inputType = 'textarea';
                break;
            case 'password':
                inputType = 'password';
                break;
        }

        return (
            <div className="formItem">
                <label className="pt-label">
                    {label}
                    <div className="inputWrapper">
                        {
                            inputType === 'textarea' ?
                            <textarea {...rest} value={this.state.value} onChange={e => this.handleInputChange(e)} className="pt-input"></textarea>
                            :
                            <input {...rest} type={inputType} value={this.state.value} onChange={e => this.handleInputChange(e)} className="pt-input" />
                        }
                    </div>
                </label>
            </div>
        )
    }

    getValue() {
        if (this.state.value == null || this.state.value === '') {
            return null;
        }

        let value = this.state.value;

        return this.state.value;
    }

    setValue(value) {
        if (value == null) {
            value = '';
        }

        this.setState({
            value
        });
        this.forceUpdate();
    }

    handleInputChange(e) {
        const value = e.target.value;

        this.setState({
            value
        });

        const {onChange} = this.props;
        if (typeof onChange === 'function') {
            onChange(value);
        }
    }
}

export class Select extends BaseComponent {
    createInitialState(props) {
        return {
            value: ''
        };
    }

    componentDidMount() {
        const {bindGetter, bindSetter} = this.props;
        if (typeof bindGetter === 'function') {
            bindGetter(this.getValue.bind(this));
        }
        if (typeof bindSetter === 'function') {
            bindSetter(this.setValue.bind(this));
        }
    }

    render() {
        const {label} = this.props;
        let options = this.props.options || [];
        return (
            <div className="formItem">
                <label className="pt-label">
                    {label}
                    <div className="pt-select">
                        <select value={this.state.value} onChange={e => this.handleInputChange(e)}>
                            <option value=""></option>
                            {
                                options.map((item, index) => (
                                    <option key={index} value={item.value}>{item.text}</option>
                                ))
                            }
                        </select>
                    </div>
                </label>
            </div>
        )
    }

    getValue() {
        if (this.state.value == null || this.state.value === '') {
            return null;
        }

        return this.state.value;
    }

    setValue(value) {
        if (value == null) {
            value = '';
        }

        this.setState({
            value
        });
        this.forceUpdate();
    }

    handleInputChange(e) {
        const value = e.target.value;

        this.setState({
            value
        });

        const {onChange} = this.props;
        if (typeof onChange === 'function') {
            onChange(value);
        }
    }
}

export class EditDatePicker extends BaseComponent {
/*    createInitialState(props) {
        return {
            value: null
        };
    }*/

    constructor(props) {
        super(props);
        this.state={
            value:null
        }
        const {bindGetter, bindSetter} = this.props;
        if (typeof bindGetter === 'function') {
            bindGetter(this.getValue.bind(this));
        }
        if (typeof bindSetter === 'function') {
            bindSetter(this.setValue.bind(this));
        }
    }

    render() {
        const {label} = this.props;
        //使用monment.js中的RenderUtil对日期做处理
        let textInputValue = RenderUtil.renderDate(this.state.value) || '';
        let showClearButton = false;
        if (this.state.value != null) {
            showClearButton = true;
        }

        const ppContent = (
            //定义日期选择组件
            <DatePicker
                canClearSelection={true}
                showActionsBar={true}
                value={this.state.value}
                shortcuts={true}
                onChange={value => this.handleDatePickerChange(value)}
                />
        )
        //Popover定义点击输入框弹出日期选择组件，content是呈现内容
        //popoverClassName：触发显示弹出窗口的交互式。
        //position:弹出窗口应该出现的位置（相对于目标）。
        return (
            <div className="formItem">
                <label className="pt-label">
                    {label}
                    <div className="inputWrapper">
                        <Popover
                            content={ppContent}
                            interactionKind={PopoverInteractionKind.CLICK}
                            popoverClassName="pt-popover-content-sizing"
                            position={Position.BOTTOM}
                            isModal
                            autoFocus={true}
                            useSmartPositioning={true}>

                            <input type="text" value={textInputValue} className="pt-input" />
                        </Popover>
                        {
                            showClearButton ? <span className="clearButton pt-icon-cross" onClick={e => this.handleClearButtonClick(e)}></span> : null
                        }
                    </div>
                </label>
            </div>
        )
    }

    getValue() {
        return RenderUtil.renderDate(this.state.value);
    }

    setValue(value) {
        let modifyValue = value;
        if (value == null) {
            modifyValue = null;
        }

        this.setState({
            value: modifyValue
        })

        this.forceUpdate();
    }

    handleDatePickerChange(value) {
        this.setState({
            value
        })
        this.forceUpdate();
    }

    handleClearButtonClick(e) {
        e.preventDefault();

        this.setState({
            value: null
        });
        this.forceUpdate();
    }
}
