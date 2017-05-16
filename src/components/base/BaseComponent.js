import React, { Component } from 'react';

export default class BaseComponent extends Component {
    static wrapActionMap(getMapDispatchToProps) {
        const mapDispatchToProps = dispatch => {
            let map = {};
            let obj = getMapDispatchToProps();

            for (let prop in obj) {
                if (typeof obj[prop] === 'function') {
                    map[prop] = function () {
                        return dispatch(obj[prop].apply(obj, arguments));
                    }
                }
            }

            return map;
        }

        return mapDispatchToProps;
    }

    createInitialState(props) {
        return {};
    }

    constructor(props) {
        super(props);
        this.state = this.createInitialState(props);
    }

}