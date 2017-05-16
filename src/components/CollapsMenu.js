import React, { Component } from 'react';
import { Classes, Menu, MenuItem, MenuDivider, CollapsibleList } from '@blueprintjs/core';
import { connect } from 'react-redux';

class CollapsMenu extends Component {
    // menu: MenuReducer
    static mapStateToProps(state) {
        return {
            menu: state.menu.collapsMenu
        }
    }
    /*renderBreadcrumb(props) {
        if (props.href != null) {
            return <a className={Classes.BREADCRUMB}>{props.text}</a>;
        } else {
            return <span className={`${Classes.BREADCRUMB} ${Classes.BREADCRUMB_CURRENT}`}>{props.text}</span>;
        }
    }*/
/*<CollapsibleList
className={Classes.BREADCRUMBS}
renderVisibleItem={this.renderBreadcrumb}>
{
    menu.map((item, index) => (
        <MenuItem key={index} text={item} iconName="folder-close"/>
    ))
}
</CollapsibleList>*/
    render() {
        const { menu } = this.props;
        return (
            <div className="collapsMenu">
                <ul className="pt-breadcrumbs">
                    <li><a className="pt-breadcrumbs-collapsed"></a></li>
                    {
                        menu.map((item, index) => (
                            <li key={index}><a className="pt-breadcrumb">{item}</a></li>
                            ))
                    }
                </ul>
            </div>
        )
    }
}

export default connect(
    CollapsMenu.mapStateToProps
)(CollapsMenu)
