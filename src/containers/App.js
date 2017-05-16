import React from 'react';
import BaseComponent from '../components/base/BaseComponent';
import {Button} from 'antd';
import { Popover, PopoverInteractionKind, Position, Menu, MenuItem, MenuDivider,Colors} from '@blueprintjs/core';
import * as RouterUtil from '../utils/RouterUtil';
import { history } from '../store';
import { connect } from 'react-redux';
import CollapsMenu from '../components/CollapsMenu';
import Login from '../components/Login';
import * as AppAction from '../actions/AppAction';

class App extends BaseComponent {

    static mapStateToProps(state) {
        return {
            project: state.menu.project,
            menu: state.menu.mainMenu,//state.menu from combineReducers
            pathname: state.routing.locationBeforeTransitions.pathname
        }
    }

    static mapDispatchToProps(dispatch) {
        return {
            selectProject: AppAction.selectProject,
            updateLocation: AppAction.updateLocation,
            requestLogout: AppAction.requestLogout
        }
    }
    //面包屑导航的制作
    componentDidMount() {
        const {updateLocation} = this.props;
        //location.pathname返回当前URL的路径名
        history.listen(location => {
            updateLocation(location.pathname);
        });

        updateLocation(this.props.pathname);
    }
/*<div className="pt-navbar-heading pt-select ">
<select  onChange={e => this.handleProjectSelect(e)} value={project.name}>
<option value="default">In Your Eyes</option>
<option value="musicChat">Music Chat</option>
<option value="aha">Aha</option>
<option value="Cchat">C-chat</option>
</select>
</div>*/
    render() {
        const { project, menu } = this.props;
        const layLeft={
            style:{width:'10%',float:'left',background:'#fff',overflow:'hidden',border:'1px solid #ddd',borderTop:'0'}
        };
        const layRight={
            style:{float:'right',width:'90%'}
        }
        const ppContent4 = (
            <Menu className="navMenu">
                <MenuItem
                    onClick={e => this.handleLogout()}
                    text="Logout" />
            </Menu>
        )

        return (
            <div>
                <div {...layLeft}>
                    <nav className="pt-navbar" style={{padding:0}}>
                            <Button type="primary" style={{width:'100%',height:'100%',fontSize:'20px'}}>{window.localStorage.getItem('selectProjectName')=='default'?'In your Eyes':window.localStorage.getItem('selectProjectName')}</Button>
                    </nav>
                    <ul className="pt-menu pt-elevation-1">
                        <li className="pt-menu-header"><h6>App Group</h6></li>
                        <li><button type="button" className="pt-menu-item pt-icon-star" value="default" onClick={e => this.handleProjectSelect(e)}>In Your Eyes</button></li>
                        <li><button type="button" className="pt-menu-item pt-icon-star" value="musicChat"  onClick={e => this.handleProjectSelect(e)}>Music Chat</button></li>
                        <li><button type="button" className="pt-menu-item pt-icon-star" value="aha" onClick={e => this.handleProjectSelect(e)}>Aha</button></li>
                        <li><button type="button" className="pt-menu-item pt-icon-star" value="spriteGo" onClick={e => this.handleProjectSelect(e)}>Sprite Go</button></li>
                        <li><button type="button" className="pt-menu-item pt-icon-star" value="Cchat" onClick={e => this.handleProjectSelect(e)}>C-chat</button></li>
                    </ul>
                </div>
                <div {...layRight}>
                <nav className="pt-navbar">


                    <div className="pt-navbar-group pt-align-right">
                        {
                            menu.map((item, index) => {
                                const ppContent = (

                                    <Menu className="navMenu">
                                        {
                                            item.children.map((childItem, index) => (
                                                childItem.divider ? <MenuDivider key={index} /> :
                                                 <MenuItem
                                                    key={index}
                                                    href={RouterUtil.createMenuHref(item.basePath, childItem.path)}
                                                    text={childItem.title} />
                                            ))
                                        }
                                    </Menu>
                                )

                                return (
                                    <Popover
                                        key={index}
                                        content={ppContent}
                                        interactionKind={PopoverInteractionKind.CLICK}
                                        popoverClassName="pt-popover-content-sizing"
                                        position={Position.BOTTOM}
                                        useSmartPositioning={false}>
                                        <button className={`pt-button pt-minimal ${item.icon}`}>{item.title}</button>
                                    </Popover>
                                )
                            })
                        }
                        <span className="pt-navbar-divider"></span>
                        <Popover content={ppContent4}
                            interactionKind={PopoverInteractionKind.CLICK}
                            popoverClassName="pt-popover-content-sizing"
                            position={Position.BOTTOM}
                            useSmartPositioning={false}>
                            <button className="pt-button pt-minimal pt-icon-person"></button>
                        </Popover>
                    </div>
                </nav>

                <CollapsMenu/>

                <div className="main">
                    {this.props.children}
                </div>

                <Login />
            </div>
        </div>
        )
    }
    //此处函数改变存储值，在reducer中进而改变menu的值，得以重新渲染其余组件
    handleProjectSelect(e) {
        const {selectProject} = this.props;
        selectProject(e.target.value);
    }

    handleLogout() {
        const {requestLogout} = this.props;
        requestLogout();
    }
}

export default  connect(
    App.mapStateToProps,
    App.wrapActionMap(App.mapDispatchToProps)
)(App);
