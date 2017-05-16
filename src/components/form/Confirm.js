import React from 'react';
import BaseComponent from '../base/BaseComponent';
import { Popover, PopoverInteractionKind, Position, Menu, MenuItem, Intent } from '@blueprintjs/core';

export default class Confirm extends BaseComponent {

    render() {
        const {message} = this.props;

        let text = "Confirm ?";
        if (message != null) {
            text = `Confirm ${message}?`
        }

        const ppContent = (
            <Menu 
                className="confirmMenu">
                <MenuItem
                    intent={Intent.WARNING}
                    onClick={e => this.handleConfirmClick(e)}
                    text={text} />
            </Menu>
        )

        return (
            <Popover content={ppContent}
                interactionKind={PopoverInteractionKind.CLICK}
                popoverClassName="pt-popover-content-sizing"
                position={Position.BOTTOM}
                useSmartPositioning={false}>
                {this.props.children}
            </Popover>
        )
    }

    handleConfirmClick(e) {
        const {onConfirm} = this.props;

        if (typeof onConfirm === 'function') {
            onConfirm();
        }
    }

}