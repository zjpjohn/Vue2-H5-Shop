import './index.less';
import ReactDOM from 'react-dom';
import React from 'react';
import {syncHistoryWithStore} from "react-router-redux";
//import {store} from "../entries";
import {hashHistory,Router} from "react-router";
import {action_changeAddress} from "../actions/menuAction";
// 利用Provider可以使我们的 store 能为下面的组件所用 connect 是监听（入口文件这边用不着）
import {Provider} from "react-redux";

//import DevTools from "../reduxConfig/reduxDevtools"; // 引入Redux调试工具DevTools
import RouterConfig from '../routerConfig/router';   // 引入路由配置

import store from "../reduxConfig/store";//引入配置好的store
//react-router-redux 
// 创建一个增强版的history来结合store同步导航事件
//监听URL变化history.listen(location => analyticsService.track(location.pathname))

/*好像没啥吊用咯
import moment from 'moment';

// 推荐在入口文件全局设置 locale
import 'moment/locale/zh-cn';
import enUS from 'antd/lib/date-picker/locale/en_US';
moment.locale('zh-cn');
*/
//给增强后的store传入reducer
const history = syncHistoryWithStore(hashHistory, store);

history.listen(location => {
    console.log("进入路由监听");
    store.dispatch(action_changeAddress(location.pathname));
});
console.log("经过主文件");



ReactDOM.render(
    <Provider store={store}>    
        <Router history={hashHistory} routes={RouterConfig} />
        {/*<DevTools />*/}    
    </Provider>
    ,document.getElementById('root')
);