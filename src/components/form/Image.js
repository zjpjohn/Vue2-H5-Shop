/**
 * Created by konie on 16-9-20.
 */

import React from 'react';
import {connect} from 'react-redux';
import BaseComponent from '../base/BaseComponent';
import * as ImageAction from '../../actions/ImageAction';

export class Image extends BaseComponent {
    static mapStateToProps(state, props) {
        return {
            src: getImageSrc(state, props)
        };
    }

    static getMapDispatchToProps() {
        return {
            requestImageUrl: ImageAction.requestImageUrl
        }
    }

    createInitialState(props) {
        return {
            src: null
        };
    }

    render() {
        const {style} = this.props;
        const {src} = this.state;

        if (src == null) {
            return null;
        }

        return (
            <img style={style} src={src} />
        )
    }

    componentWillReceiveProps(newProps) {
        if (newProps.src != null) {
            this.setState({
                src: newProps.src
            });
        } else if (newProps.uri != null) {
            if (/^http.*/.test(newProps.uri) || /^blob:/.test(newProps.uri)) {
                this.setState({
                    src: newProps.uri
                });
                return;
            }

            this.setState({
                src: null
            });

            const {uri, args, requestImageUrl} = newProps;
            const imgName = covertImgName(uri, args);
            
            if (imgName != null) {
                requestImageUrl(imgName);
            }
        }

    }

    componentDidMount() {
        const {src, uri, args, requestImageUrl} = this.props;

        if (src == null) {
            if (/^http.*/.test(uri) || /^blob:/.test(uri)) {
                this.setState({
                    src: uri
                });
                return;
            }

            const imgName = covertImgName(uri, args);
            
            if (imgName != null) {
                requestImageUrl(imgName);
            }
        } else {
            this.setState({
                src
            });
        }
    }
}

/**
 * 转换图片名
 * @param {string} uri 原图片名
 * @param {object} args 参数
 */
export function covertImgName(uri, args) {
    if (uri == null) return null;
    let imageName = uri;
    if (args == null) args = {};
    const {width, height, white, format} = args;

    let suffix = '@';
    if (Number.isInteger(height) && height > 0) {
        suffix += height + 'h';
    }

    if (Number.isInteger(width) && width > 0) {
        if (suffix == '@') {
            suffix += width + 'w';
        } else {
            suffix += '_' + width + 'w';
        }
    }

    if (white) {
        suffix += 'w';
    }

    if (format != null && format.length !== 0) {
        const format2 = format.toLowerCase();
        suffix += '.' + format2;
    } else {
        suffix += '.jpg';
    }

    imageName += suffix;
    return imageName;
}


const getImageSrc = (state, props) => {
    if (props.src != null) {
        return props.src;
    }

    const {imageCache} = state;
    const {uri, args} = props;
    const imgName = covertImgName(uri, args);

    return imageCache[imgName];
};

export default connect(
    Image.mapStateToProps,
    Image.wrapActionMap(Image.getMapDispatchToProps)
)(Image);