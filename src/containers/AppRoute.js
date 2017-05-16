import React, { Component } from 'react';
import { Route, IndexRedirect } from 'react-router';
import {LocaleProvider} from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

import App from './App';
import AppUserList from '../components/user/AppUserList';
import ActiveStats from '../components/data/ActiveStats';
import RegistStats from '../components/data/RegistStats';
import NewStats from '../components/data/NewStats';
import Cactive from '../components/data/CactiveStats';
import Bargraph from '../components/graph/Bargraph';
import Piegraph from '../components/graph/Piegraph';
import AppVersionList from '../components/app/AppVersionList';
import FeedbackList from '../components/app/FeedbackList';
import SysUserList from '../components/system/SysUserList';
import ChatMusicGenreList from '../components/chatMusic/ChatMusicGenreList';
import ChatMusicDetailList from '../components/chatMusic/ChatMusicDetailList';



class Main extends Component {
    render() {
        return (
            <LocaleProvider locale={enUS}>
                <App>{this.props.children}</App>
            </LocaleProvider>
        )
    }
}

/*
<Main>
    <AppUserList/>
</Main>
*/
export default (
    <Route path="/" component={Main}>
        <IndexRedirect to="data/actives"/>

        <Route path="appUserManage/users" component={AppUserList} />

        <Route path="appManage/versions(/:add)" component={AppVersionList}/>
        <Route path="appManage/versions/eidt/:key" component={AppVersionList}/>
        <Route path="appManage/feedbacks" component={FeedbackList}/>

        <Route path="data/actives" component={ActiveStats} />
        <Route path="data/regists" component={RegistStats} />
        <Route path="data/new" component={NewStats} />
        <Route path="data/Cactive" component={Cactive} />

        <Route path="graph/Bargraph" component={Bargraph} />
        <Route path="graph/Piegraph" component={Piegraph} />

        <Route path="sysManage/sysUsers" component={SysUserList} />
        <Route path="sysManage/sysUsers/edit/:key" component={SysUserList} />

        <Route path="chatMusic/musicManage/genres(/:add)" component={ChatMusicGenreList}/>
        <Route path="chatMusic/musicManage/genres/edit/:key" component={ChatMusicGenreList}/>
        <Route path="chatMusic/musicManage/details(/:add)" component={ChatMusicDetailList}/>
    </Route>
)
