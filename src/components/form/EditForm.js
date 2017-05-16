import React from 'react';
import { Button, Intent, Spinner } from '@blueprintjs/core';

import BaseComponent from '../base/BaseComponent';

export default class EditForm extends BaseComponent {
    render() {
        const {errorMessage, submiting, readOnly} = this.props;

        return (
            <div className="editForm" onKeyDown={e => this.handleKeyDown(e)}>
                {this.props.children}
                <div className="editButtonGroup">
                    <span className="errorMessage">{errorMessage}</span>
                    <div className="flex-space"></div>
                    {
                        !readOnly ?
                        <Button disabled={submiting} intent={Intent.PRIMARY} onClick={e => this.handleSubmit(e)}>
                            { submiting ? <Spinner className="pt-small" intent={Intent.PRIMARY} /> : "Submit"}
                        </Button>
                        : null
                    }
                </div>
            </div>
        )
    }

    handleKeyDown(e) {
        console.log();
        if (e.keyCode === 13) {
            if (e.target.nodeName.toLowerCase() !== 'textarea') {
                this.handleSubmit(null);
            }
        }
    }

    handleSubmit(e) {
        const { onSubmit } = this.props;

        if (typeof onSubmit === 'function') {
            onSubmit(e);
        }
    }

}