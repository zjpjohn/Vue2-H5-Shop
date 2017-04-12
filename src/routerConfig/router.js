import React from "react";
// browserHistory 是由 React Router 创建浏览器应用推荐的 history
import {browserHistory,hashHistory,Router,Route,IndexRoute,IndexRedirect} from "react-router";

//路由组件引入
import App from "../components/HeaderComponent";
//Data 军团
import DataSideMenu from "../components/Data/DataSideMenu";
import Colligate from "../components/Data/Colligate";
import Activation from "../components/Data/Activation";
import Register from "../components/Data/Register";
import Userdata from "../components/Data/Userdata";
//Info 军团
import InfoSideMenu from "../components/Info/InfoSideMenu";
import InfoList from "../components/Info/InfoList";
import UserFeedback from "../components/Info/UserFeedback";
//Notice 军团
import NoticeSideMenu from "../components/Notice/NoticeSideMenu";
import Edit from "../components/Notice/Edit";
import SendOut from "../components/Notice/SendOut";
import NoticeHistory from "../components/Notice/NoticeHistory";

//Version 军团
import VersionSideMenu from "../components/Version/VersionSideMenu";
import VersionManager from "../components/Version/VersionManager";
import VersionAdd from "../components/Version/VersionAdd";




export default (
            <Route path="/" component={App}>
                <IndexRedirect to="/DataSideMenu/Colligate"/>
                <Route path="/DataSideMenu" component={DataSideMenu}>
                    <IndexRoute component={Colligate} />
                    <Route path="/DataSideMenu/Colligate" component={Colligate} />
                    <Route path="/DataSideMenu/Activation" component={Activation} />
                    <Route path="/DataSideMenu/Register" component={Register} />
                    <Route path="/DataSideMenu/Userdata" component={Userdata} />
                </Route>
                <Route path="/InfoSideMenu" component={InfoSideMenu}>
                    <IndexRoute component={InfoList} />
                    <Route path="/InfoSideMenu/InfoList" component={InfoList} />
                    <Route path="/InfoSideMenu/UserFeedback" component={UserFeedback} />
                </Route>
                <Route path="/NoticeSideMenu" component={NoticeSideMenu}>
                    <IndexRoute component={Edit} />
                    <Route path="/NoticeSideMenu/Edit" component={Edit} />
                    <Route path="/NoticeSideMenu/SendOut" component={SendOut} />
                    <Route path="/NoticeSideMenu/NoticeHistory" component={NoticeHistory} />
                </Route>
                <Route path="/VersionSideMenu" component={VersionSideMenu}>
                    <IndexRoute component={VersionManager} />
                    <Route path="/VersionSideMenu/VersionManager" component={VersionManager} />
                    <Route path="/VersionSideMenu/VersionAdd" component={VersionAdd} />


                </Route>               
            </Route>      
)