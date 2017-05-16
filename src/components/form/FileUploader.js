import React from 'react';
import uuidV1 from 'uuid/v1';
import { Popover, PopoverInteractionKind, Position, Menu, MenuItem, MenuDivider, Intent } from "@blueprintjs/core";
import BaseComponent from '../base/BaseComponent';
import Image from '../form/Image';
import * as ValidUtil from '../../utils/ValidUtil';

class ImagePreview extends BaseComponent {

    render() {
        const imageSize = 98;
        const {url, id, name,showMovePrev, showMoveNext, showMoveFirst, showMoveLast} = this.props;

        const ppContent = (
            <Menu
                className="imagePreviewMenu">
                <MenuItem
                    intent={Intent.WARNING}
                    onClick={e => this.handleRemoveClick(id)}
                    text="Remove" />
                {
                    showMovePrev || showMoveNext ? <MenuDivider/> : null
                }
                {
                    showMovePrev ?
                    <MenuItem
                    onClick={e => this.handleMovePrevClick(id)}
                    text="Move to prev" />
                    : null
                }
                {
                    showMoveNext ?
                    <MenuItem
                    onClick={e => this.handleMoveNextClick(id)}
                    text="Mote to next" />
                    : null
                }
                {
                    showMoveFirst || showMoveLast ? <MenuDivider/> : null
                }
                {
                    showMoveFirst ?
                    <MenuItem
                    onClick={e => this.handleMoveFirstClick(id)}
                    text="Move to fist" />
                    : null
                }
                {
                    showMoveLast ?
                    <MenuItem
                    onClick={e => this.handleMoveLastClick(id)}
                    text="Move to last" />
                    : null
                }
            </Menu>
        )

        return (

            <div className="imagePreview">
                <div className="contextHoler">
                     {
                        url != null ? <Image uri={url} args={{width: imageSize}} /> :
                        <div style={{textAlign:'center',padding:'10px'}}>
                            <span>{name}</span>
                        </div>
                    }
                </div>
                <div className="maskHolder">
                    <Popover content={ppContent}
                        interactionKind={PopoverInteractionKind.CLICK}
                        popoverClassName="pt-popover-content-sizing"
                        position={Position.BOTTOM}
                        useSmartPositioning={true}>
                        <span className="menuIcon pt-icon-standard pt-icon-more"></span>
                    </Popover>
                </div>
            </div>
        )
    }

    handleRemoveClick(id) {
        const {onRemove} = this.props;
        if (typeof onRemove === 'function') {
            onRemove(id);
        }
    }

    handleMovePrevClick(id) {
        const {onMovePrev} = this.props;
        if (typeof onMovePrev === 'function') {
            onMovePrev(id);
        }
    }

    handleMoveNextClick(id) {
        const {onMoveNext} = this.props;
        if (typeof onMoveNext === 'function') {
            onMoveNext(id);
        }
    }

    handleMoveFirstClick(id) {
        const {onMoveFirst} = this.props;
        if (typeof onMoveFirst === 'function') {
            onMoveFirst(id);
        }
    }

    handleMoveLastClick(id) {
        const {onMoveLast} = this.props;
        if (typeof onMoveLast === 'function') {
            onMoveLast(id);
        }
    }

}

export default class FileUploader extends BaseComponent {

    createInitialState(props) {
        const multiple = !!props.multiple;
        const size = !multiple ? 1 : (props.size || 9);
        const onlyImage = !!props.onlyImage;

        return {
            fileList: [],
            size: size,
            multiple: multiple,
            accept: onlyImage ? 'image/*' : (props.accept || '*')
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
        console.log(this.state.fileList)
        let uploadButtonVisible = true;
        if (this.state.fileList.length >= this.state.size) {
            uploadButtonVisible = false;
        }

        return (
            <div className="formItem fileUploader">
                <label className="pt-label">
                    {label}
                    <div className="inputWrapper">
                        {
                            this.state.fileList.map((item, index) => (
                                <ImagePreview
                                    key={index}
                                    url={item.url}
                                    id={item.id}
                                    name={item.name}
                                    onRemove={id => this.handleItemRemove(id)}
                                    onMovePrev={id => this.handleItemMovePrev(id)}
                                    onMoveNext={id => this.handleItemMoveNext(id)}
                                    onMoveFirst={id => this.handleitemMoveFirst(id)}
                                    onMoveLast={id => this.handleItemMoveLast(id)}
                                    showMovePrev={index > 0}
                                    showMoveNext={index < this.state.fileList.length - 1}
                                    showMoveFirst={index > 0}
                                    showMoveLast={index < this.state.fileList.length - 1}
                                     />
                            ))
                        }
                        {
                            uploadButtonVisible ?
                            <div className="uploadButton" onClick={e => this.handleUploadButtonClick(e)}>
                                <span className="pt-icon-standard pt-icon-new-object"></span>
                            </div>
                            : null
                        }
                    </div>
                </label>

                <input multiple={this.state.multiple} style={{display: 'none'}} ref="inputFile" type="file" accept={this.state.accept} onChange={e => this.handleFileInputChange(e)} />
            </div>
        )
    }

    getValue() {
        const fileList = this.afterHandleItems(this.state.fileList);

        if (this.state.multiple) {
            if (fileList.length === 0) {
                return null;
            }

            return fileList;
        } else {
            const value = fileList[0];
            return value || null
        }
    }

    setValue(value) {
        let modifyFileList;

        if (value == null) {
            modifyFileList = [];
        } else if (Array.isArray(value)) {
            modifyFileList = value.filter(item => item != null);
        } else {
            modifyFileList = [value];
        }

        this.setState({
            fileList: this.preHandleItems(modifyFileList)
        })

        this.forceUpdate();
    }

    preHandleItems(fileList) {
        let list = fileList.map(item => {
            if (typeof item === 'string') {
                return {
                    url: item
                }
            } else {
                return item;
            }
        }).map(item => {
            if (item.id == null) {
                item.id = uuidV1();
            }
            return item;
        });

        return list;
    }

    afterHandleItems(fileList) {
        let list = fileList.map(item => {
            if (item instanceof File) {
                return item;
            } else {
                return item.url;
            }
        })

        return list;
    }

    handleUploadButtonClick(e) {
        this.refs.inputFile.click();
    }

    handleFileInputChange(e) {
        const files = e.target.files;
        const {fileList} = this.state;

        for (let file of files) {
            file.id = uuidV1();
            if (ValidUtil.filenameIsSupportedImage(file.name)) {
                file.url = window.URL.createObjectURL(file);
            }
            fileList.push(file);
        }

        this.setState({
            fileList
        });

        e.target.value = null;
        this.forceUpdate();
    }

    handleItemRemove(id) {
        const modifyFileList = this.state.fileList.filter(item => item.id !== id);
        this.setState({
            fileList: modifyFileList
        });

        this.forceUpdate();
    }

    handleItemMovePrev(id) {
        let matchedItemIndex = null;
        for (let i = 0; i < this.state.fileList.length; i++) {
            const file = this.state.fileList[i];
            if (file.id === id) {
                matchedItemIndex = i;
                break;
            }
        }

        if (matchedItemIndex != null) {
            const modifyFileList = [...this.state.fileList];
            const oItem = modifyFileList[matchedItemIndex];
            modifyFileList[matchedItemIndex] = modifyFileList[matchedItemIndex - 1];
            modifyFileList[matchedItemIndex - 1] = oItem;

            this.setState({
                fileList: modifyFileList
            })
            this.forceUpdate();
        }
    }

    handleItemMoveNext(id) {
        let matchedItemIndex = null;
        for (let i = 0; i < this.state.fileList.length; i++) {
            const file = this.state.fileList[i];
            if (file.id === id) {
                matchedItemIndex = i;
                break;
            }
        }

        if (matchedItemIndex != null) {
            const modifyFileList = [...this.state.fileList];
            const oItem = modifyFileList[matchedItemIndex];
            modifyFileList[matchedItemIndex] = modifyFileList[matchedItemIndex + 1];
            modifyFileList[matchedItemIndex + 1] = oItem;

            this.setState({
                fileList: modifyFileList
            })
            this.forceUpdate();
        }
    }

    handleitemMoveFirst(id) {
        let matchedItemIndex = null;
        for (let i = 0; i < this.state.fileList.length; i++) {
            const file = this.state.fileList[i];
            if (file.id === id) {
                matchedItemIndex = i;
                break;
            }
        }

        if (matchedItemIndex != null) {
            const modifyFileList = [...this.state.fileList];
            const oItem = modifyFileList[matchedItemIndex];
            modifyFileList.splice(matchedItemIndex, 1);
            modifyFileList.unshift(oItem);

            this.setState({
                fileList: modifyFileList
            })
            this.forceUpdate();
        }
    }

    handleItemMoveLast(id) {
        let matchedItemIndex = null;
        for (let i = 0; i < this.state.fileList.length; i++) {
            const file = this.state.fileList[i];
            if (file.id === id) {
                matchedItemIndex = i;
                break;
            }
        }

        if (matchedItemIndex != null) {
            const modifyFileList = [...this.state.fileList];
            const oItem = modifyFileList[matchedItemIndex];
            modifyFileList.splice(matchedItemIndex, 1);
            modifyFileList.push(oItem);

            this.setState({
                fileList: modifyFileList
            })
            this.forceUpdate();
        }
    }

}
